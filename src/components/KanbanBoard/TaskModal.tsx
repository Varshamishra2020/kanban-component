import React, { useState, useEffect } from "react";
import { KanbanTask, KanbanColumn } from "./KanbanBoard.types";
import { Modal } from "./primitives/Modal";
import { Button } from "./primitives/Button";
import { format } from "date-fns";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: KanbanTask;
  columns: KanbanColumn[];
  onSave: (task: KanbanTask) => void;
  onDelete?: (taskId: string) => void;
  mode: "create" | "edit";
  initialColumnId?: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
  columns,
  onSave,
  onDelete,
  mode,
  initialColumnId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "medium" as KanbanTask["priority"],
    assignee: "",
    tags: [] as string[],
    dueDate: "",
  });

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority || "medium",
        assignee: task.assignee || "",
        tags: task.tags || [],
        dueDate: task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : "",
      });
    } else if (initialColumnId) {
      setFormData((prev) => ({
        ...prev,
        status: initialColumnId,
      }));
    }
  }, [task, initialColumnId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: KanbanTask = {
      id: task?.id || `task-${Date.now()}`,
      title: formData.title,
      description: formData.description || undefined,
      status: formData.status,
      priority: formData.priority,
      assignee: formData.assignee || undefined,
      tags: formData.tags.length > 0 ? formData.tags : undefined,
      createdAt: task?.createdAt || new Date(),
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    };

    onSave(taskData);
    onClose();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Create Task" : "Edit Task"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Status *
            </label>
            <select
              id="status"
              required
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select status</option>
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: e.target.value as KanbanTask["priority"],
                }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="assignee"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Assignee
          </label>
          <input
            type="text"
            id="assignee"
            value={formData.assignee}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, assignee: e.target.value }))
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag"
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddTag}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div>
            {mode === "edit" && onDelete && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  onDelete(task!.id);
                  onClose();
                }}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {mode === "create" ? "Create Task" : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
