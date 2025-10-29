import React from "react";
import { clsx } from "clsx";
import {
  KanbanColumn as KanbanColumnType,
  KanbanTask,
} from "./KanbanBoard.types";
import { KanbanCard } from "./KanbanCard";
import { Button } from "./primitives/Button";
import {
  getColumnColor,
  getColumnHeaderColor,
  isColumnOverLimit,
} from "../../utils/column.utils";

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: KanbanTask[];
  isOverColumn?: boolean;
  onTaskEdit: (task: KanbanTask) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskCreate: (columnId: string) => void;
  onDragOver: (columnId: string, index: number) => void;
  onDragEnd: () => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  isOverColumn = false,
  onTaskEdit,
  onTaskDelete,
  onTaskCreate,
  onDragOver,
  onDragEnd,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDragEnd();
  };

  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleTaskDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    onDragOver(column.id, index);
  };

  const handleTaskDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onDragOver(column.id, index);
      onDragEnd();
    }
  };

  const isOverLimit = isColumnOverLimit(column);

  return (
    <div
      role="region"
      aria-label={`${column.title} column. ${tasks.length} tasks.`}
      className={clsx(
        "flex-shrink-0 w-80 rounded-xl border-2 border-dashed transition-colors",
        getColumnColor(column.color),
        isOverColumn
          ? "border-primary-300 bg-primary-100"
          : "border-transparent"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "w-3 h-3 rounded-full",
                getColumnHeaderColor(column.color)
              )}
            />
            <h3 className="font-semibold text-neutral-900">{column.title}</h3>
            <span className="bg-neutral-200 text-neutral-700 text-xs px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>
          {column.maxTasks && (
            <span
              className={clsx(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                isOverLimit
                  ? "bg-red-100 text-red-700"
                  : "bg-neutral-100 text-neutral-700"
              )}
            >
              {tasks.length}/{column.maxTasks}
            </span>
          )}
        </div>

        <div
          className="space-y-3 min-h-4"
          onDragOver={(e) => handleTaskDragOver(e, tasks.length)}
          onDrop={(e) => handleTaskDrop(e, tasks.length)}
        >
          {tasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleTaskDragStart(e, task.id)}
              onDragOver={(e) => handleTaskDragOver(e, index)}
              onDrop={(e) => handleTaskDrop(e, index)}
            >
              <KanbanCard
                task={task}
                onEdit={onTaskEdit}
                onDelete={onTaskDelete}
              />
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-3 justify-center"
          onClick={() => onTaskCreate(column.id)}
          disabled={isOverLimit}
        >
          + Add Task
        </Button>
      </div>
    </div>
  );
};
