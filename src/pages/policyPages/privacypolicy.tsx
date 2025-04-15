import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-800 px-20 py-8 w-full bg-green-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

      <p className="mb-6 text-justify">
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit or make a purchase from our
        website (the “Site”).
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Personal information we collect
      </h2>
      <p className="mb-4 text-justify">
        When you visit the Site, we automatically collect certain information
        about your device, including information about your web browser, IP
        address, time zone, and some of the cookies installed on your device.
        Additionally, we collect information about the individual web pages you
        view, the websites or search terms that referred you, and how you
        interact with the Site. This is called “Device Information”.
      </p>

      <h3 className="text-xl font-medium mb-3">
        We collect Device Information using the following technologies:
      </h3>
      <ul className="list-disc pl-8 space-y-2 mb-4 text-justify">
        <li>
          “Cookies” are data files placed on your device or computer and often
          include an anonymous unique identifier.
        </li>
        <li>
          “Log files” track actions on the Site and collect data including IP
          address, browser type, ISP, referring/exit pages, and date/time
          stamps.
        </li>
        <li>
          “Web beacons”, “tags”, and “pixels” are electronic files used to
          record information about how you browse the Site.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        How do we use your personal information?
      </h2>
      <ul className="list-disc pl-8 space-y-2 mb-4 text-justify">
        <li>
          Fulfill any orders placed through the Site (including processing your
          payment information, arranging for shipping, and providing invoices
          and order confirmations).
        </li>
        <li>Communicate with you.</li>
        <li>Screen orders for potential risk or fraud.</li>
        <li>
          Provide you with information or advertising relating to our products
          or services, in line with your preferences.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        Sharing your personal information
      </h2>
      <p className="mb-4 text-justify">
        We share your Personal Information with third parties to help us use it
        as described above. For example, we use Google Analytics to understand
        how customers use the Website. We may also disclose your Personal
        Information to comply with applicable laws, respond to lawful requests
        such as subpoenas or search warrants, or protect our rights.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Behavioural advertising</h2>
      <p className="mb-4 text-justify">
        We use your Personal Information to provide targeted advertisements or
        marketing communications that may be of interest to you. You can opt out
        of targeted advertising by visiting:
      </p>
      <ul className="list-disc pl-8 space-y-2 mb-4 text-justify">
        <li>
          <a
            href="https://www.facebook.com/settings/?tab=ads"
            className="text-green-600 underline"
          >
            Facebook: Ad Preferences
          </a>
        </li>
        <li>
          <a
            href="https://www.google.com/settings/ads/anonymous"
            className="text-green-600 underline"
          >
            Google: Ad Settings
          </a>
        </li>
        <li>
          <a
            href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
            className="text-green-600 underline"
          >
            Bing: Personalized Ads
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Your rights</h2>
      <p className="mb-4 text-justify">
        You have the right to access, correct, or delete your Personal
        Information that we collect and maintain. You may also opt out of
        receiving marketing communications from us at any time.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Data retention</h2>
      <p className="mb-6 text-justify">
        When you place an order through the Website, we will retain your Order
        Information for our records unless you request its deletion.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Changes to This Privacy Policy
      </h2>
      <p className="mb-6 text-justify">
        We may update this Privacy Policy periodically to reflect changes in our
        practices or legal requirements. Any updates will be posted on our
        Website.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact us</h2>
      <p className="mb-1 text-justify">
        If you have any questions regarding this Privacy Policy, please contact
        us:
      </p>
      <p className="mb-1">
        <strong>Email:</strong>{" "}
        <a
          href="mailto:kishan2kitchen@gmail.com"
          className="text-green-600 underline"
        >
          kishan2kitchen@gmail.com
        </a>
      </p>
      <p className="text-justify">
        <strong>Postal Address:</strong> Univillage Agro Pvt. Ltd., Uttar
        Narayan Pur, PO: BK Chungri, PS: Margram, District: Birbhum, West Bengal
        - 731202, India
      </p>

      <p className="text-sm text-gray-500 mt-8 text-center">
        Last updated: March 27, 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
