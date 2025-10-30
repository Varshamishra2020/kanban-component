# Kanban Board Component

A modern, accessible, and fully-featured Kanban board component built with React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality, task management, and a responsive design.

##  Live Storybook
👉 [View Live Storybook](https://kanban-component.vercel.app/?path=/story/components-kanbanboard--default)

##  Installation

```bash
# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Build for production
npm run build

# Preview production build
npm run preview
```

##  Architecture

This Kanban board follows a modular, component-based architecture with custom hooks for state management and drag-and-drop functionality. The component is built with accessibility in mind and supports keyboard navigation.

### Key Architectural Decisions:
- **Separation of Concerns**: UI components, business logic, and state management are separated
- **Custom Hooks**: `useKanbanBoard` for state management and `useDragAndDrop` for drag functionality
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

##  Features

- [x] **Drag-and-drop tasks** between columns with visual feedback
- [x] **Task creation/editing** through a modal form
- [x] **Responsive design** that works on desktop and mobile
- [x] **Keyboard accessibility** with full navigation support
- [x] **Task prioritization** with color-coded visual indicators
- [x] **Due date tracking** with overdue highlighting
- [x] **Tag management** for task categorization
- [x] **Assignee avatars** with automatic initials
- [x] **Column limits** with visual warnings
- [x] **Real-time updates** with callback support

## 📚 Storybook Stories

The component includes comprehensive Storybook stories for testing and demonstration:

- **Default Board**: Pre-populated with sample tasks and columns
- **Empty State**: Shows the board with no tasks
- **Interactive Demo**: Fully functional board with state management
- **Mobile View**: Responsive testing across different screen sizes
- **Accessibility Tests**: Keyboard navigation and screen reader compatibility

## 🛠️ Technologies

- **React 18** - UI framework with modern hooks
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Storybook** - Component development and documentation
- **date-fns** - Date formatting and manipulation
- **clsx** - Conditional className utility
- **Vite** - Fast build tool and dev server

## 🎯 Component Structure

```
src/
├── components/
│   ├── KanbanBoard/          # Main board component
│   ├── KanbanColumn/         # Individual column component
│   ├── KanbanCard/           # Task card component
│   ├── TaskModal/            # Create/edit task modal
│   └── primitives/           # Base UI components
├── hooks/
│   ├── useKanbanBoard/       # Board state management
│   └── useDragAndDrop/       # Drag-and-drop logic
├── utils/
│   └── task.utils.ts         # Utility functions
└── stories/
    └── KanbanBoard.stories.tsx # Storybook stories
```

##  Accessibility

- **Keyboard Navigation**: Use Tab to navigate between tasks, Enter/Space to edit
- **Screen Reader Support**: ARIA labels and roles throughout
- **Focus Management**: Proper focus trapping in modals
- **Color Contrast**: WCAG compliant color combinations
- **Drag & Drop**: Keyboard alternatives for all interactions

##  License

MIT License - see LICENSE file for details

## 📧 Contact

**[vm0222912@gmail.com]**

---

Built with ❤️ using React, TypeScript, and Storybook
