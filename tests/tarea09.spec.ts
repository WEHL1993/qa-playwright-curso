// tests/tarea09.spec.ts
import { test as base, expect } from '@playwright/test';

// ======= RETO 1: Fixture con teardown real =======
// El setup (antes de use()) arranca un cronómetro; el teardown (después de
// use(), dentro de un finally) corre siempre al terminar el test -- incluso
// si el test falla -- e imprime cuánto tardó junto con el estado final.
type Reto1Fixtures = {
  cronometro: void;
};

const testReto1 = base.extend<Reto1Fixtures>({
  cronometro: async ({}, use, testInfo) => {
    const inicio = Date.now();
    console.log(`[Reto 1] Cronómetro iniciado para "${testInfo.title}"`);

    try {
      await use();
    } finally {
      // Este bloque corre siempre, tanto si el test pasó como si falló,
      // porque está dentro de un finally que envuelve use().
      const duracion = Date.now() - inicio;
      console.log(`[Reto 1] "${testInfo.title}" finalizó en ${duracion}ms (estado: ${testInfo.status})`);
    }
  },
});

testReto1.describe('Tarea 09 - Reto 1: Fixture con teardown real', () => {
  testReto1('Test que pasa: el teardown imprime la duración', async ({ page, cronometro }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page.locator('#login-button')).toBeVisible();
    await page.screenshot({ path: './evidencias/clase09/tarea09-reto1-paso1-test-pasa.png', fullPage: true });
  });

  // Marcado con test.fail() porque a propósito falla (assertion incorrecta),
  // para demostrar que el teardown del fixture se ejecuta también cuando el
  // test no pasa. test.fail() le dice a Playwright que este resultado es el
  // esperado, así que no rompe la suite en verde.
  testReto1('Test que falla a propósito: el teardown también se ejecuta', async ({ page, cronometro }) => {
    testReto1.fail();
    await page.goto('https://www.saucedemo.com');
    await page.screenshot({ path: './evidencias/clase09/tarea09-reto1-paso2-test-falla-a-proposito.png', fullPage: true });
    await expect(page.locator('#login-button')).toHaveText('Este texto no existe');
  });
});

// ======= RETO 2: Fixture de alcance worker =======
// Un fixture { scope: 'worker' } se crea UNA sola vez por worker y se
// reutiliza en todos los tests que corren en ese mismo worker. Para
// demostrar que su estado persiste entre tests, se expone un objeto (no un
// número plano) con un contador y un método para incrementarlo: como el
// fixture solo se instancia una vez, ambos tests reciben la MISMA
// referencia al objeto.
type ContadorWorker = { valor: number; incrementar: () => void };
type Reto2WorkerFixtures = { contadorWorker: ContadorWorker };

const testReto2 = base.extend<{}, Reto2WorkerFixtures>({
  contadorWorker: [async ({}, use) => {
    const estado: ContadorWorker = {
      valor: 1,
      incrementar() {
        this.valor++;
      },
    };
    console.log('[Reto 2] Fixture de worker creado (una sola vez por worker)');
    await use(estado);
  }, { scope: 'worker' }],
});

testReto2.describe('Tarea 09 - Reto 2: Fixture de alcance worker', () => {
  // mode: 'serial' garantiza que ambos tests corran en el mismo worker y en
  // orden, para poder observar la transición del contador de 1 a 2.
  testReto2.describe.configure({ mode: 'serial' });

  testReto2('Primer test: el contador de worker inicia en 1', async ({ contadorWorker, page }) => {
    expect(contadorWorker.valor).toBe(1);
    contadorWorker.incrementar();
    await page.setContent(`<h1>Reto 2 - Paso 1</h1><p>contadorWorker.valor = ${contadorWorker.valor}</p>`);
    await page.screenshot({ path: './evidencias/clase09/tarea09-reto2-paso1-contador-en-1.png', fullPage: true });
  });

  testReto2('Segundo test: el contador de worker sigue en 2 (mismo worker, mismo objeto)', async ({ contadorWorker, page }) => {
    expect(contadorWorker.valor).toBe(2);
    await page.setContent(`<h1>Reto 2 - Paso 2</h1><p>contadorWorker.valor = ${contadorWorker.valor}</p>`);
    await page.screenshot({ path: './evidencias/clase09/tarea09-reto2-paso2-contador-en-2.png', fullPage: true });
  });
});

// ======= RETO 3: test.use() + parametrización de viewports =======
// Combina test.use({ viewport }) con un loop sobre 2 tamaños de pantalla
// (móvil y escritorio) para correr el mismo test en ambos, cada uno dentro
// de su propio describe -- test.use() solo puede llamarse en el nivel
// superior de un describe, no dentro del cuerpo de un test.
const viewports = [
  { nombre: 'móvil', size: { width: 375, height: 667 } },
  { nombre: 'escritorio', size: { width: 1280, height: 800 } },
];

base.describe('Tarea 09 - Reto 3: test.use() + parametrización de viewports', () => {
  for (const vp of viewports) {
    base.describe(`Viewport: ${vp.nombre} (${vp.size.width}x${vp.size.height})`, () => {
      base.use({ viewport: vp.size });

      base(`El login se ve correctamente en ${vp.nombre}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
        await expect(page.locator('#login-button')).toBeVisible();

        const tamañoActual = page.viewportSize();
        expect(tamañoActual?.width).toBe(vp.size.width);
        expect(tamañoActual?.height).toBe(vp.size.height);

        await page.screenshot({ path: `./evidencias/clase09/tarea09-reto3-${vp.nombre}.png`, fullPage: true });
        console.log(`"${vp.nombre}": viewport verificado en ${tamañoActual?.width}x${tamañoActual?.height}`);
      });
    });
  }
});
