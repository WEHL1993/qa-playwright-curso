import { test, expect, Page } from '@playwright/test';

const usuario = {
    username: `testuser_${Date.now().toString().slice(-6)}`,
    password: 'Password123'
};

async function loginConReintento(page: Page, username: string, password: string, intentos = 5) {
    for (let i = 0; i < intentos; i++) {
        await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
        await page.waitForSelector('#logInModal', { state: 'visible' });
        await page.locator('#loginusername').fill(username);
        await page.locator('#loginpassword').fill(password);
        await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();

        try {
            await page.waitForSelector('#nameofuser', { state: 'visible', timeout: 4000 });
            return;
        } catch {
            console.log(`Login intento ${i + 1}/${intentos} sin éxito todavía, reintentando...`);
            await page.waitForTimeout(1500);
        }
    }
    throw new Error(`No se pudo iniciar sesión con ${username} tras ${intentos} intentos`);
}

test.describe('Clase 04 - Flujo completo de usuario en DemoBlaze', () => {

    test('Registrar un nuevo usuario', async ({ page }) => {
        await page.goto('/');

        await page.locator('#navbarExample').getByRole('link', { name: 'Sign up', exact: true }).click();
        await page.waitForSelector('#signInModal', { state: 'visible' });

        await page.locator('#sign-username').fill(usuario.username);
        await page.locator('#sign-password').fill(usuario.password);
        await page.locator('#signInModal').screenshot({ path: './evidencias/clase04/clase04-01-registro-formulario.png' });

        // El handler de dialog se registra ANTES del clic que lo dispara
        const dialogPromise = new Promise<void>((resolve) => {
            page.once('dialog', async (dialog) => {
                console.log(`Alert dice: ${dialog.message()}`);
                await dialog.accept();
                resolve();
            });
        });

        await page.locator('#signInModal').getByRole('button', { name: 'Sign up' }).click();
        await dialogPromise;

        console.log(`Usuario ${usuario.username} registrado`);

        await page.screenshot({ path: './evidencias/clase04/clase04-02-registro-usuario.png', fullPage: true });
    });

    test('Login con el usuario registrado', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            console.log(`Dialog: ${dialog.message()}`);
            await dialog.accept();
        });

        await page.goto('/');
        await loginConReintento(page, usuario.username, usuario.password);

        const nombreUsuario = await page.locator('#nameofuser').textContent();
        expect(nombreUsuario).toContain(usuario.username);

        console.log(`Login exitoso como: ${nombreUsuario}`);

        await page.screenshot({ path: './evidencias/clase04/clase04-03-login-usuario.png', fullPage: true });
    });

    test('Flujo completo: login -> agregar producto -> verificar carrito', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });

        await page.goto('/');
        await loginConReintento(page, usuario.username, usuario.password);

        await page.waitForSelector('.card-title a');
        const primerProducto = page.locator('.card-title a').first();
        const nombreProducto = await primerProducto.textContent();
        await primerProducto.click();

        await page.waitForLoadState('domcontentloaded');

        // Igual que con el registro de usuario: agregar al carrito es una
        // escritura en el backend que tarda un momento en propagarse antes
        // de que aparezca reflejada en /cart.html.
        await page.getByText('Add to cart').click();
        await page.waitForTimeout(2000);

        await page.locator('#navbarExample').getByRole('link', { name: 'Cart', exact: true }).click();
        await page.waitForURL('**/cart.html');
        await page.waitForTimeout(1500);

        const itemsCarrito = page.locator('#tbodyid tr');
        const cantidadItems = await itemsCarrito.count();
        expect(cantidadItems).toBeGreaterThanOrEqual(1);

        console.log(`Flujo completo exitoso. Producto "${nombreProducto}" en carrito.`);
        console.log(`Items en carrito: ${cantidadItems}`);

        await page.screenshot({ path: './evidencias/clase04/clase04-04-carrito-producto.png', fullPage: true });
    });

    test('Intentar login con credenciales incorrectas', async ({ page }) => {
        await page.goto('/');
        await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
        await page.waitForSelector('#logInModal', { state: 'visible' });

        await page.locator('#loginusername').fill('usuario_que_no_existe');
        await page.locator('#loginpassword').fill('password_incorrecta');

        const dialogPromise = new Promise<string>((resolve) => {
            page.once('dialog', async (dialog) => {
                await dialog.accept();
                resolve(dialog.message());
            });
        });

        await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();
        const mensajeAlert = await dialogPromise;

        expect(mensajeAlert).toBeTruthy();
        console.log(`Error mostrado: ${mensajeAlert}`);

        const usuarioLogueado = page.locator('#nameofuser');
        await expect(usuarioLogueado).not.toBeVisible();

        await page.screenshot({ path: './evidencias/clase04/clase04-05-login-credenciales-incorrectas.png', fullPage: true });
    });

    // --- Tests reto (Tarea 04) ---

    test('Reto 1 - Llenar formulario Place Order con fill()', async ({ page }) => {
        await page.goto('/');
        await page.locator('#navbarExample').getByRole('link', { name: 'Cart', exact: true }).click();
        await page.waitForURL('**/cart.html');
        await page.waitForLoadState('domcontentloaded');

        await page.getByRole('button', { name: 'Place Order' }).click();
        await page.waitForSelector('#orderModal', { state: 'visible' });

        await page.locator('#name').fill('Wilson Hernández');
        await page.locator('#country').fill('Guatemala');
        await page.locator('#city').fill('Ciudad de Guatemala');
        await page.locator('#card').fill('4111111111111111');

        const botonPurchase = page.locator('#orderModal').getByRole('button', { name: 'Purchase' });
        await expect(botonPurchase).toBeVisible();
        await expect(botonPurchase).toBeEnabled();

        await page.screenshot({ path: './evidencias/clase04/clase04-06-reto1-place-order.png', fullPage: true });
    });

    test('Reto 2 - Cerrar el modal de login con su botón Close', async ({ page }) => {
        await page.goto('/');

        await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
        await page.waitForSelector('#logInModal', { state: 'visible' });

        // El modal tiene dos elementos accesibles con nombre "Close" (la X y el botón de texto)
        await page.locator('#logInModal').getByRole('button', { name: 'Close' }).last().click();

        await expect(page.locator('#logInModal')).not.toBeVisible();

        await page.screenshot({ path: './evidencias/clase04/clase04-07-reto2-cerrar-modal.png', fullPage: true });
    });

    test('Reto 3 - Llenar un campo y borrarlo con clear()', async ({ page }) => {
        await page.goto('/');

        await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
        await page.waitForSelector('#logInModal', { state: 'visible' });

        const campoUsuario = page.locator('#loginusername');
        await campoUsuario.fill('texto_de_prueba');
        await expect(campoUsuario).toHaveValue('texto_de_prueba');

        await campoUsuario.clear();

        expect(await campoUsuario.inputValue()).toBe('');

        await page.screenshot({ path: './evidencias/clase04/clase04-08-reto3-clear-campo.png', fullPage: true });
    });

});