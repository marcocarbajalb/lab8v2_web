# Laboratorio 8v2: Password Strength Meter

Sistemas y tecnologías web - S40
> Marco Carbajal (23025)

Componente React que mide la fortaleza de una contraseña en tiempo real, desarrollado siguiendo Test Driven Development (TDD) estricto.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Vitest** + **React Testing Library** + **jsdom** para testing
- **ESLint** para linting
- **Bun** como package manager y runtime
- **GitHub Actions** para CI

## Requisitos

- [Bun](https://bun.sh) (cualquier versión reciente)
- Para coverage: [Node.js](https://nodejs.org) (≥18) porque `@vitest/coverage-v8` requiere las APIs de coverage del runtime de V8 expuestas por Node, que Bun aún no implementa completamente.

## Instalación

```bash
bun install
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `bun run dev` | Levanta el servidor de desarrollo en `http://localhost:5173` |
| `bun run build` | Genera el build de producción |
| `bun run preview` | Previsualiza el build de producción |
| `bun run test` | Corre todos los tests una vez |
| `bun run test:watch` | Corre los tests en modo watch |
| `bun run test:coverage` | Corre los tests y genera reporte de cobertura |
| `bun run lint` | Corre ESLint sobre todo el proyecto |
| `bun run lint:fix` | Corre ESLint aplicando correcciones automáticas |

### Nota sobre `bun test`

Este proyecto usa **Vitest**, no el test runner nativo de Bun. Por eso los tests se ejecutan con `bun run test` (que invoca el script `test` del `package.json`), no con `bun test` directamente.

## Estructura del proyecto

src/
├── components/
│   ├── PasswordStrengthMeter.tsx       # Componente principal
│   ├── PasswordStrengthMeter.css       # Estilos del componente
│   └── PasswordStrengthMeter.test.tsx  # Tests del componente
├── logic/
│   ├── calculateStrength.ts            # Lógica pura de cálculo
│   └── calculateStrength.test.ts       # Tests unitarios de la lógica
├── test/
│   └── setup.ts                        # Setup global de Vitest
├── App.tsx                             # Entry point del componente
├── index.css                           # Estilos globales (dark theme)
└── main.tsx                            # Bootstrap de React

La separación entre lógica pura (`calculateStrength`) y componente (`PasswordStrengthMeter`) es intencional: la función de cálculo no depende de React y puede testearse de forma aislada. El componente la importa y solo se encarga del manejo de estado del input y la renderización.

## Reglas de fortaleza

| Condición | Fortaleza |
|---|---|
| Contraseña vacía | `vacía` |
| Menos de 8 caracteres | `débil` |
| 8+ caracteres, solo letras | `media` |
| 8+ caracteres, con al menos un número | `fuerte` |
| 8+ caracteres, con número y símbolo | `muy fuerte` |

Un símbolo se define como cualquier carácter que no sea letra ni número (incluyendo espacios).

## Flujo TDD seguido

Este proyecto se desarrolló siguiendo estrictamente el ciclo **red, green, refactor** propio de Test Driven Development. El historial de commits es la evidencia de ese flujo:

1. **Configuración inicial**: se levantó el proyecto con Vite, se instaló y configuró Vitest + React Testing Library, y se documentó el README inicial. En esta fase no existía aún ningún código de producción.

2. **RED - tests primero**: se escribieron **todos los tests** del componente y de la lógica pura antes que cualquier implementación. Al correr `bun run test` en este commit, los 16 tests fallan porque los módulos `calculateStrength.ts` y `PasswordStrengthMeter.tsx` ni siquiera existen. Este es el commit clave que evidencia el flujo TDD.

3. **GREEN - implementación mínima**: se implementó primero la función pura `calculateStrength` (volviendo verdes los 9 tests de lógica) y después el componente React (volviendo verdes los 7 tests de UI). Total: 16 tests en verde.

4. **REFACTOR**: con los tests en verde como red de seguridad, se extrajeron constantes de fortaleza a un objeto `STRENGTH_LEVELS` y se mejoró la legibilidad del componente. Ningún test fue modificado durante el refactor, lo que es una comprobación esencial de que el refactor preserva comportamiento.

5. **Extras con TDD**: la barra de progreso accesible se desarrolló con su propio mini-ciclo TDD; primero un commit rojo con los 5 tests de la barra, después un commit verde con la implementación.

### Filosofía de los tests

Los tests están enfocados en **comportamiento observable**, no en detalles de implementación:

- Las consultas usan `getByLabelText` y `getByRole` en lugar de selectores por id o clase, lo que garantiza implícitamente que el componente es accesible.
- Las interacciones se simulan con `userEvent` (no `fireEvent`), porque reproducen mejor la secuencia real de eventos que dispara un usuario al escribir o borrar.
- La barra de progreso se testea por sus atributos ARIA (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`), no por su CSS. Los colores y anchos son responsabilidad del estilizado y no se verifican en tests.

## Cobertura de tests

El proyecto alcanza **100% de cobertura en líneas, ramas y funciones** en los archivos de lógica y componente. Para generar el reporte:

```bash
bun run test:coverage
```

El reporte HTML navegable se genera en `coverage/index.html`.

## Integración continua

Cada push y cada pull request a la rama `main` dispara un workflow de GitHub Actions definido en `.github/workflows/ci.yml` que ejecuta, en orden: lint, tests y build. El badge de estado puede verse en la pestaña Actions del repositorio.

## Accesibilidad

El componente es accesible: el `<input>` está asociado a su `<label>` mediante `htmlFor`/`id`, y la barra de progreso expone los atributos ARIA estándar (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`). Los tests usan queries por label y por rol, lo que valida implícitamente la accesibilidad en cada test de comportamiento.