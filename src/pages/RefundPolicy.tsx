import React from "react";

const ReturnExchangePolicy: React.FC = () => {
  return (
    <div className="min-h-screen  text-gray-800 px-4 py-1 max-w-7xl mx-auto bg-green-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Exchange, Return, Cancellation & Refund Policy
      </h1>

      <p className="mb-6">
        We have a 7-day exchange/return policy, which means you have 7 days
        after receiving your item to request a replacement or a return. For
        exchange/return, you can contact us at{" "}
        <a
          href="mailto:hello@kishan2kitchen.com"
          className="text-blue-600 underline"
        >
          hello@kishan2kitchen.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-3">Exchanges and Returns</h2>
      <p className="mb-4">
        To be eligible for an exchange/return, your item must be in the same
        condition that you received it, unused, and in its original packaging.
        To complete your exchange/return, the invoice must be provided at the
        time of return pickup. Once used, products will be ineligible for
        exchange or return.
      </p>

      <h3 className="text-xl font-medium mb-2">
        Exchanges/Returns are only allowed in the following unlikely cases:
      </h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>The product is damaged or if you received the wrong item.</li>
        <li>The product is not sealed properly at the time of delivery.</li>
        <li>The product has expired by the time of delivery.</li>
      </ul>
      <p className="mb-4">
        If your return is accepted, we will pick up the item ordered from the
        same address, and you will be notified of the expected pick-up date.
      </p>
      <p className="mb-4">
        In case of an exchange, the product will be delivered to you within 5-10
        days after the return pick-up is done.
      </p>
      <p className="mb-4">
        In case of any delivery-related discrepancy, please reach out to us
        within 48 hours after the order has been marked as delivered.
      </p>
      <p className="mb-6">
        <strong>Note:</strong> In case of any quality issue, kindly contact us
        at{" "}
        <a
          href="mailto:hello@kishan2kitchen.com"
          className="text-blue-600 underline"
        >
          hello@kishan2kitchen.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-3">Cancellation</h2>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          An order cancellation request will be accepted only if we have not yet
          shipped the product.
        </li>
        <li>
          If a cancellation request is accepted, you are entitled to get a
          refund of the entire amount.
        </li>
        <li>
          Kishan2Kitchen reserves the right to cancel or refuse to accept any
          order placed for various reasons, including but not limited to the
          non-availability of stock, pricing errors, informational errors, or
          problems identified with the personal/financial details provided by
          the customer.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Refunds</h2>
      <p className="mb-4">
        Once your return is received and inspected, you will be notified that we
        have received your returned item. We will also notify you if the refund
        was approved or not.
      </p>
      <p className="mb-4">
        If approved, you'll be automatically refunded on your original payment
        method. Please note that it generally takes around 7-15 days to reflect
        this amount.
      </p>
      <p className="mb-6">
        You can always contact us for any return question at{" "}
        <a
          href="mailto:hello@kishan2kitchen.com"
          className="text-blue-600 underline"
        >
          hello@kishan2kitchen.com
        </a>
        .
      </p>

      <p className="text-sm text-gray-500 mt-8">Last updated: March 27, 2025</p>
    </div>
  );
};

export default ReturnExchangePolicy;
