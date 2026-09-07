# Imágenes de la web

Sube aquí tus fotos con **exactamente estos nombres**. La web las detecta sola:
si un archivo no existe, su hueco desaparece sin romper nada (la cabecera se
queda con el fondo crema y la galería entera se oculta si no hay ninguna foto).

## Archivos que usa la web

| Archivo | Dónde aparece | Tamaño recomendado |
|---|---|---|
| `portada.jpg` | Fondo de la cabecera, detrás de "Antonio & Noémie" | 2000 × 1300 px, horizontal |
| `galeria-1.jpg` … `galeria-6.jpg` | Rejilla de la sección "Nuestra historia en fotos" | 1200 × 1200 px, cuadradas |

Las fotos de la galería se recortan a cuadrado desde el centro (`object-fit:
cover`), así que conviene que la cara o el motivo principal esté centrado.

## Consejos

- **Peso**: mantén cada archivo por debajo de ~400 KB. Una foto de móvil sin
  comprimir pesa 4-8 MB y hace que la web tarde en cargar en 4G.
  Para comprimir: [squoosh.app](https://squoosh.app) (calidad JPEG 75-80).
- **Formato**: `.jpg` para fotos. Si prefieres `.webp` o `.png`, cambia la
  extensión en las constantes `FOTO_PORTADA` y `FOTOS_GALERIA` que están al
  principio del `<script>` de `boda_antonio_noemie.html`.
- **Portada**: elige una foto donde el centro tenga espacio libre; encima va el
  nombre y la fecha, sobre un velo oscuro que garantiza la legibilidad.
- **Más o menos fotos**: añade o quita entradas en el array `FOTOS_GALERIA`.
  No hace falta que sean 6.
- **Orientación**: si una foto sale girada, es por los metadatos EXIF del móvil.
  Ábrela y vuelve a guardarla (o rótala) antes de subirla.

## Cómo añadirlas desde GitHub

En la carpeta `img/` → **Add file → Upload files** → arrastra las fotos con el
nombre correcto → **Commit changes**.
