import { Task } from "../types";

/**
 * Utility to escape CSV fields correctly according to RFC 4180.
 */
function escapeCSVField(val: string | number | boolean | undefined): string {
  if (val === undefined || val === null) return "";
  const str = String(val);
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Converts are array of Task records into a CSV payload and downloads it.
 */
export async function exportToCSV(tasks: Task[]): Promise<void> {
  const headers = [
    "ID",
    "Título",
    "Completado",
    "Prioridad",
    "Categoría",
    "Pollen/Esfuerzo",
    "Columna",
    "Notas",
  ];

  const csvRows = [headers.join(",")];

  for (const task of tasks) {
    const row = [
      escapeCSVField(task.id),
      escapeCSVField(task.title),
      escapeCSVField(task.completed ? "SÍ" : "NO"),
      escapeCSVField(task.priority),
      escapeCSVField(task.category),
      escapeCSVField(task.pollenUnits),
      escapeCSVField(task.columnId),
      escapeCSVField(task.notes || ""),
    ];
    csvRows.push(row.join(","));
  }

  const csvString = "\uFEFF" + csvRows.join("\r\n"); // Add UTF-8 BOM for Spanish accents in Excel
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

  const filename = `beehive_export_${new Date().toISOString().slice(0, 10)}.csv`;

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
