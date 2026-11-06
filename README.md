# DevWeb Studio

Código fuente recuperado del snapshot de AppDeploy (versión 1793929566337).

## Estructura
- `src/main.ts`: interfaz (servicios web, mantenimiento de computadores, proceso, FAQ, contacto) y panel administrativo.
- `src/styles.css`: estilos responsive.
- `backend/`: endpoints de visitas, estadísticas y suscripciones realtime.
- `public/resources/`: recursos gráficos.
- `tests/tests.json`: escenarios de prueba.

## Ejecución
El proyecto original utiliza servicios de AppDeploy (`@appdeploy/client` y `@appdeploy/sdk`) para autenticación, API, base de datos y tiempo real. Esos servicios no se sustituyen automáticamente por Vite. Para ejecutar localmente o migrar a otro hosting, hay que configurar el SDK y adaptar el backend, además de instalar las dependencias compatibles.

Comandos habituales:
```bash
npm install
npm run dev
npm run build
```

## Logo
El snapshot identifica el recurso `public/resources/devweb-studio-logo.png`, pero AppDeploy solo expuso su ruta, no los bytes de la imagen. Coloca aquí el archivo original del logo para conservar la identidad visual.

## Vista rápida (sin instalar nada)
Abre `abrir-sitio.html` con doble clic. Usa `site.js` y un contador local; el panel admin y el contador global requieren el backend de AppDeploy.
