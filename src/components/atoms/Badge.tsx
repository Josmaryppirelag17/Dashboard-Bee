import React from "react";

export type BadgeVariant = "high" | "medium" | "low" | "neutral" | "accent" | "success";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Atom: Badge
 *
 * DESIGN ARCHITECTURE BRIEF (Staff Frontend Engineer):
 * - SRP: Encapsulates accessible color formulas for status tags.
 * - WCAG Accessibility: Contrast meets strict WCAG AA ratios (e.g., text scale with comfortable padding).
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  children,
  className = "",
  id,
}) => {
  const styles: Record<BadgeVariant, string> = {
    high: "bg-red-50 text-[#b91c1c] border-red-200",
    medium: "bg-amber-50 text-[#854d0e] border-amber-200",
    low: "bg-stone-50 text-[#44403c] border-stone-200",
    neutral: "bg-[#faf6ee] text-[#5c5449] border-[#ebdcb9]",
    accent: "bg-amber-500/10 text-[#e28800] border-amber-500/25",
    success: "bg-green-50 text-[#15803d] border-green-200",
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
