import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";

// ✅ Fix TypeScript error for GTM
declare global {
  interface Window {
    dataLayer: any[];
  }
}

function ThankYou() {
  const location = useLocation();

  let formData = location.state?.formData;
  let selectedCountryCode = location.state?.selectedCountryCode;

  // ✅ Fallback (if page refreshed)
  const savedData = localStorage.getItem("leadData");

  if (!formData && savedData) {
    const parsed = JSON.parse(savedData);
    formData = parsed?.formData;
    selectedCountryCode = parsed?.selectedCountryCode;
  }

  // ✅ GTM event
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "thank_you_page_view",
    });

    console.log("Thank You event fired");
  }, []);

  // ✅ WhatsApp message (ONLY USER DATA)
  const message = encodeURIComponent(
    `Thank you for your enquiry!\n\n` +
      `📋 YOUR DETAILS:\n` +
      `Name: ${formData?.name || ""}\n` +
      `Phone: ${selectedCountryCode || ""} ${formData?.phone || ""}\n` +
      `Email: ${formData?.email || "Not provided"}\n` +
      `Property Type: ${formData?.propertyType || ""}\n` +
      `Products Needed: ${formData?.productsNeeded?.join(", ") || ""}\n` +
      `Project Type: ${formData?.projectType || ""}\n\n` +
      `📍 Showroom Location:\n` +
      `ETJAR – J1 Complex, Dubai\n\n` +
      `📍 Google Maps:\n` +
      `https://maps.google.com/?q=ETJAR+J1+Complex+Dubai`,
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 max-w-lg w-full text-center border border-gray-100">
        {/* ✅ Success Icon */}
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

        {/* ✅ Heading */}
        <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c1c1e] mb-3">
          Thank You{formData?.name ? `, ${formData.name}` : ""}!
        </h1>

        {/* ✅ Message */}
        <p className="text-[#3a3a3c] text-base lg:text-lg mb-6">
          Your form has been submitted successfully. Our team will contact you
          shortly.
        </p>

        {/* ✅ Highlight */}
        <div className="bg-[#008873]/10 border border-[#008873]/20 rounded-lg p-4 mb-6">
          <p className="text-[#008873] font-medium">
            ⏱ We usually respond within 12 hours
          </p>
        </div>

        {/* ✅ WhatsApp CTA */}
        <div className="bg-white border-2 border-[#25D366]/30 rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex flex-col items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold text-[#1c1c1e]">
                Send details to WhatsApp
              </h4>
              <p className="text-xs lg:text-sm text-[#6b7280]">
                Save your enquiry details
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/971505269149?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-semibold shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            Send to My Phone
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* ✅ Back Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#008873] text-white rounded-xl font-semibold hover:bg-[#006d5c]"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default ThankYou;
