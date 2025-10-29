import { KanbanTask } from "../components/KanbanBoard/KanbanBoard.types";
import { format } from "date-fns";

export const isOverdue = (dueDate: Date): boolean => {
  return new Date() > dueDate;
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getPriorityColor = (priority: string): string => {
  const colors = {
    low: "border-l-blue-500",
    medium: "border-l-yellow-500",
    high: "border-l-orange-500",
    urgent: "border-l-red-500",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

export const getPriorityTextColor = (priority: string): string => {
  const colors = {
    low: "text-blue-700 bg-blue-100",
    medium: "text-yellow-700 bg-yellow-100",
    high: "text-orange-700 bg-orange-100",
    urgent: "text-red-700 bg-red-100",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
};

export const reorderTasks = (
  tasks: string[],
  startIndex: number,
  endIndex: number
): string[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const moveTaskBetweenColumns = (
  sourceColumn: string[],
  destColumn: string[],
  sourceIndex: number,
  destIndex: number
): { source: string[]; destination: string[] } => {
  const sourceClone = Array.from(sourceColumn);
  const destClone = Array.from(destColumn);
  const [removed] = sourceClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);
  return {
    source: sourceClone,
    destination: destClone,
  };
};

export const formatDate = (date: Date): string => {
  return format(date, "MMM dd, yyyy");
};
