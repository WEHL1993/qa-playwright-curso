import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { capturar } from '../helpers/evidencia';

// { tag: '@smoke' } habilita: npx playwright test --grep "@smoke"
test.describe('Smoke Tests - Sauce Demo', () => {

  test('La pagina de login carga', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('#login-button')).toBeVisible();
    await capturar(page, testInfo, 'clase10-01-smoke-login-carga');
  });

  test('Login con usuario estandar funciona', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
    await capturar(page, testInfo, 'clase10-02-smoke-login-estandar');
  });

  test('El inventario muestra productos', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    await capturar(page, testInfo, 'clase10-03-smoke-inventario-productos');
  });

  test('El carrito es accesible', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    await capturar(page, testInfo, 'clase10-04-smoke-carrito-accesible');
  });

  test('El checkout inicia correctamente', { tag: '@smoke' }, async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    await capturar(page, testInfo, 'clase10-05-smoke-checkout-inicia');
  });

});
