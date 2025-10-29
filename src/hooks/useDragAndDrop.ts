import { useState, useCallback } from "react";
import { DragState } from "../components/KanbanBoard/KanbanBoard.types";

export const useDragAndDrop = () => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedId: null,
    dropTargetId: null,
    dragOverIndex: null,
  });

  const handleDragStart = useCallback((id: string) => {
    setDragState((prev) => ({
      ...prev,
      isDragging: true,
      draggedId: id,
    }));
  }, []);

  const handleDragOver = useCallback((targetId: string, index: number) => {
    setDragState((prev) => ({
      ...prev,
      dropTargetId: targetId,
      dragOverIndex: index,
    }));
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedId: null,
      dropTargetId: null,
      dragOverIndex: null,
    });
  }, []);

  return {
    ...dragState,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};
