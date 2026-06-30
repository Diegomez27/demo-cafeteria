# ☕ Café Raíces — Landing de Cafetería

Demo de **presencia web** del [portafolio de Diego Gómez](https://github.com/Diegomez27/portfolio-web).
Landing page de una cafetería de especialidad ficticia, mobile-first, con identidad visual propia
y sin dependencias de UI.

> Parte del catálogo de demos del portafolio. El objetivo es mostrar capacidad de diseño y
> frontend moderno: cada demo se ve y se siente como un producto terminado, no como un ejercicio.

🔗 **Demo en vivo:** _(pendiente de deploy en Vercel)_

---

## Qué demuestra

- Diseño **mobile-first** con identidad visual cálida y artesanal, distinta al portafolio principal.
- **Angular moderno**: standalone components, Signals y control flow (`@if` / `@for`).
- CSS propio con **variables de tema**, sin librerías de UI (Angular Material, PrimeNG, etc.).
- Interacciones sin recargar: **menú filtrable por categoría** y formulario con validación reactiva.
- Animaciones de entrada con una **directiva `appReveal`** propia (IntersectionObserver).

---

## Secciones

| Sección | Descripción |
|---|---|
| **Hero** | Imagen de fondo a pantalla completa y headline de impacto. |
| **Menú** | Lista tipo restaurante con filtros por categoría (datos desde JSON local). |
| **Nosotros** | Historia del lugar con estadísticas. |
| **Galería** | Grid CSS con tamaños variados (sin librería). |
| **Reservación** | Formulario solo-frontend con validación y estado de éxito. |
| **Footer** | Ubicación, horarios y redes. |

---
## Stack

- **Framework:** Angular 21 (standalone + Signals)
- **Lenguaje:** TypeScript
- **Estilos:** SCSS con variables CSS personalizadas
- **Tipografía:** Young Serif (títulos) · Figtree (cuerpo) — Google Fonts
- **Imágenes:** Unsplash
- **Datos:** JSON local (sin backend)
- **Deploy:** Vercel

---

## Desarrollo local

```bash
npm install
npm start
```

Abrir `http://localhost:4200/`.

### Build de producción

```bash
npm run build
```

Genera los artefactos en `dist/demo-cafe/browser/`.

---

## ▲ Deploy en Vercel

El repositorio incluye [`vercel.json`](./vercel.json) con la configuración lista:

- **Framework:** Angular
- **Build command:** `npm run build`
- **Output directory:** `dist/demo-cafe/browser`
- **Rewrites:** todas las rutas a `index.html` (SPA)

Para desplegar, importar el proyecto en Vercel apuntando el **Root Directory** a esta carpeta
(`Demos/landings/demo-cafe`). Vercel detecta el `vercel.json` automáticamente; no requiere
variables de entorno.

---
