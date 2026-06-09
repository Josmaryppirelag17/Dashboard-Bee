"use client";

import React, { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { THEME_CONFIG } from "@/theme.config";
import { motion, AnimatePresence } from "motion/react";
import { useHiveStore } from "@/store/useHiveStore";

interface ChartPoint {
  day: string;
  focusTime: number; // in mins
  tasksDone: number;
  efficiency: number; // percent
}

/**
 * Organism: StatsChart
 *
 * DESIGN ARCHITECTURE BRIEF (Staff Frontend Engineer):
 * - SRP: Encapsulates path rendering and hover states for visual analytical metrics.
 * - Centralized Theming: Leverages constants from theme.config.ts to structure colors.
 */
export const StatsChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMetricType, setActiveMetricType] = useState<"focusTime" | "efficiency">("focusTime");

  const weeklyFocusMins = useHiveStore((state) => state.weeklyFocusMins);
  const weeklyTasksCompleted = useHiveStore((state) => state.weeklyTasksCompleted);
  const language = useHiveStore((state) => state.language);

  const daysLabels = useMemo(() => {
    return language === "en"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  }, [language]);

  const data = useMemo<ChartPoint[]>(() => {
    return daysLabels.map((day, idx) => {
      const focusTime = weeklyFocusMins[idx] || 0;
      const tasksDone = weeklyTasksCompleted[idx] || 0;
      let efficiency = 0;
      if (focusTime > 0) {
        efficiency = Math.min(100, Math.round((tasksDone * 20 + focusTime / 4) * 1.2));
      } else if (tasksDone > 0) {
        efficiency = Math.min(100, tasksDone * 25);
      }
      return {
        day,
        focusTime,
        tasksDone,
        efficiency,
      };
    });
  }, [weeklyFocusMins, weeklyTasksCompleted, daysLabels]);

  // SVG Chart Layout Geometry boundaries
  const width = 500;
  const height = 180;
  const padding = 30;

  const maxVal =
    activeMetricType === "focusTime" ? Math.max(60, ...data.map((item) => item.focusTime)) : 100;

  // Generate responsive point coordinates
  const points = data.map((item, idx) => {
    const val = activeMetricType === "focusTime" ? item.focusTime : item.efficiency;
    const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (val / (maxVal || 1)) * (height - padding * 2);
    return { x, y };
  });

  const getCurvePath = () => {
    if (points.length === 0) return "";
    let d = `M ${points[0]!.x} ${points[0]!.y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]!;
      const p1 = points[i + 1]!;
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const curvePath = getCurvePath();
  const areaPath =
    points.length > 0
      ? `${curvePath} L ${points[points.length - 1]!.x} ${height - padding} L ${points[0]!.x} ${height - padding} Z`
      : "";

  return (
    <div className={THEME_CONFIG.components.glassCard}>
      {/* 1. Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2 text-[#e28800] mb-1">
            <TrendingUp className="w-4 h-4 text-[#e28800]" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#5c5449]">
              {language === "en" ? "Gathering Statistics" : "Estadísticas de Recolección"}
            </span>
          </div>
          <h3 className="text-md font-bold text-[#100f0d]">
            {language === "en" ? "Weekly Hive Performance" : "Rendimiento Semanal del Panal"}
          </h3>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex bg-[#faf6ee] p-1 rounded-xl border border-[#ebdcb9]/60 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveMetricType("focusTime")}
              aria-pressed={activeMetricType === "focusTime"}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeMetricType === "focusTime"
                  ? "bg-gradient-to-br from-amber-500 to-[#faa715] text-[#100f0d] shadow-sm font-bold"
                  : "text-[#5c5449] hover:text-[#100f0d]"
              }`}
            >
              {language === "en" ? "Focus Time" : "Tiempo Foco"}
            </button>
            <button
              type="button"
              onClick={() => setActiveMetricType("efficiency")}
              aria-pressed={activeMetricType === "efficiency"}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeMetricType === "efficiency"
                  ? "bg-gradient-to-br from-amber-500 to-[#faa715] text-[#100f0d] shadow-sm font-bold"
                  : "text-[#5c5449] hover:text-[#100f0d]"
              }`}
            >
              {language === "en" ? "Efficiency %" : "Eficiencia %"}
            </button>
          </div>

          <div className="flex bg-[#faf6ee] p-1 rounded-xl border border-[#ebdcb9]/60">
            <span className="px-2.5 py-1.5 text-xs font-bold uppercase text-[#e28800]">7D</span>
          </div>
        </div>
      </div>

      {/* 2. SVG Area chart container */}
      <div className="relative flex-1 min-h-[160px] flex items-center justify-center my-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="chart-area-cream-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e28800" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#e28800" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="chart-area-efficiency-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#faa715" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#faa715" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, gridIdx) => {
            const y = padding + ratio * (height - padding * 2);
            return (
              <line
                key={gridIdx}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#ebdcb9"
                strokeWidth="0.75"
                strokeDasharray="4 4"
                opacity="0.55"
              />
            );
          })}

          {/* Solid background path mapping */}
          {areaPath && (
            <path
              d={areaPath}
              fill={
                activeMetricType === "focusTime"
                  ? "url(#chart-area-cream-glow)"
                  : "url(#chart-area-efficiency-glow)"
              }
              className="transition-all duration-700 ease-in-out"
            />
          )}

          {/* Spline curve mapping */}
          {curvePath && (
            <path
              d={curvePath}
              fill="none"
              stroke={activeMetricType === "focusTime" ? "#e28800" : "#faa715"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-700 ease-in-out filter drop-shadow-[0_2px_5px_rgba(226,136,0,0.15)]"
            />
          )}

          {/* Tooltip guidance indicators */}
          {points.map((pt, idx) => (
            <line
              key={idx}
              x1={pt.x}
              y1={padding}
              x2={pt.x}
              y2={height - padding}
              stroke="#e28800"
              strokeWidth={hoveredIndex === idx ? "1" : "0"}
              strokeDasharray="2 2"
              opacity="0.4"
              className="pointer-events-none"
            />
          ))}

          {/* Point nodes */}
          {points.map((pt, idx) => (
            <g key={idx}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === idx ? "6.5" : "4"}
                fill={activeMetricType === "focusTime" ? "#e28800" : "#faa715"}
                stroke="#ffffff"
                strokeWidth={hoveredIndex === idx ? "3" : "1.5"}
                className="transition-all duration-200 cursor-pointer pointer-events-none shadow"
              />
              <rect
                x={pt.x - 20}
                y={padding}
                width="40"
                height={height - padding * 2}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              />
            </g>
          ))}

          {/* Grid text tags */}
          {data.map((item, idx) => {
            const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
            return (
              <text
                key={idx}
                x={x}
                y={height - 10}
                textAnchor="middle"
                fill={hoveredIndex === idx ? "#e28800" : "#5c5449"}
                className="text-[9.5px] font-bold font-sans transition-colors duration-200"
              >
                {item.day}
              </text>
            );
          })}
        </svg>

        {/* Floating tooltip metrics */}
        <AnimatePresence>
          {hoveredIndex !== null &&
            (() => {
              const pt = points[hoveredIndex];
              const dp = data[hoveredIndex];
              if (!pt || !dp) return null;
              return (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute bg-white border border-[#ebdcb9] rounded-xl p-3 shadow-[0_10px_25px_rgba(110,80,45,0.08)] pointer-events-none z-20 min-w-[125px]"
                  style={{
                    left: `${(pt.x / width) * 100}%`,
                    transform: "translate(-50%, -108%)",
                    top: `${(pt.y / height) * 100}%`,
                  }}
                >
                  <span className="text-[9px] font-extrabold text-[#5c5449] uppercase tracking-wider block mb-1">
                    {language === "en" ? "Day Activity" : "Labor"} {dp.day}
                  </span>
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-[#100f0d] flex justify-between gap-3">
                      <span>{language === "en" ? "In Focus:" : "En Foco:"}</span>
                      <span className="font-mono font-bold text-[#e28800]">{dp.focusTime}m</span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#100f0d] flex justify-between gap-3">
                      <span>{language === "en" ? "Tasks:" : "Labores:"}</span>
                      <span className="font-mono font-bold text-[#15803d]">
                        #{dp.tasksDone} {language === "en" ? "cells" : "celdas"}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#100f0d] flex justify-between gap-3">
                      <span>{language === "en" ? "Efficiency:" : "Eficiencia:"}</span>
                      <span className="font-mono font-bold text-[#e28800]">{dp.efficiency}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </div>

      {/* 3. Metrics footer stats */}
      {(() => {
        const totalFocus = data.reduce((sum, item) => sum + item.focusTime, 0);
        const dailyAvg = Math.round(totalFocus / 7);
        const activeDays = data.filter((item) => item.focusTime > 0 || item.tasksDone > 0).length;
        const avgEfficiency =
          activeDays > 0
            ? Math.round(data.reduce((sum, item) => sum + item.efficiency, 0) / activeDays)
            : 0;

        return (
          <div className="grid grid-cols-3 gap-3 border-t border-[#ebdcb9]/45 pt-4 mt-2 flex-shrink-0">
            <div className="bg-[#faf6ee]/70 p-3 rounded-xl border border-[#ebdcb9]/40 text-center">
              <span className="text-[9px] text-[#5c5449] block uppercase font-bold tracking-wider mb-0.5">
                {language === "en" ? "Total Focus" : "Focus Total"}
              </span>
              <span className="text-sm font-extrabold text-[#e28800] font-mono">
                {totalFocus.toLocaleString()}m
              </span>
            </div>
            <div className="bg-[#faf6ee]/70 p-3 rounded-xl border border-[#ebdcb9]/40 text-center">
              <span className="text-[9px] text-[#5c5449] block uppercase font-bold tracking-wider mb-0.5">
                {language === "en" ? "Daily Average" : "Media Diaria"}
              </span>
              <span className="text-sm font-extrabold text-[#100f0d] font-mono">{dailyAvg}m</span>
            </div>
            <div className="bg-[#faf6ee]/70 p-3 rounded-xl border border-[#ebdcb9]/40 text-center">
              <span className="text-[9px] text-[#5c5449] block uppercase font-bold tracking-wider mb-0.5">
                {language === "en" ? "Efficiency" : "Eficiencia"}
              </span>
              <span className="text-sm font-extrabold text-[#15803d] font-mono">
                {avgEfficiency}%
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default StatsChart;
