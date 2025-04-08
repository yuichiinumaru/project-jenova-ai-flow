
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Clock,
  Users
} from 'lucide-react';

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  assignees: string[];
  color: string;
};

type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export default function Timeline() {
  // Current view date
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate dates for the timeline (30 days from current date)
  const getDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const dates = getDates();
  
  // Sample projects and tasks
  const [projects] = useState<Project[]>([
    {
      id: 'p1',
      name: 'Website Redesign',
      tasks: [
        {
          id: 't1',
          title: 'Research & Planning',
          startDate: new Date(2025, 3, 8), // April 8, 2025
          endDate: new Date(2025, 3, 15), // April 15, 2025
          progress: 100,
          assignees: ['JD', 'AS'],
          color: 'bg-green-500',
        },
        {
          id: 't2',
          title: 'Design Phase',
          startDate: new Date(2025, 3, 15), // April 15, 2025
          endDate: new Date(2025, 3, 22), // April 22, 2025
          progress: 70,
          assignees: ['AS'],
          color: 'bg-zenith-primary',
        },
        {
          id: 't3',
          title: 'Development',
          startDate: new Date(2025, 3, 20), // April 20, 2025
          endDate: new Date(2025, 4, 5), // May 5, 2025
          progress: 30,
          assignees: ['JD', 'MJ'],
          color: 'bg-zenith-secondary',
        },
      ],
    },
    {
      id: 'p2',
      name: 'Marketing Campaign',
      tasks: [
        {
          id: 't4',
          title: 'Content Creation',
          startDate: new Date(2025, 3, 10), // April 10, 2025
          endDate: new Date(2025, 3, 20), // April 20, 2025
          progress: 80,
          assignees: ['AS'],
          color: 'bg-zenith-accent',
        },
        {
          id: 't5',
          title: 'Social Media Schedule',
          startDate: new Date(2025, 3, 18), // April 18, 2025
          endDate: new Date(2025, 3, 25), // April 25, 2025
          progress: 40,
          assignees: ['MJ'],
          color: 'bg-yellow-500',
        },
      ],
    },
  ]);
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  
  // Get position and width for a task bar
  const getTaskBarStyle = (task: Task) => {
    // Find start and end indices
    const startIndex = dates.findIndex(date => 
      date.toDateString() === task.startDate.toDateString()
    );
    
    const endIndex = dates.findIndex(date => 
      date.toDateString() === task.endDate.toDateString()
    );
    
    // If task doesn't fall in current view
    if (startIndex === -1 && endIndex === -1) {
      const firstDate = dates[0];
      const lastDate = dates[dates.length - 1];
      
      // Task starts before and ends after current view
      if (task.startDate < firstDate && task.endDate > lastDate) {
        return {
          left: 0,
          width: '100%',
        };
      }
      
      // Task is completely outside current view
      return null;
    }
    
    // Task starts before current view
    const left = startIndex === -1 ? 0 : startIndex * 120;
    
    // Task ends after current view
    const width = endIndex === -1 
      ? (dates.length - (startIndex === -1 ? 0 : startIndex)) * 120 
      : (endIndex - (startIndex === -1 ? 0 : startIndex) + 1) * 120;
    
    return {
      left: `${left}px`,
      width: `${width}px`,
    };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Timeline</h2>
          <p className="text-gray-500">Visualize your project schedule</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Gantt chart view of all project tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="timeline-container">
            <div className="timeline-grid">
              {/* Header row with dates */}
              <div className="timeline-row timeline-header">
                <div className="sticky left-0 z-20 bg-gray-50 w-[100px] h-full flex items-center justify-center font-medium text-sm border-r border-gray-200">
                  Projects
                </div>
                {dates.map((date, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col items-center justify-center py-2 text-xs border-r border-gray-200 ${
                      date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="font-medium">
                      {date.toLocaleDateString('en-US', { day: 'numeric' })}
                    </span>
                    <span className="text-gray-500">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Project rows */}
              {projects.map(project => (
                <React.Fragment key={project.id}>
                  {/* Project header */}
                  <div className="timeline-row">
                    <div className="sticky left-0 z-10 bg-gray-50 w-[100px] h-full flex items-center px-2 font-medium text-sm border-r border-gray-200">
                      {project.name}
                    </div>
                    {dates.map((date, index) => (
                      <div 
                        key={index} 
                        className={`border-r border-gray-200 ${
                          date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-100' : ''
                        }`}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Task rows */}
                  {project.tasks.map(task => (
                    <div key={task.id} className="timeline-row relative">
                      <div className="sticky left-0 z-10 bg-white w-[100px] h-full flex items-center px-2 text-xs text-gray-600 border-r border-gray-200">
                        {task.title}
                      </div>
                      
                      {dates.map((date, index) => (
                        <div 
                          key={index} 
                          className={`border-r border-gray-200 ${
                            date.getDay() === 0 || date.getDay() === 6 ? 'bg-gray-100' : ''
                          }`}
                        ></div>
                      ))}
                      
                      {/* Task bar */}
                      {getTaskBarStyle(task) && (
                        <div 
                          className={`task-bar ${task.color} hover:opacity-90 transition-opacity`}
                          style={{
                            ...getTaskBarStyle(task),
                            top: '2px',
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="truncate">{task.title}</span>
                            <span className="ml-1 font-medium">{task.progress}%</span>
                          </div>
                          
                          {/* Progress indicator */}
                          <div className="absolute bottom-0 left-0 h-1 bg-white/20" style={{ width: `${task.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Summary</CardTitle>
            <CardDescription>Status of tasks across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-zenith-primary rounded-full h-2"
                    style={{ width: '67%' }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 mr-2 text-zenith-primary" />
                    <span className="text-sm font-medium">Ongoing Tasks</span>
                  </div>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-1">
                    <Users className="h-4 w-4 mr-2 text-zenith-secondary" />
                    <span className="text-sm font-medium">Team Members</span>
                  </div>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Tasks due in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Design Phase', date: 'Apr 22, 2025', progress: 70 },
                { name: 'Content Creation', date: 'Apr 20, 2025', progress: 80 },
                { name: 'Social Media Schedule', date: 'Apr 25, 2025', progress: 40 },
              ].map((task, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{task.name}</span>
                    <span className="text-sm text-gray-500">Due: {task.date}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-zenith-primary rounded-full h-2"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
