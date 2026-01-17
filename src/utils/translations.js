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

// Configuración de colecciones con subcategorías y muebles
export const collections = [
  {
    id: "new-arrivals",
    nameEs: "New Arrivals",
    nameEn: "New Arrivals",
    subcategories: [
      {
        id: "youth-nora-collection",
        nameEs: "Youth-Nora Collection",
        nameEn: "Youth-Nora Collection",
        items: [
          {
            name: "B2083BUBC Youth-Nora Collection",
            characteristics: [
              {
                nameEs: "Modelo: B2083BUBC",
                nameEn: "Model: B2083BUBC"
              },
              {
                nameEs: "Colección: Youth-Nora",
                nameEn: "Collection: Youth-Nora"
              },
              {
                nameEs: "Diseño moderno y elegante",
                nameEn: "Modern and elegant design"
              }
            ],
            images: [
              "/catalogs/New Arrivals/B2083BUBC Youth-Nora Collection/1.jpeg",
              "/catalogs/New Arrivals/B2083BUBC Youth-Nora Collection/2.jpeg",
              "/catalogs/New Arrivals/B2083BUBC Youth-Nora Collection/2.jpeg" // Segunda imagen como tercera
            ]
          }
        ]
      }
    ]
  },
  {
    id: "bedroom",
    nameEs: "Bedroom",
    nameEn: "Bedroom",
    subcategories: [
      {
        id: "headboards",
        nameEs: "Headboards",
        nameEn: "Headboards",
        items: [] // Se llenará con muebles individuales
      },
      {
        id: "king-beds",
        nameEs: "King Beds",
        nameEn: "King Beds",
        items: []
      },
      {
        id: "queen-beds",
        nameEs: "Queen Beds",
        nameEn: "Queen Beds",
        items: []
      },
      {
        id: "full-beds",
        nameEs: "Full Beds",
        nameEn: "Full Beds",
        items: []
      },
      {
        id: "twin-beds",
        nameEs: "Twin Beds",
        nameEn: "Twin Beds",
        items: []
      },
      {
        id: "dressers",
        nameEs: "Dressers",
        nameEn: "Dressers",
        items: []
      },
      {
        id: "dressers-mirrors",
        nameEs: "Dressers Mirrors",
        nameEn: "Dressers Mirrors",
        items: []
      },
      {
        id: "night-stands",
        nameEs: "Night Stands",
        nameEn: "Night Stands",
        items: []
      },
      {
        id: "chests",
        nameEs: "Chests",
        nameEn: "Chests",
        items: []
      },
      {
        id: "media-chests",
        nameEs: "Media Chests",
        nameEn: "Media Chests",
        items: []
      },
      {
        id: "vanity-dressers-mirrors",
        nameEs: "Vanity Dressers & Mirrors",
        nameEn: "Vanity Dressers & Mirrors",
        items: []
      },
      {
        id: "stools-benches",
        nameEs: "Stools & Benches",
        nameEn: "Stools & Benches",
        items: []
      },
      {
        id: "browse-all-bedroom",
        nameEs: "Browse All Bedroom",
        nameEn: "Browse All Bedroom",
        items: []
      }
    ]
  },
  {
    id: "supplement",
    nameEs: "Supplement",
    nameEn: "Supplement",
    subcategories: []
  },
  {
    id: "dining",
    nameEs: "Dining",
    nameEn: "Dining",
    subcategories: []
  },
  {
    id: "seating",
    nameEs: "Seating",
    nameEn: "Seating",
    subcategories: []
  },
  {
    id: "dining-room",
    nameEs: "Dining Room",
    nameEn: "Dining Room",
    subcategories: []
  },
  {
    id: "motion-seating",
    nameEs: "Motion Seating",
    nameEn: "Motion Seating",
    subcategories: []
  },
  {
    id: "youth",
    nameEs: "Youth",
    nameEn: "Youth",
    subcategories: []
  },
  {
    id: "home",
    nameEs: "Home",
    nameEn: "Home",
    subcategories: []
  },
  {
    id: "occasional",
    nameEs: "Occasional",
    nameEn: "Occasional",
    subcategories: []
  },
  {
    id: "office",
    nameEs: "Office",
    nameEn: "Office",
    subcategories: []
  },
  {
    id: "accent",
    nameEs: "Accent",
    nameEn: "Accent",
    subcategories: []
  },
  {
    id: "media",
    nameEs: "Media",
    nameEn: "Media",
    subcategories: []
  },
  {
    id: "lighting",
    nameEs: "Lighting",
    nameEn: "Lighting",
    subcategories: []
  },
  {
    id: "mattress",
    nameEs: "Mattress",
    nameEn: "Mattress",
    subcategories: []
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
