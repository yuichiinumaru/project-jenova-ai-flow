
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentEditor } from '@/components/DocumentEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { FileText, Folder, Search, BarChart2, FileInput, Database, Send, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock sources for research
const mockSources = [
  { id: 1, title: "City Budget 2024", type: "pdf", size: "2.4 MB", createdAt: "2024-02-15" },
  { id: 2, title: "Public Transportation Report", type: "docx", size: "1.7 MB", createdAt: "2024-03-20" },
  { id: 3, title: "Environmental Impact Assessment", type: "pdf", size: "5.1 MB", createdAt: "2024-01-10" },
  { id: 4, title: "Public Health Survey", type: "xlsx", size: "3.2 MB", createdAt: "2024-03-05" },
  { id: 5, title: "Urban Planning Guidelines", type: "pdf", size: "4.5 MB", createdAt: "2023-11-22" },
  { id: 6, title: "City Council Meeting Minutes", type: "pdf", size: "1.8 MB", createdAt: "2024-04-01" },
];

export default function DeepResearch() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [isResearching, setIsResearching] = useState(false);
  const [researchResults, setResearchResults] = useState('');
  const [currentTab, setCurrentTab] = useState('sources');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleSource = (id: number) => {
    if (selectedSources.includes(id)) {
      setSelectedSources(selectedSources.filter(sourceId => sourceId !== id));
    } else {
      setSelectedSources([...selectedSources, id]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: language === 'en' ? "File Uploaded" : "Arquivo Enviado",
        description: language === 'en' 
          ? `${e.target.files.length} file(s) have been uploaded and are ready for research.`
          : `${e.target.files.length} arquivo(s) foram enviados e estão prontos para pesquisa.`,
      });
    }
  };

  const handleStartResearch = () => {
    if (!query.trim()) {
      toast({
        title: language === 'en' ? "Research Query Required" : "Consulta de Pesquisa Necessária",
        description: language === 'en' 
          ? "Please enter a research question to begin the deep research process."
          : "Por favor, insira uma pergunta de pesquisa para iniciar o processo de pesquisa profunda.",
        variant: "destructive",
      });
      return;
    }

    if (selectedSources.length === 0) {
      toast({
        title: language === 'en' ? "No Sources Selected" : "Nenhuma Fonte Selecionada",
        description: language === 'en' 
          ? "Please select at least one document source for research."
          : "Por favor, selecione pelo menos uma fonte de documento para pesquisa.",
        variant: "destructive",
      });
      return;
    }

    setIsResearching(true);
    setCurrentTab('results');

    // Simulate research process with a timeout
    setTimeout(() => {
      const mockResults = language === 'en' 
        ? `# Deep Research Results: ${query}\n\n## Key Findings\n\n1. **Budget Allocation Analysis**\n   - The city has allocated 35% of its budget to infrastructure development in 2024, compared to 28% in 2023.\n   - Public transportation funding has increased by 12% year-over-year.\n\n2. **Environmental Considerations**\n   - Recent environmental impact assessments show a 15% reduction in carbon emissions from city operations.\n   - Urban planning guidelines now require 20% green space in all new developments.\n\n3. **Public Opinion**\n   - 72% of residents surveyed support increased funding for public transportation.\n   - 65% believe improving infrastructure should be a top priority.\n\n## Comparative Analysis\n\n| Category | 2023 Allocation | 2024 Allocation | Change |\n|----------|----------------|----------------|--------|\n| Transportation | $4.2M | $5.1M | +21.4% |\n| Infrastructure | $6.8M | $8.5M | +25.0% |\n| Public Health | $3.1M | $3.8M | +22.6% |\n| Environment | $2.3M | $3.2M | +39.1% |\n\n## Recommendations\n\n1. Consider increasing public transportation routes in underserved areas based on survey feedback.\n2. Review environmental impact assessments for opportunities to further reduce emissions.\n3. Align future budgeting with resident priorities as identified in surveys.\n\nThis analysis is based on the selected documents and represents a synthesis of the available information. Further research may be needed for specific implementation strategies.`
        : `# Resultados da Pesquisa Profunda: ${query}\n\n## Principais Descobertas\n\n1. **Análise de Alocação de Orçamento**\n   - A cidade alocou 35% de seu orçamento para desenvolvimento de infraestrutura em 2024, comparado a 28% em 2023.\n   - O financiamento para transporte público aumentou em 12% ano a ano.\n\n2. **Considerações Ambientais**\n   - Avaliações recentes de impacto ambiental mostram uma redução de 15% nas emissões de carbono das operações da cidade.\n   - As diretrizes de planejamento urbano agora exigem 20% de espaço verde em todos os novos desenvolvimentos.\n\n3. **Opinião Pública**\n   - 72% dos residentes pesquisados apoiam o aumento de fundos para transporte público.\n   - 65% acreditam que melhorar a infraestrutura deve ser uma prioridade máxima.\n\n## Análise Comparativa\n\n| Categoria | Alocação 2023 | Alocação 2024 | Mudança |\n|----------|----------------|----------------|--------|\n| Transporte | R$ 4,2M | R$ 5,1M | +21,4% |\n| Infraestrutura | R$ 6,8M | R$ 8,5M | +25,0% |\n| Saúde Pública | R$ 3,1M | R$ 3,8M | +22,6% |\n| Meio Ambiente | R$ 2,3M | R$ 3,2M | +39,1% |\n\n## Recomendações\n\n1. Considerar o aumento de rotas de transporte público em áreas menos atendidas com base no feedback da pesquisa.\n2. Revisar avaliações de impacto ambiental para oportunidades de reduzir ainda mais as emissões.\n3. Alinhar orçamentos futuros com as prioridades dos residentes conforme identificado nas pesquisas.\n\nEsta análise é baseada nos documentos selecionados e representa uma síntese das informações disponíveis. Pesquisas adicionais podem ser necessárias para estratégias específicas de implementação.`;

      setResearchResults(mockResults);
      setIsResearching(false);
      
      toast({
        title: language === 'en' ? "Research Complete" : "Pesquisa Concluída",
        description: language === 'en' 
          ? "Deep research analysis has been completed. The results are ready for review."
          : "A análise de pesquisa profunda foi concluída. Os resultados estão prontos para revisão.",
      });
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">
            {language === 'en' ? "Deep Research" : "Pesquisa Profunda"}
          </h2>
          <p className="text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
            {language === 'en' 
              ? "Analyze multiple documents and generate comprehensive reports"
              : "Analise múltiplos documentos e gere relatórios abrangentes"}
          </p>
        </div>
      </div>
      
      <Tabs 
        value={currentTab} 
        onValueChange={setCurrentTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="sources">
            <FileText className="h-4 w-4 mr-2" />
            {language === 'en' ? "Sources" : "Fontes"}
          </TabsTrigger>
          <TabsTrigger value="query">
            <Search className="h-4 w-4 mr-2" />
            {language === 'en' ? "Research Query" : "Consulta de Pesquisa"}
          </TabsTrigger>
          <TabsTrigger value="results">
            <BarChart2 className="h-4 w-4 mr-2" />
            {language === 'en' ? "Results" : "Resultados"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sources" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Input 
                placeholder={language === 'en' ? "Search documents..." : "Buscar documentos..."}
                className="w-80"
              />
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                {language === 'en' ? "Search" : "Buscar"}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUploadClick}>
                <FileInput className="h-4 w-4 mr-2" />
                {language === 'en' ? "Upload" : "Enviar"}
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                multiple
              />
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                {language === 'en' ? "Connect Source" : "Conectar Fonte"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSources.map(source => (
              <Card 
                key={source.id} 
                className={`cursor-pointer transition-colors hover:bg-gray-50 dark-purple:hover:bg-[#2a1f45] dark-tactical:hover:bg-[#2A3C30] dark-hacker:hover:bg-[#1A1A1A] ${
                  selectedSources.includes(source.id) 
                    ? 'border-blue-500 dark-purple:border-purple-500 dark-tactical:border-green-500 dark-hacker:border-red-500 bg-blue-50 dark-purple:bg-purple-500/20 dark-tactical:bg-green-500/20 dark-hacker:bg-red-500/20' 
                    : 'dark-purple:bg-[#392c53]/30 dark-tactical:bg-[#384D3E]/30 dark-hacker:bg-[#1A1A1A]/50 dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]'
                }`}
                onClick={() => handleToggleSource(source.id)}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-gray-100 dark-purple:bg-[#2a1f45] dark-tactical:bg-[#2A3C30] dark-hacker:bg-[#1A1A1A] p-2 rounded-md">
                    <FileText className="h-6 w-6 text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">{source.title}</h3>
                    <div className="flex gap-3 text-sm text-gray-500 mt-1 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      <span>{source.type.toUpperCase()}</span>
                      <span>•</span>
                      <span>{source.size}</span>
                      <span>•</span>
                      <span>{new Date(source.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="query" className="space-y-4">
          <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "Research Query" : "Consulta de Pesquisa"}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Enter a detailed research question to analyze across your selected sources"
                  : "Insira uma pergunta de pesquisa detalhada para analisar em suas fontes selecionadas"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="query">
                  {language === 'en' ? "Your Research Question" : "Sua Pergunta de Pesquisa"}
                </Label>
                <Textarea 
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === 'en' 
                    ? "Example: Analyze the city's budget allocation for public transportation over the last 3 years and identify trends."
                    : "Exemplo: Analise a alocação de orçamento da cidade para transporte público nos últimos 3 anos e identifique tendências."
                  }
                  className="min-h-[150px] dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                  {language === 'en' ? "Selected Sources" : "Fontes Selecionadas"}
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {selectedSources.length === 0 ? (
                    <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      {language === 'en' 
                        ? "No sources selected. Please go to the Sources tab to select documents for analysis."
                        : "Nenhuma fonte selecionada. Por favor, vá para a aba Fontes para selecionar documentos para análise."}
                    </p>
                  ) : (
                    mockSources
                      .filter(source => selectedSources.includes(source.id))
                      .map(source => (
                        <div key={source.id} className="flex items-center gap-2 text-sm dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                          <FileText className="h-4 w-4 text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400" />
                          <span>{source.title}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleStartResearch}
                disabled={isResearching || query.trim() === '' || selectedSources.length === 0}
                className="w-full md:w-auto"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isResearching 
                  ? (language === 'en' ? "Researching..." : "Pesquisando...")
                  : (language === 'en' ? "Start Deep Research" : "Iniciar Pesquisa Profunda")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4">
          {isResearching ? (
            <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-pulse flex flex-col items-center">
                  <Brain className="h-12 w-12 mb-4 text-jenova-primary dark-purple:text-purple-400 dark-tactical:text-green-600 dark-hacker:text-red-500" />
                  <h3 className="text-xl font-medium mb-2 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                    {language === 'en' ? "Deep Research in Progress" : "Pesquisa Profunda em Andamento"}
                  </h3>
                  <p className="text-gray-500 text-center max-w-md dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                    {language === 'en' 
                      ? "Our AI is analyzing your selected documents, extracting relevant information, and generating comprehensive insights."
                      : "Nossa IA está analisando seus documentos selecionados, extraindo informações relevantes e gerando insights abrangentes."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : researchResults ? (
            <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardHeader>
                <CardTitle>
                  {language === 'en' ? "Research Results" : "Resultados da Pesquisa"}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? "Comprehensive analysis based on your query and selected sources"
                    : "Análise abrangente baseada em sua consulta e fontes selecionadas"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentEditor 
                  content={researchResults} 
                  onChange={setResearchResults}
                  placeholder={language === 'en' ? "Research results will appear here..." : "Os resultados da pesquisa aparecerão aqui..."}
                />
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <Button variant="outline">
                  {language === 'en' ? "Download Report" : "Baixar Relatório"}
                </Button>
                <Button variant="outline">
                  {language === 'en' ? "Save to Intelligence" : "Salvar na Inteligência"}
                </Button>
                <Button>
                  {language === 'en' ? "New Research" : "Nova Pesquisa"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="dark-purple:bg-[#2a1f45] dark-purple:border-[#392c53] dark-tactical:bg-[#2A3C30] dark-tactical:border-[#384D3E] dark-hacker:bg-[#1A1A1A] dark-hacker:border-[#1A1A1A]">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
                <Search className="h-12 w-12 mb-4 text-gray-300" />
                <h3 className="text-xl font-medium mb-2 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
                  {language === 'en' ? "No Research Results Yet" : "Ainda Sem Resultados de Pesquisa"}
                </h3>
                <p className="text-gray-500 text-center max-w-md dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                  {language === 'en' 
                    ? "Select sources and define your research query, then start the deep research process to see results here."
                    : "Selecione fontes e defina sua consulta de pesquisa, depois inicie o processo de pesquisa profunda para ver os resultados aqui."}
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setCurrentTab('sources')}
                >
                  {language === 'en' ? "Go to Sources" : "Ir para Fontes"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
