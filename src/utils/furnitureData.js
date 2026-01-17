// Ejemplo de cómo agregar muebles individuales a las subcategorías
// Este archivo muestra la estructura de datos para los muebles

// Ejemplo de estructura de un mueble individual:
export const exampleFurnitureItem = {
  name: "King Bed Model 2024",
  characteristics: [
    "Material: Solid Wood",
    "Size: King (76\" x 80\")",
    "Color: Dark Brown",
    "Style: Modern",
    "Includes: Headboard, Frame"
  ],
  images: [
    "/images/furniture/king-bed-1.jpg",
    "/images/furniture/king-bed-2.jpg",
    "/images/furniture/king-bed-3.jpg"
  ]
};

// Función helper para agregar muebles a una subcategoría
export const addFurnitureToSubcategory = (collectionId, subcategoryId, furnitureItem) => {
  // Esta función se puede usar para agregar muebles dinámicamente
  // Por ahora, los muebles se agregan directamente en translations.js
  console.log(`Adding furniture to ${collectionId}/${subcategoryId}:`, furnitureItem);
};

// Ejemplo de cómo se vería un mueble completo en la estructura:
/*
{
  name: "King Bed Model 2024",
  characteristics: [
    "Material: Solid Wood",
    "Size: King (76\" x 80\")",
    "Color: Dark Brown",
    "Style: Modern",
    "Includes: Headboard, Frame"
  ],
  images: [
    "/images/furniture/king-bed-1.jpg",  // Primera foto
    "/images/furniture/king-bed-2.jpg",  // Segunda foto
    "/images/furniture/king-bed-3.jpg"   // Tercera foto
  ]
}
*/
