import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-100 mt-20">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Privacy Policy – NowShowing.ng
      </h1>

      <p className="mb-4">
        At <strong>NowShowing.ng</strong>, your privacy is important to us. We collect only the necessary information to provide you with movie updates, showtimes, and seamless ticket purchases. This may include your name, email address, and payment details — all of which are kept secure and never shared with third parties without your consent.
      </p>

      <p className="mb-4">
        We use cookies to enhance your browsing experience and may send you notifications about the latest movies or special offers — but only if you opt in.
      </p>

      <p className="mb-4">
        By using our platform, you agree to this policy. We are committed to protecting your data and will update this notice as needed to reflect any changes.
      </p>

      <p>
        For questions or concerns, please contact us at:{" "}
        <a
          href="mailto:support@nowshowing.ng"
          className="text-blue-400 underline hover:text-blue-300"
        >
          support@nowshowing.ng
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
