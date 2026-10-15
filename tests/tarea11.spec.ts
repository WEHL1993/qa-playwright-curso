import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com';
const TEXTO_CORRECTO = "Sometimes you'll see a typo, other times you won't.";

test.describe('Tarea 11 - Documentar defectos con Playwright', () => {

  // Reto 3: borrador de reporte en Markdown cuando el test termina con errores.
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.errors.length === 0) return;
    const borrador = [
      `# Borrador de bug - ${testInfo.title}`,
      `**Título:** ${testInfo.title}`,
      `**Ambiente:** ${testInfo.project.name} (${process.platform})`,
      `**URL:** ${page.url()}`,
      '## Resultado obtenido',
      ...testInfo.errors.map(e => `- ${(e.message ?? '').split('\n')[0]}`),
    ].join('\n');
    await testInfo.attach('borrador-bug-report', { body: borrador, contentType: 'text/markdown' });
  });

  // Captura de evidencia por reto (el reto 2 se omite con test.fixme y no navega).
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'skipped') return;
    const reto = testInfo.title.match(/^Reto (\d)/)?.[1];
    const nombres: Record<string, string> = { '1': 'frecuencia-typos', '3': 'borrador-bug-report' };
    if (!reto || !nombres[reto]) return;
    await page.screenshot({
      path: `./evidencias/clase11/tarea11-reto${reto}-${nombres[reto]}-${testInfo.project.name}.png`,
    });
  });

  // Reto 1: medir un defecto intermitente
  test('Reto 1: medir la frecuencia del defecto intermitente en /typos', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const intentos = 12;
    let conError = 0;
    for (let i = 0; i < intentos; i++) {
      await page.goto(`${BASE_URL}/typos`, { waitUntil: 'domcontentloaded' });
      const texto = (await page.locator('main').innerText()).replace(/[’‘]/g, "'");
      if (!texto.includes(TEXTO_CORRECTO)) conError++;
    }
    const frecuencia = `${conError} de ${intentos} cargas con error de texto`;
    await testInfo.attach('frecuencia-typos', { body: frecuencia, contentType: 'text/plain' });
    testInfo.annotations.push({ type: 'frecuencia', description: frecuencia });
    expect(conError).toBeLessThanOrEqual(intentos);
  });

  // Reto 2: test.fixme enlazado a un issue
  test('Reto 2: el texto de /typos no debe tener errores',
    { annotation: { type: 'issue', description: 'https://github.com/WEHL1993/qa-playwright-curso/issues/1' } },
    async ({ page }) => {
      test.fixme(true, 'Defecto abierto: /typos muestra errores de texto de forma intermitente');
      await page.goto(`${BASE_URL}/typos`);
      await expect(page.locator('main')).toContainText(TEXTO_CORRECTO);
    });

  test('Reto 3: el borrador se genera solo si el test tiene errores', async ({ page }) => {
    await page.goto(`${BASE_URL}/typos`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
