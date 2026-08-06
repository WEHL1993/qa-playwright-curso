import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Verifica si existe el directorio de evidencias y, si no está, lo genera
test.beforeAll(() => {
  if (!fs.existsSync('./evidencias/clase01')) {
    fs.mkdirSync('./evidencias/clase01', { recursive: true });
  }
});

test('La página carga', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/STORE/);
  await expect(page.locator('#navbarExample')).toBeVisible();

  await page.screenshot({
    path: './evidencias/clase01/clase01-01-pagina-carga.png',
    fullPage: true
  });
});

test('El menú de categorías es visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#cat')).toBeVisible();

  await page.screenshot({
    path: './evidencias/clase01/clase01-02-menu-categorias.png',
    fullPage: true
  });
});

test('La barra de navegación tiene los enlaces', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('#navbarExample');
  await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();

  await page.screenshot({
    path: './evidencias/clase01/clase01-03-barra-navegacion.png',
    fullPage: true
  });
});
