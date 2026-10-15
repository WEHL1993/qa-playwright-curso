# Bug Report - BR-CLASE11-001

**Título:** Página /broken-images: dos de las tres imágenes (asdf.jpg y hjkl.jpg) no cargan y responden 404
**Fecha:** 2026-10-14
**Reportado por:** Wilson Eduardo Hernández López
**Ambiente:** Windows 11, Chromium / Firefox (Playwright), https://practice.expandtesting.com
**Issue:** https://github.com/WEHL1993/qa-playwright-curso/issues/1

## Descripción

La página de práctica `/broken-images` muestra tres imágenes. Dos de ellas apuntan a rutas relativas inexistentes (`asdf.jpg` y `hjkl.jpg`) y el servidor responde `404`, por lo que el navegador las muestra rotas (`naturalWidth = 0`). Solo la tercera (`/img/avatar-blank.jpg`) carga.

## Severidad: Baja

Es un problema visual: las imágenes rotas no impiden usar ninguna función ni hay pérdida de datos.

## Prioridad: P4

Es una página de práctica sin impacto en clientes ni en una salida a producción; va al backlog.

## Frecuencia: Siempre

Se reproduce en cada carga y en todos los navegadores probados.

## Pasos para reproducir

1. Abrir https://practice.expandtesting.com/broken-images
2. Esperar a que termine de cargar la página.
3. Revisar las tres imágenes del contenido principal (`main img`).
4. Abrir `https://practice.expandtesting.com/img/asdf.jpg` y `.../img/hjkl.jpg`.

## Resultado esperado

Las tres imágenes se cargan correctamente (`naturalWidth > 0`) y ninguna petición responde 404.

## Resultado obtenido

`asdf.jpg` y `hjkl.jpg` responden 404 y se muestran rotas (`naturalWidth = 0`). El test falla con `Expected: > 0, Received: 0`.

## Evidencia

- Test automatizado: `tests/clase11.spec.ts` › "Imágenes rotas: todas las imágenes de la página deben cargar" (`@bug`, marcado con `test.fail()`).
- Captura, video y traza en el reporte HTML (`npx playwright show-report`); la pestaña Network de la traza muestra los 404.

## Notas adicionales

- Mientras el defecto siga abierto el test usa `test.fail()`: la suite queda en verde y se pondrá en rojo el día que se corrija, señal para verificar y cerrar el Issue.
- Riesgo de dejar un defecto conocido en verde: olvidarlo; por eso lleva la anotación `bug` y este reporte.
