# Custom Hooks

> Generado: 2026-06-07
> Total hooks: **7**

---

## Hook Catalog

### `useHiveStore`
- **Archivo:** `src/store/useHiveStore.ts`
- **Tipo:** Zustand store
- **Estado:** tasks, activeTab, searchQuery, xp, level, achievements, etc.
- **Acciones:** addTask, toggleTask, deleteTask, updateTaskColumn, recordFocusSession, addXP, importTasks, etc.

### `useTasks`
- **Archivo:** `src/hooks/useTasks.ts`
- **Propósito:** Facade sobre useHiveStore para operaciones CRUD de tareas
- **Retorna:** tasks, filteredTasks, completedTasksCount, taskCompletionRate, totalPollenProduced

### `useBeeStats`
- **Archivo:** `src/hooks/useBeeStats.ts`
- **Propósito:** Métricas de enfoque y racha
- **Retorna:** totalFocusMins, streakCount, hiveRank, activeStatusText

### `useBeePersistence`
- **Archivo:** `src/hooks/useBeePersistence.ts`
- **Propósito:** Estado de guardado en IndexedDB (idle/saving/saved)
- **Retorna:** isSaving, isSaved, isIdle

### `useSessionTracker`
- **Archivo:** `src/hooks/useSessionTracker.ts`
- **Propósito:** Seguimiento de sesión sin login con heartbeat e inactivity timeout (5 min)
- **Retorna:** deviceId, isOnline, activeDuration, formattedDuration

### `useHiveProjection`
- **Archivo:** `src/hooks/useHiveProjection.ts`
- **Propósito:** Predicción de días restantes según ritmo de tareas/día
- **Retorna:** totalTasksCount, completedTasksCount, pendingTasksCount, remainingDays, advice

### `useDebounce`
- **Archivo:** `src/hooks/useDebounce.ts`
- **Propósito:** Debounce genérico para valores controlados

---

## Data Flow

```
Componentes → Custom Hooks → Zustand Store → IndexedDB (Dexie)
                                        ↕
                              Session Tracker → localStorage
                                        ↕
                              CSV Export/Import → File API
```
