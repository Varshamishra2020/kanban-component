import React, { useState, useCallback } from "react";
import { clsx } from "clsx";
import { KanbanViewProps, KanbanTask } from "./KanbanBoard.types";
import { KanbanColumn } from "./KanbanColumn";
import { TaskModal } from "./TaskModal";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useKanbanBoard } from "../../hooks/useKanbanBoard";

export const KanbanBoard: React.FC<KanbanViewProps> = ({
  columns: initialColumns,
  tasks: initialTasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>();
  const [creatingColumnId, setCreatingColumnId] = useState<string>("");

  const {
    isDragging,
    draggedId,
    dropTargetId,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDragAndDrop();

  const { columns, tasks, moveTask, createTask, updateTask, deleteTask } =
    useKanbanBoard({
      initialColumns,
      initialTasks,
      onTaskMove,
      onTaskCreate,
      onTaskUpdate,
      onTaskDelete,
    });

  const handleTaskEdit = (task: KanbanTask) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleTaskCreate = (columnId: string) => {
    setEditingTask(undefined);
    setCreatingColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleTaskSave = (task: KanbanTask) => {
    if (editingTask) {
      updateTask(task.id, task);
    } else {
      createTask(creatingColumnId, task);
    }
  };

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
    setCreatingColumnId("");
  };

  const handleColumnDragOver = useCallback(
    (columnId: string, index: number) => {
      handleDragOver(columnId, index);
    },
    [handleDragOver]
  );

  const handleTaskDrop = useCallback(
    (columnId: string, index: number) => {
      if (draggedId && dropTargetId === columnId) {
        const task = tasks[draggedId];
        if (task) {
          moveTask(draggedId, task.status, columnId, index);
        }
      }
      handleDragEnd();
    },
    [draggedId, dropTargetId, tasks, moveTask, handleDragEnd]
  );

  return (
    <div className="w-full h-full">
      <div className="flex gap-6 overflow-x-auto pb-6 px-4 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
        {columns.map((column) => {
          const columnTasks = column.taskIds
            .map((taskId) => tasks[taskId])
            .filter(Boolean);

          return (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={columnTasks}
              isOverColumn={dropTargetId === column.id && draggedId !== null}
              onTaskEdit={handleTaskEdit}
              onTaskDelete={handleTaskDelete}
              onTaskCreate={handleTaskCreate}
              onDragOver={handleColumnDragOver}
              onDragEnd={() => handleTaskDrop(column.id, columnTasks.length)}
            />
          );
        })}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        task={editingTask}
        columns={columns}
        onSave={handleTaskSave}
        onDelete={editingTask ? handleTaskDelete : undefined}
        mode={editingTask ? "edit" : "create"}
        initialColumnId={creatingColumnId}
      />
    </div>
  );
};
