"use client";

import { useMemo } from "react";
import { useHiveStore } from "../store/useHiveStore";

/**
 * Custom Hook: useHiveProjection
 *
 * DESIGN ARCHITECTURE BRIEF (Senior Frontend Engineer):
 * - SRP: Exclusively evaluates mathematical predictions of completion time based on task distribution.
 * - Reactive: Recalculates dynamically whenever the tasks array mutated under Unidirectional Data Flow of the Zustand store.
 */
export function useHiveProjection(customDailyPace: number = 1.5) {
  const tasks = useHiveStore((state) => state.tasks);
  const language = useHiveStore((state) => state.language);

  return useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.columnId === "completed").length;
    const pendingAndInProgress = total - completed;

    // Safety fallback for pace dividing denominators
    const dailyPace = customDailyPace <= 0 ? 1.0 : customDailyPace;
    const remainingDays = Math.ceil((pendingAndInProgress / dailyPace) * 10) / 10;

    // Rich narrative projections based on work volumes
    let advice = "";
    if (language === "en") {
      if (pendingAndInProgress === 0) {
        advice = "Excellent! All pollen has been gathered. No open tasks remain.";
      } else if (remainingDays <= 1) {
        advice = `Just a step away! We'll finish your comb today at a rate of ${dailyPace} tasks/day.`;
      } else {
        advice = `Estimated to harvest everything in ${remainingDays} working days if you continue gathering ${dailyPace} tasks/day.`;
      }
    } else {
      if (pendingAndInProgress === 0) {
        advice = "¡Excelente! Todo el polen ha sido recolectado. No quedan labores abiertas.";
      } else if (remainingDays <= 1) {
        advice = `¡A un paso! Terminaremos tu panal hoy a un ritmo de ${dailyPace} tareas/día.`;
      } else {
        advice = `Estimas cosechar todo en ${remainingDays} días laborables si continúas recolectando ${dailyPace} tareas/día.`;
      }
    }

    return {
      totalTasksCount: total,
      completedTasksCount: completed,
      pendingTasksCount: pendingAndInProgress,
      dailyPace,
      remainingDays,
      advice,
    };
  }, [tasks, customDailyPace, language]);
}
