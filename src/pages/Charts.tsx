
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Sample data for charts
const taskStatusData = [
  { name: 'Backlog', value: 18, fill: '#9b87f5' },
  { name: 'Todo', value: 8, fill: '#30a1f3' },
  { name: 'In Progress', value: 5, fill: '#f97316' },
  { name: 'Review', value: 3, fill: '#facc15' },
  { name: 'Done', value: 12, fill: '#4ade80' },
];

const velocityData = [
  { sprint: 'Sprint 1', planned: 15, completed: 12 },
  { sprint: 'Sprint 2', planned: 18, completed: 16 },
  { sprint: 'Sprint 3', planned: 20, completed: 17 },
  { sprint: 'Sprint 4', planned: 22, completed: 19 },
  { sprint: 'Sprint 5', planned: 24, completed: 22 },
  { sprint: 'Sprint 6', planned: 25, completed: 24 },
];

const burndownData = [
  { day: 1, remaining: 120, ideal: 120 },
  { day: 2, remaining: 115, ideal: 110 },
  { day: 3, remaining: 108, ideal: 100 },
  { day: 4, remaining: 100, ideal: 90 },
  { day: 5, remaining: 95, ideal: 80 },
  { day: 6, remaining: 90, ideal: 70 },
  { day: 7, remaining: 85, ideal: 60 },
  { day: 8, remaining: 70, ideal: 50 },
  { day: 9, remaining: 65, ideal: 40 },
  { day: 10, remaining: 50, ideal: 30 },
  { day: 11, remaining: 40, ideal: 20 },
  { day: 12, remaining: 35, ideal: 10 },
  { day: 13, remaining: 30, ideal: 0 },
  { day: 14, remaining: 30, ideal: 0 },
];

const cfdData = [
  { day: 1, done: 0, inReview: 0, inProgress: 2, todo: 10, backlog: 18 },
  { day: 2, done: 0, inReview: 0, inProgress: 3, todo: 11, backlog: 16 },
  { day: 3, done: 1, inReview: 1, inProgress: 4, todo: 10, backlog: 14 },
  { day: 4, done: 2, inReview: 1, inProgress: 5, todo: 9, backlog: 13 },
  { day: 5, done: 3, inReview: 2, inProgress: 5, todo: 8, backlog: 12 },
  { day: 6, done: 5, inReview: 2, inProgress: 4, todo: 8, backlog: 11 },
  { day: 7, done: 6, inReview: 2, inProgress: 3, todo: 9, backlog: 10 },
  { day: 8, done: 8, inReview: 2, inProgress: 3, todo: 8, backlog: 9 },
  { day: 9, done: 10, inReview: 2, inProgress: 3, todo: 7, backlog: 8 },
  { day: 10, done: 12, inReview: 3, inProgress: 4, todo: 6, backlog: 5 },
];

const CHART_TYPES = {
  BURNDOWN: 'burndown',
  VELOCITY: 'velocity',
  TASKS: 'tasks',
  CFD: 'cfd'
};

export default function Charts() {
  const [activeChart, setActiveChart] = useState(CHART_TYPES.TASKS);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Charts & Metrics</h2>
          <p className="text-gray-500">Visualize your project performance</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button 
            variant={activeChart === CHART_TYPES.TASKS ? 'default' : 'outline'} 
            onClick={() => setActiveChart(CHART_TYPES.TASKS)}
          >
            Tasks
          </Button>
          <Button 
            variant={activeChart === CHART_TYPES.BURNDOWN ? 'default' : 'outline'} 
            onClick={() => setActiveChart(CHART_TYPES.BURNDOWN)}
          >
            Burndown
          </Button>
          <Button 
            variant={activeChart === CHART_TYPES.VELOCITY ? 'default' : 'outline'} 
            onClick={() => setActiveChart(CHART_TYPES.VELOCITY)}
          >
            Velocity
          </Button>
          <Button 
            variant={activeChart === CHART_TYPES.CFD ? 'default' : 'outline'} 
            onClick={() => setActiveChart(CHART_TYPES.CFD)}
          >
            Flow
          </Button>
        </div>
      </div>
      
      {activeChart === CHART_TYPES.TASKS && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Status Distribution</CardTitle>
              <CardDescription>Current breakdown of task status</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Task Status</CardTitle>
              <CardDescription>Current counts by status</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={taskStatusData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                    <Legend />
                    <Bar dataKey="value" name="Tasks" barSize={40}>
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeChart === CHART_TYPES.BURNDOWN && (
        <Card>
          <CardHeader>
            <CardTitle>Sprint Burndown Chart</CardTitle>
            <CardDescription>Task points remaining vs. time</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={burndownData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Sprint Day', position: 'insideBottomRight', offset: 0 }} />
                  <YAxis label={{ value: 'Points Remaining', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="remaining" name="Actual Remaining" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="ideal" name="Ideal Burndown" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeChart === CHART_TYPES.VELOCITY && (
        <Card>
          <CardHeader>
            <CardTitle>Sprint Velocity</CardTitle>
            <CardDescription>Planned vs. completed story points per sprint</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={velocityData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sprint" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planned" name="Planned Points" fill="#9b87f5" barSize={30} />
                  <Bar dataKey="completed" name="Completed Points" fill="#30a1f3" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeChart === CHART_TYPES.CFD && (
        <Card>
          <CardHeader>
            <CardTitle>Cumulative Flow Diagram</CardTitle>
            <CardDescription>Work items in each state over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={cfdData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottomRight', offset: 0 }} />
                  <YAxis label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="backlog" name="Backlog" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="todo" name="Todo" stackId="1" stroke="#9b87f5" fill="#9b87f5" />
                  <Area type="monotone" dataKey="inProgress" name="In Progress" stackId="1" stroke="#f97316" fill="#f97316" />
                  <Area type="monotone" dataKey="inReview" name="In Review" stackId="1" stroke="#facc15" fill="#facc15" />
                  <Area type="monotone" dataKey="done" name="Done" stackId="1" stroke="#4ade80" fill="#4ade80" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-zenith-primary">24</div>
              <div className="text-sm text-gray-500 mt-1">Tasks completed this sprint</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">Previous: 19</div>
              <div className="text-sm text-green-500">+26%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cycle Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-zenith-primary">3.2</div>
              <div className="text-sm text-gray-500 mt-1">Average days to complete</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">Previous: 4.5</div>
              <div className="text-sm text-green-500">-29%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Work in Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-zenith-primary">8</div>
              <div className="text-sm text-gray-500 mt-1">Current WIP tasks</div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">Limit: 10</div>
              <div className="text-sm text-green-500">On track</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
