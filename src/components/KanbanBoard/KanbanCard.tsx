import React from "react";
import { clsx } from "clsx";
import { KanbanTask } from "./KanbanBoard.types";
import { Avatar } from "./primitives/Avatar";

import {
  formatDate,
  isOverdue,
  getPriorityColor,
  getPriorityTextColor,
} from "../../utils/task.utils";

interface KanbanCardProps {
  task: KanbanTask;
  isDragging?: boolean;
  onEdit: (task: KanbanTask) => void;
  onDelete: (taskId: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  isDragging = false,
  onEdit,
  onDelete,
}) => {
  const handleClick = () => {
    onEdit(task);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onEdit(task);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority}. Press space to edit.`}
      className={clsx(
        "bg-white border border-neutral-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500",
        getPriorityColor(task.priority || "medium"),
        "border-l-4",
        isDragging && "opacity-50 rotate-3 shadow-lg"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      draggable
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2 flex-1 mr-2">
          {task.title}
        </h4>
        {task.priority && (
          <span
            className={clsx(
              "text-xs px-2 py-0.5 rounded font-medium",
              getPriorityTextColor(task.priority)
            )}
          >
            {task.priority}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {task.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-neutral-100 px-2 py-0.5 rounded text-neutral-700"
            >
              {tag}
            </span>
          ))}
          {task.tags && task.tags.length > 3 && (
            <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded text-neutral-500">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
        {task.assignee && <Avatar name={task.assignee} size="sm" />}
      </div>

      {task.dueDate && (
        <div
          className={clsx(
            "text-xs mt-2 font-medium",
            isOverdue(task.dueDate) ? "text-red-600" : "text-neutral-500"
          )}
        >
          Due: {formatDate(task.dueDate)}
        </div>
      )}
    </div>
  );
};
