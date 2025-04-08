
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Mic, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type ChatDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function ChatDrawer({ open, onClose }: ChatDrawerProps) {
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
        "I can help you reorganize your project timelines for better efficiency.",
        "Based on your current tasks, I'd recommend prioritizing the design phase.",
        "I've analyzed your project data and created a summary report. Would you like to see it?",
        "I can create a new task for you. What would you like to call it and when is it due?",
        "Your current project is 68% complete and on track for the deadline.",
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

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full md:w-96 bg-white shadow-lg flex flex-col animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-zenith-primary" />
          <h2 className="font-semibold">AI Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
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
      </div>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button size="icon" variant="ghost" onClick={handleVoiceCommand}>
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={handleSendMessage}>
            <Send className="h-5 w-5 mr-2" />
            Send
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Powered by Gemini 2.5 Pro. Your assistant learns from your interactions
          to help manage your projects more efficiently.
        </p>
      </div>
    </div>
  );
}
