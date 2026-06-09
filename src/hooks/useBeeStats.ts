"use client";

import { useMemo, useCallback } from "react";
import { useHiveStore } from "../store/useHiveStore";

/**
 * Custom Hook: useBeeStats (Facade)
 *
 * DESIGN ARCHITECTURE BRIEF (Senior Frontend Engineer):
 * - SRP: Exposes gamified credentials (tiers, streaks, metadata) from the single source of truth Zustand store.
 * - Performance: Avoids state fragmentation by referencing the same active metrics layout.
 */
export function useBeeStats() {
  const totalFocusMins = useHiveStore((state) => state.totalFocusMins);
  const streakCount = useHiveStore((state) => state.streakCount);
  const recordFocusSessionStore = useHiveStore((state) => state.recordFocusSession);
  const setStreakCountStore = useHiveStore((state) => state.setStreakCount);
  const language = useHiveStore((state) => state.language);

  const recordFocusSession = useCallback(
    (minutes: number = 25) => {
      recordFocusSessionStore(minutes);
    },
    [recordFocusSessionStore],
  );

  const hiveRank = useMemo(() => {
    if (language === "en") {
      if (totalFocusMins > 450) return "Super Producer";
      if (totalFocusMins > 250) return "Elite Worker";
      return "Focus Larva";
    } else {
      if (totalFocusMins > 450) return "Súper Productor";
      if (totalFocusMins > 250) return "Obrera de Élite";
      return "Larva de Foco";
    }
  }, [totalFocusMins, language]);

  const activeStatusText = useMemo(() => {
    if (language === "en") {
      if (streakCount > 6) return "Hive is ablaze with consistency!";
      if (streakCount > 3) return "Excellent gathering rhythm.";
      return "Start a focus interval to awaken the swarm.";
    } else {
      if (streakCount > 6) return "¡Colmena en llamas por constancia!";
      if (streakCount > 3) return "Excelente ritmo de acopio.";
      return "Inicia un intervalo de foco para levantar el enjambre.";
    }
  }, [streakCount, language]);

  return {
    totalFocusMins,
    streakCount,
    recordFocusSession,
    hiveRank,
    activeStatusText,
    setStreakCount: setStreakCountStore,
  };
}

export type UseBeeStatsReturn = ReturnType<typeof useBeeStats>;
