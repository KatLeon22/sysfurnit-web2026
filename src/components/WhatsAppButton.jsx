import React from "react";
import { useLocation } from "react-router-dom";
import { trackWhatsAppClick } from '../utils/analytics';
import { translations, collections } from '../utils/translations';

const WhatsAppButton = ({ userLang = 'es', collectionId = null }) => {
  const location = useLocation();
  const t = translations[userLang];

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
  };

  // Determinar el mensaje según la colección actual
  let whatsappMessage = userLang === "es" 
    ? "Chatea en WhatsApp con el +502 4796 7384\n\nHola, me interesa conocer más sobre sus productos\n\n📸 Por favor, adjunta una captura de pantalla del mueble que te interesa."
    : "Chat on WhatsApp with +502 4796 7384\n\nHello, I'm interested in learning more about your products\n\n📸 Please attach a screenshot of the furniture you're interested in.";
  let whatsappUrl = `https://wa.me/50247967384?text=${encodeURIComponent(whatsappMessage)}`;

  if (collectionId) {
    const collection = collections.find((col) => col.id === collectionId);
    if (collection) {
      const collectionName = userLang === "es" ? collection.nameEs : collection.nameEn;
      whatsappMessage = userLang === "es"
        ? `Chatea en WhatsApp con el +502 4796 7384\n\nHola, me interesa la ${collectionName}\n\n📸 Por favor, adjunta una captura de pantalla del mueble que te interesa del catálogo.`
        : `Chat on WhatsApp with +502 4796 7384\n\nHello, I'm interested in the ${collectionName}\n\n📸 Please attach a screenshot of the furniture you're interested in from the catalog.`;
      whatsappUrl = `https://wa.me/50247967384?text=${encodeURIComponent(whatsappMessage)}`;
    }
  } else {
    // Si estamos en la página de catálogo, intentar extraer el ID de la URL
    const catalogMatch = location.pathname.match(/\/catalog\/(.+)/);
    if (catalogMatch) {
      const id = catalogMatch[1];
      const collection = collections.find((col) => col.id === id);
      if (collection) {
        const collectionName = userLang === "es" ? collection.nameEs : collection.nameEn;
        whatsappMessage = userLang === "es"
          ? `Chatea en WhatsApp con el +502 4796 7384\n\nHola, me interesa la ${collectionName}\n\n📸 Por favor, adjunta una captura de pantalla del mueble que te interesa del catálogo.`
          : `Chat on WhatsApp with +502 4796 7384\n\nHello, I'm interested in the ${collectionName}\n\n📸 Please attach a screenshot of the furniture you're interested in from the catalog.`;
        whatsappUrl = `https://wa.me/50247967384?text=${encodeURIComponent(whatsappMessage)}`;
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col space-y-2 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-lg text-center transition-all duration-300 hover:scale-110"
        title="Contactar por WhatsApp"
        style={{
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
        }}
      >
        <span className="text-xl md:text-2xl">💬</span>
        <span className="block text-xs mt-1 hidden sm:block">WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
