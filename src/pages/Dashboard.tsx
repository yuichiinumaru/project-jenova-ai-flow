
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Calendar, CheckSquare, Clock, Users } from 'lucide-react';

export default function Dashboard() {
  // Sample project metrics
  const metrics = [
    { title: 'Active Projects', value: '12', icon: <BarChart className="h-4 w-4" />, change: '+2', color: 'text-green-500' },
    { title: 'Tasks Completed', value: '842', icon: <CheckSquare className="h-4 w-4" />, change: '+12%', color: 'text-green-500' },
    { title: 'Hours Logged', value: '468', icon: <Clock className="h-4 w-4" />, change: '+8%', color: 'text-green-500' },
    { title: 'Team Members', value: '24', icon: <Users className="h-4 w-4" />, change: '+2', color: 'text-green-500' },
  ];

  // Sample projects
  const projects = [
    { id: 1, name: 'Website Redesign', progress: 75, status: 'In Progress', priority: 'High', dueDate: '2025-04-15' },
    { id: 2, name: 'Mobile App Development', progress: 45, status: 'In Progress', priority: 'Medium', dueDate: '2025-05-20' },
    { id: 3, name: 'Marketing Campaign', progress: 90, status: 'In Review', priority: 'Low', dueDate: '2025-04-12' },
    { id: 4, name: 'Infrastructure Upgrade', progress: 30, status: 'In Progress', priority: 'High', dueDate: '2025-06-01' },
    { id: 5, name: 'Customer Portal', progress: 10, status: 'Planning', priority: 'Medium', dueDate: '2025-07-15' },
  ];

  // Sample recent activities
  const activities = [
    { id: 1, user: 'John Doe', action: 'completed task', item: 'Design Homepage', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'commented on', item: 'API Integration', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'started task', item: 'User Testing', time: '6 hours ago' },
    { id: 4, user: 'Sarah Williams', action: 'updated due date for', item: 'Marketing Campaign', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Welcome back, John</h2>
          <p className="text-gray-500">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Calendar className="h-6 w-6 text-zenith-primary" />
          <span className="font-medium">April 8, 2025</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                </div>
                <div className="bg-zenith-primary/10 p-3 rounded-full">
                  {metric.icon}
                </div>
              </div>
              <div className={`flex items-center mt-4 text-sm ${metric.color}`}>
                <span>{metric.change}</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Your current project portfolio status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.priority === 'High' ? 'bg-red-100 text-red-700' :
                      project.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {project.priority}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{project.status}</span>
                    <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-zenith-primary rounded-full h-2"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {project.progress}% complete
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-zenith-secondary flex items-center justify-center text-white">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
