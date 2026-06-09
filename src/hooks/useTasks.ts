"use client";

import { useMemo, useState, useCallback } from "react";
import { useHiveStore } from "../store/useHiveStore";
import { PriorityLevel } from "../types";

/**
 * Custom Hook: useTasks (Facade)
 *
 * DESIGN ARCHITECTURE BRIEF (Senior Frontend Engineer):
 * - Facade Pattern: Binds previous component imports directly to our centralized Zustand State Engine.
 * - Single Source of Truth: Eradicates scattered components states. Updates automatically trigger IndexedDB transactions.
 */
export function useTasks() {
  const tasks = useHiveStore((state) => state.tasks);
  const addTaskStore = useHiveStore((state) => state.addTask);
  const toggleTaskStore = useHiveStore((state) => state.toggleTask);
  const deleteTaskStore = useHiveStore((state) => state.deleteTask);
  const clearCompletedTasksStore = useHiveStore((state) => state.clearCompletedTasks);

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.category)));
  }, [tasks]);

  const completedTasksCount = useMemo(
    () => tasks.filter((t) => t.columnId === "completed").length,
    [tasks],
  );
  const totalTasksCount = tasks.length;

  const taskCompletionRate = useMemo(() => {
    return totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  }, [completedTasksCount, totalTasksCount]);

  const totalPollenProduced = useMemo(() => {
    return tasks
      .filter((t) => t.columnId === "completed")
      .reduce((sum, t) => sum + t.pollenUnits, 0);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatches =
        statusFilter === "all"
          ? true
          : statusFilter === "pending"
            ? task.columnId !== "completed"
            : task.columnId === "completed";

      const categoryMatches = categoryFilter === "all" ? true : task.category === categoryFilter;

      return statusMatches && categoryMatches;
    });
  }, [tasks, statusFilter, categoryFilter]);

  const toggleTask = useCallback(
    async (id: string) => {
      await toggleTaskStore(id);
    },
    [toggleTaskStore],
  );

  const addTask = useCallback(
    async (title: string, priority: PriorityLevel, category: string, pollenUnits: number) => {
      await addTaskStore(title, priority, category, pollenUnits);
    },
    [addTaskStore],
  );

  const deleteTask = useCallback(
    async (id: string) => {
      await deleteTaskStore(id);
    },
    [deleteTaskStore],
  );

  const clearCompletedTasks = useCallback(async () => {
    await clearCompletedTasksStore();
  }, [clearCompletedTasksStore]);

  return {
    tasks,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    categories,
    filteredTasks,
    completedTasksCount,
    totalTasksCount,
    taskCompletionRate,
    totalPollenProduced,
    toggleTask,
    addTask,
    deleteTask,
    clearCompletedTasks,
  };
}

export type UseTasksReturn = ReturnType<typeof useTasks>;
