# Laboratorio 01 — Fundamentos de Calidad + Setup de Playwright

**Curso:** 048 — Aseguramiento de la Calidad del Software
**Universidad:** Universidad Mariano Gálvez de Guatemala
**Nombre:** Wilson Eduardo Hernández López
**Carné:** 1790-22-7315
**Versión de Node.js:** v22.22.0

## Descripción

Proyecto de automatización de pruebas configurado con Playwright + TypeScript, aplicado sobre la tienda demo [demoblaze.com](https://www.demoblaze.com). Incluye 3 tests que verifican:

1. Que la página principal carga correctamente (título y barra de navegación).
2. Que el menú de categorías es visible.
3. Que la barra de navegación contiene los enlaces esperados.

## Cómo ejecutar los tests

```bash
npm install
npx playwright install
npx playwright test
```

## Resultado de la ejecución
![Tests desde terminal](screenshots/tests-terminal.png)

![Tests pasando](screenshots/tests-pasando.png)