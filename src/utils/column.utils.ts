import { KanbanColumn } from "../components/KanbanBoard/KanbanBoard.types";

export const getColumnColor = (color: string): string => {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    yellow: "bg-yellow-50 border-yellow-200",
    red: "bg-red-50 border-red-200",
    purple: "bg-purple-50 border-purple-200",
    gray: "bg-neutral-50 border-neutral-200",
  };
  return colors[color] || colors.gray;
};

export const getColumnHeaderColor = (color: string): string => {
  const colors: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    gray: "bg-neutral-500",
  };
  return colors[color] || colors.gray;
};

export const isColumnOverLimit = (column: KanbanColumn): boolean => {
  if (!column.maxTasks) return false;
  return column.taskIds.length >= column.maxTasks;
};
