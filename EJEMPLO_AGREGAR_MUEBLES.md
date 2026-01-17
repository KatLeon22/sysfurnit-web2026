# Cómo Agregar Muebles Individuales a las Subcategorías

## Estructura de un Mueble Individual

Cada mueble debe tener la siguiente estructura:

```javascript
{
  name: "Nombre del Mueble",
  characteristics: [
    "Característica 1",
    "Característica 2",
    "Característica 3",
    // ... más características
  ],
  images: [
    "/ruta/a/imagen1.jpg",  // Primera foto
    "/ruta/a/imagen2.jpg",  // Segunda foto
    "/ruta/a/imagen3.jpg"   // Tercera foto
  ]
}
```

## Ejemplo: Agregar Muebles a "King Beds"

En el archivo `src/utils/translations.js`, busca la subcategoría "king-beds" y agrega muebles así:

```javascript
{
  id: "king-beds",
  nameEs: "King Beds",
  nameEn: "King Beds",
  items: [
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
        "/images/furniture/king-bed-1.jpg",
        "/images/furniture/king-bed-2.jpg",
        "/images/furniture/king-bed-3.jpg"
      ]
    },
    {
      name: "King Bed Classic Edition",
      characteristics: [
        "Material: Oak Wood",
        "Size: King (76\" x 80\")",
        "Color: Natural Oak",
        "Style: Classic"
      ],
      images: [
        "/images/furniture/king-classic-1.jpg",
        "/images/furniture/king-classic-2.jpg",
        "/images/furniture/king-classic-3.jpg"
      ]
    }
    // ... más muebles
  ]
}
```

## Notas Importantes

1. **Imágenes**: Coloca las imágenes en la carpeta `public/images/furniture/` y usa rutas que empiecen con `/images/`
2. **Características**: Puedes agregar tantas características como necesites
3. **Fotos**: Cada mueble debe tener exactamente 3 fotos (se mostrarán como miniatura y se podrá cambiar entre ellas)
4. **WhatsApp**: El botón de WhatsApp se genera automáticamente con el nombre del mueble

## Estructura de Carpetas Recomendada

```
public/
  images/
    furniture/
      king-bed-1.jpg
      king-bed-2.jpg
      king-bed-3.jpg
      queen-bed-1.jpg
      ...
```
