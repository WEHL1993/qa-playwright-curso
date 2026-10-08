# Laboratorio 01 — Fundamentos de Calidad + Setup de Playwright

**Universidad:** Universidad Mariano Gálvez de Guatemala

---

### Información del Estudiante

- **Nombre:** Wilson Eduardo Hernández López
- **Carné:** 1790-22-7315
- **Curso:** 048 — Aseguramiento de la Calidad del Software
- **Versión de Node.js:** v22.22.0

---

## Descripción

Proyecto de automatización de pruebas configurado con Playwright + TypeScript, aplicado sobre la tienda demo [demoblaze.com](https://www.demoblaze.com). Incluye 3 tests que verifican:

1. Que la página principal carga correctamente (título y barra de navegación).
2. Que el menú de categorías es visible.
3. Que la barra de navegación contiene los enlaces esperados.

## Cómo ejecutar los tests

```bash
npm install
npx playwright install
npx playwright test
```

## Evidencia de Ejecución - Tarea 1: Configuración de entorno (Clase 01)

<details>
<summary> 1. Proyecto configurado con los 3 test ejecutándose correctamente</summary>

![Página de inicio](screenshots/tests-pasando.png)
![Carrito vacío](screenshots/tests-terminal.png)

</details>

Capturas generadas por los tests de `tests/clase01.spec.ts`.

<details>
<summary> 2. La página carga (título y barra de navegación)</summary>

![Página carga correctamente](evidencias/clase01/clase01-01-pagina-carga.png)

</details>

<details>
<summary> 3. El menú de categorías es visible</summary>

![Menú de categorías visible](evidencias/clase01/clase01-02-menu-categorias.png)

</details>

<details>
<summary> 4. La barra de navegación tiene los enlaces</summary>

![Barra de navegación con enlaces](evidencias/clase01/clase01-03-barra-navegacion.png)

</details>

##  Evidencia de Ejecución - Tarea 2: Navegación, estrategias de espera y capturas de pantalla.

Capturas generadas por los tests de `tests/clase02.spec.ts`.

Reflexión de la tarea 2 en [tareas/REFLEXION.md](tareas/REFLEXION.md): sobre auto-wait vs. sleep().

```bash
npx playwright test tests/clase02.spec.ts
```

<details>
<summary> 1. Navegar al carrito y regresar al inicio</summary>

![Página de inicio](evidencias/clase02/clase02-01-pagina-inicio.png)
![Carrito vacío](evidencias/clase02/clase02-02-carrito-vacio.png)

</details>

<details>
<summary> 2. Navegar a la categoría Phones y ver un producto</summary>

![Detalle de producto](evidencias/clase02/clase02-03-detalle-producto.png)

</details>

<details>
<summary> 3. Capturar el navbar y el footer por separado</summary>

![Navbar](evidencias/clase02/clase02-04-navbar.png)
![Footer](evidencias/clase02/clase02-05-footer.png)

</details>

<details>
<summary> 4. Verificar tiempo de carga de la página</summary>

Este test no genera capturas: solo mide el tiempo de carga con `Date.now()` y valida que sea menor a 10 segundos, imprimiendo el resultado en consola (`console.log`).

</details>

## Evidencia de Ejecución - Tarea 3: Locators en Playwright (Clase 03)

Tests en `tests/clase03.spec.ts`: 6 tests de clase (texto, CSS, ID, atributo, locators encadenados, negación) + 3 tests reto (locator por rol, `filter()`, atributo parcial). Total: **9 tests**.

Caso de prueba documentado en [casos-de-prueba/TC-001.md](casos-de-prueba/TC-001.md) ("Agregar al carrito").

```bash
npx playwright test tests/clase03.spec.ts
```

<details>
<summary> 1. Locator por texto: verificar elementos del menú</summary>

![Locator por texto](evidencias/clase03/clase03-01-locator-texto-menu.png)

</details>

<details>
<summary> 2. Locator por CSS: productos en la página principal</summary>

![Locator por CSS](evidencias/clase03/clase03-02-locator-css-productos.png)

</details>

<details>
<summary> 3. Locator por ID: campos del modal de login</summary>

![Locator por ID](evidencias/clase03/clase03-03-locator-id-login.png)

</details>

<details>
<summary> 4. Locator por atributo: imagen del primer producto</summary>

![Locator por atributo](evidencias/clase03/clase03-04-locator-atributo-imagen.png)

</details>

<details>
<summary> 5. Locators encadenados: precio dentro de una tarjeta</summary>

![Locators encadenados](evidencias/clase03/clase03-05-locators-encadenados-precio.png)

</details>

<details>
<summary> 6. Verificar que NO existe un elemento (negación)</summary>

![Negación de elemento](evidencias/clase03/clase03-06-negacion-no-existe.png)

</details>

<details>
<summary> 7. Reto 1 - Locator por rol: botón "Place Order" del carrito</summary>

![Reto 1 - Place Order](evidencias/clase03/clase03-07-reto1-place-order.png)

</details>

<details>
<summary> 8. Reto 2 - Locator con filter(): producto específico entre varios</summary>

![Reto 2 - filter()](evidencias/clase03/clase03-08-reto2-filter-producto.png)

</details>

<details>
<summary> 9. Reto 3 - Locator por atributo parcial: categorías del sidebar</summary>

![Reto 3 - atributo parcial](evidencias/clase03/clase03-09-reto3-categorias-atributo.png)

</details>

<details>
<summary> 10. Resultado de ejecución: 9 tests aprobados</summary>

![9 tests aprobados](evidencias/06-tests-clase03-9-passed.png)

</details>

## Evidencia de Ejecución - Tarea 4: Principios ISTQB + Actions en Playwright (Clase 04)

Tests en `tests/clase04.spec.ts`: 4 tests de clase (registrar usuario, login con el usuario registrado, flujo completo login → agregar producto → verificar carrito, login con credenciales incorrectas) + 3 tests reto (formulario con `fill()`, cerrar modal con `.last()`, `clear()`/`inputValue()`). Total: **7 tests**.

Reflexión de la tarea en [tareas/tarea-04.md](tareas/tarea-04.md): ¿cuál de los 7 principios ISTQB es más importante y por qué?

```bash
npx playwright test tests/clase04.spec.ts
```

<details>
<summary> 1. Registrar un nuevo usuario</summary>

![Formulario de registro lleno](evidencias/clase04/clase04-01-registro-formulario.png)
![Registro de usuario exitoso](evidencias/clase04/clase04-02-registro-usuario.png)

</details>

<details>
<summary> 2. Login con el usuario registrado</summary>

![Login con el usuario registrado](evidencias/clase04/clase04-03-login-usuario.png)

</details>

<details>
<summary> 3. Flujo completo: login → agregar producto → verificar carrito</summary>

![Carrito con producto agregado](evidencias/clase04/clase04-04-carrito-producto.png)

</details>

<details>
<summary> 4. Intentar login con credenciales incorrectas</summary>

![Login con credenciales incorrectas](evidencias/clase04/clase04-05-login-credenciales-incorrectas.png)

</details>

<details>
<summary> 5. Reto 1 - Llenar formulario "Place Order" con fill()</summary>

![Reto 1 - Place Order](evidencias/clase04/clase04-06-reto1-place-order.png)

</details>

<details>
<summary> 6. Reto 2 - Cerrar el modal de login con su botón Close</summary>

![Reto 2 - Cerrar modal](evidencias/clase04/clase04-07-reto2-cerrar-modal.png)

</details>

<details>
<summary> 7. Reto 3 - Llenar un campo y borrarlo con clear()</summary>

![Reto 3 - clear()](evidencias/clase04/clase04-08-reto3-clear-campo.png)

</details>

## Evidencia de Ejecución - Tarea 5: Técnicas de diseño de pruebas + Assertions en Playwright (Clase 05)

Tests en `tests/clase05.spec.ts` contra una nueva AUT, [saucedemo.com](https://www.saucedemo.com): 10 tests base organizados en 4 secciones (clases de equivalencia y valores en la frontera del login, verificación de inventario, soft assertions, tabla de decisión del checkout) + 3 tests reto, cada uno con una assertion no vista en el laboratorio base (`toHaveValue`, `toBeFocused`, `toHaveCSS`). Total: **13 tests**.

Tabla de decisión completa del proceso de checkout (4 condiciones, 6 reglas, derivada de verificar en vivo el comportamiento real del sitio) en [casos-de-prueba/tabla-decision-checkout.md](casos-de-prueba/tabla-decision-checkout.md).

```bash
npx playwright test tests/clase05.spec.ts
```

<details>
<summary> 1. CE válida: login con credenciales correctas</summary>

![Login con credenciales correctas](evidencias/clase05/clase05-01-login-credenciales-correctas.png)

</details>

<details>
<summary> 2. CE inválida: usuario no existe</summary>

![Login con usuario inexistente](evidencias/clase05/clase05-02-login-usuario-no-existe.png)

</details>

<details>
<summary> 3. CE inválida: usuario bloqueado</summary>

![Login con usuario bloqueado](evidencias/clase05/clase05-03-login-usuario-bloqueado.png)

</details>

<details>
<summary> 4. Valor en frontera: campos vacíos (frontera de longitud mínima)</summary>

![Frontera de campos vacíos](evidencias/clase05/clase05-04-frontera-campos-vacios.png)

</details>

<details>
<summary> 5. Verificar que el inventario tiene exactamente 6 productos</summary>

![Inventario con 6 productos](evidencias/clase05/clase05-05-inventario-seis-productos.png)

</details>

<details>
<summary> 6. Verificar precio del primer producto con regex</summary>

![Precio validado con regex](evidencias/clase05/clase05-06-precio-regex.png)

</details>

<details>
<summary> 7. Verificar atributos y estados de los elementos del inventario</summary>

![Atributos y estados del inventario](evidencias/clase05/clase05-07-atributos-estados-inventario.png)

</details>

<details>
<summary> 8. Verificar múltiples propiedades del primer producto con soft assertions</summary>

![Soft assertions del primer producto](evidencias/clase05/clase05-08-soft-assertions-producto.png)

</details>

<details>
<summary> 9. Tabla de decisión - Regla 1: logueado con items -> puede pagar</summary>

![Tabla de decisión - Regla 1](evidencias/clase05/clase05-09-tabla-decision-regla1-checkout.png)

</details>

<details>
<summary> 10. Tabla de decisión - Regla 2: logueado sin items -> carrito vacío</summary>

![Tabla de decisión - Regla 2](evidencias/clase05/clase05-10-tabla-decision-regla2-carrito-vacio.png)

</details>

<details>
<summary> 11. Reto 1 - toHaveValue(): ordenar catálogo por precio</summary>

![Reto 1 - orden por precio](evidencias/clase05/clase05-11-reto1-orden-precio.png)

</details>

<details>
<summary> 12. Reto 2 - toBeFocused(): campo de usuario enfocado</summary>

![Reto 2 - campo enfocado](evidencias/clase05/clase05-12-reto2-campo-enfocado.png)

</details>

<details>
<summary> 13. Reto 3 - toHaveCSS(): cursor pointer en "Add to cart"</summary>

![Reto 3 - cursor pointer](evidencias/clase05/clase05-13-reto3-cursor-pointer.png)

</details>

## Evidencia de Ejecución - Tarea 6: Testing Estratégico y Ágil + Page Object Model (Clase 06)

Se reorganizó el proyecto aplicando el patrón **Page Object Model (POM)** sobre [saucedemo.com](https://www.saucedemo.com): se creó la carpeta `pages/` con un archivo `.ts` por página, y `tests/clase06.spec.ts` consume esos Page Objects en vez de locators sueltos.

**Page Objects (`pages/`):**

- `LoginPage.ts` — formulario de login, mensaje de error.
- `InventoryPage.ts` — catálogo, badge del carrito, agregar/quitar productos por nombre, ordenar por precio.
- `CartPage.ts` — ítems del carrito, botón de checkout.
- `CheckoutPage.ts` *(Reto 1)* — formulario de datos (First Name, Last Name, Postal Code) y finalización de la compra.
- `MenuPage.ts` *(Reto 2)* — menú hamburguesa y logout.

Tests en `tests/clase06.spec.ts`: 5 tests base del laboratorio (login exitoso, login fallido, flujo completo de 2 productos en el carrito, conteo de 6 productos en el inventario, orden de precios de mayor a menor) + 3 tests reto (checkout de principio a fin con `CheckoutPage`, logout con `MenuPage`, `removeProductByName()` en `InventoryPage` verificando que el badge del carrito desaparece al llegar a 0). Total: **8 tests**.

```bash
npx playwright test tests/clase06.spec.ts
```

<details>
<summary> 1. Login exitoso con POM</summary>

![Login exitoso con POM](evidencias/clase06/clase06-01-login-exitoso-pom.png)

</details>

<details>
<summary> 2. Login fallido con POM</summary>

![Login fallido con POM](evidencias/clase06/clase06-02-login-fallido-pom.png)

</details>

<details>
<summary> 3. Flujo completo: login → agregar 2 productos → verificar carrito</summary>

![Flujo completo con 2 productos en carrito](evidencias/clase06/clase06-03-flujo-completo-carrito.png)

</details>

<details>
<summary> 4. Verificar que el inventario tiene 6 productos</summary>

![Inventario con 6 productos](evidencias/clase06/clase06-04-inventario-seis-productos.png)

</details>

<details>
<summary> 5. Ordenar productos de mayor a menor precio</summary>

![Orden de mayor a menor precio](evidencias/clase06/clase06-05-orden-mayor-menor-precio.png)

</details>

<details>
<summary> 6. Reto 1 - CheckoutPage: compra completa de principio a fin</summary>

![Reto 1 - checkout completo](evidencias/clase06/clase06-06-reto1-checkout-completo.png)

</details>

<details>
<summary> 7. Reto 2 - MenuPage: logout desde el menú hamburguesa</summary>

![Reto 2 - logout desde el menú](evidencias/clase06/clase06-07-reto2-logout-menu.png)

</details>

<details>
<summary> 8. Reto 3 - removeProductByName(): el badge del carrito desaparece al llegar a 0</summary>

![Reto 3 - remover producto y badge en 0](evidencias/clase06/clase06-08-reto3-remove-producto-badge.png)

</details>

## Evidencia de Ejecución - Tarea 7: Evidencias de Pruebas y Reportes (Clase 07)

Tests en `tests/clase07.spec.ts`: 4 tests de clase enfocados en técnicas de captura de evidencia sobre [saucedemo.com](https://www.saucedemo.com) (login exitoso documentado antes/después, flujo de compra completo, captura del momento exacto de un defecto esperado con `locator.screenshot()`, comparación de estados antes/después de una acción) + `tests/tarea07.spec.ts` con 3 tests reto (`test.step()` para documentar el flujo de login por pasos, `testInfo.attach()` para adjuntar datos capturados al reporte HTML, `toHaveScreenshot()` para comparación visual contra un baseline). Total: **7 tests**.

```bash
npx playwright test tests/clase07.spec.ts tests/tarea07.spec.ts
```

<details>
<summary> 1. Login exitoso: evidencia completa antes y después</summary>

![Antes del login](evidencias/clase07/clase07-01-antes-login.png)
![Después del login](evidencias/clase07/clase07-02-despues-login.png)

</details>

<details>
<summary> 2. Documentar el flujo de compra completo</summary>

![Inventario](evidencias/clase07/clase07-03-inventario.png)
![Producto agregado](evidencias/clase07/clase07-04-producto-agregado.png)
![Carrito con el producto](evidencias/clase07/clase07-05-carrito.png)

</details>

<details>
<summary> 3. Captura del momento exacto de un defecto esperado (usuario bloqueado)</summary>

![Error de usuario bloqueado](evidencias/clase07/clase07-06-error-usuario-bloqueado.png)

</details>

<details>
<summary> 4. Comparar estados antes y después de una acción</summary>

![Estado antes](evidencias/clase07/clase07-07-estado-antes.png)
![Estado después](evidencias/clase07/clase07-08-estado-despues.png)

</details>

<details>
<summary> 5. Reto 1 - test.step(): Estructura un test en pasos nombrados(navegar, login, verificar)</summary>

![Reto 1 - test.step()](evidencias/clase07/tarea07-reto1-test-step.png)

</details>

<details>
<summary> 6. Reto 2 - testInfo.attach(): Adjunta un archivo de texto con datos capturados (cantidad de productos, URL, fecha) directamente al reporte HTML</summary>

![Reto 2 - testInfo.attach()](evidencias/clase07/tarea07-reto2-testinfo-attach.png)

</details>

<details>
<summary> 7. Reto 3 - toHaveScreenshot(): Comparación visual contra una imagen de referencia(baseline); la primera corrida genera el baseline, comitéalo al repo.</summary>

![Reto 3 - toHaveScreenshot()](evidencias/clase07/tarea07-reto3-tohavescreenshot.png)

</details>

<details>
<summary> 8. Reporte de ejecución (DR-001): resultados de clase07.spec.ts y tarea07.spec.ts</summary>

Reporte completo con el detalle test por test y el resumen de ejecución en [reportes/DR-001.md](reportes/DR-001.md).

</details>

## Evidencia de Ejecución - Tarea 8: Hooks, Configuración de Test y Organización de Suites (Clase 08)

Se agregó el helper `helpers/auth.ts` (`loginAs(page, username)`) para centralizar el login contra [saucedemo.com](https://www.saucedemo.com) según el usuario recibido, reutilizado en `tests/clase08.spec.ts` y `tests/tarea08.spec.ts`.

Tests en `tests/clase08.spec.ts`: 2 suites con `test.describe.configure({ mode: 'parallel' })`. La primera usa `test.beforeEach` (login con `standard_user`) y `test.afterEach` (screenshot automático solo si el test falla) y agrupa 4 tests (conteo de 6 productos en el inventario, formato de precio en todos los productos, apertura/cierre del menú hamburguesa, logout). La segunda suite prueba el comportamiento por tipo de usuario (checkout completo con `standard_user`, login con `performance_glitch_user` midiendo el tiempo de espera). Total: **6 tests**.

`tests/tarea08.spec.ts` con 3 tests reto: Reto 1, suite en `mode: 'serial'` con una única `page` creada en `test.beforeAll` (`browser.newPage()`) y cerrada en `test.afterAll`, compartida entre 3 pasos secuenciales (login → agregar producto → verificar carrito conserva el producto); Reto 2, `test.slow()` para triplicar el timeout del test que usa `performance_glitch_user`; Reto 3, `test.skip()` dinámico que omite la verificación del inventario cuando `locked_out_user` muestra el mensaje de error de login. Total: **5 tests**.

Plan mínimo de aseguramiento de calidad (propósito, alcance, herramientas y criterios de salida) para las funciones críticas de Sauce Demo, documentado en [documentos/sqa-plan-saucedemo.md](documentos/sqa-plan-saucedemo.md).

```bash
npx playwright test tests/clase08.spec.ts tests/tarea08.spec.ts
```

<details>
<summary> 1. El inventario muestra 6 productos</summary>

![Inventario con 6 productos](evidencias/clase08/clase08-01-inventario-6-productos.png)

</details>

<details>
<summary> 2. Todos los productos tienen precio visible en formato correcto</summary>

![Precios visibles](evidencias/clase08/clase08-02-precios-visibles.png)

</details>

<details>
<summary> 3. El menú de hamburguesa abre y cierra correctamente</summary>

![Menú abierto](evidencias/clase08/clase08-03-menu-abierto.png)
![Menú cerrado](evidencias/clase08/clase08-04-menu-cerrado.png)

</details>

<details>
<summary> 4. Logout funciona correctamente</summary>

![Logout](evidencias/clase08/clase08-05-logout.png)

</details>

<details>
<summary> 5. Usuario estándar puede completar el checkout</summary>

![Checkout](evidencias/clase08/clase08-06-checkout.png)

</details>

<details>
<summary> 6. Usuario de rendimiento degradado experimenta lentitud en el login</summary>

![Performance glitch user](evidencias/clase08/clase08-07-performance-glitch.png)

</details>

<details>
<summary> 7. Reto 1 - Suite serial con página compartida</summary>

![Paso 1 - Login](evidencias/clase08/tarea08-reto1-paso1-login.png)
![Paso 2 - Producto agregado](evidencias/clase08/tarea08-reto1-paso2-producto-agregado.png)
![Paso 3 - Carrito verificado](evidencias/clase08/tarea08-reto1-paso3-carrito-verificado.png)

</details>

<details>
<summary> 8. Reto 2 - test.slow()</summary>

![Reto 2 - test.slow()](evidencias/clase08/tarea08-reto2-test-slow.png)

</details>

<details>
<summary> 9. Reto 3 - test.skip() dinámico</summary>

![Reto 3 - usuario bloqueado](evidencias/clase08/tarea08-reto3-usuario-bloqueado.png)

</details>

## Evidencia de Ejecución - Tarea 9: Fixtures y Datos de Prueba (Clase 09)

Se creó la carpeta `fixtures/` (`fixtures/index.ts`) que extiende `test` de Playwright con 3 fixtures personalizados sobre [saucedemo.com](https://www.saucedemo.com): `loginPage` (instancia de `LoginPage` ya navegada), `inventoryPage` (login como `standard_user` ya realizado) y `cartPage` (login + 1 producto ya agregado al carrito).

Tests en `tests/clase09.spec.ts`: tests parametrizados de login (3 casos: usuario estándar, usuario bloqueado, campos vacíos), tests parametrizados de agregar productos al carrito (3 productos distintos) y 3 tests usando los fixtures personalizados (`inventoryPage`, `cartPage`, `loginPage`). Total: **9 tests**.

`tests/tarea09.spec.ts` con 3 retos: Reto 1, fixture con teardown real (`cronometro`) que mide la duración del test dentro de un `finally`, demostrado con un test que pasa y otro que falla a propósito; Reto 2, fixture de alcance `worker` (`contadorWorker`) que se instancia una sola vez por worker y mantiene su estado entre 2 tests corridos en `mode: 'serial'`; Reto 3, `test.use()` combinado con parametrización de 2 viewports (móvil y escritorio) para correr el mismo test de login en ambos tamaños de pantalla. Total: **6 tests**.

```bash
npx playwright test tests/clase09.spec.ts tests/tarea09.spec.ts
```

<details>
<summary> 1. Tests parametrizados de login (3 casos: estándar, bloqueado, campos vacíos)</summary>

![Login usuario estándar](evidencias/clase09/clase09-01-login-usuario-estándar-puede-ingresar.png)
![Login usuario bloqueado](evidencias/clase09/clase09-02-login-usuario-bloqueado-no-puede-ingresar.png)
![Login campos vacíos](evidencias/clase09/clase09-03-login-campos-vacíos-muestran-error.png)

</details>

<details>
<summary> 2. Tests parametrizados de agregar productos al carrito (3 productos)</summary>

![Carrito Sauce Labs Backpack](evidencias/clase09/clase09-04-carrito-sauce-labs-backpack.png)
![Carrito Sauce Labs Bike Light](evidencias/clase09/clase09-05-carrito-sauce-labs-bike-light.png)
![Carrito Sauce Labs Bolt T-Shirt](evidencias/clase09/clase09-06-carrito-sauce-labs-bolt-t-shirt.png)

</details>

<details>
<summary> 3. Fixture inventoryPage: verificar inventario ya logueado</summary>

![Fixture inventario](evidencias/clase09/clase09-07-fixture-inventario.png)

</details>

<details>
<summary> 4. Fixture cartPage: verificar que hay 1 item ya agregado</summary>

![Fixture carrito](evidencias/clase09/clase09-08-fixture-carrito.png)

</details>

<details>
<summary> 5. Fixture loginPage: login manual dentro del test</summary>

![Fixture loginPage](evidencias/clase09/clase09-09-fixture-loginpage.png)

</details>

<details>
<summary> 6. Reto 1 - Fixture con teardown real (cronómetro en finally)</summary>

![Reto 1 - test que pasa](evidencias/clase09/tarea09-reto1-paso1-test-pasa.png)
![Reto 1 - test que falla a propósito](evidencias/clase09/tarea09-reto1-paso2-test-falla-a-proposito.png)

</details>

<details>
<summary> 7. Reto 2 - Fixture de alcance worker (contador persiste entre 2 tests)</summary>

![Reto 2 - contador en 1](evidencias/clase09/tarea09-reto2-paso1-contador-en-1.png)
![Reto 2 - contador en 2](evidencias/clase09/tarea09-reto2-paso2-contador-en-2.png)

</details>

<details>
<summary> 8. Reto 3 - test.use() + parametrización de viewports (móvil y escritorio)</summary>

![Reto 3 - viewport móvil](evidencias/clase09/tarea09-reto3-móvil.png)
![Reto 3 - viewport escritorio](evidencias/clase09/tarea09-reto3-escritorio.png)

</details>

<details>
<summary> 9. Reporte HTML de ejecución: 15 tests (14 passed, 1 flaky)</summary>

![Reporte HTML clase09 y tarea09](evidencias/clase09/clase09-reporte-html.png)

</details>

## Evidencia de Ejecución - Tarea 10: Multi-browser y Tags (Clase 10)

`playwright.config.ts` ahora define **5 projects**: `chromium`, `firefox`, `webkit`, `mobile-chrome` y `mobile-safari`, con `workers: 1` y `baseURL` de DemoBlaze. Cada test se ejecuta una vez por project. Los navegadores de Firefox y WebKit se instalan con `npx playwright install firefox webkit`.

Tests sobre [saucedemo.com](https://www.saucedemo.com):

- `tests/clase10-smoke.spec.ts`: 5 tests con tag `@smoke` (login carga, login estándar, inventario, carrito, checkout).
- `tests/clase10-regression.spec.ts`: 5 tests con tag `@regression` (ordenamiento A-Z / Z-A, precio de menor a mayor, botón Remove, detalle de producto).
- `tests/tarea10.spec.ts` con 3 retos: Reto 1, tags múltiples (`{ tag: ['@regression', '@ui'] }`) y exclusión con `--grep-invert`; Reto 2, `expect.soft()` verificando varios atributos de un producto y `testInfo.errors` para reportar todos los fallos juntos (un test con `test.fail()` acumula 3 errores a propósito); Reto 3, fixture `browserName` para ajustar la aserción del User-Agent según el motor en vez de usar `test.skip()`.

Total: 16 tests × 5 projects = **80 ejecuciones, 80 passed**. Cada imagen lleva el nombre del project como sufijo (`-chromium`, `-firefox`, `-webkit`, `-mobile-chrome`, `-mobile-safari`).

```bash
# Laboratorio + tarea completos (todos los projects)
npx playwright test tests/clase10-smoke.spec.ts tests/clase10-regression.spec.ts tests/tarea10.spec.ts

# Por tag
npx playwright test --grep "@smoke"
npx playwright test --grep "@regression"
npx playwright test tests/tarea10.spec.ts --grep "@regression" --grep-invert "@ui"

# Por project
npx playwright test --project=firefox
npx playwright test --project=mobile-chrome --grep "@smoke"

# Reporte HTML
npx playwright show-report
```

<details>
<summary> 1. La página de login carga</summary>

![La página de login carga - chromium](evidencias/clase10/clase10-01-smoke-login-carga-chromium.png)
![La página de login carga - firefox](evidencias/clase10/clase10-01-smoke-login-carga-firefox.png)
![La página de login carga - webkit](evidencias/clase10/clase10-01-smoke-login-carga-webkit.png)
![La página de login carga - mobile-chrome](evidencias/clase10/clase10-01-smoke-login-carga-mobile-chrome.png)
![La página de login carga - mobile-safari](evidencias/clase10/clase10-01-smoke-login-carga-mobile-safari.png)

</details>

<details>
<summary> 2. Login con usuario estándar funciona</summary>

![Login con usuario estándar funciona - chromium](evidencias/clase10/clase10-02-smoke-login-estandar-chromium.png)
![Login con usuario estándar funciona - firefox](evidencias/clase10/clase10-02-smoke-login-estandar-firefox.png)
![Login con usuario estándar funciona - webkit](evidencias/clase10/clase10-02-smoke-login-estandar-webkit.png)
![Login con usuario estándar funciona - mobile-chrome](evidencias/clase10/clase10-02-smoke-login-estandar-mobile-chrome.png)
![Login con usuario estándar funciona - mobile-safari](evidencias/clase10/clase10-02-smoke-login-estandar-mobile-safari.png)

</details>

<details>
<summary> 3. El inventario muestra productos</summary>

![El inventario muestra productos - chromium](evidencias/clase10/clase10-03-smoke-inventario-productos-chromium.png)
![El inventario muestra productos - firefox](evidencias/clase10/clase10-03-smoke-inventario-productos-firefox.png)
![El inventario muestra productos - webkit](evidencias/clase10/clase10-03-smoke-inventario-productos-webkit.png)
![El inventario muestra productos - mobile-chrome](evidencias/clase10/clase10-03-smoke-inventario-productos-mobile-chrome.png)
![El inventario muestra productos - mobile-safari](evidencias/clase10/clase10-03-smoke-inventario-productos-mobile-safari.png)

</details>

<details>
<summary> 4. El carrito es accesible</summary>

![El carrito es accesible - chromium](evidencias/clase10/clase10-04-smoke-carrito-accesible-chromium.png)
![El carrito es accesible - firefox](evidencias/clase10/clase10-04-smoke-carrito-accesible-firefox.png)
![El carrito es accesible - webkit](evidencias/clase10/clase10-04-smoke-carrito-accesible-webkit.png)
![El carrito es accesible - mobile-chrome](evidencias/clase10/clase10-04-smoke-carrito-accesible-mobile-chrome.png)
![El carrito es accesible - mobile-safari](evidencias/clase10/clase10-04-smoke-carrito-accesible-mobile-safari.png)

</details>

<details>
<summary> 5. El checkout inicia correctamente</summary>

![El checkout inicia correctamente - chromium](evidencias/clase10/clase10-05-smoke-checkout-inicia-chromium.png)
![El checkout inicia correctamente - firefox](evidencias/clase10/clase10-05-smoke-checkout-inicia-firefox.png)
![El checkout inicia correctamente - webkit](evidencias/clase10/clase10-05-smoke-checkout-inicia-webkit.png)
![El checkout inicia correctamente - mobile-chrome](evidencias/clase10/clase10-05-smoke-checkout-inicia-mobile-chrome.png)
![El checkout inicia correctamente - mobile-safari](evidencias/clase10/clase10-05-smoke-checkout-inicia-mobile-safari.png)

</details>

<details>
<summary> 6. Ordenamiento A-Z funciona</summary>

![Ordenamiento A-Z funciona - chromium](evidencias/clase10/clase10-06-regression-orden-az-chromium.png)
![Ordenamiento A-Z funciona - firefox](evidencias/clase10/clase10-06-regression-orden-az-firefox.png)
![Ordenamiento A-Z funciona - webkit](evidencias/clase10/clase10-06-regression-orden-az-webkit.png)
![Ordenamiento A-Z funciona - mobile-chrome](evidencias/clase10/clase10-06-regression-orden-az-mobile-chrome.png)
![Ordenamiento A-Z funciona - mobile-safari](evidencias/clase10/clase10-06-regression-orden-az-mobile-safari.png)

</details>

<details>
<summary> 7. Ordenamiento Z-A funciona</summary>

![Ordenamiento Z-A funciona - chromium](evidencias/clase10/clase10-07-regression-orden-za-chromium.png)
![Ordenamiento Z-A funciona - firefox](evidencias/clase10/clase10-07-regression-orden-za-firefox.png)
![Ordenamiento Z-A funciona - webkit](evidencias/clase10/clase10-07-regression-orden-za-webkit.png)
![Ordenamiento Z-A funciona - mobile-chrome](evidencias/clase10/clase10-07-regression-orden-za-mobile-chrome.png)
![Ordenamiento Z-A funciona - mobile-safari](evidencias/clase10/clase10-07-regression-orden-za-mobile-safari.png)

</details>

<details>
<summary> 8. Precio de menor a mayor funciona</summary>

![Precio de menor a mayor funciona - chromium](evidencias/clase10/clase10-08-regression-precio-menor-mayor-chromium.png)
![Precio de menor a mayor funciona - firefox](evidencias/clase10/clase10-08-regression-precio-menor-mayor-firefox.png)
![Precio de menor a mayor funciona - webkit](evidencias/clase10/clase10-08-regression-precio-menor-mayor-webkit.png)
![Precio de menor a mayor funciona - mobile-chrome](evidencias/clase10/clase10-08-regression-precio-menor-mayor-mobile-chrome.png)
![Precio de menor a mayor funciona - mobile-safari](evidencias/clase10/clase10-08-regression-precio-menor-mayor-mobile-safari.png)

</details>

<details>
<summary> 9. El botón "Remove" aparece después de agregar al carrito</summary>

![El botón "Remove" aparece después de agregar al carrito - chromium](evidencias/clase10/clase10-09-regression-boton-remove-chromium.png)
![El botón "Remove" aparece después de agregar al carrito - firefox](evidencias/clase10/clase10-09-regression-boton-remove-firefox.png)
![El botón "Remove" aparece después de agregar al carrito - webkit](evidencias/clase10/clase10-09-regression-boton-remove-webkit.png)
![El botón "Remove" aparece después de agregar al carrito - mobile-chrome](evidencias/clase10/clase10-09-regression-boton-remove-mobile-chrome.png)
![El botón "Remove" aparece después de agregar al carrito - mobile-safari](evidencias/clase10/clase10-09-regression-boton-remove-mobile-safari.png)

</details>

<details>
<summary> 10. Navegar al detalle del producto y regresar</summary>

![Navegar al detalle del producto y regresar - chromium](evidencias/clase10/clase10-10-regression-detalle-producto-chromium.png)
![Navegar al detalle del producto y regresar - firefox](evidencias/clase10/clase10-10-regression-detalle-producto-firefox.png)
![Navegar al detalle del producto y regresar - webkit](evidencias/clase10/clase10-10-regression-detalle-producto-webkit.png)
![Navegar al detalle del producto y regresar - mobile-chrome](evidencias/clase10/clase10-10-regression-detalle-producto-mobile-chrome.png)
![Navegar al detalle del producto y regresar - mobile-safari](evidencias/clase10/clase10-10-regression-detalle-producto-mobile-safari.png)

</details>

<details>
<summary> 11. Reto 1 - Tags múltiples `@regression @ui`</summary>

![Reto 1 - Tags múltiples `@regression @ui` - chromium](evidencias/clase10/tarea10-reto1-regression-ui-chromium.png)
![Reto 1 - Tags múltiples `@regression @ui` - firefox](evidencias/clase10/tarea10-reto1-regression-ui-firefox.png)
![Reto 1 - Tags múltiples `@regression @ui` - webkit](evidencias/clase10/tarea10-reto1-regression-ui-webkit.png)
![Reto 1 - Tags múltiples `@regression @ui` - mobile-chrome](evidencias/clase10/tarea10-reto1-regression-ui-mobile-chrome.png)
![Reto 1 - Tags múltiples `@regression @ui` - mobile-safari](evidencias/clase10/tarea10-reto1-regression-ui-mobile-safari.png)

</details>

<details>
<summary> 12. Reto 1 - Tags múltiples `@regression @funcional`</summary>

![Reto 1 - Tags múltiples `@regression @funcional` - chromium](evidencias/clase10/tarea10-reto1-regression-funcional-chromium.png)
![Reto 1 - Tags múltiples `@regression @funcional` - firefox](evidencias/clase10/tarea10-reto1-regression-funcional-firefox.png)
![Reto 1 - Tags múltiples `@regression @funcional` - webkit](evidencias/clase10/tarea10-reto1-regression-funcional-webkit.png)
![Reto 1 - Tags múltiples `@regression @funcional` - mobile-chrome](evidencias/clase10/tarea10-reto1-regression-funcional-mobile-chrome.png)
![Reto 1 - Tags múltiples `@regression @funcional` - mobile-safari](evidencias/clase10/tarea10-reto1-regression-funcional-mobile-safari.png)

</details>

<details>
<summary> 13. Reto 1 - Tags múltiples `@smoke @funcional`</summary>

![Reto 1 - Tags múltiples `@smoke @funcional` - chromium](evidencias/clase10/tarea10-reto1-smoke-funcional-sin-badge-chromium.png)
![Reto 1 - Tags múltiples `@smoke @funcional` - firefox](evidencias/clase10/tarea10-reto1-smoke-funcional-sin-badge-firefox.png)
![Reto 1 - Tags múltiples `@smoke @funcional` - webkit](evidencias/clase10/tarea10-reto1-smoke-funcional-sin-badge-webkit.png)
![Reto 1 - Tags múltiples `@smoke @funcional` - mobile-chrome](evidencias/clase10/tarea10-reto1-smoke-funcional-sin-badge-mobile-chrome.png)
![Reto 1 - Tags múltiples `@smoke @funcional` - mobile-safari](evidencias/clase10/tarea10-reto1-smoke-funcional-sin-badge-mobile-safari.png)

</details>

<details>
<summary> 14. Reto 2 - expect.soft() con atributos correctos (0 errores)</summary>

![Reto 2 - expect.soft() con atributos correctos (0 errores) - chromium](evidencias/clase10/tarea10-reto2-soft-sin-errores-chromium.png)
![Reto 2 - expect.soft() con atributos correctos (0 errores) - firefox](evidencias/clase10/tarea10-reto2-soft-sin-errores-firefox.png)
![Reto 2 - expect.soft() con atributos correctos (0 errores) - webkit](evidencias/clase10/tarea10-reto2-soft-sin-errores-webkit.png)
![Reto 2 - expect.soft() con atributos correctos (0 errores) - mobile-chrome](evidencias/clase10/tarea10-reto2-soft-sin-errores-mobile-chrome.png)
![Reto 2 - expect.soft() con atributos correctos (0 errores) - mobile-safari](evidencias/clase10/tarea10-reto2-soft-sin-errores-mobile-safari.png)

</details>

<details>
<summary> 15. Reto 2 - expect.soft() con 3 errores acumulados a propósito</summary>

![Reto 2 - expect.soft() con 3 errores acumulados a propósito - chromium](evidencias/clase10/tarea10-reto2-soft-3-errores-chromium.png)
![Reto 2 - expect.soft() con 3 errores acumulados a propósito - firefox](evidencias/clase10/tarea10-reto2-soft-3-errores-firefox.png)
![Reto 2 - expect.soft() con 3 errores acumulados a propósito - webkit](evidencias/clase10/tarea10-reto2-soft-3-errores-webkit.png)
![Reto 2 - expect.soft() con 3 errores acumulados a propósito - mobile-chrome](evidencias/clase10/tarea10-reto2-soft-3-errores-mobile-chrome.png)
![Reto 2 - expect.soft() con 3 errores acumulados a propósito - mobile-safari](evidencias/clase10/tarea10-reto2-soft-3-errores-mobile-safari.png)

</details>

<details>
<summary> 16. Reto 3 - Fixture browserName (User-Agent según el motor)</summary>

![Reto 3 - Fixture browserName (User-Agent según el motor) - chromium](evidencias/clase10/tarea10-reto3-user-agent-chromium.png)
![Reto 3 - Fixture browserName (User-Agent según el motor) - firefox](evidencias/clase10/tarea10-reto3-user-agent-firefox.png)
![Reto 3 - Fixture browserName (User-Agent según el motor) - webkit](evidencias/clase10/tarea10-reto3-user-agent-webkit.png)
![Reto 3 - Fixture browserName (User-Agent según el motor) - mobile-chrome](evidencias/clase10/tarea10-reto3-user-agent-mobile-chrome.png)
![Reto 3 - Fixture browserName (User-Agent según el motor) - mobile-safari](evidencias/clase10/tarea10-reto3-user-agent-mobile-safari.png)

</details>

<details>
<summary> 17. Reporte HTML multi-browser: 80 tests passed en 5 projects</summary>

![Reporte HTML clase10 y tarea10](evidencias/clase10/clase10-reporte-html.png)

</details>
