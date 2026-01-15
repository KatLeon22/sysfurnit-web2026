import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/collections.css";
import { translations, collections } from "../utils/translations";
import { FaBed, FaCouch, FaUtensils, FaChair, FaHome, FaChild } from "react-icons/fa";

// Mapeo de iconos para cada colección
const collectionIcons = {
  bedroom: <FaBed size={40} />,
  supplement: <FaCouch size={40} />,
  dining: <FaUtensils size={40} />,
  "seating-stationary": <FaChair size={40} />,
  "dining-room": <FaUtensils size={40} />,
  "motion-seating": <FaCouch size={40} />,
  youth: <FaChild size={40} />,
  home: <FaHome size={40} />,
  occasional: <FaCouch size={40} />,
  mattress: <FaBed size={40} />,
};

const Collections = ({ userLang }) => {
  const navigate = useNavigate();
  const t = translations[userLang];

  const handleCollectionClick = (collectionId) => {
    navigate(`/catalog/${collectionId}`);
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
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="collection-card"
            onClick={() => handleCollectionClick(collection.id)}
          >
            <div className="collection-icon">
              {collectionIcons[collection.id] || <FaHome size={40} />}
            </div>
            <h3 className="collection-name">
              {userLang === "es" ? collection.nameEs : collection.nameEn}
            </h3>
            <button className="collection-btn">
              {t.home.viewCollection}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
