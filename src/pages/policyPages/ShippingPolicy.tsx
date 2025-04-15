import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-800 px-8 py-10 max-w-full mx-auto bg-green-50">
      <h1 className="text-4xl font-bold mb-8 text-center">Shipping Policy</h1>

      <p className="mb-6 text-justify">
        Thank you for choosing to shop with us at Kishan2Kitchen. We are
        committed to delivering your orders in a timely and efficient manner.
        Please read our shipping policy carefully to understand our process.
      </p>

      <h2 className="text-3xl font-semibold mb-4">1. Shipping Partners</h2>
      <p className="mb-6 text-justify">
        We have partnered with multiple courier services to deliver your orders
        across different regions. The courier partner for your order will depend
        on the delivery location, product type, and availability. We reserve the
        right to select the appropriate courier service for your order.
      </p>

      <h2 className="text-3xl font-semibold mb-4">2. Shipping Time</h2>
      <p className="mb-6 text-justify">
        We strive to ship your order as soon as possible. Your order will be
        shipped within 24-48 hours of receiving it, except on weekends and
        public holidays. However, shipping times may vary based on your delivery
        location, courier partner, and product availability.
      </p>
      <p className="mb-6 text-justify">
        The estimated shipping time for your order will be mentioned at the time
        of checkout. In general, we expect orders to be delivered within 2-10
        business days, depending on your location.
      </p>

      <h2 className="text-3xl font-semibold mb-4">3. Shipping Charges</h2>
      <p className="mb-6 text-justify">
        Shipping charges are calculated based on the weight, size, and delivery
        location of the product. The shipping charges will be displayed at the
        time of checkout. We may offer free shipping for orders above a certain
        value or during promotional periods.
      </p>

      <h2 className="text-3xl font-semibold mb-4">4. Tracking Your Order</h2>
      <p className="mb-6 text-justify">
        Once your order is shipped, we will provide you with a tracking number
        via email or SMS. You can use this tracking number to track your order
        on the courier partner's website. Please note that it may take up to 24
        hours for the courier partner's website to update the tracking
        information.
      </p>

      <h2 className="text-3xl font-semibold mb-4">
        5. Delivery Attempt and Re-Delivery
      </h2>
      <p className="mb-6 text-justify">
        Our courier partner will make multiple delivery attempts in case you are
        unavailable to receive the order. If the courier partner is unable to
        deliver the order after multiple attempts, the order will be returned to
        us. We will notify you of the failed delivery attempt and provide you
        with options for re-delivery or cancellation.
      </p>

      <h2 className="text-3xl font-semibold mb-4">6. Delayed Shipment</h2>
      <p className="mb-6 text-justify">
        In case of unexpected delays in shipment, we will notify you via email
        or SMS. We will make our best efforts to deliver your order as soon as
        possible.
      </p>

      <h2 className="text-3xl font-semibold mb-4">
        7. Damaged or Defective Products
      </h2>
      <p className="mb-6 text-justify">
        In case you receive a damaged or defective product, please notify us
        within 24 hours of receiving the order. We will arrange for a
        replacement or refund based on the extent of damage.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <p className="mb-4 text-justify">
        If you have any questions or concerns about our shipping policy, please
        feel free to contact us:
      </p>
      <p className="mb-4">
        <strong>Email:</strong>{" "}
        <a
          href="mailto:hello@kishan2kitchen.com"
          className="text-blue-600 underline"
        >
          hello@kishan2kitchen.com
        </a>
      </p>

      <p className="text-sm text-gray-500 mt-8 text-center">
        Last updated: March 27, 2025
      </p>
    </div>
  );
};

export default ShippingPolicy;
