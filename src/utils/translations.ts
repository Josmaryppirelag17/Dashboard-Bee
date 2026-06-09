export interface TranslationDictionary {
  sidebar: {
    dashboard: string;
    focus: string;
    analytics: string;
    badgeActive: string;
    beekeeprTitle: string;
    collapseMenu: string;
    expand: string;
    collapse: string;
  };
  header: {
    panalUtc: string;
    searchPlaceholder: string;
    exportCsv: string;
    exportCsvLoading: string;
    exportTooltip: string;
    manualTooltip: string;
  };
  help: {
    title: string;
    close: string;
    intro: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    bullet5: string;
  };
  welcome: {
    badge: string;
    title: string;
    desc: string;
    focusBtn: string;
    clearBtn: string;
    metricsTitle: string;
    rankLabel: string;
    effLabel: string;
    harvestLabel: string;
  };
  metrics: {
    focusMins: string;
    focusMinsSub: string;
    completedTasks: string;
    completedTasksSub: string;
    pollenHarvested: string;
    pollenHarvestedSub: string;
    colonyStreak: string;
    colonyStreakSub: string;
    consistent: string;
    days: string;
  };
  kanban: {
    title: string;
    filterAll: string;
    colTodo: string;
    colInProgress: string;
    colCompleted: string;
    noTasks: string;
    newBtn: string;
    formTitle: string;
    formTitlePlaceholder: string;
    formPriority: string;
    formCategory: string;
    formPollen: string;
    formAddBtn: string;
    formCancelBtn: string;
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;
    catMaintenance: string;
    catHoney: string;
    catNectar: string;
    catSecurity: string;
  };
  timer: {
    focusTitleActive: string;
    focusTitlePassive: string;
    focusTag: string;
    breakTag: string;
    description: string;
    focusTime: string;
    breakTime: string;
    startFocus: string;
    pause: string;
    resume: string;
    startBreak: string;
    resetInterval: string;
    assignedTask: string;
    unassignedTask: string;
    noActiveTasks: string;
    dailyGridTitle: string;
    completeMinsGoal: string;
    repleteNectar: string;
  };
  projection: {
    title: string;
    subtitle: string;
    desc: string;
    speedLabel: string;
    speedUnit: string;
    pendingTasks: string;
    estimatedDays: string;
    capPollen: string;
    streakDays: string;
    goalEfficiency: string;
  };
  stats: {
    splineTitle: string;
    splineSubtext: string;
    focusMinsToggle: string;
    tasksToggle: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
    axisMins: string;
    axisTasks: string;
  };
  notes: {
    title: string;
    close: string;
    placeholder: string;
    editorTab: string;
    previewTab: string;
    shortcutBold: string;
    shortcutItalic: string;
    shortcutList: string;
    shortcutCode: string;
  };
  toasts: {
    taskAdded: string;
    taskCompleted: string;
    taskActive: string;
    addFromDepot: string;
    clearedTasks: string;
    exportSuccess: string;
    exportEmpty: string;
    exportError: string;
    focusCompleted: string;
    sessionCompletePollen: string;
    breakDoneReturn: string;
  };
}

export const translations: Record<"es" | "en", TranslationDictionary> = {
  es: {
    sidebar: {
      dashboard: "Celdas Principales",
      focus: "Pomodoro de Foco",
      analytics: "Productividad",
      badgeActive: "Activo",
      beekeeprTitle: "Apicultor Jefe",
      collapseMenu: "Contraer Menú",
      expand: "Expandir",
      collapse: "Contraer",
    },
    header: {
      panalUtc: "PANAL UTC",
      searchPlaceholder: "Buscar labor o nota...",
      exportCsv: "Exportar CSV",
      exportCsvLoading: "Exportando...",
      exportTooltip: "Exportar datos a CSV",
      manualTooltip: "Manual del Apicultor",
    },
    help: {
      title: "Manual del Apicultor Jefe",
      close: "Cerrar",
      intro: "¡Bienvenido a BeeHive Productivity! Maximiza la producción de tu jornada:",
      bullet1:
        "Celdas Principales: Supervisa en tiempo real tus métricas con los hexágonos con barras de progreso animadas.",
      bullet2:
        "Depósito de Labores (KanBan): Gestiona objetivos diarios arrastrando las tareas entre columnas de forma fluida.",
      bullet3:
        "Búsqueda Inteligente: Filtra tareas o notas al instante escribiendo en la barra superior (atajo: presiona la tecla /).",
      bullet4:
        'Exportación de Datos: Pulsa "Exportar CSV" para descargar un archivo comprimido de tus labores de producción en formato Excel compatible.',
      bullet5:
        "Notas Markdown: Haz clic en el título de cualquier tarea o su icono de diario para expandir un editor de texto con accesos rápidos y previsualizador en tiempo real.",
    },
    welcome: {
      badge: "Acceso Apicultura",
      title: "¡Bienvenido al enjambre, ",
      desc: "Tus labores del panal están organizadas. Categoría actual: {rank}. Eficiencia de metas: {completion}% y has cosechado {pollen}u de polen fresco.",
      focusBtn: "Focus Pomodoro",
      clearBtn: "Limpiar Completados",
      metricsTitle: "Métricas del Panal de Producción",
      rankLabel: "Rango de la Reina",
      effLabel: "Grado de Constancia",
      harvestLabel: "Sesión de Foco Total",
    },
    metrics: {
      focusMins: "Minutos de Foco",
      focusMinsSub: "Rendimiento diario",
      completedTasks: "Labores Completadas",
      completedTasksSub: "Porcentaje de metas",
      pollenHarvested: "Polen Cosechado",
      pollenHarvestedSub: "Esfuerzo acumulado",
      colonyStreak: "Racha de la Colonia",
      colonyStreakSub: "Último periodo activo",
      consistent: "Consistente",
      days: "días",
    },
    kanban: {
      title: "Depósito de Labores",
      filterAll: "Todas las Categorías",
      colTodo: "Por Recolectar",
      colInProgress: "En Proceso",
      colCompleted: "Recolectado",
      noTasks: "No hay labores en esta celda...",
      newBtn: "Nueva Labor",
      formTitle: "Descripción de la Labor",
      formTitlePlaceholder: "Ej. Recolectar estadísticas semanales de producción...",
      formPriority: "Prioridad",
      formCategory: "Categoría de Celda",
      formPollen: "Esfuerzo (Polen)",
      formAddBtn: "Ingresar Labor",
      formCancelBtn: "Cancelar",
      priorityLow: "Prioridad Baja",
      priorityMedium: "Prioridad Media",
      priorityHigh: "Prioridad Alta",
      catMaintenance: "🐝 Cría (Mantenimiento)",
      catHoney: "🍯 Producción (Miel)",
      catNectar: "🌸 Recolección (Néctar)",
      catSecurity: "🛡️ Defensa (Seguridad)",
    },
    timer: {
      focusTitleActive: "Concentración Activa",
      focusTitlePassive: "Cámara del Silencio (Concentración)",
      focusTag: "Tiempo de Enfoque:",
      breakTag: "Tiempo de Descanso:",
      description:
        "Utiliza la respiración estructurada de la celda de concentración para canalizar tu atención profunda.",
      focusTime: "Tiempo Foco",
      breakTime: "Tiempo Descanso",
      startFocus: "Iniciar Enfoque",
      pause: "Pausar",
      resume: "Reanudar Foco",
      startBreak: "Iniciar Descanso",
      resetInterval: "Reiniciar Intervalo",
      assignedTask: "Labor Activa asignada:",
      unassignedTask: "Cambiar labor en depósito",
      noActiveTasks: "Asigna una labor de tu depósito para enfocar...",
      dailyGridTitle: "CELDAS DE TRABAJO DIARIO (7 INTERVALOS EN COOP)",
      completeMinsGoal: "Completa celdas de foco para ascender la colonia.",
      repleteNectar: "¡Panal repleto de néctar!",
    },
    projection: {
      title: "Predicciones del Acopio",
      subtitle: "Simulador de Carga de Trabajo",
      desc: "La reina calcula cuándo finalizarás el panal basándose en tu ritmo diario de recolección.",
      speedLabel: "Velocidad de Carga de Tareas:",
      speedUnit: "tareas/día",
      pendingTasks: "Labores pendientes",
      estimatedDays: "Días estimados",
      capPollen: "Capacidad Polen",
      streakDays: "Días de Racha",
      goalEfficiency: "Eficiencia de Meta",
    },
    stats: {
      splineTitle: "Curva del Acopio Semanal",
      splineSubtext: "Producción de néctar de polen y minutos de enfoque correlacionados",
      focusMinsToggle: "Minutos de Foco",
      tasksToggle: "Labores Cosechadas",
      mon: "Lunes",
      tue: "Martes",
      wed: "Miércoles",
      thu: "Jueves",
      fri: "Viernes",
      sat: "Sábado",
      sun: "Domingo",
      axisMins: "Minutos",
      axisTasks: "Labores Completo",
    },
    notes: {
      title: "Notas de la labor",
      close: "Cerrar",
      placeholder: "Empieza a escribir notas...",
      editorTab: "Editor",
      previewTab: "Previsualizar",
      shortcutBold: "Negrita",
      shortcutItalic: "Cursiva",
      shortcutList: "Lista",
      shortcutCode: "Código",
    },
    toasts: {
      taskAdded: "¡Nueva labor ingresada al panal con éxito!",
      taskCompleted: "¡Labor completada! Celda colmada de miel",
      taskActive: "Labor devuelta a recolección activa",
      addFromDepot: "Ingresa una labor en el Depósito de Labores para activarla.",
      clearedTasks: "Se han vaciado las labores recolectadas del panal",
      exportSuccess: "¡Celdas exportadas a CSV con éxito!",
      exportEmpty: "No hay labores en el panal para exportar",
      exportError: "Error al procesar la exportación del CSV",
      focusCompleted: "¡Sesión de foco completada! Has registrado {mins} minutos de polen extra",
      sessionCompletePollen:
        "Sesión completada. Tu colmena ha producido 1 celda de polen fresco. ¡A descansar!",
      breakDoneReturn: "Descanso finalizado. Retorna a tu celda del panal para seguir enfocándote.",
    },
  },
  en: {
    sidebar: {
      dashboard: "Main Cells",
      focus: "Focus Pomodoro",
      analytics: "Productivity",
      badgeActive: "Active",
      beekeeprTitle: "Chief Beekeeper",
      collapseMenu: "Collapse Menu",
      expand: "Expand",
      collapse: "Collapse",
    },
    header: {
      panalUtc: "UTC BEEHIVE",
      searchPlaceholder: "Search task or note...",
      exportCsv: "Export CSV",
      exportCsvLoading: "Exporting...",
      exportTooltip: "Export data to CSV",
      manualTooltip: "Beekeeper Manual",
    },
    help: {
      title: "Chief Beekeeper's Manual",
      close: "Close",
      intro: "Welcome to BeeHive Productivity! Maximize your daily output:",
      bullet1:
        "Main Cells: Monitor your metrics in real-time with hexagons featuring animated progress bars.",
      bullet2:
        "Task Depot (Kanban): Manage daily objectives by dragging tasks between columns fluidly.",
      bullet3:
        "Smart Search: Filter tasks or notes instantly by typing in the top bar (shortcut: press /).",
      bullet4:
        'Data Export: Click "Export CSV" to download an Excel-compatible file of your production tasks.',
      bullet5:
        "Markdown Notes: Click any task's title or diary icon to expand a text editor with rich shortcuts and real-time preview.",
    },
    welcome: {
      badge: "Beekeeper Access",
      title: "Welcome to the swarm, ",
      desc: "Your hive tasks are organized. Current rank: {rank}. Goal efficiency: {completion}% and you have harvested {pollen}u of fresh pollen.",
      focusBtn: "Focus Pomodoro",
      clearBtn: "Clear Completed",
      metricsTitle: "Production Hive Metrics",
      rankLabel: "Queen's Rank",
      effLabel: "Consistency Rate",
      harvestLabel: "Total Focus Space",
    },
    metrics: {
      focusMins: "Focus Minutes",
      focusMinsSub: "Daily performance",
      completedTasks: "Completed Tasks",
      completedTasksSub: "Goal completion rate",
      pollenHarvested: "Harvested Pollen",
      pollenHarvestedSub: "Accumulated effort",
      colonyStreak: "Colony Streak",
      colonyStreakSub: "Last active period",
      consistent: "Consistent",
      days: "days",
    },
    kanban: {
      title: "Task Depot",
      filterAll: "All Categories",
      colTodo: "To Gather",
      colInProgress: "In Progress",
      colCompleted: "Harvested",
      noTasks: "No tasks in this cell...",
      newBtn: "New Task",
      formTitle: "Task Description",
      formTitlePlaceholder: "e.g. Gather weekly production statistics...",
      formPriority: "Priority",
      formCategory: "Cell Category",
      formPollen: "Workload (Pollen)",
      formAddBtn: "Add Task",
      formCancelBtn: "Cancel",
      priorityLow: "Low Priority",
      priorityMedium: "Medium Priority",
      priorityHigh: "High Priority",
      catMaintenance: "🐝 Larvae (Maintenance)",
      catHoney: "🍯 Production (Honey)",
      catNectar: "🌸 Foraging (Nectar)",
      catSecurity: "🛡️ Defense (Security)",
    },
    timer: {
      focusTitleActive: "Active Concentration",
      focusTitlePassive: "Chamber of Silence (Concentration)",
      focusTag: "Focus Time:",
      breakTag: "Break Time:",
      description: "Use structured breathing in the concentration chamber to channel deep focus.",
      focusTime: "Focus Time",
      breakTime: "Break Time",
      startFocus: "Start Focus",
      pause: "Pause",
      resume: "Resume Focus",
      startBreak: "Start Break",
      resetInterval: "Reset Interval",
      assignedTask: "Assigned Active Task:",
      unassignedTask: "Change task in depot",
      noActiveTasks: "Assign a task from your depot to focus...",
      dailyGridTitle: "DAILY HIVE INTERVALS (7 COOP CELLS)",
      completeMinsGoal: "Complete focus cells to grow the colony.",
      repleteNectar: "Comb overflowing with nectar!",
    },
    projection: {
      title: "Forage Predictions",
      subtitle: "Workload Simulator",
      desc: "The queen predicts when you will finish the comb based on your daily rate of gathering.",
      speedLabel: "Task Processing Speed:",
      speedUnit: "tasks/day",
      pendingTasks: "Pending tasks",
      estimatedDays: "Estimated days",
      capPollen: "Pollen Capacity",
      streakDays: "Streak Days",
      goalEfficiency: "Goal Efficiency",
    },
    stats: {
      splineTitle: "Weekly Forage Curve",
      splineSubtext: "Pollen nectar production correlated with focus minutes",
      focusMinsToggle: "Focus Minutes",
      tasksToggle: "Harvested Tasks",
      mon: "Monday",
      tue: "Tuesday",
      wed: "Wednesday",
      thu: "Thursday",
      fri: "Friday",
      sat: "Saturday",
      sun: "Sunday",
      axisMins: "Minutes",
      axisTasks: "Completed Tasks",
    },
    notes: {
      title: "Task Notes",
      close: "Close",
      placeholder: "Write notes here...",
      editorTab: "Editor",
      previewTab: "Preview",
      shortcutBold: "Bold",
      shortcutItalic: "Italic",
      shortcutList: "List",
      shortcutCode: "Code",
    },
    toasts: {
      taskAdded: "New task successfully entered into the comb!",
      taskCompleted: "Task completed! Cell filled with honey",
      taskActive: "Task returned to active gathering",
      addFromDepot: "Enter a task in the Task Depot to activate it.",
      clearedTasks: "Harvested tasks cleared from the comb",
      exportSuccess: "Cells successfully exported to CSV!",
      exportEmpty: "No tasks in the comb to export",
      exportError: "Error processing CSV export",
      focusCompleted: "Focus session completed! You registered {mins} minutes of extra pollen",
      sessionCompletePollen:
        "Session completed. Your hive has produced 1 unit of fresh pollen. Rest time!",
      breakDoneReturn: "Break ended. Return to your comb cell to continue focusing.",
    },
  },
};
