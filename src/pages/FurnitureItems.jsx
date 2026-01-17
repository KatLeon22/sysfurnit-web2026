import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/furniture-items.css";
import { getCollectionById, getSubcategoryById } from "../utils/translations";
import { FaChevronLeft, FaWhatsapp } from "react-icons/fa";

const FurnitureItems = ({ userLang }) => {
  const { collectionId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndices, setSelectedImageIndices] = useState({});
  
  const collection = getCollectionById(collectionId);
  const subcategory = getSubcategoryById(collectionId, subcategoryId);
  
  const setImageIndex = (itemIndex, imageIndex) => {
    setSelectedImageIndices(prev => ({
      ...prev,
      [itemIndex]: imageIndex
    }));
  };
  
  const getImageIndex = (itemIndex) => {
    return selectedImageIndices[itemIndex] || 0;
  };

  if (!collection || !subcategory) {
    return (
      <section className="furniture-items-section">
        <div className="error-message">
          <h2>{userLang === "es" ? "Categoría no encontrada" : "Category not found"}</h2>
          <button onClick={() => navigate("/collections")} className="back-btn">
            {userLang === "es" ? "Volver a Colecciones" : "Back to Collections"}
          </button>
        </div>
      </section>
    );
  }

  const subcategoryName = userLang === "es" ? subcategory.nameEs : subcategory.nameEn;
  const collectionName = userLang === "es" ? collection.nameEs : collection.nameEn;
  const items = subcategory.items || [];

  const handleWhatsAppClick = (item, itemIndex) => {
    const currentImageIndex = getImageIndex(itemIndex);
    const imageUrl = item.images && item.images.length > 0 
      ? `${window.location.origin}${item.images[currentImageIndex] || item.images[0]}`
      : '';
    
    // URL de la página del producto
    const productPageUrl = `${window.location.origin}/collection/${collectionId}/${subcategoryId}`;
    
    let message = userLang === "es"
      ? `Hola, me interesa el mueble:\n\n*${item.name}*\n\nCategoría: ${subcategoryName}\nColección: ${collectionName}`
      : `Hello, I'm interested in the furniture:\n\n*${item.name}*\n\nCategory: ${subcategoryName}\nCollection: ${collectionName}`;
    
    // Agregar link a la página del producto
    message += userLang === "es" 
      ? `\n\nVer producto: ${productPageUrl}`
      : `\n\nView product: ${productPageUrl}`;
    
    if (imageUrl) {
      message += userLang === "es" 
        ? `\n\nImagen: ${imageUrl}`
        : `\n\nImage: ${imageUrl}`;
    }
    
    if (item.characteristics && item.characteristics.length > 0) {
      message += userLang === "es" ? `\n\nCaracterísticas:` : `\n\nCharacteristics:`;
      item.characteristics.forEach(char => {
        const charText = typeof char === 'string' 
          ? char 
          : (userLang === "es" ? char.nameEs : char.nameEn);
        message += `\n• ${charText}`;
      });
    }
    
    const whatsappUrl = `https://wa.me/50251172443?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="furniture-items-section">
      <div className="furniture-items-header">
        <button onClick={() => navigate(`/collection/${collectionId}`)} className="back-btn">
          <FaChevronLeft /> {userLang === "es" ? "Volver" : "Back"}
        </button>
        <h1>{subcategoryName}</h1>
        <p>{collectionName}</p>
      </div>

      {items.length === 0 ? (
        <div className="no-items-message">
          <p>{userLang === "es" ? "No hay muebles disponibles en esta categoría aún." : "No furniture items available in this category yet."}</p>
        </div>
      ) : (
        <div className="furniture-items-grid">
          {items.map((item, index) => {
            const currentImageIndex = getImageIndex(index);
            return (
            <div key={index} className="furniture-item-card" data-item-index={index}>
              <div className="furniture-item-images">
                {item.images && item.images.length > 0 ? (
                  <>
                    <div className="main-image-container">
                      <img 
                        src={item.images[currentImageIndex] || item.images[0]} 
                        alt={item.name}
                        className="main-image"
                      />
                    </div>
                    {item.images.length > 1 && (
                      <div className="thumbnail-images">
                        {item.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${item.name} ${imgIndex + 1}`}
                            className={`thumbnail ${currentImageIndex === imgIndex ? 'active' : ''}`}
                            onClick={() => setImageIndex(index, imgIndex)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-image-placeholder">
                    <p>{userLang === "es" ? "Sin imagen" : "No image"}</p>
                  </div>
                )}
              </div>

              <div className="furniture-item-info">
                <h3 className="furniture-item-name">{item.name}</h3>
                {item.characteristics && item.characteristics.length > 0 && (
                  <div className="furniture-item-characteristics">
                    <h4>{userLang === "es" ? "Características:" : "Characteristics:"}</h4>
                    <ul>
                      {item.characteristics.map((char, charIndex) => {
                        const charText = typeof char === 'string' 
                          ? char 
                          : (userLang === "es" ? char.nameEs : char.nameEn);
                        return (
                          <li key={charIndex}>{charText}</li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="furniture-item-buttons">
                  <button 
                    className="whatsapp-btn"
                    onClick={() => handleWhatsAppClick(item, index)}
                  >
                    <FaWhatsapp /> {userLang === "es" ? "Consultar por WhatsApp" : "Inquire via WhatsApp"}
                  </button>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      )}
    </section>
  );
};

export default FurnitureItems;
