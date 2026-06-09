/**
 * High-performance, lightweight input sanitization to block Cross-Site Scripting (XSS).
 * Escapes HTML characters to make rendering completely safe within JSX coordinates.
 */
export function sanitizeInput(val: string): string {
  if (!val) return "";
  return val
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}
