import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/subcategories.css";
import { getCollectionById } from "../utils/translations";
import { FaChevronLeft } from "react-icons/fa";

const Subcategories = ({ userLang }) => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const collection = getCollectionById(collectionId);

  if (!collection || !collection.subcategories || collection.subcategories.length === 0) {
    return (
      <section className="subcategories-section">
        <div className="error-message">
          <h2>{userLang === "es" ? "Colección no encontrada" : "Collection not found"}</h2>
          <button onClick={() => navigate("/collections")} className="back-btn">
            {userLang === "es" ? "Volver a Colecciones" : "Back to Collections"}
          </button>
        </div>
      </section>
    );
  }

  const collectionName = userLang === "es" ? collection.nameEs : collection.nameEn;

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/collection/${collectionId}/${subcategoryId}`);
  };

  return (
    <section className="subcategories-section">
      <div className="subcategories-header">
        <button onClick={() => navigate("/collections")} className="back-btn">
          <FaChevronLeft /> {userLang === "es" ? "Volver a Colecciones" : "Back to Collections"}
        </button>
        <h1>{collectionName}</h1>
        <p>{userLang === "es" ? "Selecciona una categoría para ver los muebles" : "Select a category to view furniture"}</p>
      </div>

      <div className="subcategories-grid">
        {collection.subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="subcategory-card"
            onClick={() => handleSubcategoryClick(subcategory.id)}
          >
            <h3 className="subcategory-name">
              {userLang === "es" ? subcategory.nameEs : subcategory.nameEn}
            </h3>
            <button className="subcategory-btn">
              {userLang === "es" ? "Ver Muebles" : "View Furniture"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subcategories;
