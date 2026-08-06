import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Crear carpeta para evidencias si no existe
test.beforeAll(() => {
  if (!fs.existsSync('./evidencias')) {
    fs.mkdirSync('./evidencias');
  }
});

test.describe('Clase 03 - Locators en DemoBlaze', () => {

        test('Locator por texto: verificar elementos del menú', async ({ page }) => {
        await page.goto('/');

        // getByText encuentra cualquier elemento que contenga el texto.
        // Por eso limitamos la búsqueda al navbar.
        const nav = page.locator('#navbarExample');

        await expect(nav.getByText('Home')).toBeVisible();
        await expect(nav.getByText('Contact')).toBeVisible();
        await expect(nav.getByText('About us')).toBeVisible();

        // Para buscar un texto exacto usamos { exact: true }
        await expect(
        nav.getByText('Cart', { exact: true })
        ).toBeVisible();

        await page.screenshot({
            path: './evidencias/clase03/clase03-01-locator-texto-menu.png',
            fullPage: true
        });
    });
 
    test('Locator por CSS: productos en la página principal', async ({ page }) => {
        await page.goto('/');

        await page.waitForSelector('.card-title');

        const tarjetas = page.locator('.card');
        const cantidad = await tarjetas.count();

        expect(cantidad).toBeGreaterThan(0);

        const primerProducto = page.locator('.card-title a').first();
        const nombreProducto = await primerProducto.textContent();

        expect(nombreProducto).not.toBeNull();

        await page.screenshot({
            path: './evidencias/clase03/clase03-02-locator-css-productos.png',
            fullPage: true
        });
    });

    test('Locator por ID: campos del modal de login', async ({ page }) => {
        await page.goto('/');

        // "Log in" también aparece en el título y botón del modal.
        // Limitamos la búsqueda al navbar y seleccionamos el enlace.
        await page
            .locator('#navbarExample')
            .getByRole('link', { name: 'Log in', exact: true })
            .click();

        await page.waitForSelector('#logInModal', {
            state: 'visible'
        });

        await expect(page.locator('#loginusername')).toBeVisible();
        await expect(page.locator('#loginpassword')).toBeVisible();

        await page.screenshot({
            path: './evidencias/clase03/clase03-03-locator-id-login.png',
            fullPage: true
        });
     });


      test('Locator por atributo: imagen del primer producto', async ({ page }) => {
        await page.goto('/');

        await page.waitForSelector('.card-title');

        // Abrir el primer producto
        await page.locator('.card-title a').first().click();
        await page.waitForLoadState('domcontentloaded');

        // Localizar la imagen del producto
        const imagenProducto = page.locator('.product-image img');

        await expect(imagenProducto).toBeVisible();

        // Obtener y verificar el atributo src
        const srcImagen = await imagenProducto.getAttribute('src');

        expect(srcImagen).not.toBeNull();

        await page.screenshot({
            path: './evidencias/clase03/clase03-04-locator-atributo-imagen.png',
            fullPage: true
        });
    });

    test('Locators encadenados: precio dentro de una tarjeta', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    // .locator() sobre otro locator = buscar SOLO dentro de él
    const primeraTarjeta = page.locator('.card').first();
    const precio = primeraTarjeta.locator('h5');
    await expect(precio).toBeVisible();

    await page.screenshot({
        path: './evidencias/clase03/clase03-05-locators-encadenados-precio.png',
        fullPage: true
    });
    });

    test('Verificar que NO existe un elemento (negación)', async ({ page }) => {
    await page.goto('/');
    const mensajeVacio = page.getByText('No products found');
    await expect(mensajeVacio).not.toBeVisible();

    await page.screenshot({
        path: './evidencias/clase03/clase03-06-negacion-no-existe.png',
        fullPage: true
    });
    });

    // --- Tarea 03: tests reto ---

    test('Reto 1 - Locator por rol: botón "Place Order" del carrito', async ({ page }) => {
        await page.goto('/cart.html');

        const botonPlaceOrder = page.getByRole('button', { name: 'Place Order' });
        await expect(botonPlaceOrder).toBeVisible();

        await page.screenshot({
            path: './evidencias/clase03/clase03-07-reto1-place-order.png',
            fullPage: true
        });
    });

    test('Reto 2 - Locator con filter(): producto específico entre varios', async ({ page }) => {
        await page.goto('/');
        await page.waitForSelector('.card-title');

        // filter() reduce la colección a las tarjetas que contienen el texto indicado
        const productoBuscado = page.locator('.card').filter({ hasText: 'Samsung galaxy s6' });
        await expect(productoBuscado).toHaveCount(1);

        const precio = await productoBuscado.locator('h5').textContent();
        expect(precio).not.toBeNull();

        await page.screenshot({
            path: './evidencias/clase03/clase03-08-reto2-filter-producto.png',
            fullPage: true
        });
    });

    test('Reto 3 - Locator por atributo parcial: categorías del sidebar', async ({ page }) => {
        await page.goto('/');

        // Los 3 enlaces de categoría comparten la función byCat(...) en su atributo onclick
        const categorias = page.locator('a[onclick*="byCat"]');

        await expect(categorias).toHaveCount(3);
        await expect(categorias.filter({ hasText: 'Phones' })).toBeVisible();
        await expect(categorias.filter({ hasText: 'Laptops' })).toBeVisible();
        await expect(categorias.filter({ hasText: 'Monitors' })).toBeVisible();

        await page.screenshot({
            path: './evidencias/clase03/clase03-09-reto3-categorias-atributo.png',
            fullPage: true
        });
    });

});