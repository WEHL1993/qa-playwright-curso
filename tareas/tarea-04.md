# Tarea 04 — Reflexión

## ¿Cuál de los 7 principios ISTQB te parece más importante y por qué?

De los 7 principios, el que más impacto tiene en el trabajo diario de QA es el
**Principio 2: las pruebas exhaustivas son imposibles**.

En el laboratorio de esta clase, el test "Intentar login con credenciales
incorrectas" no prueba todas las combinaciones posibles de usuario y
contraseña inválidos, solo un caso representativo (`usuario_que_no_existe` /
`password_incorrecta`). Sería imposible, y poco útil, probar cada combinación
de caracteres posible: el espacio de casos es infinito. Lo que sí es posible
es usar el riesgo y las prioridades para elegir qué probar, como pide el
principio.

Este principio me parece el más importante porque es la base que justifica
todas las decisiones de diseño de pruebas que se toman después: si no se
puede probar todo, hay que decidir *qué* probar y *por qué*, y ahí es donde
entran las técnicas de diseño (partición de equivalencia, valores límite,
etc.). Sin aceptar este principio, se cae en la
falsa sensación de seguridad de creer que "más tests" siempre significa
"más calidad", cuando en realidad importa más la cobertura de los casos de
mayor riesgo que la cantidad de casos ejecutados.

Además, se relaciona directamente con el Principio 1 (las pruebas muestran
defectos, no su ausencia): como nunca se puede probar exhaustivamente, nunca
se puede afirmar que el software está libre de errores, solo que los casos
que sí se probaron pasaron correctamente.
