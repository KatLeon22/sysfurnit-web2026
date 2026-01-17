import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/collections.css";
import { translations, collections, getCollectionById } from "../utils/translations";
import { FaBed, FaCouch, FaUtensils, FaChair, FaHome, FaChild, FaChevronDown, FaChevronUp, FaStar, FaBriefcase, FaLightbulb, FaTv, FaTable } from "react-icons/fa";

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
  const [expandedCollection, setExpandedCollection] = useState(null);

  const handleCollectionClick = (collectionId, e) => {
    e.stopPropagation();
    const collection = getCollectionById(collectionId);
    
    // Si tiene subcategorías, mostrar/ocultar dropdown
    if (collection && collection.subcategories && collection.subcategories.length > 0) {
      setExpandedCollection(expandedCollection === collectionId ? null : collectionId);
    } else {
      // Si no tiene subcategorías, no hacer nada por ahora
      // (las otras colecciones se implementarán después)
    }
  };

  const handleSubcategoryClick = (collectionId, subcategoryId, e) => {
    e.stopPropagation();
    navigate(`/collection/${collectionId}/${subcategoryId}`);
  };

  return (
    <section className="collections-section">
      {/* Título de la página */}
      <div className="collections-header">
        <h1>{userLang === "es" ? "Nuestras Colecciones" : "Our Collections"}</h1>
        <p>{userLang === "es" ? "Explora todos nuestros catálogos de muebles" : "Explore all our furniture catalogs"}</p>
      </div>

      {/* Grid de Colecciones */}
      <div className="collections-grid">
        {collections.map((collection) => {
          const hasSubcategories = collection.subcategories && collection.subcategories.length > 0;
          const isExpanded = expandedCollection === collection.id;

          return (
            <div key={collection.id} className="collection-card-wrapper">
              <div
                className="collection-card"
                onClick={(e) => handleCollectionClick(collection.id, e)}
              >
                <div className="collection-icon">
                  {collectionIcons[collection.id] || <FaHome size={40} />}
                </div>
                <h3 className="collection-name">
                  {userLang === "es" ? collection.nameEs : collection.nameEn}
                </h3>
                <button 
                  className="collection-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasSubcategories) {
                      setExpandedCollection(expandedCollection === collection.id ? null : collection.id);
                    }
                  }}
                >
                  {t.home.viewCollection}
                  {hasSubcategories && (isExpanded ? <FaChevronUp style={{ marginLeft: '0.5rem' }} /> : <FaChevronDown style={{ marginLeft: '0.5rem' }} />)}
                </button>
              </div>

              {/* Dropdown de subcategorías */}
              {hasSubcategories && isExpanded && (
                <div className="subcategories-dropdown">
                  {collection.subcategories.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="subcategory-item"
                      onClick={(e) => handleSubcategoryClick(collection.id, subcategory.id, e)}
                    >
                      {userLang === "es" ? subcategory.nameEs : subcategory.nameEn}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Collections;
