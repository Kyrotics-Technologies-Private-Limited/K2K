import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchOrderById, cancelOrder } from "../store/slices/orderSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  PackageOpen,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Ban,
  FileDown,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return <PackageOpen className="h-5 w-5" />;
      case "shipped":
        return <Truck className="h-5 w-5" />;
      case "delivered":
        return <CheckCircle2 className="h-5 w-5" />;
      case "cancelled":
        return <Ban className="h-5 w-5" />;
      default:
        return <PackageOpen className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-green-700 text-white";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await dispatch(cancelOrder(order.id)).unwrap();
      } catch (error) {
        console.error("Failed to cancel order:", error);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculatedSubtotal =
    order?.items?.reduce(
      (sum, item) => sum + (item.unit_price || 0) * (item.quantity || 0),
      0
    ) || 0;
  const calculatedShipping = calculatedSubtotal > 500 ? 0 : 40;

  const handleDownloadInvoice = () => {
    if (!order) return;

    const doc = new jsPDF();

    // Correct logo path
    const logoUrl = `${window.location.origin}/images/K2K%20Logo.png`;

    const addInvoiceData = (imageData?: string) => {
      //  Logo
      if (imageData) {
        doc.addImage(imageData, "PNG", 14, 10, 30, 30); // (x, y, width, height)
      }

      //  Company Info
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Kishan2Kitchen (K2K)", 50, 18);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("www.kishan2kitchen.com", 50, 24);
      doc.text("Email: support@kishan2kitchen.com", 50, 29);
      doc.text("Phone: +91-9876543210", 50, 34);
      doc.text("GSTIN: 27AABCU9603R1Z2", 50, 39);

      // Invoice Title
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("TAX INVOICE", 160, 20);

      // Order Info
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Order ID: ${order.id}`, 14, 50);
      doc.text(`Order Date: ${formatDate(order.created_at)}`, 14, 56);
      doc.text(`Order Status: ${order.status}`, 14, 62);

      // Shipping Address
      const addressLines = order.address?.name
        ? [
            order.address.name,
            order.address.phone,
            order.address.appartment,
            order.address.address,
            `${order.address.state}, ${order.address.country} - ${order.address.pincode}`,
          ]
        : order.address
        ? [
            `${order.address.first_name} ${order.address.last_name}`,
            order.address.phone,
            order.address.street,
            `${order.address.city}, ${order.address.state} ${order.address.postal_code}`,
            order.address.email,
          ]
        : ["Address not available"];

      doc.setFontSize(12);
      doc.text("Shipping Address:", 14, 72);
      doc.setFontSize(10);
      addressLines.forEach((line, idx) =>
        doc.text(line || "-", 14, 78 + idx * 6)
      );

      //  Items Table
      const tableStartY = 78 + addressLines.length * 6 + 10;
      const tableBody =
        order.items?.map((item, index) => [
          index + 1,
          item.name || "Unknown Product",
          item.variant_name || "-",
          item.quantity || 0,
          `₹${item.unit_price || 0}`,
          `₹${(item.unit_price || 0) * (item.quantity || 0)}`,
        ]) || [];

      autoTable(doc, {
        startY: tableStartY,
        head: [["#", "Product", "Variant", "Qty", "Unit Price", "Total"]],
        body: tableBody,
      });

      const finalY = (doc as any).lastAutoTable.finalY || tableStartY + 20;

      //  Summary
      doc.setFontSize(11);
      doc.text(`Subtotal: ₹${calculatedSubtotal}`, 14, finalY + 10);
      doc.text(`Shipping: ₹${calculatedShipping}`, 14, finalY + 16);
      doc.text(`Total Amount: ₹${order.total_amount}`, 14, finalY + 22);

      // Payment Info
      // if (order.payment) {
      //   doc.text("Payment Info:", 14, finalY + 32);
      //   doc.text(`Method: ${order.payment.method}`, 14, finalY + 38);
      //   doc.text(`Status: ${order.payment.status}`, 14, finalY + 44);
      //   if (order.payment.transaction_id) {
      //     doc.text(
      //       `Transaction ID: ${order.payment.transaction_id}`,
      //       14,
      //       finalY + 50
      //     );
      //   }
      // }

      // Static fallback transaction ID
      const transactionId = order.payment?.transaction_id || "TXN_K2K_123456";

      doc.text(`Transaction ID: ${transactionId}`, 14, finalY + 50);

      // Thank-you Footer
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        "Thank you for shopping with Kishan2Kitchen. For any queries, contact our support.",
        14,
        285
      );
      doc.text(
        "This is a system-generated invoice. No signature required.",
        14,
        290
      );

      doc.save(`Invoice_${order.id.slice(-6)}.pdf`);
    };

    // ✅ Load logo image
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = canvas.toDataURL("image/png");
        addInvoiceData(imageData);
      }
    };
    img.onerror = () => {
      console.warn("Logo failed to load, generating without image.");
      addInvoiceData(); // fallback
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Error Loading Order
        </h2>
        <p className="text-gray-600 text-center mb-4">
          {error || "Order not found"}
        </p>
        <Button onClick={() => navigate("/orders")} variant="outline">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/orders")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600">
            Order #{order.id.slice(-6).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex gap-4 py-4 border-b last:border-0"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name || "Product"}</h3>
                      <p className="text-sm text-gray-600">
                        Variant: {item.variant_name || "-"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        ₹{item.quantity * (item.unit_price || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          {order.address && (
            <Card>
              <CardHeader>
                <CardTitle>Delivered to</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Support both legacy and new address formats */}
                  {order.address.name ? (
                    <>
                      <p className="font-medium">{order.address.name}</p>
                      <p className="text-gray-600">{order.address.phone}</p>
                      <p className="text-gray-600">
                        {order.address.appartment}
                      </p>
                      <p className="text-gray-600">{order.address.address}</p>
                      <p className="text-gray-600">
                        {order.address.state}, {order.address.country} -{" "}
                        {order.address.pincode}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-medium">
                        {order.address.first_name} {order.address.last_name}
                      </p>
                      <p className="text-gray-600">{order.address.phone}</p>
                      <p className="text-gray-600">{order.address.street}</p>
                      <p className="text-gray-600">
                        {order.address.city}, {order.address.state}{" "}
                        {order.address.postal_code}
                      </p>
                      {order.address.email && (
                        <p className="text-gray-600">{order.address.email}</p>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Order Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Order Date</span>
                  <span>{formatDate(order.created_at)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Items</span>
                  <span>{order.items?.length ?? 0} items</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{calculatedSubtotal}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{calculatedShipping}</span>
                </div>
                <div className="flex justify-between py-2 font-medium">
                  <span>Total</span>
                  <span>₹{order.total_amount}</span>
                </div>

                {/* Payment Information */}
                {order.payment && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">
                      Payment Information
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Method</span>
                        <span className="capitalize">
                          {order.payment.method}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status</span>
                        <span className="capitalize">
                          {order.payment.status}
                        </span>
                      </div>
                      {order.payment.transaction_id && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Transaction ID</span>
                          <span className="font-mono">
                            {order.payment.transaction_id}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {order.status.toLowerCase() === "processing" && (
                <Button
                  variant="destructive"
                  className="w-full mt-6"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full mt-2 bg-green-600 text-white hover:bg-green-700"
                onClick={handleDownloadInvoice}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
