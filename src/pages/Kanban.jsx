import { useState } from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, X } from 'lucide-react'

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 'task-1', content: 'Design the new dashboard layout' },
      { id: 'task-2', content: 'Develop the API for user authentication' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    tasks: [
      { id: 'task-3', content: 'Implement the new data table component' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 'task-4', content: 'Set up the initial project structure' },
      { id: 'task-5', content: 'Install and configure Tailwind CSS' },
    ],
  },
}

function Task({ id, content, theme, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleUpdate = () => {
    if (editedContent.trim()) {
      onUpdate(id, editedContent)
    }
    setIsEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 mb-2 rounded-lg shadow-sm relative group ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-white'
      } border ${
        theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
      }`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
          className="w-full bg-transparent border-none focus:ring-0"
        />
      ) : (
        content
      )}
      <button 
        onClick={e => { e.stopPropagation(); onDelete(id); }}
        className="absolute top-1 right-1 p-1 rounded-full bg-gray-500 bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )
}

function Column({ id, title, tasks, theme, onAddTask, onUpdateTask, onDeleteTask }) {
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskContent, setNewTaskContent] = useState('')

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      onAddTask(id, newTaskContent)
      setNewTaskContent('')
      setIsAdding(false)
    }
  }

  return (
    <div className={`p-4 rounded-lg w-full md:w-1/3 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
    }`}>
      <h3 className="font-semibold mb-4">{title}</h3>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map(task => 
          <Task 
            key={task.id} 
            id={task.id} 
            content={task.content} 
            theme={theme}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        )}
      </SortableContext>
      {isAdding ? (
        <div className="mt-2">
          <textarea
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            placeholder="Enter task content..."
            className={`w-full p-2 rounded-md border ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
            }`}
          />
          <div className="flex items-center mt-2 space-x-2">
            <button onClick={handleAddTask} className="px-3 py-1 rounded-md bg-blue-500 text-white">Add</button>
            <button onClick={() => setIsAdding(false)} className="p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className={`w-full flex items-center justify-center p-2 mt-2 rounded-md ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
        >
          <Plus className="w-4 h-4 mr-2" /> Add a card
        </button>
      )}
    </div>
  )
}

export default function Kanban({ theme }) {
  const [columns, setColumns] = useState(initialColumns)
  const sensors = useSensors(useSensor(PointerSensor))

  const handleAddTask = (columnId, content) => {
    const newTask = { id: `task-${Date.now()}`, content }
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask]
      }
    }))
  }

  const handleUpdateTask = (taskId, newContent) => {
    setColumns(prev => {
      const newColumns = { ...prev }
      for (const colId in newColumns) {
        const taskIndex = newColumns[colId].tasks.findIndex(t => t.id === taskId)
        if (taskIndex !== -1) {
          newColumns[colId].tasks[taskIndex].content = newContent
          break
        }
      }
      return newColumns
    })
  }

  const handleDeleteTask = (taskId) => {
    setColumns(prev => {
      const newColumns = {};
      for (const colId in prev) {
        newColumns[colId] = {
          ...prev[colId],
          tasks: prev[colId].tasks.filter(t => t.id !== taskId)
        };
      }
      return newColumns;
    });
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainerId = findColumnForTask(activeId);
    const overContainerId = over.id in columns ? over.id : findColumnForTask(over.id);

    if (!activeContainerId || !overContainerId) return;

    if (activeContainerId === overContainerId) {
      // Moving within the same column
      setColumns((prev) => {
        const column = prev[activeContainerId];
        const oldIndex = column.tasks.findIndex((t) => t.id === activeId);
        const newIndex = column.tasks.findIndex((t) => t.id === overId);
        if (oldIndex !== -1 && newIndex !== -1) {
          const newTasks = arrayMove(column.tasks, oldIndex, newIndex);
          return {
            ...prev,
            [activeContainerId]: { ...column, tasks: newTasks },
          };
        }
        return prev;
      });
    } else {
      // Moving to a different column
      setColumns((prev) => {
        const activeColumn = prev[activeContainerId];
        const overColumn = prev[overContainerId];
        
        const activeIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);
        let overIndex = overColumn.tasks.findIndex((t) => t.id === overId);
        if (overIndex === -1) {
            overIndex = overColumn.tasks.length;
        }

        const taskToMove = activeColumn.tasks[activeIndex];

        const newActiveTasks = activeColumn.tasks.filter(t => t.id !== activeId);
        const newOverTasks = [...overColumn.tasks];
        newOverTasks.splice(overIndex, 0, taskToMove);

        return {
          ...prev,
          [activeContainerId]: {
            ...activeColumn,
            tasks: newActiveTasks,
          },
          [overContainerId]: {
            ...overColumn,
            tasks: newOverTasks,
          },
        };
      });
    }
  }
  
  const findColumnForTask = (taskId) => {
    return Object.keys(columns).find(colId => columns[colId].tasks.some(t => t.id === taskId))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kanban Board</h1>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-6">
          {Object.values(columns).map(col => (
            <SortableContext key={col.id} items={col.tasks.map(t => t.id)} id={col.id}>
              <Column 
                id={col.id} 
                title={col.title} 
                tasks={col.tasks} 
                theme={theme}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  )
} 