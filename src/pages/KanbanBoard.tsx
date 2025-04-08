
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, Clock, MessageSquare, Paperclip } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  comments: number;
  attachments: number;
  assignees: string[];
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: 't1',
          title: 'Research competitors',
          description: 'Analyze top 5 competitors for the new product launch',
          priority: 'Medium',
          dueDate: '2025-04-15',
          comments: 3,
          attachments: 2,
          assignees: ['JD'],
        },
        {
          id: 't2',
          title: 'Create wireframes',
          description: 'Design initial wireframes for mobile application',
          priority: 'High',
          dueDate: '2025-04-20',
          comments: 5,
          attachments: 1,
          assignees: ['AS', 'JD'],
        },
        {
          id: 't3',
          title: 'Content strategy',
          description: 'Develop content strategy for Q2 marketing campaign',
          priority: 'Low',
          dueDate: '2025-05-01',
          comments: 0,
          attachments: 3,
          assignees: ['MJ'],
        },
      ],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        {
          id: 't4',
          title: 'UI Implementation',
          description: 'Implement new UI components for dashboard',
          priority: 'High',
          dueDate: '2025-04-18',
          comments: 8,
          attachments: 4,
          assignees: ['JD', 'AS'],
        },
        {
          id: 't5',
          title: 'API Integration',
          description: 'Integrate payment gateway API',
          priority: 'Medium',
          dueDate: '2025-04-25',
          comments: 2,
          attachments: 0,
          assignees: ['MJ'],
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: 't6',
          title: 'User Testing',
          description: 'Conduct user testing sessions for new features',
          priority: 'Medium',
          dueDate: '2025-04-12',
          comments: 4,
          attachments: 1,
          assignees: ['AS'],
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: 't7',
          title: 'Requirements Gathering',
          description: 'Collect and document project requirements',
          priority: 'High',
          dueDate: '2025-04-05',
          comments: 7,
          attachments: 5,
          assignees: ['JD', 'MJ', 'AS'],
        },
        {
          id: 't8',
          title: 'Project Kickoff',
          description: 'Conduct initial project kickoff meeting',
          priority: 'Medium',
          dueDate: '2025-04-01',
          comments: 3,
          attachments: 2,
          assignees: ['JD'],
        },
      ],
    },
  ]);

  const handleDragStart = (e: React.DragEvent, taskId: string, columnId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('columnId', columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('columnId');
    
    if (sourceColumnId === targetColumnId) return;
    
    // Creating a new columns array with the task moved
    const newColumns = columns.map(column => {
      // Remove task from source column
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        };
      }
      
      // Add task to target column
      if (column.id === targetColumnId) {
        const taskToMove = columns
          .find(col => col.id === sourceColumnId)
          ?.tasks.find(task => task.id === taskId);
        
        if (taskToMove) {
          return {
            ...column,
            tasks: [...column.tasks, taskToMove]
          };
        }
      }
      
      return column;
    });
    
    setColumns(newColumns);
  };
  
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Kanban Board</h2>
          <p className="text-gray-500">Manage your project tasks visually</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-6 space-x-4">
        {columns.map(column => (
          <div 
            key={column.id}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">{column.title}</h3>
              <span className="text-sm bg-gray-200 rounded-full px-2 py-1">{column.tasks.length}</span>
            </div>
            
            {column.tasks.map(task => (
              <div 
                key={task.id}
                className="task-card"
                draggable
                onDragStart={(e) => handleDragStart(e, task.id, column.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{task.title}</h4>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>
                
                <div className="flex justify-between mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  
                  {task.dueDate && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {task.assignees.map((initials, index) => (
                      <div 
                        key={index}
                        className="w-6 h-6 rounded-full bg-zenith-secondary flex items-center justify-center text-white text-xs"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-500">
                    {task.comments > 0 && (
                      <div className="flex items-center text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {task.comments}
                      </div>
                    )}
                    
                    {task.attachments > 0 && (
                      <div className="flex items-center text-xs">
                        <Paperclip className="h-3 w-3 mr-1" />
                        {task.attachments}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="ghost" className="w-full mt-3">
              <Plus className="h-4 w-4 mr-1" />
              Add Card
            </Button>
          </div>
        ))}
        
        <div className="kanban-column min-w-[280px] border-dashed border-2 border-gray-300 flex items-center justify-center">
          <Button variant="ghost" className="text-gray-500">
            <Plus className="h-5 w-5 mr-2" />
            Add Column
          </Button>
        </div>
      </div>
    </div>
  );
}
