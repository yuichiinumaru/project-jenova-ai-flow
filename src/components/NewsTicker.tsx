
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ExternalLink, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock news data - in a real app this would come from an API
const initialNewsItems = [
  { id: 1, title: "Prefeitura anuncia novo projeto de mobilidade urbana", source: "Portal G1", time: "30m", url: "#" },
  { id: 2, title: "Votação do orçamento municipal acontece nesta semana", source: "Folha da Cidade", time: "45m", url: "#" },
  { id: 3, title: "Vereadores aprovam por unanimidade projeto de revitalização do Centro", source: "Jornal Local", time: "1h", url: "#" },
  { id: 4, title: "Audiência pública sobre meio ambiente marcada para a próxima quinta", source: "Portal da Cidade", time: "2h", url: "#" },
  { id: 5, title: "Câmara Municipal debate melhoria do transporte público", source: "Diário Municipal", time: "3h", url: "#" },
];

export function NewsTicker() {
  const [newsItems, setNewsItems] = useState(initialNewsItems);
  const [isPaused, setIsPaused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const tickerRef = useRef<HTMLDivElement>(null);

  // Function to simulate refreshing news
  const refreshNews = () => {
    toast({
      title: t('updatingNews'),
      description: t('fetchingLatest'),
    });
    
    // Simulating an API call with setTimeout
    setTimeout(() => {
      // Shuffle the existing news to simulate new content
      const shuffled = [...newsItems].sort(() => 0.5 - Math.random());
      setNewsItems(shuffled);
      
      toast({
        title: t('newsUpdated'),
        description: t('latestLoaded'),
      });
    }, 1500);
  };

  // Handle clicking on a news item
  const handleNewsClick = (url: string) => {
    // In a real app, this would open the news in a new tab or modal
    toast({
      title: t('openingNews'),
      description: t('redirectingToSource'),
    });
  };

  // Open settings modal
  const openSettings = () => {
    setIsSettingsOpen(true);
    toast({
      title: t('newsSettings'),
      description: t('comingSoon'),
    });
  };

  // Animation effect for the ticker
  useEffect(() => {
    if (!tickerRef.current || isPaused) return;

    const ticker = tickerRef.current;
    let animationId: number;
    let position = 0;

    const animate = () => {
      if (isPaused) return;
      
      position -= 0.5; // Adjust speed here
      ticker.style.transform = `translateX(${position}px)`;
      
      // Reset position when all items have scrolled
      if (position < -ticker.scrollWidth / 2) {
        position = 0;
        ticker.style.transform = `translateX(${position}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  return (
    <div className="relative overflow-hidden border-t dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A] bg-white dark-purple:bg-[#1f1631] dark-tactical:bg-[#1E2D24] dark-hacker:bg-[#0D0D0D] h-10">
      <div className="flex items-center h-full">
        {/* Controls */}
        <div className="flex items-center px-3 h-full border-r dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A] z-10 bg-gray-50 dark-purple:bg-[#2a1f45] dark-tactical:bg-[#2A3C30] dark-hacker:bg-[#1A1A1A]">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-1 h-7 w-7"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <div className="h-3 w-3 bg-jenova-primary dark-purple:bg-purple-400 dark-tactical:bg-green-600 dark-hacker:bg-red-500 rounded" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 mr-1"
            onClick={refreshNews}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={openSettings}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Ticker content */}
        <div 
          className="flex items-center pl-3 whitespace-nowrap"
          ref={tickerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {newsItems.map((item) => (
            <div 
              key={item.id}
              className="flex items-center mr-12 cursor-pointer hover:underline"
              onClick={() => handleNewsClick(item.url)}
            >
              <span className="font-medium text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                {item.title}
              </span>
              <span className="mx-2 text-xs text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                {item.source} • {item.time}
              </span>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </div>
          ))}
          
          {/* Duplicate the items for continuous scrolling */}
          {newsItems.map((item) => (
            <div 
              key={`dup-${item.id}`}
              className="flex items-center mr-12 cursor-pointer hover:underline"
              onClick={() => handleNewsClick(item.url)}
            >
              <span className="font-medium text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                {item.title}
              </span>
              <span className="mx-2 text-xs text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                {item.source} • {item.time}
              </span>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
