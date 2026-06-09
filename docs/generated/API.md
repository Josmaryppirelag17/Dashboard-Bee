# API Reference

> Generado: 2026-06-07
> Plataforma: **Web (Next.js) — Client-side SPA**
> Endpoints: 3 (health/status)

---

## Arquitectura

Esta aplicación es principalmente **client-side**. Los datos de tareas, sesiones y gamificación se almacenan en **IndexedDB** (navegador) mediante Dexie.js. No requiere backend ni base de datos externa para su funcionamiento principal.

## Next.js API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/health` | Health check del servidor |
| `GET` | `/api/latest` | Versión actual de la API |
| `GET` | `/api/v1` | Endpoint API v1 (placeholder) |

### `GET /api/health`
**Archivo:** `src/app/api/health/route.ts`
**Retorna:** `{ status: "ok", timestamp: string }`

---

## Persistencia (Client-side)

| Almacenamiento | Tecnología | Propósito |
|---------------|------------|-----------|
| IndexedDB | Dexie.js | Tareas, notas, configuraciones |
| localStorage | — | XP, nivel, logros, rachas, métricas semanales, deviceId de sesión |

## Exportación de datos

- **Formato:** CSV (UTF-8 BOM, compatible con Excel)
- **Headers:** ID, Título, Completado, Prioridad, Categoría, Pollen/Esfuerzo, Columna, Notas
- **Importación:** Parseo inteligente con soporte ES/EN
