
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Mic, BrainCircuit, Image } from 'lucide-react';
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
      text: "Olá! Sou o assistente do Jenova, equipado com Gemini. Como posso ajudar a gerenciar seus projetos hoje?",
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
        "Posso ajudar você a reorganizar os cronogramas do projeto para melhor eficiência.",
        "Com base nas suas tarefas atuais, recomendo priorizar a fase de design.",
        "Analisei os dados do seu projeto e criei um relatório resumido. Gostaria de vê-lo?",
        "Posso criar uma nova tarefa para você. Como deseja nomeá-la e qual o prazo?",
        "Seu projeto atual está 68% concluído e dentro do prazo previsto.",
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
      title: "Assistente de Voz",
      description: "Comandos de voz estarão disponíveis na próxima atualização.",
    });
  };

  const handleImageUpload = () => {
    toast({
      title: "Upload de Imagem",
      description: "Envio de imagens estará disponível na próxima atualização.",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full md:w-96 bg-white shadow-lg flex flex-col animate-slide-in dark-purple:bg-[#1f1631] dark-tactical:bg-[#1E2D24] dark-hacker:bg-[#0D0D0D]">
      <div className="flex items-center justify-between p-4 border-b dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-jenova-primary dark-purple:text-purple-400 dark-tactical:text-green-600 dark-hacker:text-red-500" />
          <h2 className="font-semibold dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Assistente IA</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message mb-4 p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-100 ml-8 dark-purple:bg-purple-900/20 dark-tactical:bg-green-900/20 dark-hacker:bg-red-900/20' 
                : 'bg-gray-100 mr-8 dark-purple:bg-[#2a1f45] dark-tactical:bg-[#2A3C30] dark-hacker:bg-[#1A1A1A]'
            }`}
          >
            <p className="dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">{message.text}</p>
            <div className="text-xs opacity-70 mt-1 text-right dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 dark-purple:bg-[#2a1f45] dark-purple:text-gray-200 dark-tactical:bg-[#2A3C30] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A] dark-hacker:text-gray-200 dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button size="icon" variant="outline" onClick={handleImageUpload}>
            <Image className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleVoiceCommand}>
            <Mic className="h-5 w-5" />
          </Button>
          <Button onClick={handleSendMessage}>
            <Send className="h-5 w-5 mr-2" />
            Enviar
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
          Desenvolvido por Gemini 2.5 Pro. Seu assistente aprende com suas interações
          para ajudar a gerenciar seus projetos com mais eficiência.
        </p>
      </div>
    </div>
  );
}
