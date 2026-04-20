// WhatsAppButton.jsx
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/971505269149?text=Hi%20I%20am%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-50 bg-green-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:translate-y-[-4px] transition-all duration-200"
    >
      <FaWhatsapp className="text-white text-5xl" />
    </a>
  );
}