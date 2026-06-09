"use client";

import { useHiveStore } from "../store/useHiveStore";

/**
 * Custom Hook: useBeePersistence
 *
 * DESIGN ARCHITECTURE BRIEF (Staff/Senior Frontend Engineer):
 * - SRP: Exposes and bridges database transaction telemetry (idle/saving/saved states) to view widgets.
 * - Performance: Consoles react-hook binds without redundant LocalStorage hits.
 */
export function useBeePersistence() {
  const savingStatus = useHiveStore((state) => state.savingStatus);

  return {
    savingStatus,
    isSaving: savingStatus === "saving",
    isSaved: savingStatus === "saved",
    isIdle: savingStatus === "idle",
  };
}
