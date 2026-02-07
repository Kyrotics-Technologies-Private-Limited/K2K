import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchOrderById, cancelOrder } from "../store/slices/orderSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { invoiceApi } from "../services/api/invoiceApi";
import variantApi from "../services/api/variantApi";
import {
  ArrowLeft,
  PackageOpen,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Ban,
  FileDown,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";


const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state: RootState) => state.order);

  const [lastStatus, setLastStatus] = useState<string>("");
  // const [ setStatusUpdateTime] = useState<string>("");
  const [statusTimestamps, setStatusTimestamps] = useState<Record<string, string>>({});
  const [variantGst, setVariantGst] = useState<Record<string, number>>({});

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  // Debug: Log order data to see what fields are available
  useEffect(() => {
    if (order) {
      console.log('Order data:', order);
      console.log('Processing Date:', order.processingDate);
      console.log('Shipped Date:', order.shippedDate);
      console.log('Delivered Date:', order.deliveredDate);
    }
  }, [order]);

  useEffect(() => {
    const loadVariantGst = async () => {
      if (!order?.items || order.items.length === 0) return;
      const map: Record<string, number> = {};
      for (const item of order.items as any[]) {
        const variantId = item.variant_id;
        const productId = item.product_id;
        if (variantId && productId && map[variantId] === undefined) {
          try {
            const variant = await variantApi.getVariantById(productId, variantId);
            map[variantId] = variant.gstPercentage ?? 0;
          } catch {
            map[variantId] = 0;
          }
        }
      }
      if (Object.keys(map).length) setVariantGst((prev) => ({ ...prev, ...map }));
    };
    loadVariantGst();
  }, [order?.items]);

  // Initialize order placed timestamp when order loads
  useEffect(() => {
    if (order?.created_at && !statusTimestamps['pending'] && !statusTimestamps['confirmed']) {
      setStatusTimestamps(prev => ({
        ...prev,
        'pending': formatDate(order.created_at)
      }));
    }
  }, [order?.created_at, statusTimestamps]);

  // Track status changes for real-time updates
  useEffect(() => {
    if (order?.status && order.status !== lastStatus) {
      const currentTime = new Date().toLocaleString("en-IN");
      setLastStatus(order.status);
      // setStatusUpdateTime(currentTime);

      // Store timestamp for the new status
      setStatusTimestamps(prev => ({
        ...prev,
        [order.status.toLowerCase()]: currentTime
      }));
    }
  }, [order?.status, lastStatus]);

  // Auto-refresh order status every 30 seconds for real-time updates
  const refreshOrderStatus = useCallback(() => {
    if (orderId && order?.status !== "delivered" && order?.status !== "cancelled") {
      dispatch(fetchOrderById(orderId));
    }
  }, [orderId, order?.status, dispatch]);

  useEffect(() => {
    const interval = setInterval(refreshOrderStatus, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [refreshOrderStatus]);

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
    // Check if order can be cancelled
    if (order.status.toLowerCase() === "cancelled" || order.status.toLowerCase() === "delivered") {
      alert(`Order cannot be cancelled. Current status: ${order.status}`);
      return;
    }
    if (window.confirm("Are you sure you want to cancel this order? This will restock the products in inventory.")) {
      try {
        await dispatch(cancelOrder(order.id)).unwrap();
        alert("Order cancelled successfully and products have been restocked in inventory.");
      } catch (error) {
        console.error("Failed to cancel order:", error);
        alert("Failed to cancel order. Please try again.");
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

  // Helper function to get the best available timestamp for a status
  const getStatusTimestamp = (status: string) => {
    if (!order) return 'Not available';
    
    switch (status) {
      case 'placed':
        return order.created_at ? formatTimestamp(order.created_at) : 'Not available';
      case 'processing':
        return order.processingDate ? formatTimestamp(order.processingDate) : 
               (order.status === "processing" || order.status === "shipped" || order.status === "delivered") ?
                 formatTimestamp(order.updated_at) : 'Not available';
      case 'shipped':
        return order.shippedDate ? formatTimestamp(order.shippedDate) :
               (order.status === "shipped" || order.status === "delivered") ?
                 formatTimestamp(order.updated_at) : 'Not available';
      case 'delivered':
        return order.deliveredDate ? formatTimestamp(order.deliveredDate) :
               order.status === "delivered" ? formatTimestamp(order.updated_at) : 'Not available';
      default:
        return 'Not available';
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "";

    try {
      let date: Date;

      // Handle Firebase Timestamp objects
      if (timestamp && typeof timestamp === 'object') {
        if (timestamp._seconds) {
          // Firebase Timestamp with _seconds and _nanoseconds
          date = new Date(timestamp._seconds * 1000);
        } else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
          // Firebase Timestamp object with toDate method
          date = timestamp.toDate();
        } else {
          return "Invalid timestamp";
        }
      } else if (typeof timestamp === 'string') {
        // Regular string timestamp
        date = new Date(timestamp);
      } else {
        return "Invalid timestamp";
      }

      if (isNaN(date.getTime())) return "Invalid date";

      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

      if (diffInHours < 1) {
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      } else if (diffInHours < 24) {
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      } else {
        return date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
      }
    } catch (error) {
      return "Invalid timestamp";
    }
  };

  // Pricing helpers: apply KP discount then GST
  const applyGst = (amount: number, gstPercentage?: number) => {
    const gst = gstPercentage ?? 0;
    return Math.floor(amount + (amount * gst) / 100);
  };
  const priceAfterKp = (price: number) =>
    order?.kp_discount_percentage && order.kp_discount_percentage > 0
      ? Math.floor(price - (price * order.kp_discount_percentage) / 100)
      : price;

  const calculatedSubtotal =
    order?.items?.reduce((sum, item: any) => {
      const unit = item.unit_price || 0;
      const gst = item.variant_id ? variantGst[item.variant_id] : 0;
      const unitMember = priceAfterKp(unit);
      const unitWithGst = applyGst(unitMember, gst);
      return sum + unitWithGst * (item.quantity || 0);
    }, 0) || 0;

  const originalSubtotal =
    order?.items?.reduce((sum, item: any) => {
      const unit = item.unit_price || 0;
      const gst = item.variant_id ? variantGst[item.variant_id] : 0;
      const unitWithGst = applyGst(unit, gst);
      return sum + unitWithGst * (item.quantity || 0);
    }, 0) || 0;

  const calculatedShipping = calculatedSubtotal > 500 ? 0 : 40;

  // const handleDownloadInvoice = async () => {
  //   if (!order) return;
  //   // Only allow download if order is delivered
  //   if (order.status.toLowerCase() !== "delivered") {
  //     return;
  //   }

  //   const doc = new jsPDF();

  //   // Correct logo path
  //   const logoUrl = `${window.location.origin}/images/K2K%20Logo.png`;

  //   const generateAndSaveInvoice = async (imageData?: string) => {
  //     // Generate PDF with logo
  //     if (imageData) {
  //       doc.addImage(imageData, "PNG", 14, 10, 30, 30);
  //     }

  //     //  Company Info
  //     doc.setFontSize(16);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Kishan2Kitchen (K2K)", 50, 18);
  //     doc.setFontSize(10);
  //     doc.setFont("helvetica", "normal");
  //     doc.text("www.kishan2kitchen.com", 50, 24);
  //     doc.text("Email: support@kishan2kitchen.com", 50, 29);
  //     doc.text("Phone: +91-9876543210", 50, 34);
  //     doc.text("GSTIN: 27AABCU9603R1Z2", 50, 39);

  //     // Invoice Title
  //     doc.setFontSize(14);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("TAX INVOICE", 160, 20);

  //     // Order Info
  //     doc.setFontSize(11);
  //     doc.setFont("helvetica", "normal");
  //     doc.text(`Order ID: ${order.id}`, 14, 50);
  //     doc.text(`Order Date: ${formatDate(order.created_at)}`, 14, 56);
  //     doc.text(`Order Status: ${order.status}`, 14, 62);

  //     // Shipping Address
  //     const addressLines = order.address
  //       ? [
  //         order.address.name,
  //         order.address.phone,
  //         order.address.appartment,
  //         order.address.address,
  //         `${order.address.state}, ${order.address.country} - ${order.address.pincode}`,
  //       ]
  //       : ["Address not available"];

  //     doc.setFontSize(12);
  //     doc.text("Shipping Address:", 14, 72);
  //     doc.setFontSize(10);
  //     addressLines.forEach((line, idx) =>
  //       doc.text(line || "-", 14, 78 + idx * 6)
  //     );

  //     //  Items Table
  //     const tableStartY = 78 + addressLines.length * 6 + 10;
  //     const tableBody =
  //       order.items?.map((item, index) => [
  //         index + 1,
  //         item.name || "Unknown Product",
  //         item.variant_name || "-",
  //         item.quantity || 0,
  //         `₹${item.unit_price || 0}`,
  //         `₹${(item.unit_price || 0) * (item.quantity || 0)}`,
  //       ]) || [];

  //     autoTable(doc, {
  //       startY: tableStartY,
  //       head: [["#", "Product", "Variant", "Qty", "Unit Price", "Total"]],
  //       body: tableBody,
  //     });

  //     const finalY = (doc as any).lastAutoTable.finalY || tableStartY + 20;

  //     //  Summary
  //     doc.setFontSize(11);
  //     doc.text(`Subtotal (after KP discount): ₹${calculatedSubtotal}`, 14, finalY + 10);

  //     // Add KP Member Discount information to invoice
  //     if (order.kp_discount_amount && order.kp_discount_amount > 0) {
  //       doc.text(`Original Subtotal: ₹${(calculatedSubtotal + order.kp_discount_amount).toFixed(2)}`, 14, finalY + 16);
  //       doc.text(`KP Member Discount (${order.kp_discount_percentage}%): -₹${order.kp_discount_amount.toFixed(2)}`, 14, finalY + 22);
  //       doc.text(`Subtotal after discount: ₹${calculatedSubtotal}`, 14, finalY + 28);
  //       doc.text(`Shipping: ₹${calculatedShipping}`, 14, finalY + 34);
  //       doc.text(`Total Amount: ₹${order.total_amount}`, 14, finalY + 40);
  //       doc.text(`Total Saved: ₹${order.kp_discount_amount.toFixed(2)}`, 14, finalY + 46);
  //     } else {
  //       doc.text(`Shipping: ₹${calculatedShipping}`, 14, finalY + 16);
  //       doc.text(`Total Amount: ₹${order.total_amount}`, 14, finalY + 22);
  //     }

  //     // Payment Info
  //     // if (order.payment) {
  //     //   doc.text("Payment Info:", 14, finalY + 32);
  //     //   doc.text(`Method: ${order.payment.method}`, 14, finalY + 38);
  //     //   doc.text(`Status: ${order.payment.status}`, 14, finalY + 44);
  //     //   if (order.payment.transaction_id) {
  //     //     doc.text(
  //     //       `Transaction ID: ${order.payment.transaction_id}`,
  //     //       14,
  //     //       finalY + 50
  //     //     );
  //     //   }
  //     // }

  //     // Static fallback transaction ID
  //     const transactionId = order.payment?.transaction_id || "TXN_K2K_123456";

  //     // Adjust transaction ID position based on whether KP discount exists
  //     const transactionY = order.kp_discount_amount && order.kp_discount_amount > 0 ? finalY + 56 : finalY + 32;
  //     doc.text(`Transaction ID: ${transactionId}`, 14, transactionY);

  //     // Thank-you Footer
  //     doc.setFontSize(10);
  //     doc.setTextColor(100);
  //     doc.text(
  //       "Thank you for shopping with Kishan2Kitchen. For any queries, contact our support.",
  //       14,
  //       285
  //     );
  //     doc.text(
  //       "This is a system-generated invoice. No signature required.",
  //       14,
  //       290
  //     );

  //     //  Company Info
  //     doc.setFontSize(16);
  //     doc.setFont("helvetica", "bold");
  //     doc.text("Kishan2Kitchen (K2K)", 50, 18);
  //     doc.setFontSize(10);
  //     doc.setFont("helvetica", "normal");
  //     doc.text("www.kishan2kitchen.com", 50, 24);
  //     doc.text("Email: support@kishan2kitchen.com", 50, 29);
  //     doc.text("Phone: +91-9876543210", 50, 34);
  //     doc.text("GSTIN: 27AABCU9603R1Z2", 50, 39);

  //     // Rest of the invoice generation...
  //     // [Previous PDF generation code]

  //     // Convert PDF to blob and save to Firebase Storage
  //     try {
  //       const pdfBlob = doc.output('blob');
  //       // Save to Firebase Storage
  //       const { url } = await invoiceApi.saveInvoice(order.id, pdfBlob);
  //       console.log('Invoice saved to storage:', url);

  //       // Update local order state with the new invoice URL
  //       if (order && url) {
  //         dispatch(fetchOrderById(order.id)); // Refresh order to get updated invoiceUrl
  //       }

  //       // Download the PDF
  //       doc.save(`Invoice_${order.id.slice(-6)}.pdf`);
  //     } catch (err) {
  //       console.error('Failed to save invoice to storage:', err);
  //       // Still download even if storage fails
  //       doc.save(`Invoice_${order.id.slice(-6)}.pdf`);
  //     }
  //   };

  //   try {
  //     // ✅ Load logo image
  //     const img = new Image();
  //     img.src = logoUrl;

  //     const loadImage = new Promise<void>((resolve) => {
  //       img.onload = async () => {
  //         const canvas = document.createElement("canvas");
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         const ctx = canvas.getContext("2d");
  //         if (ctx) {
  //           ctx.drawImage(img, 0, 0);
  //           const imageData = canvas.toDataURL("image/png");
  //           await generateAndSaveInvoice(imageData);
  //         }
  //         resolve();
  //       };

  //       img.onerror = async () => {
  //         console.warn("Logo failed to load, generating without image.");
  //         await generateAndSaveInvoice();
  //         resolve();
  //       };
  //     });

  //     await loadImage;
  //   } catch (err) {
  //     console.error('Error generating invoice:', err);
  //   }
  // };

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

      {/* Order Tracking - Single Row */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-600" />
            Track My Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Tracking Steps - Horizontal Layout */}
            <div className="flex items-center justify-between">
              {/* Order Placed */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${order.status === "pending" || order.status === "confirmed" || order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
                  }`}>
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Order Placed</span>
                <span className="text-xs text-gray-500 mt-1">
                  {getStatusTimestamp('placed')}
                </span>
                {/* <span className="text-xs text-gray-600">
                    {order.created_at ? new Date(order.created_at).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }) : ''}
                  </span> */}
                <span className="text-xs text-gray-400">
                  {(order.status === "processing" || order.status === "shipped" || order.status === "delivered") ? 'Completed' : (order.status === "pending" || order.status === "confirmed" ? 'Pending' : '')}
                </span>
              </div>

              {/* Progress Line */}
              <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
                {(order.status === "processing" || order.status === "shipped" || order.status === "delivered") && (
                  <div className="absolute inset-0 bg-green-500 h-full transition-all duration-500"></div>
                )}
              </div>

              {/* Order Processing */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${order.status === "processing" || order.status === "shipped" || order.status === "delivered"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-400"
                  }`}>
                  <PackageOpen className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Processing</span>
                <span className="text-xs text-gray-500 mt-1">
                  {getStatusTimestamp('processing')}
                </span>
                <span className="text-xs text-gray-400">
                  {(order.status === "shipped" || order.status === "delivered") ? 'Completed' : (order.status === "processing" ? 'Processing' : 'Pending')}
                </span>
              </div>

              {/* Progress Line */}
              <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
                {(order.status === "shipped" || order.status === "delivered") && (
                  <div className="absolute inset-0 bg-green-500 h-full transition-all duration-500"></div>
                )}
              </div>

              {/* Order Shipped */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${order.status === "shipped" || order.status === "delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
                  }`}>
                  <Truck className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Shipped</span>
                <span className="text-xs text-gray-500 mt-1">
                  {getStatusTimestamp('shipped')}
                </span>
                <span className="text-xs text-gray-400">
                  {(order.status === "delivered") ? 'Completed' : (order.status === "shipped" ? 'Shipped' : 'Pending')}
                </span>
              </div>

              {/* Progress Line */}
              <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
                {order.status === "delivered" && (
                  <div className="absolute inset-0 bg-green-500 h-full transition-all duration-500"></div>
                )}
              </div>

              {/* Order Delivered */}
              <div className="flex flex-col items-center text-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${order.status === "delivered"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-400"
                  }`}>
                  <CheckCircle className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">Delivered</span>
                <span className="text-xs text-gray-500 mt-1">
                  {getStatusTimestamp('delivered')}
                </span>
                <span className="text-xs text-gray-400">
                  {(order.status === "delivered") ? 'Delivered' : 'Pending'}
                </span>
              </div>
            </div>





            {/* Refresh Button */}
            {/* <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshOrderStatus}
                className="w-full"
              >
                <Clock className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>

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
                      <div className="mt-2">
                        {/* GST-inclusive price */}
                        <p className="text-sm text-gray-700 font-medium">
                          Price (incl. GST): ₹{(
                            applyGst(
                              item.unit_price || 0,
                              (item as any).variant_id
                                ? variantGst[(item as any).variant_id]
                                : 0
                            ) * (item.quantity || 0)
                          ).toLocaleString("en-IN")}
                        </p>
                        {/* Show pricing with KP member discount */}
                        {order.kp_discount_amount &&
                          order.kp_discount_amount > 0 &&
                          order.kp_discount_percentage ? (
                          <div className="space-y-1">
                            {/* Original price with GST (crossed out) */}
                            <p className="text-sm text-gray-500 line-through">
                              ₹{(
                                applyGst(
                                  item.unit_price || 0,
                                  (item as any).variant_id
                                    ? variantGst[(item as any).variant_id]
                                    : 0
                                ) * (item.quantity || 0)
                              ).toLocaleString("en-IN")}
                            </p>
                            {/* KP Member price with GST */}
                            <p className="text-lg font-semibold text-green-600">
                              KP Member ({order.kp_discount_percentage}% off): ₹{(
                                applyGst(
                                  priceAfterKp(item.unit_price || 0),
                                  (item as any).variant_id
                                    ? variantGst[(item as any).variant_id]
                                    : 0
                                ) * (item.quantity || 0)
                              ).toLocaleString("en-IN")}
                            </p>
                            {/* Savings amount (GST-inclusive) */}
                            <p className="text-xs text-green-600">
                              Save ₹{(
                                (applyGst(
                                  item.unit_price || 0,
                                  (item as any).variant_id
                                    ? variantGst[(item as any).variant_id]
                                    : 0
                                ) -
                                  applyGst(
                                    priceAfterKp(item.unit_price || 0),
                                    (item as any).variant_id
                                      ? variantGst[(item as any).variant_id]
                                      : 0
                                  )) * (item.quantity || 0)
                              ).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-medium">
                            ₹{(
                              applyGst(
                                item.unit_price || 0,
                                (item as any).variant_id
                                  ? variantGst[(item as any).variant_id]
                                  : 0
                              ) * (item.quantity || 0)
                            ).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
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
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Support both legacy and new address formats */}
                  {order.address ? (
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
                    <p>
                      Address not available
                    </p>
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
                  <span className="text-gray-600">Subtotal <span className="text-xs">(including GST)</span></span>
                  <span>₹{calculatedSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {/* Show KP Member Discount Information */}
                {order.kp_discount_amount && order.kp_discount_amount > 0 && (
                  <>
                    <div className="flex justify-between py-2 border-b text-gray-500">
                      <span>Original Subtotal</span>
                      <span className="line-through">₹{(originalSubtotal).toLocaleString("en-IN")}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{calculatedShipping}</span>
                </div>
                <div className="flex justify-between border-b py-2 font-medium">
                  <span>Total</span>
                  <span>₹{(order.total_amount || (calculatedSubtotal + calculatedShipping)).toLocaleString("en-IN")}</span>
                </div>

                {/* Show total savings for KP members */}
                {order.kp_discount_amount && order.kp_discount_amount > 0 && (
                  <div className="flex justify-between py-2  text-green-600 font-medium">
                    <span>Total Saved with KP Membership</span>
                    <span>₹{order.kp_discount_amount.toFixed(2)}</span>
                  </div>
                )}


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

                {/* Invoice Information removed as per requirement */}
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
               {/* Invoice Download Button */}
               <Button
                 variant="outline"
                 className={`w-full mt-2 ${
                   order.status.toLowerCase() === "delivered" && order.invoiceUrl
                     ? "bg-green-600 text-white hover:bg-green-700"
                     : "bg-gray-600 border-gray-900 text-black cursor-not-allowed"
                 }`}
                 onClick={async () => {
                   if (order.status.toLowerCase() === "delivered" && order.invoiceUrl) {
                     try {
                       // Fetch the PDF file with proper headers
                       const response = await fetch(order.invoiceUrl, {
                         method: 'GET',
                         headers: {
                           'Content-Type': 'application/pdf',
                         },
                       });
                       
                       if (!response.ok) {
                         throw new Error('Failed to fetch PDF');
                       }
                       
                       const blob = await response.blob();
                       
                       // Create a blob URL
                       const blobUrl = window.URL.createObjectURL(blob);
                       
                       // Create download link with proper attributes
                       const link = document.createElement('a');
                       link.href = blobUrl;
                       link.download = `invoice-${order.id || 'file'}.pdf`;
                       link.target = '_blank';
                       link.style.display = 'none';
                       
                       // Add to DOM, click, and remove
                       document.body.appendChild(link);
                       link.click();
                       document.body.removeChild(link);
                       
                       // Cleanup blob URL
                       setTimeout(() => {
                         window.URL.revokeObjectURL(blobUrl);
                       }, 100);
                       
                     } catch (error) {
                       console.error('Error downloading invoice:', error);
                       // Fallback: try to force download by modifying URL
                       const downloadUrl = order.invoiceUrl.includes('?') 
                         ? `${order.invoiceUrl}&download=true`
                         : `${order.invoiceUrl}?download=true`;
                       
                       const link = document.createElement('a');
                       link.href = downloadUrl;
                       link.download = `invoice-${order.id || 'file'}.pdf`;
                       link.target = '_blank';
                       link.style.display = 'none';
                       document.body.appendChild(link);
                       link.click();
                       document.body.removeChild(link);
                     }
                   }
                 }}
                 disabled={order.status.toLowerCase() !== "delivered" || !order.invoiceUrl}
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
