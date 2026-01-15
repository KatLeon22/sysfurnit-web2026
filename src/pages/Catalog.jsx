import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/catalog.css";
import { translations, collections } from "../utils/translations";
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaDownload, FaWhatsapp } from "react-icons/fa";

const Catalog = ({ userLang }) => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const t = translations[userLang];
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  // Buscar la colección por ID
  const collection = collections.find((col) => col.id === collectionId);

  useEffect(() => {
    if (collection) {
      // Usar visor nativo con parámetros optimizados para móvil
      const optimizedUrl = `${collection.pdfPath}#toolbar=1&navpanes=1&scrollbar=1&zoom=page-width&view=FitH`;
      setPdfUrl(optimizedUrl);
    }
  }, [collection]);

  if (!collection) {
    return (
      <section className="catalog-section">
        <div className="error-message">
          <h2>{userLang === "es" ? "Colección no encontrada" : "Collection not found"}</h2>
          <button onClick={() => navigate("/collections")} className="back-btn">
            {t.catalog.backToCollections}
          </button>
        </div>
      </section>
    );
  }

  const collectionName = userLang === "es" ? collection.nameEs : collection.nameEn;
  
  // Mensaje simplificado
  const whatsappMessage = userLang === "es" 
    ? `Hola, me interesa la ${collectionName}`
    : `Hello, I'm interested in the ${collectionName}`;
  
  const whatsappUrl = `https://wa.me/50251172443?text=${encodeURIComponent(whatsappMessage)}`;

  const toggleFullscreen = () => {
    const container = document.querySelector('.pdf-container');
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const openInNewTab = () => {
    window.open(collection.pdfPath, '_blank');
  };

  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <button onClick={() => navigate("/collections")} className="back-btn">
          <FaChevronLeft /> {t.catalog.backToCollections}
        </button>
        <h1 className="catalog-title">{collectionName}</h1>
      </div>

      <div className="catalog-content">
        {/* Controles del PDF */}
        <div className="pdf-controls">
          <button onClick={openInNewTab} className="control-btn" title={userLang === "es" ? "Abrir en nueva pestaña" : "Open in new tab"}>
            <FaExpand /> {userLang === "es" ? "Abrir" : "Open"}
          </button>
          <button onClick={toggleFullscreen} className="control-btn" title={userLang === "es" ? "Pantalla completa" : "Fullscreen"}>
            {isFullscreen ? <FaCompress /> : <FaExpand />} {userLang === "es" ? "Pantalla completa" : "Fullscreen"}
          </button>
        </div>

        {/* Contenedor del PDF mejorado */}
        <div className="pdf-container">
          <iframe
            src={pdfUrl || `${collection.pdfPath}#toolbar=1&navpanes=1&scrollbar=1&zoom=page-width&view=FitH`}
            title={collectionName}
            className="pdf-iframe"
            allowFullScreen
            allow="fullscreen"
          />
          <div className="pdf-overlay">
            <div className="pdf-instructions">
              <p>{userLang === "es" ? "💡 Desliza para navegar • Pellizca para hacer zoom • Usa los controles del PDF" : "💡 Swipe to navigate • Pinch to zoom • Use PDF controls"}</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="catalog-actions">
          <a
            href={collection.pdfPath}
            download
            className="action-btn download-btn"
          >
            <FaDownload /> {t.catalog.download}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn whatsapp-btn"
          >
            <FaWhatsapp /> {userLang === "es" ? "Chatea en WhatsApp" : "Chat on WhatsApp"}
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default Catalog;

