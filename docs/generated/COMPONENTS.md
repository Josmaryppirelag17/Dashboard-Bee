# Component Catalog

> Generado: 2026-06-07
> Total components: **9**
> Patrón: **Atomic Design**

---

## Atoms — UI primitives (4)

### `<Badge />`
- **Archivo:** `src/components/atoms/Badge.tsx`
- **Variantes:** `high` (rojo), `medium` (ámbar), `low` (verde), `neutral` (gris)
- **Uso:** Indicador visual de prioridad de tarea

### `<HexButton />`
- **Archivo:** `src/components/atoms/HexButton.tsx`
- **Variantes:** `primary`, `secondary`
- **Uso:** Botón principal con icono de panal

### `<PollenIndicator />`
- **Archivo:** `src/components/atoms/PollenIndicator.tsx`
- **Uso:** Muestra 1-5 hexágonos de esfuerzo (polen) por tarea

### `<ProgressHex />`
- **Archivo:** `src/components/atoms/ProgressHex.tsx`
- **Uso:** Hexágono animado con barra de progreso circular para métricas

---

## Molecules — Groups of atoms (1)

### `<TaskCard />` (Compound Component)
- **Archivo:** `src/components/molecules/TaskCard.tsx`
- **Subcomponentes:** `Checkbox`, `Body`, `Pollen`, `Actions`, `DragHandle`
- **Uso:** Tarjeta de tarea con check, título, badges, indicador de polen y editor Markdown lazy-loaded
- **Drag & Drop:** Compatible con @dnd-kit sortable

---

## Organisms — Complex sections (4)

### `<FocusTimer />`
- **Archivo:** `src/components/organisms/FocusTimer.tsx`
- **Uso:** Temporizador Pomodoro configurable (15/25/45/60 min) con:
  - Selector de tarea activa (mueve de "todo" a "in_progress")
  - Confirmación al completar (completada / devolver a pendiente)
  - Panel honeycomb dinámico con todas las tareas como celdas
  - Sonido, pausa, reinicio

### `<TaskBoard />`
- **Archivo:** `src/components/organisms/TaskBoard.tsx`
- **Uso:** Kanban con 3 columnas (Por hacer / En proceso / Completado)
  - Drag & Drop con @dnd-kit
  - Filtro por categoría y búsqueda global
  - Formulario de nueva tarea con prioridad y esfuerzo

### `<Sidebar />`
- **Archivo:** `src/components/organisms/Sidebar.tsx`
- **Uso:** Navegación lateral colapsable con:
  - 3 tabs: Dashboard, Focus, Analytics
  - Selector de idioma (ES/EN)
  - Barra de XP y nivel
  - Perfil de abeja con nombre aleatorizable

### `<StatsChart />`
- **Archivo:** `src/components/organisms/StatsChart.tsx`
- **Uso:** Gráfico SVG de área semanal con:
  - Métricas: tiempo de foco y eficiencia (%)
  - Tooltip interactivo por día
  - Resumen: total focus, media diaria, eficiencia promedio

### `<MetricCard />`
- **Archivo:** `src/components/organisms/MetricCard.tsx`
- **Uso:** Tarjeta de métrica con hexágono de progreso y sparkline SVG

### `<HiveProjectionCard />`
- **Archivo:** `src/components/organisms/HiveProjectionCard.tsx`
- **Uso:** Predicción de días restantes con slider de ritmo diario

### `<MarkdownNotesEditor />`
- **Archivo:** `src/components/organisms/MarkdownNotesEditor.tsx`
- **Uso:** Editor Markdown inline con vista previa y autoguardado (lazy-loaded)

### `<MainTemplate />`
- **Archivo:** `src/components/organisms/MainTemplate.tsx`
- **Uso:** Layout principal con slots para sidebar, header y contenido

---

## Design System

- **Paleta:** Miel (#e28800), Ámbar (#faa715), Crema (#faf6ee), Borde (#ebdcb9)
- **Tipografía:** Sistema sans-serif, mono para datos numéricos
- **Iconos:** Lucide React
- **Animaciones:** Motion (Framer Motion)
