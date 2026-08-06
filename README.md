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

