# DevWeb Studio

Sitio web de **DevWeb Studio**: desarrollo web (páginas, tiendas, sistemas a medida e integraciones API) y **mantenimiento de computadores**. Los botones de cotización abren WhatsApp con un mensaje ya preparado.

## Ver el sitio
Abre `index.html` con doble clic. No requiere instalar nada.

## Configurar tu WhatsApp
En `site.js` cambia `WHATSAPP_NUMBER` (código de país + número, sin `+` ni espacios; ej. `573001234567`).

## Publicar gratis con GitHub Pages
1. Sube el repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. En 1–2 minutos tendrás el enlace `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Estructura
- `index.html` + `site.js`: sitio listo para publicar (sin dependencias).
- `src/styles.css`: estilos responsive.
- `public/resources/`: logo.
- `src/main.ts`, `backend/`: código original con AppDeploy (contador global y panel admin). No se usa en la versión de GitHub Pages; el contador de visitas aquí es solo local.
- `tests/tests.json`: escenarios de prueba.
