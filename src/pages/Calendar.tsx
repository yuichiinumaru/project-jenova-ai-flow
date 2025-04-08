
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight, CalendarIcon, Clock, User } from 'lucide-react';

// Sample data for events
const SAMPLE_EVENTS = [
  {
    id: 'e1',
    title: 'Team Meeting',
    date: new Date(2025, 3, 15), // April 15, 2025
    time: '10:00 AM - 11:30 AM',
    attendees: ['John D.', 'Alice S.', 'Mike J.'],
    description: 'Weekly team sync to discuss project progress and roadblocks',
  },
  {
    id: 'e2',
    title: 'Client Presentation',
    date: new Date(2025, 3, 18), // April 18, 2025
    time: '2:00 PM - 3:30 PM',
    attendees: ['John D.', 'Alice S.'],
    description: 'Present project milestones and gather feedback',
  },
  {
    id: 'e3',
    title: 'Design Review',
    date: new Date(2025, 3, 20), // April 20, 2025
    time: '11:00 AM - 12:00 PM',
    attendees: ['Alice S.', 'Mike J.'],
    description: 'Review new UI designs for the dashboard feature',
  },
  {
    id: 'e4',
    title: 'Planning Session',
    date: new Date(2025, 3, 10), // April 10, 2025
    time: '9:00 AM - 11:00 AM',
    attendees: ['John D.', 'Alice S.', 'Mike J.'],
    description: 'Plan upcoming sprint and assign tasks',
  },
];

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(
    event => date && event.date.toDateString() === date.toDateString()
  );
  
  // Navigate to previous/next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (!date) return;
    
    const newDate = new Date(date);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    
    setDate(newDate);
  };
  
  // Check if a date has events
  const hasEvents = (day: Date) => {
    return events.some(event => event.date.toDateString() === day.toDateString());
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Calendar</h2>
          <p className="text-gray-500">Schedule and manage your project events</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Project Calendar</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              {date?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              modifiers={{
                hasEvents: (day) => hasEvents(day),
              }}
              modifiersClassNames={{
                hasEvents: 'font-bold bg-zenith-primary text-white',
              }}
              month={date}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateEvents.length === 0 ? (
                <p className="text-muted-foreground text-sm">No events scheduled for this day</p>
              ) : (
                selectedDateEvents.map(event => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-md dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424]">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark-purple:text-gray-300 dark-tactical:text-gray-300 dark-hacker:text-gray-300">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <p className="mt-2 text-sm">{event.description}</p>
                    
                    <div className="mt-3 text-sm text-gray-500 dark-purple:text-gray-300 dark-tactical:text-gray-300 dark-hacker:text-gray-300">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{event.attendees.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Events scheduled in the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => {
                const today = new Date();
                const nextWeek = new Date(today);
                nextWeek.setDate(nextWeek.getDate() + 7);
                
                return event.date >= today && event.date <= nextWeek;
              })
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map(event => (
                <div key={event.id} className="flex items-center p-3 border-b last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="flex flex-wrap gap-x-4 mt-1 text-sm text-gray-500 dark-purple:text-gray-300 dark-tactical:text-gray-300 dark-hacker:text-gray-300">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
