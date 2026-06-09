import React from "react";

interface PollenIndicatorProps {
  units: number;
  completed?: boolean;
  className?: string;
  id?: string;
}

/**
 * Atom: PollenIndicator
 *
 * DESIGN ARCHITECTURE BRIEF (Staff Frontend Engineer):
 * - SRP: Exclusively renders honeycomb workload cells using SVGs.
 * - Performance: Consists of lightweight, statically sized SVG paths.
 */
export const PollenIndicator: React.FC<PollenIndicatorProps> = ({
  units,
  completed = false,
  className = "",
  id,
}) => {
  return (
    <div
      id={id}
      className={`flex items-center space-x-1 bg-[#faf6ee] px-2.5 py-1.5 rounded-xl border border-[#ebdcb9]/60 select-none shrink-0 ${className}`}
      aria-label={`Celdas de esfuerzo: ${units}`}
      title={`Celdas de esfuerzo: ${units}`}
    >
      {Array.from({ length: Math.max(1, Math.min(5, units)) }).map((_, idx) => (
        <svg
          key={idx}
          width="11"
          height="11"
          viewBox="0 0 100 100"
          className={`fill-current ${completed ? "text-[#e28800]/40" : "text-[#faa715] animate-pulse"}`}
          aria-hidden="true"
        >
          <path d="M 50 0 L 100 25 L 100 75 L 50 100 L 0 75 L 0 25 Z" />
        </svg>
      ))}
    </div>
  );
};
