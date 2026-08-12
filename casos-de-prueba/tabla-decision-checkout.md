# Tabla de decisión: proceso de checkout (Sauce Demo)

## Verificación previa del comportamiento real

Antes de construir la tabla se verificó en vivo (con un script Playwright exploratorio, no incluido en la suite final) el comportamiento real de `https://www.saucedemo.com` frente a los escenarios límite:

**¿Qué pasa si accedes a `checkout-step-one.html` sin sesión?**

El sitio **no redirige** a la pantalla de login. Permanece en `checkout-step-one.html` y muestra el mensaje `Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.`

**¿Qué pasa si el carrito está vacío al hacer checkout?**

El sitio **no bloquea** el proceso. Se puede completar el formulario, avanzar a `checkout-step-two.html` (con `Item total: $0`, `Tax: $0.00`, `Total: $0.00`) y finalizar la orden en `checkout-complete.html`.

**¿El mensaje de error es igual sin importar qué campo falta?**

No. El mensaje **no es igual** para todos los campos; la validación es secuencial (se valida un campo a la vez, en este orden):
  - Sin `First Name` → `Error: First Name is required`
  - Con `First Name`, sin `Last Name` → `Error: Last Name is required`
  - Con `First Name` y `Last Name`, sin `Postal Code` → `Error: Postal Code is required`

## Ejecutar y analizar

```
PS C:\qa-playwright-curso> npx playwright test tests/clase05.spec.ts --reporter=list

  ok 1 CE válida: login con credenciales correctas (2.4s)
  ok 2 CE inválida: usuario no existe (1.8s)
  ok 3 CE inválida: usuario bloqueado (2.0s)
  ok 4 Valor en frontera: campos vacíos (frontera de longitud mínima) (1.5s)
  ok 5 Verificar que el inventario tiene exactamente 6 productos (1.7s)
  ok 6 Verificar precio del primer producto con regex (1.4s)
  ok 7 Verificar atributos y estados de los elementos del inventario (1.6s)
  ok 8 Verificar múltiples propiedades del primer producto con soft assertions (1.5s)
  ok 9 Tabla de decisión - Regla 1: logueado con items -> puede pagar (1.4s)
  ok 10 Tabla de decisión - Regla 2: logueado sin items -> carrito vacío (1.7s)
  ok 11 Reto 1: ordenar catálogo por precio y verificar el value seleccionado (3.4s)
  ok 12 Reto 2: el campo de usuario recibe el foco al hacer clic (3.2s)
  ok 13 Reto 3: el botón "Add to cart" tiene cursor pointer (1.5s)

  13 passed (25.9s)
```

**Responde en tu reflexión:**

**1. ¿Cuántos tests cubren las clases de equivalencia del login?**

3 tests: "CE válida: login con credenciales correctas" (CE válida × CE válida), "CE inválida: usuario no existe" y "CE inválida: usuario bloqueado" (las dos sub-clases inválidas de `username`, cada una con su propio mensaje de error). El cuarto test de la sección A, "Valor en frontera: campos vacíos", no es clase de equivalencia sino análisis de valores en la frontera (la longitud mínima de un campo obligatorio es un valor límite, no un representante de una clase).

**2. ¿Qué assertion usarías para un precio > $0?**

Ninguna de las assertions de texto (`toHaveText`, `toContainText`, `toMatch`) sirve para comparar magnitudes, porque el precio es un string (`"$29.99"`). Hay que extraer el valor numérico y usar el matcher genérico `toBeGreaterThan`:

```ts
const texto = await page.locator('.inventory_item_price').first().textContent();
const precio = parseFloat(texto!.replace('$', ''));
expect(precio).toBeGreaterThan(0);
```

**3. ¿Cuándo usarías soft assertions?**

Cuando quiero verificar varias propiedades independientes de un mismo elemento o pantalla y necesito ver TODOS los fallos en un solo reporte, en vez de detenerme en el primero (como en el test 8, que revisa nombre, descripción, precio, botón e imagen del primer producto). Son útiles para checks de "salud general" de una UI o para regresión visual, donde cada verificación no depende de que las anteriores hayan pasado. No las usaría para condiciones bloqueantes del flujo (p. ej. que el login haya sido exitoso antes de seguir interactuando con la página), porque ahí sí quiero que el test se detenga de inmediato con `expect()` normal si la precondición falla.

## Condiciones

| # | Condición |
|---|-----------|
| C1 | Usuario autenticado (login exitoso) |
| C2 | Carrito con al menos 1 item |
| C3 | Formulario de checkout completo (First Name, Last Name y Postal Code llenos) |
| C4 | Clic en el botón "Finish" |

## Acciones

| # | Acción / Resultado |
|---|---------------------|
| A1 | Muestra error de sesión y bloquea el acceso a checkout |
| A2 | Muestra error de validación del formulario (campo faltante) |
| A3 | Avanza a "Checkout: Overview" (`checkout-step-two.html`) |
| A4 | Completa la orden (`checkout-complete.html`, "Thank you for your order!") |

## Tabla de decisión

| Condición / Acción | R1 | R2 | R3 | R4 | R5 | R6 |
|---|---|---|---|---|---|---|
| C1 – Usuario autenticado | No | Sí | Sí | Sí | Sí | Sí |
| C2 – Carrito con items | – | Sí | No | Sí | Sí | No |
| C3 – Formulario completo | – | No | Sí | Sí | Sí | Sí |
| C4 – Clic en "Finish" | – | – | No | No | Sí | Sí |
| A1 – Error de sesión | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| A2 – Error de validación | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| A3 – Avanza a Overview | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ |
| A4 – Completa la orden | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

## Notas por regla

- **R1:** sin sesión, cualquier intento de acceder a `checkout-step-one.html` muestra el error de sesión. No aplica evaluar C2, C3 ni C4 porque el sitio nunca deja completar el formulario.
- **R2:** logueado, con o sin items en el carrito, pero con el formulario incompleto (falta First Name, Last Name o Postal Code) → error de validación, permanece en `checkout-step-one.html`. El mensaje exacto varía según el campo faltante (ver verificación previa).
- **R3:** logueado, carrito **vacío**, formulario completo, pero **sin** hacer clic en Finish → llega a "Checkout: Overview" mostrando `Total: $0.00`.
- **R4:** logueado, carrito **con items**, formulario completo, **sin** hacer clic en Finish → llega a "Checkout: Overview" con el total real de los productos.
- **R5:** logueado, carrito **con items**, formulario completo, clic en Finish → orden completada normalmente.
- **R6:** logueado, carrito **vacío**, formulario completo, clic en Finish → el sitio **permite completar la orden igualmente**, con `Total: $0.00`. Este es el caso más contraintuitivo: Sauce Demo no valida que el carrito tenga items antes de finalizar la compra.
