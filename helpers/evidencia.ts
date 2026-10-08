import { Page, TestInfo } from '@playwright/test';

// Guarda ./evidencias/clase10/<nombre>-<project>.png. El sufijo del project evita
// que los 5 navegadores sobrescriban la misma imagen en una corrida multi-browser.
export async function capturar(page: Page, testInfo: TestInfo, nombre: string) {
  await page.screenshot({
    path: `./evidencias/clase10/${nombre}-${testInfo.project.name}.png`,
  });
}
