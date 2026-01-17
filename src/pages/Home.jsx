import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { translations, collections, getCollectionById } from "../utils/translations";
import bedronImage from "../assets/Bedron.jpg";
import mesaImage from "../assets/mesa.jpg";
import mesa2Image from "../assets/mesa2.jpg";
import sillonImage from "../assets/sillon.jpg";
import sillon1Image from "../assets/sillon1.jpg";
import cama3Image from "../assets/cama3.jpg";
import { FaBed, FaCouch, FaUtensils, FaChild, FaHome, FaChair, FaStar, FaBriefcase, FaLightbulb, FaTv, FaTable } from "react-icons/fa";
import Carousel from "../components/Carousel";

const Home = ({ userLang }) => {
  const navigate = useNavigate();
  const t = translations[userLang];

  // Mapeo de iconos igual que en Collections
  const collectionIcons = {
    "new-arrivals": <FaStar size={50} />,
    bedroom: <FaBed size={50} />,
    dining: <FaUtensils size={50} />,
    youth: <FaChild size={50} />,
    seating: <FaChair size={50} />,
    occasional: <FaCouch size={50} />,
    office: <FaBriefcase size={50} />,
    accent: <FaTable size={50} />,
    media: <FaTv size={50} />,
    lighting: <FaLightbulb size={50} />,
    mattress: <FaBed size={50} />,
  };

  // Mostrar solo las primeras 6 colecciones en el home
  const mainCollections = collections.slice(0, 6);

  const handleCollectionClick = (collectionId) => {
    const collection = getCollectionById(collectionId);
    
    // Si tiene subcategorías, navegar a la página de subcategorías
    if (collection && collection.subcategories && collection.subcategories.length > 0) {
      navigate(`/collection/${collectionId}`);
    } else {
      // Si no tiene subcategorías, navegar a la página de colecciones
      navigate("/collections");
    }
  };

  // Imágenes para el carrusel (primeras 3)
  const carouselImages = [
    {
      src: bedronImage,
      alt: userLang === "es" ? "Colección de Dormitorio" : "Bedroom Collection"
    },
    {
      src: mesaImage,
      alt: userLang === "es" ? "Mesa" : "Table"
    },
    {
      src: mesa2Image,
      alt: userLang === "es" ? "Mesa 2" : "Table 2"
    }
  ];

  return (
    <section className="home-section">
      {/* Bienvenida */}
      <div className="welcome-modern">
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>
      </div>

      {/* Carrusel de imágenes */}
      <Carousel images={carouselImages} autoPlayInterval={5000} />

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
              onClick={() => handleCollectionClick(collection.id)}
            >
              <div className="thumbnail-icon">
                {collectionIcons[collection.id] || <FaHome size={50} />}
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
