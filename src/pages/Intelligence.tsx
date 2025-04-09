
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  Folder, 
  File, 
  Brain, 
  Upload, 
  FileText, 
  Star, 
  StarOff, 
  Clock, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  FileUp, 
  FolderPlus,
  FileImage
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { DocumentEditor } from '@/components/DocumentEditor';

// Types for our intelligence system
type DocumentType = 'note' | 'template' | 'research' | 'faq';
type DocumentStatus = 'draft' | 'published';

interface Document {
  id: string;
  title: string;
  content: string;
  type: DocumentType;
  status: DocumentStatus;
  tags: string[];
  starred: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  folderId: string | null;
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
}

export default function Intelligence() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  const [isCreatingDocument, setIsCreatingDocument] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documentContent, setDocumentContent] = useState('');
  
  // Sample data for demonstration
  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Políticas Públicas', parentId: null, createdAt: new Date() },
    { id: '2', name: 'Fiscalização', parentId: null, createdAt: new Date() },
    { id: '3', name: 'Projetos de Lei', parentId: null, createdAt: new Date() },
    { id: '4', name: 'Comunicação', parentId: null, createdAt: new Date() },
    { id: '5', name: 'Mobilização', parentId: null, createdAt: new Date() },
  ]);
  
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Estudo sobre transporte público municipal',
      content: 'Este documento contém uma análise detalhada do sistema de transporte público da cidade, incluindo pontos de melhoria e benchmarks de outras cidades.',
      type: 'research',
      status: 'published',
      tags: ['transporte', 'mobilidade', 'pesquisa'],
      starred: true,
      createdAt: new Date(2025, 3, 2),
      updatedAt: new Date(2025, 3, 2),
      createdBy: 'Ana Silva',
      folderId: '1'
    },
    {
      id: '2',
      title: 'Template para Requerimento de Informação',
      content: 'Template padrão para solicitar informações oficiais à órgãos públicos.',
      type: 'template',
      status: 'published',
      tags: ['template', 'documento', 'oficial'],
      starred: false,
      createdAt: new Date(2025, 3, 1),
      updatedAt: new Date(2025, 3, 1),
      createdBy: 'Carlos Oliveira',
      folderId: '3'
    },
    {
      id: '3',
      title: 'Análise do orçamento municipal de 2025',
      content: 'Análise detalhada do orçamento municipal aprovado para 2025, com foco nas áreas de saúde e educação.',
      type: 'research',
      status: 'draft',
      tags: ['orçamento', 'finanças', 'análise'],
      starred: true,
      createdAt: new Date(2025, 3, 5),
      updatedAt: new Date(2025, 3, 7),
      createdBy: 'Marcela Santos',
      folderId: '2'
    },
    {
      id: '4',
      title: 'Perguntas frequentes sobre atendimento ao cidadão',
      content: 'Lista de perguntas e respostas comuns sobre os serviços oferecidos pelo gabinete para atendimento ao cidadão.',
      type: 'faq',
      status: 'published',
      tags: ['atendimento', 'cidadão', 'faq'],
      starred: false,
      createdAt: new Date(2025, 2, 20),
      updatedAt: new Date(2025, 2, 20),
      createdBy: 'Paulo Mendes',
      folderId: '5'
    },
  ]);

  // Handler for creating a new document
  const handleCreateDocument = () => {
    if (!newDocumentTitle.trim()) {
      toast({
        title: "Título é obrigatório",
        description: "Por favor, informe um título para o documento.",
        variant: "destructive"
      });
      return;
    }

    const newDocument: Document = {
      id: (documents.length + 1).toString(),
      title: newDocumentTitle,
      content: '',
      type: 'note',
      status: 'draft',
      tags: [],
      starred: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Usuário Atual',
      folderId: null
    };

    setDocuments([...documents, newDocument]);
    setNewDocumentTitle('');
    setIsCreatingDocument(false);
    
    toast({
      title: "Documento criado",
      description: "Seu novo documento foi criado com sucesso."
    });

    // Open the document for editing
    setSelectedDocument(newDocument);
    setDocumentContent(newDocument.content);
  };

  // Handler for creating a new folder
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Nome é obrigatório",
        description: "Por favor, informe um nome para a pasta.",
        variant: "destructive"
      });
      return;
    }

    const newFolder: Folder = {
      id: (folders.length + 1).toString(),
      name: newFolderName,
      parentId: null,
      createdAt: new Date()
    };

    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
    
    toast({
      title: "Pasta criada",
      description: "Sua nova pasta foi criada com sucesso."
    });
  };

  // Handler for toggling star on a document
  const toggleStar = (docId: string) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, starred: !doc.starred } : doc
    ));
  };

  // Handler for deleting a document
  const deleteDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    
    if (selectedDocument && selectedDocument.id === docId) {
      setSelectedDocument(null);
      setDocumentContent('');
    }
    
    toast({
      title: "Documento excluído",
      description: "O documento foi excluído permanentemente."
    });
  };

  // Filter documents based on search term and current tab
  const filteredDocuments = documents.filter(doc => {
    // Search filter
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Tab filter
    if (currentTab === 'all') return matchesSearch;
    if (currentTab === 'starred') return matchesSearch && doc.starred;
    if (currentTab === 'templates') return matchesSearch && doc.type === 'template';
    if (currentTab === 'recent') {
      // Filter for documents updated in the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return matchesSearch && doc.updatedAt >= sevenDaysAgo;
    }
    
    return matchesSearch;
  });

  // Handler for saving document content
  const saveDocument = () => {
    if (!selectedDocument) return;
    
    setDocuments(documents.map(doc => 
      doc.id === selectedDocument.id 
        ? { ...doc, content: documentContent, updatedAt: new Date() } 
        : doc
    ));
    
    toast({
      title: "Documento salvo",
      description: "As alterações foram salvas com sucesso."
    });
  };

  // Handler for AI assistance with document
  const requestAIAssistance = () => {
    toast({
      title: "Assistente IA ativado",
      description: "O assistente IA está analisando seu documento e fará sugestões em breve."
    });
    
    // In a real implementation, this would call an AI service
    setTimeout(() => {
      if (!selectedDocument) return;
      
      const enhancedContent = documentContent + "\n\n**Sugestões do Assistente IA:**\n- Considere adicionar uma seção sobre impacto orçamentário\n- Há dados recentes que podem complementar esta análise\n- Estruture o documento com subtítulos para melhor legibilidade";
      
      setDocumentContent(enhancedContent);
      
      toast({
        title: "Sugestões do Assistente IA",
        description: "O assistente fez algumas sugestões para melhorar seu documento."
      });
    }, 2000);
  };

  // Handler for generating a document from template
  const generateFromTemplate = (templateId: string) => {
    const template = documents.find(doc => doc.id === templateId);
    if (!template) return;
    
    const newDocument: Document = {
      id: (documents.length + 1).toString(),
      title: `Novo documento baseado em: ${template.title}`,
      content: template.content,
      type: 'note',
      status: 'draft',
      tags: [...template.tags],
      starred: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'Usuário Atual',
      folderId: template.folderId
    };
    
    setDocuments([...documents, newDocument]);
    setSelectedDocument(newDocument);
    setDocumentContent(newDocument.content);
    
    toast({
      title: "Documento criado a partir de template",
      description: "Um novo documento foi criado com base no template selecionado."
    });
  };

  // Handle document upload (simulated)
  const handleDocumentUpload = () => {
    toast({
      title: "Upload de documento",
      description: "Funcionalidade de upload estará disponível em breve."
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Inteligência</h2>
          <p className="text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
            Gerencie e organize documentos, pesquisas e bases de conhecimento
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="dark-purple:bg-purple-900/20 dark-purple:border-purple-800 dark-tactical:bg-green-900/20 dark-tactical:border-green-800 dark-hacker:bg-red-900/20 dark-hacker:border-red-800">
                <Plus className="mr-2 h-4 w-4" />
                Criar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <DropdownMenuItem onClick={() => setIsCreatingDocument(true)} className="dark-purple:text-gray-200 dark-purple:focus:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:focus:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:focus:bg-red-900/30">
                <FileText className="mr-2 h-4 w-4" />
                Novo Documento
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsCreatingFolder(true)} className="dark-purple:text-gray-200 dark-purple:focus:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:focus:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:focus:bg-red-900/30">
                <FolderPlus className="mr-2 h-4 w-4" />
                Nova Pasta
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark-purple:bg-[#392c53] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#1A1A1A]" />
              <DropdownMenuItem onClick={handleDocumentUpload} className="dark-purple:text-gray-200 dark-purple:focus:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:focus:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:focus:bg-red-900/30">
                <FileUp className="mr-2 h-4 w-4" />
                Importar Documento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Buscar documentos..." 
              className="w-full md:w-64 pl-10 dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Navegação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="all" onValueChange={setCurrentTab}>
                <TabsList className="w-full dark-purple:bg-[#392c53]/30 dark-tactical:bg-[#384D3E]/30 dark-hacker:bg-[#1A1A1A]/50">
                  <TabsTrigger value="all" className="flex-1 dark-purple:text-gray-200 dark-purple:data-[state=active]:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:data-[state=active]:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:data-[state=active]:bg-red-900/30">Todos</TabsTrigger>
                  <TabsTrigger value="starred" className="flex-1 dark-purple:text-gray-200 dark-purple:data-[state=active]:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:data-[state=active]:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:data-[state=active]:bg-red-900/30">Favoritos</TabsTrigger>
                  <TabsTrigger value="templates" className="flex-1 dark-purple:text-gray-200 dark-purple:data-[state=active]:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:data-[state=active]:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:data-[state=active]:bg-red-900/30">Templates</TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1 dark-purple:text-gray-200 dark-purple:data-[state=active]:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:data-[state=active]:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:data-[state=active]:bg-red-900/30">Recentes</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-1">
                <p className="text-sm font-medium mb-2 dark-purple:text-gray-300 dark-tactical:text-gray-300 dark-hacker:text-gray-300">Pastas</p>
                {folders.map(folder => (
                  <Button 
                    key={folder.id}
                    variant="ghost" 
                    className="w-full justify-start dark-purple:text-gray-200 dark-purple:hover:bg-purple-900/20 dark-tactical:text-gray-200 dark-tactical:hover:bg-green-900/20 dark-hacker:text-gray-200 dark-hacker:hover:bg-red-900/20"
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    {folder.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          {/* Create Document Form */}
          {isCreatingDocument && (
            <Card className="mb-6 dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Criar Novo Documento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Título do documento" 
                      value={newDocumentTitle}
                      onChange={(e) => setNewDocumentTitle(e.target.value)}
                      className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreatingDocument(false)} className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200">
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateDocument} className="dark-purple:bg-purple-500 dark-purple:hover:bg-purple-600 dark-tactical:bg-green-700 dark-tactical:hover:bg-green-800 dark-hacker:bg-red-600 dark-hacker:hover:bg-red-700">
                      Criar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create Folder Form */}
          {isCreatingFolder && (
            <Card className="mb-6 dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Criar Nova Pasta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Nome da pasta" 
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreatingFolder(false)} className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200">
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateFolder} className="dark-purple:bg-purple-500 dark-purple:hover:bg-purple-600 dark-tactical:bg-green-700 dark-tactical:hover:bg-green-800 dark-hacker:bg-red-600 dark-hacker:hover:bg-red-700">
                      Criar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Editor */}
          {selectedDocument ? (
            <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                    {selectedDocument.title}
                  </CardTitle>
                  <CardDescription className="dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                    Última atualização: {selectedDocument.updatedAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => toggleStar(selectedDocument.id)}
                    className="dark-purple:hover:bg-purple-900/20 dark-tactical:hover:bg-green-900/20 dark-hacker:hover:bg-red-900/20"
                  >
                    {selectedDocument.starred ? (
                      <Star className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarOff className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={requestAIAssistance}
                    className="dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Pedir ajuda da IA
                  </Button>
                  <Button 
                    onClick={saveDocument}
                    className="dark-purple:bg-purple-500 dark-purple:hover:bg-purple-600 dark-tactical:bg-green-700 dark-tactical:hover:bg-green-800 dark-hacker:bg-red-600 dark-hacker:hover:bg-red-700"
                  >
                    Salvar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[500px]">
                  <Textarea 
                    value={documentContent}
                    onChange={(e) => setDocumentContent(e.target.value)}
                    className="min-h-[500px] resize-none dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
                    placeholder="Comece a digitar seu documento aqui..."
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardHeader>
                <CardTitle className="dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Documentos</CardTitle>
                <CardDescription className="dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                  {filteredDocuments.length} documento(s) encontrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredDocuments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDocuments.map(doc => (
                      <div 
                        key={doc.id} 
                        className="p-4 border rounded-md flex justify-between items-start hover:bg-gray-50 cursor-pointer dark-purple:border-[#392c53] dark-purple:hover:bg-purple-900/10 dark-tactical:border-[#384D3E] dark-tactical:hover:bg-green-900/10 dark-hacker:border-[#1A1A1A] dark-hacker:hover:bg-red-900/10"
                        onClick={() => {
                          setSelectedDocument(doc);
                          setDocumentContent(doc.content);
                        }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center">
                            {doc.type === 'template' ? (
                              <FileText className="h-5 w-5 mr-2 text-blue-500 dark-purple:text-purple-400 dark-tactical:text-green-500 dark-hacker:text-red-500" />
                            ) : doc.type === 'research' ? (
                              <FileImage className="h-5 w-5 mr-2 text-green-500 dark-purple:text-purple-400 dark-tactical:text-green-500 dark-hacker:text-red-500" />
                            ) : (
                              <File className="h-5 w-5 mr-2 text-gray-500 dark-purple:text-purple-400 dark-tactical:text-green-500 dark-hacker:text-red-500" />
                            )}
                            <h4 className="font-medium dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">{doc.title}</h4>
                            {doc.starred && <Star className="h-4 w-4 ml-2 text-yellow-400" />}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">{doc.content}</p>
                          <div className="flex flex-wrap gap-2">
                            {doc.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs dark-purple:border-[#392c53] dark-purple:text-gray-300 dark-tactical:border-[#384D3E] dark-tactical:text-gray-300 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs dark-purple:border-[#392c53] dark-purple:text-gray-300 dark-tactical:border-[#384D3E] dark-tactical:text-gray-300 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-300">
                              <Clock className="h-3 w-3 mr-1" />
                              {doc.updatedAt.toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="dark-purple:hover:bg-purple-900/20 dark-tactical:hover:bg-green-900/20 dark-hacker:hover:bg-red-900/20">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation(); 
                                setSelectedDocument(doc);
                                setDocumentContent(doc.content);
                              }}
                              className="dark-purple:text-gray-200 dark-purple:focus:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:focus:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:focus:bg-red-900/30"
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(doc.id);
                              }}
                              className="dark-purple:text-gray-200 dark-purple:focus:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:focus:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:focus:bg-red-900/30"
                            >
                              {doc.starred ? (
                                <>
                                  <StarOff className="mr-2 h-4 w-4" />
                                  Remover dos favoritos
                                </>
                              ) : (
                                <>
                                  <Star className="mr-2 h-4 w-4" />
                                  Adicionar aos favoritos
                                </>
                              )}
                            </DropdownMenuItem>
                            {doc.type === 'template' && (
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  generateFromTemplate(doc.id);
                                }}
                                className="dark-purple:text-gray-200 dark-purple:focus:bg-purple-900/30 dark-tactical:text-gray-200 dark-tactical:focus:bg-green-900/30 dark-hacker:text-gray-200 dark-hacker:focus:bg-red-900/30"
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Usar como template
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="dark-purple:bg-[#392c53] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#1A1A1A]" />
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteDocument(doc.id);
                              }}
                              className="text-red-600 dark-purple:focus:bg-purple-900/30 dark-tactical:focus:bg-green-900/30 dark-hacker:focus:bg-red-900/30"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Nenhum documento encontrado</h3>
                    <p className="text-gray-500 mt-2 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      {searchTerm ? 'Tente usar outros termos de busca' : 'Crie um novo documento para começar'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
