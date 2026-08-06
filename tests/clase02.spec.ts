import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Verifica si existe el directorio de evidencias y, si no está, lo genera
test.beforeAll(() => {
  if (!fs.existsSync('./evidencias/clase02')) {
    fs.mkdirSync('./evidencias/clase02', { recursive: true });
  }
});

test.describe('Clase 02 - Navegación y esperas en DemoBlaze', () => {

    test('Navegar al carrito y regresar al inicio', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveURL(/demoblaze/);

        await page.screenshot({
        path: './evidencias/clase02/clase02-01-pagina-inicio.png',
        fullPage: true
        });

        await page.getByText('Cart', { exact: true }).click();

        await page.waitForURL('**/cart.html');

        await expect(page).toHaveURL(/cart/);

        await page.screenshot({
        path: './evidencias/clase02/clase02-02-carrito-vacio.png',
        fullPage: true
        });

        await page.goBack();

        await expect(page).toHaveURL(/demoblaze\.com\/?$/);
    });


  test('Navegar a la categoría Phones y ver un producto', async ({ page }) => {
        await page.goto('/');

        await page.getByText('Phones', { exact: true }).click();

        // Aguardar hasta que el listado de productos esté disponible
        await page.waitForSelector('.card-title a');

        const productos = page.locator('.card-title a');

        expect(await productos.count()).toBeGreaterThan(0);

        await productos.first().click();

        await page.waitForLoadState('domcontentloaded');

        await page.screenshot({
            path: './evidencias/clase02/clase02-03-detalle-producto.png',
            fullPage: true
        });

        await expect(
            page.getByText('Add to cart', { exact: true })
        ).toBeVisible();
    });


    test('Capturar el navbar y el footer por separado', async ({ page }) => {
        await page.goto('/');

        const navbar = page.locator('#navbarExample');

        await navbar.screenshot({
            path: './evidencias/clase02/clase02-04-navbar.png'
        });


        // DemoBlaze no usa la etiqueta <footer> estándar; el pie de página
        // real está en el div con id "footc", por eso se apunta a ese selector
        const footer = page.locator('#footc');

        // Se espera a que el elemento esté en el DOM antes de hacer scroll,
        // ya que scrollIntoViewIfNeeded fallaría si aún no existe
        await footer.waitFor({ state: 'attached', timeout: 5000 });

        await footer.scrollIntoViewIfNeeded();

        await footer.screenshot({
            path: './evidencias/clase02/clase02-05-footer.png'
        });
    });

    
    test('Verificar tiempo de carga de la página', async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/');
        await page.waitForLoadState('load');

        const loadTime = Date.now() - startTime;

        console.log(`Tiempo de carga: ${loadTime}ms`);

        // Se espera que el tiempo de carga no supere los 10 segundos
        expect(loadTime).toBeLessThan(10000);
    });        

});