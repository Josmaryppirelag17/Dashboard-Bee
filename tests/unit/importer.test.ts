import { describe, it, expect } from "vitest";
import { parseTasksCSV } from "@/utils/importer";
import { PriorityLevel } from "@/types";

describe("parseTasksCSV", () => {
  it("returns empty array for empty or header-only CSV", () => {
    expect(parseTasksCSV("")).toEqual([]);
    expect(parseTasksCSV("ID,Título,Completado,Prioridad")).toEqual([]);
  });

  it("parses a valid CSV with Spanish headers", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-1,Diseñar layouts,SÍ,ALTA,Cera,3,completed,nota de prueba
t-2,Configurar paleta,NO,MEDIA,Miel,2,todo,`;
    const result = parseTasksCSV(csv);
    expect(result).toHaveLength(2);
    expect(result[0]!.title).toBe("Diseñar layouts");
    expect(result[0]!.completed).toBe(true);
    expect(result[0]!.priority).toBe(PriorityLevel.HIGH);
    expect(result[0]!.columnId).toBe("completed");
    expect(result[0]!.pollenUnits).toBe(3);
    expect(result[1]!.title).toBe("Configurar paleta");
    expect(result[1]!.completed).toBe(false);
    expect(result[1]!.columnId).toBe("todo");
  });

  it("parses a valid CSV with English headers", () => {
    const csv = `ID,Title,Completed,Priority,Category,Pollen/Effort,Column,Notes
t-3,Test task,NO,LOW,General,2,todo,`;
    const result = parseTasksCSV(csv);
    expect(result).toHaveLength(1);
    expect(result[0]!.title).toBe("Test task");
    expect(result[0]!.priority).toBe(PriorityLevel.LOW);
  });

  it("handles quoted fields with commas", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-4,"Tarea, importante",SÍ,ALTA,Cera,5,completed,"nota con, coma"`;
    const result = parseTasksCSV(csv);
    expect(result).toHaveLength(1);
    expect(result[0]!.title).toBe("Tarea, importante");
    expect(result[0]!.notes).toBe("nota con, coma");
  });

  it("clamps pollen units between 1 and 5", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-5,Task,NO,BAJA,General,99,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.pollenUnits).toBe(5);
  });

  it("defaults to MEDIUM priority for unknown values", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-6,Task,NO,RANDOM,General,2,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.priority).toBe(PriorityLevel.MEDIUM);
  });

  it("parses in_progress column from Spanish 'proceso' keyword", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-7,Tarea en proceso,NO,ALTA,Cera,3,en proceso,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.columnId).toBe("in_progress");
  });

  it("parses in_progress column from 'in_progress' keyword", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-8,WIP task,NO,ALTA,Cera,3,in_progress,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.columnId).toBe("in_progress");
  });

  it("parses completed column when CSV says completed even without keyword", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-9,Done task,SÍ,BAJA,Miel,2,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.columnId).toBe("completed");
  });

  it("handles lowercase Spanish headers", () => {
    const csv = `id,título,completado,prioridad,categoría,pollen/esfuerzo,columna,notas
t-10,tarea de prueba,no,baja,general,4,todo,sin notas`;
    const result = parseTasksCSV(csv);
    expect(result).toHaveLength(1);
    expect(result[0]!.title).toBe("tarea de prueba");
    expect(result[0]!.priority).toBe(PriorityLevel.LOW);
  });

  it("skips empty lines in CSV", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-11,Task one,NO,MEDIA,Work,2,todo,



t-12,Task two,SÍ,ALTA,Work,3,completed,`;
    const result = parseTasksCSV(csv);
    expect(result).toHaveLength(2);
  });

  it("parses pollen units default to 1 when invalid", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-13,Bad pollen,NO,BAJA,General,abc,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.pollenUnits).toBe(1);
  });

  it("parses 'recolect' as completed column", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-14,Recolected task,NO,ALTA,Cera,4,recolect,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.columnId).toBe("completed");
  });

  it("parses 'completado' as completed column", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-15,Completed task,NO,ALTA,Cera,3,completado,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.columnId).toBe("completed");
  });

  it("parses 'matur' (maturing) as in_progress column", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-16,Maturing task,NO,BAJA,Cera,2,matur,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.columnId).toBe("in_progress");
  });

  it("parses 'TRUE' as completed", () => {
    const csv = `ID,Title,Completed,Priority,Category,Pollen/Effort,Column,Notes
t-17,True task,TRUE,HIGH,Work,3,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.completed).toBe(true);
  });

  it("parses 'HIGH' as priority high", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-18,High task,NO,HIGH,Cera,3,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.priority).toBe(PriorityLevel.HIGH);
  });

  it("defaults pollen to 1 when value is 0", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-19,Zero pollen,NO,MEDIA,General,0,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.pollenUnits).toBe(1);
  });

  it("skips rows with fewer than 2 cells", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-20`;
    const result = parseTasksCSV(csv);
    expect(result).toHaveLength(0);
  });

  it("uses default title when title cell is empty", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-21,,NO,MEDIA,General,2,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.title).toBe("Tareas Importadas del Panal");
  });

  it("uses default category when category cell is empty", () => {
    const csv = `ID,Título,Completado,Prioridad,Categoría,Pollen/Esfuerzo,Columna,Notas
t-22,No cat,NO,MEDIA,,2,todo,`;
    const result = parseTasksCSV(csv);
    expect(result[0]!.category).toBe("General");
  });
});
