
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, BrainCircuit, PauseCircle, PlayCircle, Image, Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

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
      text: "Olá! Sou o assistente do Jenova, equipado com Gemini. Como posso ajudar a gerenciar seus projetos hoje?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [detailLevel, setDetailLevel] = useState(50); // 0-100 scale for detail level
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
        "Posso ajudar você a reorganizar os cronogramas do seu projeto para melhor eficiência. Com base na minha análise, adiantar a fase de design em 2 dias daria à sua equipe de desenvolvimento mais tempo de buffer.",
        "Analisando suas tarefas atuais, recomendo priorizar a fase de design. Sua equipe costuma completar tarefas de design 15% mais rápido quando focada exclusivamente nisso.",
        "Analisei os dados do seu projeto e criei um relatório resumido. Sua campanha de marketing tem a maior taxa de conclusão em 80%, enquanto as tarefas de desenvolvimento estão atualmente em 30% de conclusão.",
        "Posso criar uma nova tarefa para você. Gostaria que eu adicionasse ao Kanban, Linha do Tempo ou ambos? Vou garantir que seja sincronizada em todas as visualizações.",
        "Seu projeto atual está 67% concluído e dentro do prazo previsto. Há um pequeno risco com a tarefa de Programação de Mídias Sociais, pois está apenas 40% completa com prazo em 5 dias.",
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

  const toggleAI = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "Assistente IA Pausado" : "Assistente IA Ativado",
      description: aiEnabled 
        ? "O assistente de IA não fará mais sugestões ou intervenções." 
        : "O assistente de IA está agora ajudando ativamente com seu gerenciamento de projeto.",
    });
  };

  const handleDetailLevelChange = (value: number[]) => {
    setDetailLevel(value[0]);
    toast({
      title: "Nível de Detalhamento Atualizado",
      description: `O assistente agora ${value[0] < 33 ? 'usará respostas concisas' : value[0] < 66 ? 'fornecerá detalhes moderados' : 'dará explicações detalhadas'}.`,
    });
  };

  const aiCapabilities = [
    {
      title: "Gerenciamento de Tarefas",
      description: "Cria, atualiza e organiza tarefas em diferentes visualizações automaticamente",
      icon: <Kanban className="h-5 w-5 text-jenova-secondary" />,
    },
    {
      title: "Otimização de Cronograma",
      description: "Analisa e sugere melhorias para cronogramas de projetos",
      icon: <Clock className="h-5 w-5 text-jenova-secondary" />,
    },
    {
      title: "Insights Inteligentes",
      description: "Gera relatórios e visualizações a partir dos dados do seu projeto",
      icon: <BarChart className="h-5 w-5 text-jenova-secondary" />,
    },
    {
      title: "Interação por Voz",
      description: "Controle seu sistema de gerenciamento de projetos com comandos de voz",
      icon: <Mic className="h-5 w-5 text-jenova-secondary" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Assistente IA</h2>
          <p className="text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">Seu companheiro inteligente de gerenciamento de projetos</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap dark-purple:text-gray-300 dark-tactical:text-gray-300 dark-hacker:text-gray-300">Nível de Detalhamento:</span>
            <Slider 
              defaultValue={[detailLevel]} 
              max={100} 
              step={1} 
              className="w-32"
              onValueChange={handleDetailLevelChange}
            />
          </div>
          <Button 
            variant={aiEnabled ? "default" : "outline"} 
            onClick={toggleAI}
            className={aiEnabled ? "bg-jenova-primary dark-purple:bg-purple-500 dark-tactical:bg-green-700 dark-hacker:bg-red-600" : ""}
          >
            {aiEnabled ? (
              <PauseCircle className="mr-2 h-4 w-4" />
            ) : (
              <PlayCircle className="mr-2 h-4 w-4" />
            )}
            {aiEnabled ? "Pausar IA" : "Ativar IA"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[700px] flex flex-col dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
            <CardHeader className="dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
              <CardTitle className="flex items-center dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                <BrainCircuit className="h-5 w-5 mr-2 text-jenova-primary dark-purple:text-purple-400 dark-tactical:text-green-600 dark-hacker:text-red-500" />
                Chat com Gemini 2.5 Pro
              </CardTitle>
              <CardDescription className="dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                Faça perguntas sobre seus projetos ou dê comandos
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto px-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-message mb-4 p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-100 ml-8 dark-purple:bg-purple-900/20 dark-tactical:bg-green-900/20 dark-hacker:bg-red-900/20' 
                        : 'bg-gray-100 mr-8 dark-purple:bg-[#392c53]/30 dark-tactical:bg-[#384D3E]/30 dark-hacker:bg-[#1A1A1A]/50'
                    }`}
                  >
                    <p className="dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">{message.text}</p>
                    <div className="text-xs opacity-70 mt-1 text-right dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="pt-4 border-t mt-4 dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite uma mensagem ou comando..."
                    className="flex-1 dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="icon" variant="outline" onClick={handleImageUpload} className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A]">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={handleVoiceCommand} className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A]">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleSendMessage} className="dark-purple:bg-purple-500 dark-purple:hover:bg-purple-600 dark-tactical:bg-green-700 dark-tactical:hover:bg-green-800 dark-hacker:bg-red-600 dark-hacker:hover:bg-red-700">
                    <Send className="h-5 w-5 mr-2" />
                    Enviar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Capacidades da IA</CardTitle>
              <CardDescription className="dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">O que seu assistente pode fazer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5">{capability.icon}</div>
                    <div>
                      <h3 className="font-medium dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">{capability.title}</h3>
                      <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">{capability.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Comandos de Exemplo</CardTitle>
              <CardDescription className="dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">Tente perguntar ao seu assistente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Crie uma nova tarefa para a campanha de marketing",
                  "Mude a fase de design para começar na próxima segunda-feira",
                  "Mostre-me um resumo do progresso do projeto",
                  "Quais tarefas têm risco de perder prazos?",
                  "Gere um relatório para o projeto de redesenho do site",
                ].map((command, index) => (
                  <div 
                    key={index} 
                    className="p-2 bg-gray-50 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark-purple:bg-[#392c53]/30 dark-purple:hover:bg-[#392c53]/50 dark-tactical:bg-[#384D3E]/30 dark-tactical:hover:bg-[#384D3E]/50 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:hover:bg-[#222]"
                    onClick={() => {
                      setInput(command);
                    }}
                  >
                    <span className="dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">"{command}"</span>
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
