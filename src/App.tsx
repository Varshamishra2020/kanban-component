import React from "react";
import { KanbanBoard } from "./components/KanbanBoard/KanbanBoard";
import {
  KanbanColumn,
  KanbanTask,
} from "./components/KanbanBoard/KanbanBoard.types";

const sampleColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    color: "blue",
    taskIds: ["task-1", "task-2"],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "yellow",
    taskIds: ["task-3"],
  },
  {
    id: "review",
    title: "Review",
    color: "purple",
    taskIds: ["task-4"],
  },
  {
    id: "done",
    title: "Done",
    color: "green",
    taskIds: ["task-5"],
  },
];

const sampleTasks: Record<string, KanbanTask> = {
  "task-1": {
    id: "task-1",
    title: "Create project documentation",
    description: "Write comprehensive documentation for the new project",
    status: "todo",
    priority: "high",
    assignee: "John Doe",
    tags: ["documentation", "important"],
    createdAt: new Date("2024-01-15"),
    dueDate: new Date("2024-02-01"),
  },
  "task-2": {
    id: "task-2",
    title: "Set up development environment",
    description: "Configure all necessary tools and dependencies",
    status: "todo",
    priority: "medium",
    assignee: "Jane Smith",
    tags: ["setup", "development"],
    createdAt: new Date("2024-01-16"),
  },
  "task-3": {
    id: "task-3",
    title: "Implement user authentication",
    description: "Create login and registration functionality",
    status: "in-progress",
    priority: "high",
    assignee: "Mike Johnson",
    tags: ["authentication", "backend"],
    createdAt: new Date("2024-01-10"),
    dueDate: new Date("2024-01-25"),
  },
  "task-4": {
    id: "task-4",
    title: "Design user interface mockups",
    description: "Create wireframes and visual designs for the application",
    status: "review",
    priority: "medium",
    assignee: "Sarah Wilson",
    tags: ["design", "ui/ux"],
    createdAt: new Date("2024-01-12"),
  },
  "task-5": {
    id: "task-5",
    title: "Project kickoff meeting",
    description: "Initial project planning and team alignment",
    status: "done",
    priority: "low",
    assignee: "Alex Brown",
    tags: ["meeting", "planning"],
    createdAt: new Date("2024-01-05"),
    dueDate: new Date("2024-01-08"),
  },
};

function App() {
  const handleTaskMove = (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => {
    console.log("Task moved:", { taskId, fromColumn, toColumn, newIndex });
  };

  const handleTaskCreate = (columnId: string, task: KanbanTask) => {
    console.log("Task created:", { columnId, task });
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<KanbanTask>) => {
    console.log("Task updated:", { taskId, updates });
  };

  const handleTaskDelete = (taskId: string) => {
    console.log("Task deleted:", taskId);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Kanban Board
        </h1>
        <KanbanBoard
          columns={sampleColumns}
          tasks={sampleTasks}
          onTaskMove={handleTaskMove}
          onTaskCreate={handleTaskCreate}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
