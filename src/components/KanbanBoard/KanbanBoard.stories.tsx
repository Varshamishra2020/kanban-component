import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { KanbanBoard } from "./KanbanBoard";
import { KanbanColumn, KanbanTask } from "./KanbanBoard.types";

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

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

const InteractiveDemo: React.FC = () => {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(sampleColumns);
  const [tasks, setTasks] =
    React.useState<Record<string, KanbanTask>>(sampleTasks);

  const handleTaskMove = (
    taskId: string,
    fromColumn: string,
    toColumn: string,
    newIndex: number
  ) => {
    console.log("Task moved:", { taskId, fromColumn, toColumn, newIndex });

    setColumns((prev) => {
      const newColumns = [...prev];
      const sourceCol = newColumns.find((col) => col.id === fromColumn);
      const destCol = newColumns.find((col) => col.id === toColumn);

      if (!sourceCol || !destCol) return prev;

      if (fromColumn === toColumn) {
        const taskIndex = sourceCol.taskIds.indexOf(taskId);
        if (taskIndex === -1) return prev;

        const newTaskIds = [...sourceCol.taskIds];
        const [removed] = newTaskIds.splice(taskIndex, 1);
        newTaskIds.splice(newIndex, 0, removed);

        return newColumns.map((col) =>
          col.id === fromColumn ? { ...col, taskIds: newTaskIds } : col
        );
      } else {
        const sourceIndex = sourceCol.taskIds.indexOf(taskId);
        if (sourceIndex === -1) return prev;

        const newSourceTasks = [...sourceCol.taskIds];
        const newDestTasks = [...destCol.taskIds];

        const [removed] = newSourceTasks.splice(sourceIndex, 1);
        newDestTasks.splice(newIndex, 0, removed);

        return newColumns.map((col) => {
          if (col.id === fromColumn) return { ...col, taskIds: newSourceTasks };
          if (col.id === toColumn) return { ...col, taskIds: newDestTasks };
          return col;
        });
      }
    });

    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], status: toColumn },
    }));
  };

  const handleTaskCreate = (columnId: string, task: KanbanTask) => {
    console.log("Task created:", { columnId, task });
    setTasks((prev) => ({ ...prev, [task.id]: task }));
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, taskIds: [...col.taskIds, task.id] }
          : col
      )
    );
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<KanbanTask>) => {
    console.log("Task updated:", { taskId, updates });
    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], ...updates },
    }));

    if (updates.status) {
      const oldStatus = tasks[taskId].status;
      if (updates.status !== oldStatus) {
        setColumns((prev) => {
          const sourceCol = prev.find((col) => col.id === oldStatus);
          const destCol = prev.find((col) => col.id === updates.status);

          if (!sourceCol || !destCol) return prev;

          const sourceIndex = sourceCol.taskIds.indexOf(taskId);
          if (sourceIndex === -1) return prev;

          const newSourceTasks = [...sourceCol.taskIds];
          newSourceTasks.splice(sourceIndex, 1);

          const newDestTasks = [...destCol.taskIds, taskId];

          return prev.map((col) => {
            if (col.id === oldStatus)
              return { ...col, taskIds: newSourceTasks };
            if (col.id === updates.status)
              return { ...col, taskIds: newDestTasks };
            return col;
          });
        });
      }
    }
  };

  const handleTaskDelete = (taskId: string) => {
    console.log("Task deleted:", taskId);
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
  };

  return (
    <KanbanBoard
      columns={columns}
      tasks={tasks}
      onTaskMove={handleTaskMove}
      onTaskCreate={handleTaskCreate}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
    />
  );
};

export const Default: Story = {
  args: {
    columns: sampleColumns,
    tasks: sampleTasks,
    onTaskMove: (taskId, fromColumn, toColumn, newIndex) => {
      console.log("Task moved:", { taskId, fromColumn, toColumn, newIndex });
    },
    onTaskCreate: (columnId, task) => {
      console.log("Task created:", { columnId, task });
    },
    onTaskUpdate: (taskId, updates) => {
      console.log("Task updated:", { taskId, updates });
    },
    onTaskDelete: (taskId) => {
      console.log("Task deleted:", taskId);
    },
  },
};

export const InteractiveDemoStory: Story = {
  render: () => <InteractiveDemo />,
};

export const Empty: Story = {
  args: {
    columns: [
      {
        id: "todo",
        title: "To Do",
        color: "blue",
        taskIds: [],
      },
      {
        id: "in-progress",
        title: "In Progress",
        color: "yellow",
        taskIds: [],
      },
      {
        id: "done",
        title: "Done",
        color: "green",
        taskIds: [],
      },
    ],
    tasks: {},
    onTaskMove: () => {},
    onTaskCreate: () => {},
    onTaskUpdate: () => {},
    onTaskDelete: () => {},
  },
};
