
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, BrainCircuit, PauseCircle, PlayCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function AIAssistant() {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Gemini-powered project assistant. How can I help you manage your projects today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I can help you reorganize your project timelines for better efficiency. Based on my analysis, shifting the design phase to start 2 days earlier could give your development team more buffer time.",
        "Looking at your current tasks, I'd recommend prioritizing the design phase. Your team tends to complete design tasks 15% faster when they're focused solely on that.",
        "I've analyzed your project data and created a summary report. Your marketing campaign has the highest completion rate at 80%, while development tasks are currently at 30% completion.",
        "I can create a new task for you. Would you like me to add it to the Kanban board, Timeline, or both? I'll make sure it's synchronized across all views.",
        "Your current project is 67% complete and on track for the deadline. There's a slight risk with the Social Media Schedule task as it's only 40% complete with a deadline in 5 days.",
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleVoiceCommand = () => {
    toast({
      title: "Voice Assistant",
      description: "Voice commands will be available in the next update.",
    });
  };

  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "AI Assistant Paused" : "AI Assistant Activated",
      description: aiEnabled 
        ? "The AI assistant will no longer make suggestions or interventions." 
        : "The AI assistant is now actively helping with your project management.",
    });
  };

  const aiCapabilities = [
    {
      title: "Task Management",
      description: "Create, update, and organize tasks across different views automatically",
      icon: <Kanban className="h-5 w-5 text-zenith-secondary" />,
    },
    {
      title: "Schedule Optimization",
      description: "Analyze and suggest improvements to project timelines",
      icon: <Clock className="h-5 w-5 text-zenith-secondary" />,
    },
    {
      title: "Smart Insights",
      description: "Generate reports and visualizations from your project data",
      icon: <BarChart className="h-5 w-5 text-zenith-secondary" />,
    },
    {
      title: "Voice Interaction",
      description: "Control your project management system with voice commands",
      icon: <Mic className="h-5 w-5 text-zenith-secondary" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">AI Assistant</h2>
          <p className="text-gray-500">Your intelligent project management companion</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button 
            variant={aiEnabled ? "default" : "outline"} 
            onClick={toggleAI}
            className={aiEnabled ? "bg-zenith-primary" : ""}
          >
            {aiEnabled ? (
              <PauseCircle className="mr-2 h-4 w-4" />
            ) : (
              <PlayCircle className="mr-2 h-4 w-4" />
            )}
            {aiEnabled ? "Pause AI" : "Enable AI"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BrainCircuit className="h-5 w-5 mr-2 text-zenith-primary" />
                Chat with Gemini 2.5 Pro
              </CardTitle>
              <CardDescription>
                Ask questions about your projects or give commands
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto px-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-message ${
                      message.sender === 'user' ? 'user-message' : 'ai-message'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="pt-4 border-t mt-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message or command..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="icon" variant="outline" onClick={handleVoiceCommand}>
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-5 w-5 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>What your assistant can do</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">{capability.icon}</div>
                    <div>
                      <h3 className="font-medium">{capability.title}</h3>
                      <p className="text-sm text-gray-500">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Example Commands</CardTitle>
              <CardDescription>Try asking your assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Create a new task for the marketing campaign",
                  "Move the design phase to start next Monday",
                  "Show me project progress summary",
                  "What tasks are at risk of missing deadlines?",
                  "Generate a report for the website redesign project",
                ].map((command, index) => (
                  <div 
                    key={index} 
                    className="p-2 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setInput(command);
                    }}
                  >
                    "{command}"
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Kanban(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 5v11" />
      <path d="M12 5v6" />
      <path d="M18 5v14" />
    </svg>
  )
}

function BarChart(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
