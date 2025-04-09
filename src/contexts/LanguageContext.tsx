
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define our languages
export type Language = 'en' | 'pt';

// Define our translations
export type Translations = {
  [key: string]: {
    en: string;
    pt: string;
  };
};

// Base translations for common UI elements
const baseTranslations: Translations = {
  dashboard: {
    en: 'Dashboard',
    pt: 'Painel',
  },
  kanban: {
    en: 'Kanban',
    pt: 'Kanban',
  },
  timeline: {
    en: 'Timeline',
    pt: 'Linha do Tempo',
  },
  calendar: {
    en: 'Calendar',
    pt: 'Calendário',
  },
  charts: {
    en: 'Charts',
    pt: 'Gráficos',
  },
  flowDiagram: {
    en: 'Flow Diagram',
    pt: 'Diagrama de Fluxo',
  },
  mindMap: {
    en: 'Mind Map',
    pt: 'Mapa Mental',
  },
  valueStream: {
    en: 'Value Stream',
    pt: 'Fluxo de Valor',
  },
  teams: {
    en: 'Teams',
    pt: 'Equipes',
  },
  intelligence: {
    en: 'Intelligence',
    pt: 'Inteligência',
  },
  assistant: {
    en: 'AI Assistant',
    pt: 'Assistente IA',
  },
  settings: {
    en: 'Settings',
    pt: 'Configurações',
  },
  research: {
    en: 'Deep Research',
    pt: 'Pesquisa Profunda',
  },
  light: {
    en: 'Light',
    pt: 'Claro',
  },
  darkPurple: {
    en: 'Dark Purple',
    pt: 'Roxo Escuro',
  },
  darkTactical: {
    en: 'Tactical Dark',
    pt: 'Verde Escuro',
  },
  darkHacker: {
    en: 'Hacker',
    pt: 'Hacker',
  },
  send: {
    en: 'Send',
    pt: 'Enviar',
  },
  typeMessage: {
    en: 'Type your message...',
    pt: 'Digite sua mensagem...',
  },
  detailLevel: {
    en: 'Detail Level:',
    pt: 'Nível de Detalhamento:',
  },
  pauseAI: {
    en: 'Pause AI',
    pt: 'Pausar IA',
  },
  activateAI: {
    en: 'Activate AI',
    pt: 'Ativar IA',
  },
  language: {
    en: 'Language',
    pt: 'Idioma',
  },
  english: {
    en: 'English',
    pt: 'Inglês',
  },
  portuguese: {
    en: 'Portuguese',
    pt: 'Português',
  },
  search: {
    en: 'Search',
    pt: 'Buscar',
  },
  newDocument: {
    en: 'New Document',
    pt: 'Novo Documento',
  },
  newFolder: {
    en: 'New Folder',
    pt: 'Nova Pasta',
  },
  favorites: {
    en: 'Favorites',
    pt: 'Favoritos',
  },
  templates: {
    en: 'Templates',
    pt: 'Modelos',
  },
  recentDocuments: {
    en: 'Recent Documents',
    pt: 'Documentos Recentes',
  },
  allDocuments: {
    en: 'All Documents',
    pt: 'Todos os Documentos',
  },
  voiceCommands: {
    en: 'Voice Commands',
    pt: 'Comandos de Voz',
  },
  imageUpload: {
    en: 'Image Upload',
    pt: 'Envio de Imagem',
  },
  updatingNews: {
    en: 'Updating news',
    pt: 'Atualizando notícias',
  },
  fetchingLatest: {
    en: 'Fetching the latest information...',
    pt: 'Buscando as últimas informações...',
  },
  newsUpdated: {
    en: 'News updated',
    pt: 'Notícias atualizadas',
  },
  latestLoaded: {
    en: 'The latest information has been loaded.',
    pt: 'As últimas informações foram carregadas.',
  },
  openingNews: {
    en: 'Opening news',
    pt: 'Abrindo notícia',
  },
  redirectingToSource: {
    en: 'Redirecting to original source...',
    pt: 'Redirecionando para a fonte original...',
  },
  newsSettings: {
    en: 'News feed settings',
    pt: 'Configurações do feed de notícias',
  },
  comingSoon: {
    en: 'This feature will be available soon.',
    pt: 'Esta funcionalidade estará disponível em breve.',
  },
  sources: {
    en: 'Sources',
    pt: 'Fontes',
  },
  results: {
    en: 'Results',
    pt: 'Resultados',
  },
  upload: {
    en: 'Upload',
    pt: 'Enviar',
  },
  connectSource: {
    en: 'Connect Source',
    pt: 'Conectar Fonte',
  },
  searchDocuments: {
    en: 'Search documents...',
    pt: 'Buscar documentos...',
  },
  noSourcesSelected: {
    en: 'No sources selected',
    pt: 'Nenhuma fonte selecionada',
  },
  selectSourcesFirst: {
    en: 'Please select at least one document source for research.',
    pt: 'Por favor, selecione pelo menos uma fonte de documento para pesquisa.',
  },
  fileUploaded: {
    en: 'File Uploaded',
    pt: 'Arquivo Enviado',
  },
  filesReadyForResearch: {
    en: 'file(s) have been uploaded and are ready for research.',
    pt: 'arquivo(s) foram enviados e estão prontos para pesquisa.',
  },
  save: {
    en: 'Save',
    pt: 'Salvar',
  },
  saveChanges: {
    en: 'Save Changes',
    pt: 'Salvar Alterações',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  addTranslations: (newTranslations: Translations) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(baseTranslations);

  // Load saved language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    console.warn(`Translation missing for key: ${key}`);
    return key;
  };

  // Add new translations
  const addTranslations = (newTranslations: Translations) => {
    setTranslations(prev => ({ ...prev, ...newTranslations }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, addTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
