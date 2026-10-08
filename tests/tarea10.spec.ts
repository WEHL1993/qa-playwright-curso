// tests/tarea10.spec.ts
import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';
import { capturar } from '../helpers/evidencia';

// ======= RETO 1: Tags múltiples + --grep-invert =======
// Un test puede llevar varios tags en un arreglo. Con --grep se INCLUYE por tag;
// con --grep-invert se EXCLUYE. Combinados permiten, por ejemplo, correr toda la
// regresión salvo los tests de UI:
//   npx playwright test tests/tarea10.spec.ts --grep "@regression" --grep-invert "@ui"
test.describe('Tarea 10 - Reto 1: Tags múltiples + --grep-invert', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('El título del inventario es visible (@regression @ui)',
    { tag: ['@regression', '@ui'] }, async ({ page }, testInfo) => {
    await expect(page.locator('.title')).toHaveText('Products');
    await capturar(page, testInfo, 'tarea10-reto1-regression-ui');
  });

  test('El inventario tiene 6 productos (@regression @funcional)',
    { tag: ['@regression', '@funcional'] }, async ({ page }, testInfo) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await capturar(page, testInfo, 'tarea10-reto1-regression-funcional');
  });

  test('El carrito inicia sin badge (@smoke @funcional)',
    { tag: ['@smoke', '@funcional'] }, async ({ page }, testInfo) => {
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await capturar(page, testInfo, 'tarea10-reto1-smoke-funcional-sin-badge');
  });
});

// ======= RETO 2: expect.soft() + testInfo.errors =======
// expect.soft() no detiene el test en el primer fallo: acumula los errores en
// testInfo.errors y el test se marca como fallido al terminar.
test.describe('Tarea 10 - Reto 2: expect.soft()', () => {
  test('Producto con todos sus atributos correctos (0 errores)', async ({ page }, testInfo) => {
    await loginAs(page, 'standard_user');
    const producto = page.locator('.inventory_item').first();

    expect.soft(await producto.locator('.inventory_item_name').textContent()).toBe('Sauce Labs Backpack');
    expect.soft(await producto.locator('.inventory_item_price').textContent()).toBe('$29.99');
    await expect.soft(producto.locator('.inventory_item_img img')).toBeVisible();
    await expect.soft(producto.locator('.btn_inventory')).toHaveText('Add to cart');

    console.log(`Errores acumulados: ${testInfo.errors.length}`);
    expect(testInfo.errors).toHaveLength(0);
    await capturar(page, testInfo, 'tarea10-reto2-soft-sin-errores');
  });

  // Se marca test.fail() porque a propósito se esperan 3 valores incorrectos:
  // los 3 se reportan juntos en vez de detenerse en el primero.
  test('Valores incorrectos a propósito: se reportan todos juntos', async ({ page }, testInfo) => {
    test.fail();
    await loginAs(page, 'standard_user');
    const producto = page.locator('.inventory_item').first();

    expect.soft(await producto.locator('.inventory_item_name').textContent()).toBe('Nombre incorrecto');
    expect.soft(await producto.locator('.inventory_item_price').textContent()).toBe('$0.00');
    await expect.soft(producto.locator('.btn_inventory')).toHaveText('Remove');

    const total = testInfo.errors.length;
    console.log(`Errores acumulados por expect.soft: ${total}`);
    await testInfo.attach('errores-soft', {
      body: `Total de errores acumulados: ${total}`,
      contentType: 'text/plain',
    });
    await capturar(page, testInfo, 'tarea10-reto2-soft-3-errores');
  });
});

// ======= RETO 3: fixture browserName =======
// En vez de test.skip() para todo un motor, se ajusta la aserción según el motor
// real. El User-Agent identifica el motor: Chrome también incluye "Safari" y
// "AppleWebKit", así que WebKit se distingue por Safari SIN Chrome.
test.describe('Tarea 10 - Reto 3: fixture browserName', () => {
  test('El User-Agent corresponde al motor del navegador', async ({ page, browserName }, testInfo) => {
    await page.goto('https://www.saucedemo.com');
    const ua = await page.evaluate(() => navigator.userAgent);
    console.log(`[${testInfo.project.name}] browserName=${browserName} UA=${ua}`);

    if (browserName === 'chromium') {
      expect(ua).toMatch(/Chrome\//);
    } else if (browserName === 'firefox') {
      expect(ua).toMatch(/Firefox\//);
    } else {
      expect(ua).toMatch(/Safari\//);
      expect(ua).not.toMatch(/Chrome\//);
    }

    await capturar(page, testInfo, 'tarea10-reto3-user-agent');
  });
});
