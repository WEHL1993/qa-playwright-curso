Reflexión sobre auto-wait vs. sleep()

Durante la realización de las pruebas automatizadas comprendí que existe una diferencia importante entre utilizar el auto-wait de Playwright y agregar esperas fijas mediante sleep() o waitForTimeout().

El auto-wait permite que Playwright espere automáticamente hasta que un elemento esté disponible para realizar una acción. Antes de hacer clic, escribir o seleccionar una opción, Playwright comprueba que el elemento sea visible, esté habilitado, sea estable y pueda recibir la interacción. Esto hace que las pruebas sean más confiables, ya que la espera depende del estado real de la página y no de una cantidad fija de tiempo.

Por otro lado, sleep() detiene la ejecución durante un tiempo determinado, aunque la página ya haya terminado de cargar. Por ejemplo, una espera de cinco segundos siempre consumirá esos cinco segundos, incluso cuando el elemento esté disponible desde el primer segundo. Además, si la página tarda más de lo esperado, la prueba puede fallar porque el tiempo establecido no fue suficiente.

Por esta razón, el uso excesivo de sleep() puede provocar pruebas lentas, inestables y difíciles de mantener. El auto-wait es una mejor alternativa porque se adapta al comportamiento de la aplicación y continúa la ejecución tan pronto como se cumplen las condiciones necesarias.

En conclusión, se recomienda utilizar el auto-wait y las esperas específicas de Playwright, como expect().toBeVisible(), waitForURL() o waitForLoadState(). Las esperas fijas deberían utilizarse únicamente de manera temporal para depurar una prueba o para simular una pausa intencional, pero no como la solución principal para sincronizar las pruebas automatizadas.
