import { useState, useCallback } from "react";
import {
  KanbanTask,
  KanbanColumn,
} from "../components/KanbanBoard/KanbanBoard.types";
import { reorderTasks, moveTaskBetweenColumns } from "../utils/task.utils";

interface UseKanbanBoardProps {
  initialColumns: KanbanColumn[];
  initialTasks: Record<string, KanbanTask>;
  onTaskMove?: (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => void;
  onTaskCreate?: (columnId: string, task: KanbanTask) => void;
  onTaskUpdate?: (taskId: string, updates: Partial<KanbanTask>) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const useKanbanBoard = ({
  initialColumns,
  initialTasks,
  onTaskMove,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
}: UseKanbanBoardProps) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);

  const moveTask = useCallback(
    (
      taskId: string,
      fromColumnId: string,
      toColumnId: string,
      newIndex: number
    ) => {
      setColumns((prevColumns) => {
        const fromColumn = prevColumns.find((col) => col.id === fromColumnId);
        const toColumn = prevColumns.find((col) => col.id === toColumnId);

        if (!fromColumn || !toColumn) return prevColumns;

        const currentIndex = fromColumn.taskIds.indexOf(taskId);

        if (currentIndex === -1) return prevColumns;

        if (fromColumnId === toColumnId) {
          const newTaskIds = reorderTasks(
            fromColumn.taskIds,
            currentIndex,
            newIndex
          );
          const updatedColumns = prevColumns.map((col) =>
            col.id === fromColumnId ? { ...col, taskIds: newTaskIds } : col
          );
          onTaskMove?.(taskId, fromColumnId, toColumnId, newIndex);
          return updatedColumns;
        } else {
          const { source: newSourceTasks, destination: newDestTasks } =
            moveTaskBetweenColumns(
              fromColumn.taskIds,
              toColumn.taskIds,
              currentIndex,
              newIndex
            );

          const updatedColumns = prevColumns.map((col) => {
            if (col.id === fromColumnId)
              return { ...col, taskIds: newSourceTasks };
            if (col.id === toColumnId) return { ...col, taskIds: newDestTasks };
            return col;
          });

          setTasks((prev) => ({
            ...prev,
            [taskId]: { ...prev[taskId], status: toColumnId },
          }));

          onTaskMove?.(taskId, fromColumnId, toColumnId, newIndex);
          return updatedColumns;
        }
      });
    },
    [onTaskMove]
  );

  const createTask = useCallback(
    (columnId: string, task: KanbanTask) => {
      setTasks((prev) => ({ ...prev, [task.id]: task }));
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? { ...col, taskIds: [...col.taskIds, task.id] }
            : col
        )
      );
      onTaskCreate?.(columnId, task);
    },
    [onTaskCreate]
  );

  const updateTask = useCallback(
    (taskId: string, updates: Partial<KanbanTask>) => {
      setTasks((prev) => {
        const oldTask = prev[taskId];
        const newTask = { ...oldTask, ...updates };

        if (updates.status && updates.status !== oldTask.status) {
          setColumns((prevColumns) => {
            const sourceColumn = prevColumns.find(
              (col) => col.id === oldTask.status
            );
            const targetColumn = prevColumns.find(
              (col) => col.id === updates.status
            );

            if (!sourceColumn || !targetColumn) return prevColumns;

            const sourceIndex = sourceColumn.taskIds.indexOf(taskId);
            if (sourceIndex === -1) return prevColumns;

            const newSourceTasks = [...sourceColumn.taskIds];
            newSourceTasks.splice(sourceIndex, 1);

            const newTargetTasks = [...targetColumn.taskIds, taskId];

            return prevColumns.map((col) => {
              if (col.id === oldTask.status)
                return { ...col, taskIds: newSourceTasks };
              if (col.id === updates.status)
                return { ...col, taskIds: newTargetTasks };
              return col;
            });
          });
        }

        return {
          ...prev,
          [taskId]: newTask,
        };
      });
      onTaskUpdate?.(taskId, updates);
    },
    [onTaskUpdate]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      const task = tasks[taskId];
      if (!task) return;

      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          taskIds: col.taskIds.filter((id) => id !== taskId),
        }))
      );

      setTasks((prev) => {
        const newTasks = { ...prev };
        delete newTasks[taskId];
        return newTasks;
      });

      onTaskDelete?.(taskId);
    },
    [tasks, onTaskDelete]
  );

  return {
    columns,
    tasks,
    moveTask,
    createTask,
    updateTask,
    deleteTask,
  };
};
