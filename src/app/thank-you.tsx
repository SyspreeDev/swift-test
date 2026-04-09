import { useEffect } from "react";

function ThankYou() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-lg w-full text-center border border-gray-100">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#008873] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c1c1e] mb-3 font-['Exo',sans-serif]">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-[#3a3a3c] text-base lg:text-lg mb-6 font-['Barlow',sans-serif]">
          Your form has been submitted successfully. Our team will contact you
          shortly.
        </p>

        {/* Highlight Box */}
        <div className="bg-[#008873]/10 border border-[#008873]/20 rounded-lg p-4 mb-6">
          <p className="text-[#008873] font-medium text-sm lg:text-base font-['Inter',sans-serif]">
            ⏱ We usually respond within 12 hours
          </p>
        </div>

        {/* Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#008873] text-white rounded-xl font-semibold hover:bg-[#006d5c] transition-all"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}


export default ThankYou;
