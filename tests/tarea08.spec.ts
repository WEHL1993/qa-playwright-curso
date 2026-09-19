// tests/tarea08.spec.ts
import { test, expect, Page } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// ======= RETO 1: Suite serial con página compartida =======
// test.describe.configure({ mode: 'serial' }) por sí solo NO comparte la page entre tests:
// solo garantiza el orden y que si un test falla, los siguientes se saltan.
// Para compartir la MISMA page hay que crearla manualmente en beforeAll con
// browser.newPage() y reutilizarla en cada test.
test.describe('Tarea 08 - Reto 1: Suite serial con página compartida', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Paso 1 - Login (se ejecuta primero y deja la sesión abierta)', async () => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto1-paso1-login.png', fullPage: true });
  });

  test('Paso 2 - Agregar un producto al carrito (reutiliza la misma page ya logueada)', async () => {
    // No se vuelve a loguear: se reutiliza la sesión del test anterior
    await page.locator('.btn_inventory').first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto1-paso2-producto-agregado.png', fullPage: true });
  });

  test('Paso 3 - Verificar que el carrito conserva el producto agregado', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto1-paso3-carrito-verificado.png', fullPage: true });
  });
});

// ======= RETO 2: test.slow() =======
test.describe('Tarea 08 - Reto 2: test.slow()', () => {
  test('Usuario con lentitud artificial marcado como slow (timeout x3)', async ({ page }, testInfo) => {
    // performance_glitch_user tiene un retraso artificial en el login.
    // En vez de confiar en el margen del timeout global (30s), se marca
    // explícitamente el test como slow: Playwright triplica su timeout.
    test.slow();

    const inicio = Date.now();
    await loginAs(page, 'performance_glitch_user');
    await expect(page).toHaveURL(/inventory/);
    const tiempoLogin = Date.now() - inicio;

    console.log(`Timeout efectivo para este test: ${testInfo.timeout}ms`);
    console.log(`Tiempo real de login (glitch user): ${tiempoLogin}ms`);

    expect(testInfo.timeout).toBeGreaterThan(30000);
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto2-test-slow.png', fullPage: true });
  });
});

// ======= RETO 3: test.skip() dinámico =======
test.describe('Tarea 08 - Reto 3: test.skip() dinámico', () => {
  test('Se omite en tiempo de ejecución si el usuario está bloqueado', async ({ page }) => {
    const usuario = 'locked_out_user';

    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill(usuario);
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const errorVisible = await page.locator('[data-test="error"]').isVisible();
    await page.screenshot({ path: './evidencias/clase08/tarea08-reto3-usuario-bloqueado.png', fullPage: true });

    // Condición evaluada DENTRO del propio test: si el usuario está bloqueado
    // (mensaje de error visible), no tiene sentido continuar verificando el
    // inventario, así que se omite dinámicamente documentando la razón.
    test.skip(errorVisible, `El usuario "${usuario}" está bloqueado por la aplicación; no se puede validar el inventario.`);

    await expect(page).toHaveURL(/inventory/);
  });
});
