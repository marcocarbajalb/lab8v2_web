# **Laboratorio 8.v2:** Password Strength Meter

Componente React que mide la fortaleza de una contraseña en tiempo real, desarrollado siguiendo Test Driven Development (TDD).

## Stack

- Vite + React + TypeScript
- Vitest + React Testing Library
- Bun como package manager

## Instalación

```bash
bun install
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `bun run dev` | Levanta el servidor de desarrollo |
| `bun run build` | Genera el build de producción |
| `bun run test` | Corre los tests una vez |
| `bun run test:watch` | Corre los tests en modo watch |

## Nota sobre `bun test`

Este proyecto usa **Vitest**, no el test runner nativo de Bun. Por eso los tests se corren con `bun run test` (que ejecuta el script `test` del `package.json`) y no con `bun test`.