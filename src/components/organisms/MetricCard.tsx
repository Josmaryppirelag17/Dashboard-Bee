"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Metric } from "@/types";
import { THEME_CONFIG } from "@/theme.config";
import { ProgressHex, ProgressHexIconType } from "@/components/atoms/ProgressHex";

interface MetricCardProps {
  metric: Metric;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  progressPercent: number; // calculated 0 to 100 for high-fidelity SVGs
  id?: string;
}

/**
 * Molecule: MetricCard
 *
 * DESIGN ARCHITECTURE BRIEF (Staff Frontend Engineer):
 * - SRP: Encapsulates individual metric tiles, trend indicators, and its custom sparks line representation.
 * - Performance: Hover animations run under hardware acceleration using spring curves.
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  isSelected = false,
  onSelect,
  progressPercent,
  id,
}) => {
  const {
    id: metricId,
    title,
    value,
    changeValue,
    changeDirection,
    iconName,
    subtext,
    historyData,
    accentColor,
  } = metric;

  // Render SVG Sparkline coordinate mapping (over a viewBox of 120x35)
  const sparklineCoords = React.useMemo(() => {
    if (historyData.length === 0) return { path: "", area: "" };

    const min = Math.min(...historyData);
    const max = Math.max(...historyData);
    const range = max - min || 1;

    const points = historyData
      .map((val, idx) => {
        const x = (idx / (historyData.length - 1)) * 120;
        const y = 35 - (((val - min) / range) * 23 + 4);
        return `${x},${y}`;
      })
      .join(" ");

    const path = `M ${points}`;
    const area = `${points} 120,35 0,35 Z`;

    return { path, area };
  }, [historyData]);

  const handlePress = () => {
    onSelect?.(metricId);
  };

  return (
    <motion.div
      id={id || `metric-card-${metricId}`}
      onClick={handlePress}
      whileHover={{ y: -3, scale: THEME_CONFIG.motion.hoverScale }}
      whileTap={{ scale: THEME_CONFIG.motion.clickScale }}
      transition={{ type: "spring", stiffness: 420, damping: 25 }}
      className={`relative overflow-hidden p-5 flex flex-col justify-between cursor-pointer group select-none ${THEME_CONFIG.components.glassCard} ${THEME_CONFIG.components.cardInteractive} ${
        isSelected ? "border-[#e28800] bg-white shadow-[0_12px_35px_rgba(226,136,0,0.1)]" : ""
      }`}
    >
      {/* Structural Watermark */}
      <div
        className="absolute right-[-20px] top-[-20px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none text-[#e28800]"
        aria-hidden="true"
      >
        <svg width="140" height="140" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 50 0 L 100 25 L 100 75 L 50 100 L 0 75 L 0 25 Z" />
        </svg>
      </div>

      {/* Primary values Row */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold tracking-widest text-[#5c5449] uppercase block">
            {title}
          </span>
          <span className="text-2xl font-black tracking-tight text-[#100f0d] font-sans">
            {value}
          </span>
        </div>

        {/* ProgressHex Atom */}
        <ProgressHex
          progressPercent={progressPercent}
          accentColor={accentColor}
          iconName={iconName as ProgressHexIconType}
        />
      </div>

      {/* Inline Sparkline trend */}
      <div className="h-10 my-1 w-full relative z-10 select-none">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 120 35"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`spark-grad-${metricId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.00" />
            </linearGradient>
          </defs>
          <path
            d={sparklineCoords.area}
            fill={`url(#spark-grad-${metricId})`}
            className="transition-all duration-300"
          />
          <path
            fill="none"
            stroke={accentColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={sparklineCoords.path}
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Change direction metrics footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#ebdcb9]/45 relative z-10 text-xs">
        <div>
          {changeDirection === "up" && (
            <span className="inline-flex items-center text-[10px] font-extrabold text-[#15803d] bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {changeValue}
            </span>
          )}
          {changeDirection === "down" && (
            <span className="inline-flex items-center text-[10px] font-extrabold text-[#b91c1c] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
              {changeValue}
            </span>
          )}
          {changeDirection === "stable" && (
            <span className="inline-flex items-center text-[10px] font-extrabold text-stone-500 bg-stone-50 px-2 py-0.5 rounded-full border border-stone-200">
              <Minus className="w-3 h-3 mr-0.5" />
              {changeValue}
            </span>
          )}
        </div>
        <span className="text-[10px] text-[#5c5449] font-bold">{subtext}</span>
      </div>
    </motion.div>
  );
};
