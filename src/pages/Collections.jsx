import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/collections.css";
import { translations, collections } from "../utils/translations";
import { FaBed, FaCouch, FaUtensils, FaChair, FaHome, FaChild, FaStar, FaBriefcase, FaLightbulb, FaTv, FaTable } from "react-icons/fa";

// Mapeo de iconos para cada colección
const collectionIcons = {
  "new-arrivals": <FaStar size={40} />,
  bedroom: <FaBed size={40} />,
  dining: <FaUtensils size={40} />,
  youth: <FaChild size={40} />,
  seating: <FaChair size={40} />,
  occasional: <FaCouch size={40} />,
  office: <FaBriefcase size={40} />,
  accent: <FaTable size={40} />,
  media: <FaTv size={40} />,
  lighting: <FaLightbulb size={40} />,
  mattress: <FaBed size={40} />,
};

const Collections = ({ userLang }) => {
  const navigate = useNavigate();
  const t = translations[userLang];
  const [selectedCollection, setSelectedCollection] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCollectionClick = (collectionId) => {
    // Navegar a la página de subcategorías de la colección
    navigate(`/collection/${collectionId}`);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCollectionSelect = (collectionId) => {
    if (collectionId) {
      setSelectedCollection(collectionId);
      setIsDropdownOpen(false);
      navigate(`/collection/${collectionId}`);
    }
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const selectedCollectionName = selectedCollection
    ? collections.find(c => c.id === selectedCollection)
      ? (userLang === "es" 
          ? collections.find(c => c.id === selectedCollection).nameEs 
          : collections.find(c => c.id === selectedCollection).nameEn)
      : (userLang === "es" ? "-- Selecciona una Colección --" : "-- Select a Collection --")
    : (userLang === "es" ? "-- Selecciona una Colección --" : "-- Select a Collection --");

  return (
    <section className="collections-section">
      {/* Título de la página */}
      <div className="collections-header">
        <h1>{userLang === "es" ? "Nuestras Colecciones" : "Our Collections"}</h1>
        <p>{userLang === "es" ? "Explora todos nuestros catálogos de muebles" : "Explore all our furniture catalogs"}</p>
        
        {/* Combobox personalizado para seleccionar colección */}
        <div className="collections-combobox-container" ref={dropdownRef}>
          <div 
            className="collections-combobox"
            onClick={handleDropdownToggle}
          >
            <span className="combobox-selected-text">{selectedCollectionName}</span>
            <span className={`combobox-arrow ${isDropdownOpen ? 'open' : ''}`}>&#9662;</span>
          </div>
          {isDropdownOpen && (
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                zIndex: 9999,
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '500px',
                border: '1px solid #E0E0E0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                marginTop: '0.5rem',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
            >
              {collections && collections.length > 0 ? (
                collections.map((collection) => {
                  const collectionName = userLang === "es" ? collection.nameEs : collection.nameEn;
                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => handleCollectionSelect(collection.id)}
                      style={{
                        color: '#000000',
                        WebkitTextFillColor: '#000000',
                        backgroundColor: '#FFFFFF',
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        border: 'none',
                        borderBottom: '1px solid #F0F0F0',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        lineHeight: '1.5',
                        minHeight: '2.5rem',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#F5F5F5';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      {collectionName || collection.id}
                    </button>
                  );
                })
              ) : (
                <div style={{ 
                  color: '#000000', 
                  WebkitTextFillColor: '#000000',
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#FFFFFF' 
                }}>
                  No hay colecciones disponibles
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grid de Colecciones */}
      <div className="collections-grid">
        {collections.map((collection) => {
          return (
            <div key={collection.id} className="collection-card-wrapper">
              <div
                className="collection-card"
                onClick={() => handleCollectionClick(collection.id)}
              >
                <div className="collection-icon">
                  {collectionIcons[collection.id] || <FaHome size={40} />}
                </div>
                <h3 className="collection-name">
                  {userLang === "es" ? collection.nameEs : collection.nameEn}
                </h3>
                <button 
                  className="collection-btn"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCollectionClick(collection.id);
                  }}
                >
                  {t.home.viewCollection}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Collections;
