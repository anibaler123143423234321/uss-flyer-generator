# Generador Oficial de Flyers de Bienvenida - USS Centro de Informática

Herramienta web interactiva y ligera para generar, personalizar y exportar flyers oficiales de bienvenida para los cursos del Centro de Informática de la Universidad Señor de Sipán (USS).

## 🚀 Características

- **Diseño Oficial USS**: Paleta de colores institucional (`#004e35` Verde, `#11acd3` Celeste, `#56208f` Morado).
- **Personalización en Tiempo Real**:
  - Foto del docente (por archivo local o URL web directa) con controles de Zoom y Posición Y.
  - Nombre del docente integrado en la cinta inferior de la foto.
  - Nombre del curso, código PEAD (`PEAD - [x]`) y duración en semanas.
  - Tabla completa con horario, modalidad, turno, grupo y fecha de inicio.
- **Exportación en Alta Definición**: Descarga con un solo clic en formato PNG (escala 2.5x HD) optimizada para WhatsApp, correo o impresión.
- **Auto-Ajuste Responsivo**: Toda la interfaz se adapta al 100% de la pantalla sin scroll vertical.
- **100% Autónomo**: Archivo único desplegable en Vercel, Netlify o GitHub Pages sin dependencias de backend.

## 🛠️ Tecnologías

- HTML5 Semántico
- CSS3 Vanilla (Diseño modular con variables CSS y Flexbox/Grid)
- JavaScript Vanilla
- [html2canvas](https://html2canvas.hertzen.com/) para renderizado HD
- Google Fonts (`Montserrat`, `Poppins`, `Caveat`)

## 📦 Despliegue en Vercel

Este proyecto está listo para desplegar en [Vercel](https://vercel.com/):
1. Sube este repositorio a tu cuenta de GitHub.
2. Ingresa a Vercel e importa el repositorio.
3. Haz clic en **Deploy** (no requiere configuración de build ni comandos especiales).
