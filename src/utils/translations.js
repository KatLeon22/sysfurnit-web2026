// Sistema de traducciones centralizado para la mueblería
export const translations = {
  es: {
    // Navegación
    nav: {
      home: "Inicio",
      collections: "Colecciones",
      contact: "Contacto",
    },
    // Home
    home: {
      title: "Bienvenidos a nuestra Mueblería",
      subtitle: "Descubre nuestras exclusivas colecciones de muebles",
      viewCollection: "Ver Catálogo",
    },
    // Colecciones
    collections: {
      bedroom: "Bedroom Collection",
      supplement: "Supplement",
      dining: "Dining Collection",
      seatingStationary: "Seating – Stationary Collection",
      diningRoom: "Dining Room",
      motionSeating: "Motion Seating",
      youth: "Youth",
      home: "Home",
      occasional: "Occasional",
      mattress: "Mattress",
    },
    // Catálogo
    catalog: {
      title: "Catálogo",
      download: "Descargar PDF",
      backToCollections: "Volver a Colecciones",
      interested: "Me interesa esta colección",
    },
    // Footer
    footer: {
      rights: "Todos los derechos reservados.",
      contact: "Contacto",
    },
    // WhatsApp
    whatsapp: {
      message: "Hola, me interesa la",
    },
  },
  en: {
    // Navegación
    nav: {
      home: "Home",
      collections: "Collections",
      contact: "Contact",
    },
    // Home
    home: {
      title: "Welcome to our Furniture Store",
      subtitle: "Discover our exclusive furniture collections",
      viewCollection: "View Catalog",
    },
    // Colecciones
    collections: {
      bedroom: "Bedroom Collection",
      supplement: "Supplement",
      dining: "Dining Collection",
      seatingStationary: "Seating – Stationary Collection",
      diningRoom: "Dining Room",
      motionSeating: "Motion Seating",
      youth: "Youth",
      home: "Home",
      occasional: "Occasional",
      mattress: "Mattress",
    },
    // Catálogo
    catalog: {
      title: "Catalog",
      download: "Download PDF",
      backToCollections: "Back to Collections",
      interested: "I'm interested in this collection",
    },
    // Footer
    footer: {
      rights: "All rights reserved.",
      contact: "Contact",
    },
    // WhatsApp
    whatsapp: {
      message: "Hello, I'm interested in the",
    },
  },
};

// Configuración de colecciones
export const collections = [
  {
    id: "bedroom",
    nameEs: "Bedroom Collection",
    nameEn: "Bedroom Collection"
  },
  {
    id: "supplement",
    nameEs: "Supplement",
    nameEn: "Supplement"
  },
  {
    id: "dining",
    nameEs: "Dining Collection",
    nameEn: "Dining Collection"
  },
  {
    id: "seating-stationary",
    nameEs: "Seating – Stationary Collection",
    nameEn: "Seating – Stationary Collection"
  },
  {
    id: "dining-room",
    nameEs: "Dining Room",
    nameEn: "Dining Room"
  },
  {
    id: "motion-seating",
    nameEs: "Motion Seating",
    nameEn: "Motion Seating"
  },
  {
    id: "youth",
    nameEs: "Youth",
    nameEn: "Youth"
  },
  {
    id: "home",
    nameEs: "Home",
    nameEn: "Home"
  },
  {
    id: "occasional",
    nameEs: "Occasional",
    nameEn: "Occasional"
  },
  {
    id: "mattress",
    nameEs: "Mattress",
    nameEn: "Mattress"
  },
];


// Función helper para obtener una colección por ID
export const getCollectionById = (collectionId) => {
  return collections.find(col => col.id === collectionId);
};

// Función helper para obtener una subcategoría por ID
export const getSubcategoryById = (collectionId, subcategoryId) => {
  const collection = getCollectionById(collectionId);
  if (!collection || !collection.subcategories) return null;
  return collection.subcategories.find(sub => sub.id === subcategoryId);
};

