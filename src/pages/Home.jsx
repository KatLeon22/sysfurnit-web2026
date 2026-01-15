import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { translations } from "../utils/translations";
import bedronImage from "../assets/Bedron.jpg";
import mesaImage from "../assets/mesa.jpg";
import mesa2Image from "../assets/mesa2.jpg";
import sillonImage from "../assets/sillon.jpg";
import sillon1Image from "../assets/sillon1.jpg";
import cama3Image from "../assets/cama3.jpg";
import { FaBed, FaCouch, FaUtensils, FaChild, FaHome, FaChair } from "react-icons/fa";

const Home = ({ userLang }) => {
  const navigate = useNavigate();
  const t = translations[userLang];

  const handleViewCatalog = () => {
    navigate("/collections");
  };

  // Mapeo de iconos igual que en Collections
  const collectionIcons = {
    bedroom: <FaBed size={50} />,
    supplement: <FaCouch size={50} />,
    dining: <FaUtensils size={50} />,
    "seating-stationary": <FaChair size={50} />,
    "dining-room": <FaUtensils size={50} />,
    "motion-seating": <FaCouch size={50} />,
    youth: <FaChild size={50} />,
    home: <FaHome size={50} />,
    occasional: <FaCouch size={50} />,
    mattress: <FaBed size={50} />,
  };

  // Colecciones principales con iconos
  const mainCollections = [
    {
      id: "bedroom",
      nameEs: "Camas",
      nameEn: "Beds",
      collectionId: "bedroom"
    },
    {
      id: "closets",
      nameEs: "Closets",
      nameEn: "Closets",
      collectionId: "supplement"
    },
    {
      id: "salas",
      nameEs: "Salas",
      nameEn: "Living Rooms",
      collectionId: "motion-seating"
    },
    {
      id: "comedores",
      nameEs: "Comedores",
      nameEn: "Dining Rooms",
      collectionId: "dining"
    },
    {
      id: "cocinas",
      nameEs: "Cocinas",
      nameEn: "Kitchens",
      collectionId: "home"
    },
    {
      id: "infantil",
      nameEs: "Infantil y Juvenil",
      nameEn: "Kids & Youth",
      collectionId: "youth"
    }
  ];

  const handleCollectionClick = (collectionId) => {
    navigate(`/catalog/${collectionId}`);
  };

  return (
    <section className="home-section">
      {/* Bienvenida */}
      <div className="welcome-modern">
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>
      </div>

      {/* Grid de imágenes (3 por fila) */}
      <div className="home-images-grid">
        <div className="grid-image-container">
          <img 
            src={bedronImage} 
            alt={userLang === "es" ? "Colección de Dormitorio" : "Bedroom Collection"} 
            className="grid-image"
          />
        </div>
        <div className="grid-image-container">
          <img 
            src={mesaImage} 
            alt={userLang === "es" ? "Mesa" : "Table"} 
            className="grid-image"
          />
        </div>
        <div className="grid-image-container">
          <img 
            src={mesa2Image} 
            alt={userLang === "es" ? "Mesa 2" : "Table 2"} 
            className="grid-image"
          />
        </div>
      </div>

      {/* Sección de colecciones con iconos horizontales */}
      <div className="collections-thumbnails">
        <h2 className="thumbnails-title">
          {userLang === "es" ? "Nuestras Colecciones" : "Our Collections"}
        </h2>
        <div className="thumbnails-container">
          {mainCollections.map((collection) => (
            <div
              key={collection.id}
              className="thumbnail-card"
              onClick={() => handleCollectionClick(collection.collectionId)}
            >
              <div className="thumbnail-icon">
                {collectionIcons[collection.collectionId] || <FaHome size={50} />}
              </div>
              <span className="thumbnail-name">
                {userLang === "es" ? collection.nameEs : collection.nameEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de imágenes adicionales - Sillones y Cama */}
      <div className="home-images-grid">
        <div className="grid-image-container">
          <img 
            src={sillonImage} 
            alt={userLang === "es" ? "Sillón" : "Sofa"} 
            className="grid-image"
          />
        </div>
        <div className="grid-image-container">
          <img 
            src={sillon1Image} 
            alt={userLang === "es" ? "Sillón 1" : "Sofa 1"} 
            className="grid-image"
          />
        </div>
        <div className="grid-image-container">
          <img 
            src={cama3Image} 
            alt={userLang === "es" ? "Cama 3" : "Bed 3"} 
            className="grid-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
