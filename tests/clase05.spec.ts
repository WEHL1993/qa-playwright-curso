import { test, expect } from '@playwright/test';

test.describe('Clase 05 - Assertions y técnicas de diseño de pruebas en Sauce Demo', () => {

  test('CE válida: login con credenciales correctas', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Assertion: debemos llegar al inventario
    await expect(page).toHaveURL(/inventory/);

    await expect(page.locator('.inventory_container')).toBeVisible();

    console.log('CE válida: login exitoso');

    await page.screenshot({ path: './evidencias/clase05/clase05-01-login-credenciales-correctas.png', fullPage: true });
  });

  test('CE inválida: usuario no existe', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('#user-name').fill('usuario_inexistente');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Assertion: debe aparecer mensaje de error
    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username and password do not match');

    // Assertion: NO debemos haber navegado al inventario
    await expect(page).not.toHaveURL(/inventory/);

    await page.screenshot({ path: './evidencias/clase05/clase05-02-login-usuario-no-existe.png', fullPage: true });
  });

  test('CE inválida: usuario bloqueado', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('locked out');

    console.log('CE usuario bloqueado: mensaje correcto mostrado');

    await page.screenshot({ path: './evidencias/clase05/clase05-03-login-usuario-bloqueado.png', fullPage: true });
  });

  test('Valor en frontera: campos vacíos (frontera de longitud mínima)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    // No llenar nada y hacer clic
    await page.locator('#login-button').click();

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Username is required');

    console.log('Valor frontera: campo vacío maneja error correctamente');

    await page.screenshot({ path: './evidencias/clase05/clase05-04-frontera-campos-vacios.png', fullPage: true });
  });

  test('Verificar que el inventario tiene exactamente 6 productos', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);

    // Contar productos con assertion exacta
    const productos = page.locator('.inventory_item');
    await expect(productos).toHaveCount(6);
    console.log(productos);
    console.log('El inventario tiene exactamente 6 productos');

    await page.screenshot({ path: './evidencias/clase05/clase05-05-inventario-seis-productos.png', fullPage: true });
  });

  test('Verificar precio del primer producto con regex', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);

    const textoPrecio = await page.locator('.inventory_item_price')
      .first().textContent();

    // El regex valida el formato $XX.XX (p.ej. $29.99)
    expect(textoPrecio?.trim()).toMatch(/^\$\d+\.\d{2}$/);

    await page.screenshot({ path: './evidencias/clase05/clase05-06-precio-regex.png', fullPage: true });
  });

  test('Verificar atributos y estados de los elementos del inventario', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);

    const primerBoton = page.locator('.btn_inventory').first();
    await expect(primerBoton).toBeEnabled();
    await expect(primerBoton).toHaveText('Add to cart');

    // (continuación) clic y verificar que cambió a 'Remove'
    await primerBoton.click();
    await expect(primerBoton).toHaveText('Remove');

    // Verificar que el carrito muestra 1 item
    const badgeCarrito = page.locator('.shopping_cart_badge');
    await expect(badgeCarrito).toBeVisible();
    await expect(badgeCarrito).toHaveText('1');

    console.log('El botón cambia de estado y el carrito se actualiza');

    await page.screenshot({ path: './evidencias/clase05/clase05-07-atributos-estados-inventario.png', fullPage: true });
  });

  test('Verificar múltiples propiedades del primer producto con soft assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const primerProducto = page.locator('.inventory_item').first();

    // Con soft assertions, si una falla, las demás siguen
    await expect.soft(primerProducto.locator('.inventory_item_name'))
      .toBeVisible();
    await expect.soft(primerProducto.locator('.inventory_item_desc'))
      .toBeVisible();
    await expect.soft(primerProducto.locator('.inventory_item_price'))
      .toBeVisible();
    await expect.soft(primerProducto.locator('.btn_inventory'))
      .toBeEnabled();
    await expect.soft(primerProducto.locator('img')).toBeVisible();

    console.log('Soft assertions del primer producto completadas');

    await page.screenshot({ path: './evidencias/clase05/clase05-08-soft-assertions-producto.png', fullPage: true });
  });

  test('Tabla de decisión - Regla 1: logueado con items -> puede pagar', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Agregar item
    await page.locator('.btn_inventory').first().click();

    // Ir al carrito
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);

    // Debe existir el botón de checkout
    const btnCheckout = page.getByText('Checkout');
    await expect(btnCheckout).toBeVisible();
    await expect(btnCheckout).toBeEnabled();

    await page.screenshot({ path: './evidencias/clase05/clase05-09-tabla-decision-regla1-checkout.png', fullPage: true });
  });

  test('Tabla de decisión - Regla 2: logueado sin items -> carrito vacío', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Ir al carrito sin agregar nada
    await page.locator('.shopping_cart_link').click();

    // El carrito debe estar vacío
    const itemsCarrito = page.locator('.cart_item');
    await expect(itemsCarrito).toHaveCount(0);

    await page.screenshot({ path: './evidencias/clase05/clase05-10-tabla-decision-regla2-carrito-vacio.png', fullPage: true });
  });

  test('Reto 1: ordenar catálogo por precio y verificar el value seleccionado', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);

    const selectOrden = page.locator('[data-test="product-sort-container"]');
    await selectOrden.selectOption('lohi');

    // Assertion: el select debe reflejar la opción elegida
    await expect(selectOrden).toHaveValue('lohi');

    // El primer producto ahora debe ser el de menor precio
    const primerPrecio = await page.locator('.inventory_item_price').first().textContent();
    expect(primerPrecio?.trim()).toBe('$7.99');

    console.log('Reto 1: orden por precio verificado con toHaveValue');

    await page.screenshot({ path: './evidencias/clase05/clase05-11-reto1-orden-precio.png', fullPage: true });
  });

  test('Reto 2: el campo de usuario recibe el foco al hacer clic', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    const campoUsuario = page.locator('#user-name');
    await campoUsuario.click();

    // Assertion: el campo debe tener el foco del teclado
    await expect(campoUsuario).toBeFocused();

    console.log('Reto 2: foco del campo de usuario verificado con toBeFocused');

    await page.screenshot({ path: './evidencias/clase05/clase05-12-reto2-campo-enfocado.png' });
  });

  test('Reto 3: el botón "Add to cart" tiene cursor pointer', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);

    const primerBoton = page.locator('.btn_inventory').first();

    // Assertion: verifica una propiedad CSS computada
    await expect(primerBoton).toHaveCSS('cursor', 'pointer');

    console.log('Reto 3: estilo del botón verificado con toHaveCSS');

    await page.screenshot({ path: './evidencias/clase05/clase05-13-reto3-cursor-pointer.png', fullPage: true });
  });

});
