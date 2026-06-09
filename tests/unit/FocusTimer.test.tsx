import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FocusTimer } from "@/components/organisms/FocusTimer";

const mockToggleTask = vi.fn();
const mockUpdateTaskColumn = vi.fn();
const mockShowToast = vi.fn();
let mockTasks = [
  { id: "t1", title: "Task 1", completed: false, columnId: "todo" },
  { id: "t2", title: "Task 2", completed: false, columnId: "in_progress", priority: "HIGH" },
];

vi.mock("@/store/useHiveStore", () => ({
  useHiveStore: (selector: (state: any) => any) => {
    const state = {
      language: "es",
      tasks: mockTasks,
      toggleTask: mockToggleTask,
      updateTaskColumn: mockUpdateTaskColumn,
    };
    return selector(state);
  },
}));

vi.mock("@/context/BeeToastContext", () => ({
  useBeeToasts: () => ({ showToast: mockShowToast }),
}));

vi.mock("motion/react", () => {
  const MockDiv = ({ children, ...props }: any) => <div {...props}>{children}</div>;
  return {
    motion: {
      div: MockDiv,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
      path: (props: any) => <path {...props} />,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("lucide-react", () => ({
  Play: () => <span>play-icon</span>,
  Pause: () => <span>pause-icon</span>,
  RotateCcw: () => <span>reset-icon</span>,
  Volume2: () => <span>volume-icon</span>,
  VolumeX: () => <span>mute-icon</span>,
  Award: () => <span>award-icon</span>,
  Check: () => <span>check-icon</span>,
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockTasks = [
    { id: "t1", title: "Task 1", completed: false, columnId: "todo" },
    { id: "t2", title: "Task 2", completed: false, columnId: "in_progress", priority: "HIGH" },
  ];
});

describe("FocusTimer", () => {
  it("renders with initial 25-minute timer", () => {
    render(<FocusTimer />);
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  it("shows title", () => {
    render(<FocusTimer />);
    expect(screen.getByText("Ritmo de Polinización")).toBeInTheDocument();
  });

  it("toggles between play and pause", () => {
    render(<FocusTimer />);
    const playBtn = screen.getByText("Enfocar");
    fireEvent.click(playBtn);
    expect(screen.getByText("Pausar")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Pausar"));
    expect(screen.getByText("Enfocar")).toBeInTheDocument();
  });

  it("resets timer on reset click", () => {
    render(<FocusTimer />);
    fireEvent.click(screen.getByText("Enfocar"));
    fireEvent.click(screen.getByTitle("Reiniciar Intervalo"));
    expect(screen.getByText("Enfocar")).toBeInTheDocument();
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  it("changes work duration when preset buttons clicked", () => {
    render(<FocusTimer />);
    const workButtons = screen.getAllByText("15m");
    fireEvent.click(workButtons[0]!);
    expect(screen.getByText("15:00")).toBeInTheDocument();
    const workButtons2 = screen.getAllByText("45m");
    fireEvent.click(workButtons2[0]!);
    expect(screen.getByText("45:00")).toBeInTheDocument();
  });

  it("changes break duration when preset buttons clicked", () => {
    render(<FocusTimer />);
    const breakButtons = screen.getAllByText("10m");
    fireEvent.click(breakButtons[0]!);
    expect(screen.getByText("10 min")).toBeInTheDocument();
  });

  it("prevents duration changes while running", () => {
    render(<FocusTimer />);
    fireEvent.click(screen.getByText("Enfocar"));
    const buttons = screen.getAllByText(/^\d+m$/);
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("toggles sound on/off", () => {
    render(<FocusTimer />);
    const soundBtn = screen.getByTitle("Silenciado");
    fireEvent.click(soundBtn);
    expect(screen.getByTitle("Zumbido abeja activado")).toBeInTheDocument();
  });

  it("renders task selection dropdown with available tasks", () => {
    render(<FocusTimer />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("-- Elegir labor para completar --")).toBeInTheDocument();
  });

  it("disables task selector while running", () => {
    render(<FocusTimer />);
    fireEvent.click(screen.getByText("Enfocar"));
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("displays empty state when no tasks", () => {
    mockTasks = [];
    render(<FocusTimer />);
    expect(
      screen.getByText("Aún no hay labores — ¡ve al Kanban para agregar!"),
    ).toBeInTheDocument();
  });

  it("fires onSessionComplete callback", () => {
    const onSessionComplete = vi.fn();
    render(<FocusTimer onSessionComplete={onSessionComplete} />);
    fireEvent.click(screen.getByText("Enfocar"));
  });
});
