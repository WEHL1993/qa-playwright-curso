// tests/tarea07.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Tarea 07 - Tests reto: evidencias avanzadas', () => {

  test('Reto 1 - test.step(): flujo de login documentado por pasos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Navegar a la página de login', async () => {
      await loginPage.navigate();
      await expect(loginPage.usernameInput).toBeVisible();
    });

    await test.step('Login con usuario válido', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verificar acceso al inventario', async () => {
      await inventoryPage.expectToBeOnInventoryPage();
      await page.screenshot({
        path: './evidencias/clase07/tarea07-reto1-test-step.png',
        fullPage: true,
      });
    });
  });

  test('Reto 2 - testInfo.attach(): adjuntar datos capturados al reporte', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();

    const cantidadProductos = await inventoryPage.getProductCount();
    const url = page.url();
    const fecha = new Date().toISOString();

    await page.screenshot({
      path: './evidencias/clase07/tarea07-reto2-testinfo-attach.png',
      fullPage: true,
    });

    const datosCapturados =
      `Cantidad de productos: ${cantidadProductos}\n` +
      `URL: ${url}\n` +
      `Fecha: ${fecha}\n`;

    await testInfo.attach('datos-capturados-inventario.txt', {
      body: datosCapturados,
      contentType: 'text/plain',
    });

    expect(cantidadProductos).toBe(6);
  });

  test('Reto 3 - toHaveScreenshot(): comparación visual contra baseline', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();

    await page.screenshot({
      path: './evidencias/clase07/tarea07-reto3-tohavescreenshot.png',
      fullPage: true,
    });

    // La primera corrida genera el baseline en tests/tarea07.spec.ts-snapshots/
    await expect(page).toHaveScreenshot('tarea07-reto3-inventario-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });

});
