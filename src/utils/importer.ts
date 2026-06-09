import { Task, PriorityLevel, ColumnId } from "../types";

/**
 * Parses and processes a CSV string into an array of Task properties.
 * Designed to handle both Spanish and English columns.
 */
export function parseTasksCSV(csvText: string): Omit<Task, "id">[] {
  const lines = csvText.split(/\r?\n/);
  if (lines.length <= 1) return [];

  // Parse header line to determine indexing
  const headerLine = (lines[0] ?? "").toLowerCase();

  // Quick split by comma
  const headers = headerLine.split(",").map((h) => h.trim().replace(/^"|"$/g, ""));

  const parsedTasks: Omit<Task, "id">[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = (lines[i] ?? "").trim();
    if (!line) continue;

    // Parse items respecting potential quotes
    const cells: string[] = [];
    let insideQuote = false;
    let currentCell = "";

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        insideQuote = !insideQuote;
      } else if (char === "," && !insideQuote) {
        cells.push(currentCell.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));

    if (cells.length < 2) continue;

    // Set default standard positions (matching exporter default fallback)
    let titleIdx = 1; // Título
    let completedIdx = 2; // Completado
    let priorityIdx = 3; // Prioridad
    let categoryIdx = 4; // Categoría
    let pollenIdx = 5; // Pollen/Esfuerzo
    let columnIdx = 6; // Columna
    let notesIdx = 7; // Notas

    // Adjust positions based on parsed CSV headers
    headers.forEach((h, idx) => {
      const field = h.toLowerCase();
      if (field.includes("tít") || field.includes("title")) titleIdx = idx;
      else if (field.includes("compl")) completedIdx = idx;
      else if (field.includes("prior")) priorityIdx = idx;
      else if (field.includes("categ") || field.includes("depó") || field.includes("depot"))
        categoryIdx = idx;
      else if (
        field.includes("pollen") ||
        field.includes("esfuer") ||
        field.includes("pólen") ||
        field.includes("pollen/esfuerzo")
      )
        pollenIdx = idx;
      else if (field.includes("column") || field.includes("colum")) columnIdx = idx;
      else if (field.includes("not")) notesIdx = idx;
    });

    const title = cells[titleIdx] || "Tareas Importadas del Panal";

    // Parse Completed
    const completedStr = (cells[completedIdx] || "").toUpperCase();
    const completed =
      completedStr === "SÍ" ||
      completedStr === "SI" ||
      completedStr === "YES" ||
      completedStr === "TRUE";

    // Parse Priority
    let priority = PriorityLevel.MEDIUM;
    const prioStr = (cells[priorityIdx] || "").toUpperCase();
    if (prioStr.includes("BAJ") || prioStr.includes("LOW")) {
      priority = PriorityLevel.LOW;
    } else if (prioStr.includes("ALT") || prioStr.includes("HIGH")) {
      priority = PriorityLevel.HIGH;
    }

    // Parse Category
    const category = cells[categoryIdx] || "General";

    // Parse Pollen Units / Effort
    let pollenUnits = parseInt(cells[pollenIdx] ?? "", 10);
    if (isNaN(pollenUnits) || pollenUnits < 1) pollenUnits = 1;
    if (pollenUnits > 5) pollenUnits = 5;

    // Parse Column Index
    let columnId: ColumnId = "todo";
    const colStr = (cells[columnIdx] || "").toLowerCase();
    if (colStr.includes("in_progress") || colStr.includes("proceso") || colStr.includes("matur")) {
      columnId = "in_progress";
    } else if (
      colStr.includes("completed") ||
      colStr.includes("completado") ||
      colStr.includes("recolect") ||
      completed
    ) {
      columnId = "completed";
    }

    const notes = cells[notesIdx] || "";

    parsedTasks.push({
      title,
      completed,
      priority,
      category,
      pollenUnits,
      columnId,
      notes,
    });
  }

  return parsedTasks;
}
