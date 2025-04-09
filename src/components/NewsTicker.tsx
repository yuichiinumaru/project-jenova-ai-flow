
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ExternalLink, RefreshCw, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSerpApiKey, isSerpApiConfigured } from '@/services/apiKeys';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Define news item type
interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
}

export function NewsTicker() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const tickerRef = useRef<HTMLDivElement>(null);

  // Function to fetch news from SerpAPI
  const fetchNews = async () => {
    const apiKey = getSerpApiKey();
    
    if (!apiKey) {
      setError(language === 'en' 
        ? 'SerpAPI key not configured. Please add your API key in Settings.' 
        : 'Chave SerpAPI não configurada. Por favor, adicione sua chave API em Configurações.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // This is where we would make a real API call
      // For now, we'll simulate the API call with a timeout
      const response = await new Promise<NewsItem[]>((resolve) => {
        setTimeout(() => {
          // Simulate news data that would come from the API
          const simulatedNews = [
            { 
              id: '1', 
              title: language === 'en' ? "City announces new urban mobility project" : "Prefeitura anuncia novo projeto de mobilidade urbana", 
              source: language === 'en' ? "City News" : "Portal G1", 
              time: "30m", 
              url: "#" 
            },
            { 
              id: '2', 
              title: language === 'en' ? "Municipal budget vote happening this week" : "Votação do orçamento municipal acontece nesta semana", 
              source: language === 'en' ? "Daily News" : "Folha da Cidade", 
              time: "45m", 
              url: "#" 
            },
            { 
              id: '3', 
              title: language === 'en' ? "City council approves downtown revitalization project" : "Vereadores aprovam por unanimidade projeto de revitalização do Centro", 
              source: language === 'en' ? "Local Journal" : "Jornal Local", 
              time: "1h", 
              url: "#" 
            },
            { 
              id: '4', 
              title: language === 'en' ? "Public hearing on environmental issues scheduled for next Thursday" : "Audiência pública sobre meio ambiente marcada para a próxima quinta", 
              source: language === 'en' ? "City Portal" : "Portal da Cidade", 
              time: "2h", 
              url: "#" 
            },
            { 
              id: '5', 
              title: language === 'en' ? "City council debates improving public transportation" : "Câmara Municipal debate melhoria do transporte público", 
              source: language === 'en' ? "Municipal Daily" : "Diário Municipal", 
              time: "3h", 
              url: "#" 
            },
          ];
          resolve(simulatedNews);
        }, 1000);
      });
      
      setNewsItems(response);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(language === 'en' 
        ? 'Failed to fetch news. Please try again later.' 
        : 'Falha ao buscar notícias. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh news
  const refreshNews = () => {
    toast({
      title: t('updatingNews'),
      description: t('fetchingLatest'),
    });
    
    fetchNews();
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
    if (!tickerRef.current || isPaused || newsItems.length === 0) return;

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
  }, [isPaused, newsItems]);

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
  }, [language]);

  // If no API key is configured, show a message
  if (!isSerpApiConfigured() && !isLoading && newsItems.length === 0) {
    return (
      <div className="relative overflow-hidden border-t dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A] bg-white dark-purple:bg-[#1f1631] dark-tactical:bg-[#1E2D24] dark-hacker:bg-[#0D0D0D] h-10">
        <Alert variant="warning" className="h-full border-0 rounded-none flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertTitle className="text-xs">
            {language === 'en' 
              ? "SerpAPI key not configured"
              : "Chave SerpAPI não configurada"}
          </AlertTitle>
          <AlertDescription className="text-xs ml-2">
            {language === 'en' 
              ? "Please add your SerpAPI key in Settings > API Keys to enable the news ticker."
              : "Por favor, adicione sua chave SerpAPI em Configurações > Chaves de API para ativar o ticker de notícias."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

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
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
        
        {/* Error message */}
        {error && (
          <div className="flex items-center px-4 text-red-500 dark-purple:text-red-400 dark-tactical:text-red-400 dark-hacker:text-red-500">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && newsItems.length === 0 && !error && (
          <div className="flex items-center px-4">
            <span className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
              {language === 'en' ? "Loading news..." : "Carregando notícias..."}
            </span>
          </div>
        )}
        
        {/* Ticker content */}
        {!isLoading && newsItems.length > 0 && !error && (
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
        )}
      </div>
    </div>
  );
}
