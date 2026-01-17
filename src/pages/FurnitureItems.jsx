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

  const handleWhatsAppClick = (itemName) => {
    const message = userLang === "es"
      ? `Hola, me interesa el mueble: ${itemName} de la categoría ${subcategoryName}`
      : `Hello, I'm interested in the furniture: ${itemName} from the category ${subcategoryName}`;
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
            <div key={index} className="furniture-item-card">
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
                      {item.characteristics.map((char, charIndex) => (
                        <li key={charIndex}>{char}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button 
                  className="whatsapp-btn"
                  onClick={() => handleWhatsAppClick(item.name)}
                >
                  <FaWhatsapp /> {userLang === "es" ? "Consultar por WhatsApp" : "Inquire via WhatsApp"}
                </button>
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
