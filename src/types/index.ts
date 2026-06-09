/**
 * Strict TypeScript Type Definitions for BeeHive Productivity Dashboard
 */

export enum PriorityLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type ColumnId = "todo" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: PriorityLevel;
  category: string;
  pollenUnits: number; // Stated as pollen/bees density (1-5 units of workload)
  columnId: ColumnId;
  notes?: string;
}

export interface HiveStats {
  totalTasks: number;
  completedTasks: number;
  completionPercentage: number;
  totalPollenProduced: number;
  honeyStreak: number;
  focusMinutesAllotted: number;
}

export type TrendDirection = "up" | "down" | "stable";

export interface Metric {
  id: string;
  title: string;
  value: string | number;
  changeValue: string;
  changeDirection: TrendDirection;
  iconName: string;
  subtext: string;
  historyData: number[]; // Weekly sparkline metric trace
  accentColor: string; // Theme hex dynamic mapping code
}

export interface SidebarItem {
  id: string;
  label: string;
  iconName: string;
  badge?: string | number;
}

export interface PomodoroCell {
  id: number;
  completed: boolean;
  title?: string;
}
