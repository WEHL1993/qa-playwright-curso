import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MenuPage } from '../pages/MenuPage';

test.describe('Clase 06 - Page Object Model en Sauce Demo', () => {

  // ---- Laboratorio base (5 tests) ----

  test('Login exitoso con POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToBeOnInventoryPage();

    console.log('Login con POM exitoso');

    await page.screenshot({ path: './evidencias/clase06/clase06-01-login-exitoso-pom.png', fullPage: true });
  });

  test('Login fallido con POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('wrong_user', 'wrong_pass');

    await loginPage.expectLoginError('Username and password do not match');

    console.log('Error de login capturado con POM');

    await page.screenshot({ path: './evidencias/clase06/clase06-02-login-fallido-pom.png', fullPage: true });
  });

  test('Flujo completo: login → agregar 2 productos → verificar carrito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();

    // Agregar productos por nombre
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.addProductByName('Sauce Labs Bike Light');

    // Verificar badge del carrito
    await expect(inventoryPage.cartBadge).toHaveText('2');

    // Ir al carrito
    await inventoryPage.goToCart();
    await cartPage.expectItemCount(2);

    console.log('Flujo completo con POM: 2 productos en carrito');

    await page.screenshot({ path: './evidencias/clase06/clase06-03-flujo-completo-carrito.png', fullPage: true });
  });

  test('Verificar que el inventario tiene 6 productos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);

    await page.screenshot({ path: './evidencias/clase06/clase06-04-inventario-seis-productos.png', fullPage: true });
  });

  test('Ordenar productos de mayor a menor precio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    // Ordenar de mayor a menor precio
    await inventoryPage.sortBy('hilo');

    const precios = page.locator('.inventory_item_price');

    // Los precios deben estar en orden descendente
    const todosLosPrecios = await precios.allTextContents();
    const numericos = todosLosPrecios.map(p => parseFloat(p.replace('$', '')));
    for (let i = 0; i < numericos.length - 1; i++) {
      expect(numericos[i]).toBeGreaterThanOrEqual(numericos[i + 1]);
    }

    await page.screenshot({ path: './evidencias/clase06/clase06-05-orden-mayor-menor-precio.png', fullPage: true });
  });

  // ---- Tarea de la Clase 06: 3 tests reto ----

  test('Reto 1: CheckoutPage - completar una compra de principio a fin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();

    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.expectItemCount(1);

    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo('Wilson', 'Hernández', '01001');
    await checkoutPage.continueToOverview();
    await checkoutPage.finishPurchase();

    await checkoutPage.expectOrderComplete('Thank you for your order!');

    console.log('Reto 1: compra completada de principio a fin con POM');

    await page.screenshot({ path: './evidencias/clase06/clase06-06-reto1-checkout-completo.png', fullPage: true });
  });

  test('Reto 2: MenuPage - logout desde el menú hamburguesa', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();

    await menuPage.logout();
    await expect(loginPage.loginButton).toBeVisible();

    console.log('Reto 2: logout exitoso con POM');

    await page.screenshot({ path: './evidencias/clase06/clase06-07-reto2-logout-menu.png', fullPage: true });
  });

  test('Reto 3: removeProductByName() quita un producto y el badge del carrito desaparece', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();

    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeProductByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);

    console.log('Reto 3: producto removido, badge del carrito en 0');

    await page.screenshot({ path: './evidencias/clase06/clase06-08-reto3-remove-producto-badge.png', fullPage: true });
  });

});
