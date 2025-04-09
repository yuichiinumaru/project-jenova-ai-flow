import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeType } from '@/components/MainLayout';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle, Info, Key } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Settings() {
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [serpApiKey, setSerpApiKey] = useState('');

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSaveApiKeys = () => {
    localStorage.setItem('googleApiKey', googleApiKey);
    localStorage.setItem('serpApiKey', serpApiKey);
    
    toast({
      title: language === 'en' ? "API Keys Saved" : "Chaves de API Salvas",
      description: language === 'en' 
        ? "Your API keys have been securely saved." 
        : "Suas chaves de API foram salvas com segurança.",
    });
  };

  const handleLanguageChange = (newLanguage: 'en' | 'pt') => {
    setLanguage(newLanguage);
    toast({
      title: newLanguage === 'en' ? "Language Changed" : "Idioma Alterado",
      description: newLanguage === 'en' 
        ? "The application language has been set to English." 
        : "O idioma da aplicação foi alterado para Português.",
    });
  };

  React.useEffect(() => {
    const savedGoogleApiKey = localStorage.getItem('googleApiKey') || '';
    const savedSerpApiKey = localStorage.getItem('serpApiKey') || '';
    
    setGoogleApiKey(savedGoogleApiKey);
    setSerpApiKey(savedSerpApiKey);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-1">{t('settings')}</h2>
        <p className="text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
          {language === 'en' 
            ? "Manage your account settings and preferences" 
            : "Gerencie suas configurações e preferências de conta"}
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">
            {language === 'en' ? "General" : "Geral"}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            {language === 'en' ? "Appearance" : "Aparência"}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            {language === 'en' ? "Notifications" : "Notificações"}
          </TabsTrigger>
          <TabsTrigger value="api-keys">
            <Key className="h-4 w-4 mr-2" />
            {language === 'en' ? "API Keys" : "Chaves de API"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "Profile Information" : "Informações de Perfil"}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Update your personal information and how others see you on the platform" 
                  : "Atualize suas informações pessoais e como os outros te veem na plataforma"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {language === 'en' ? "Full Name" : "Nome Completo"}
                  </Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'en' ? "Email Address" : "Endereço de Email"}
                  </Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">
                    {language === 'en' ? "Job Title" : "Cargo"}
                  </Label>
                  <Input id="role" defaultValue="Project Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">
                    {language === 'en' ? "Department" : "Departamento"}
                  </Label>
                  <Input id="department" defaultValue="Engineering" />
                </div>
              </div>
              <Button onClick={handleSaveProfile}>
                {language === 'en' ? "Save Changes" : "Salvar Alterações"}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('language')}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Choose your preferred language for the application" 
                  : "Escolha seu idioma preferido para a aplicação"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={language} 
                className="space-y-3"
                onValueChange={(value) => handleLanguageChange(value as 'en' | 'pt')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en">{t('english')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pt" id="pt" />
                  <Label htmlFor="pt">{t('portuguese')}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "Theme" : "Tema"}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Customize the look and feel of the application" 
                  : "Personalize a aparência da aplicação"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select defaultValue="light">
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={language === 'en' ? "Select theme" : "Selecionar tema"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('light')}</SelectItem>
                  <SelectItem value="dark-purple">{t('darkPurple')}</SelectItem>
                  <SelectItem value="dark-tactical">{t('darkTactical')}</SelectItem>
                  <SelectItem value="dark-hacker">{t('darkHacker')}</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "Interface Density" : "Densidade da Interface"}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Adjust how compact you want the user interface to be" 
                  : "Ajuste o quão compacta você quer que a interface seja"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue="comfortable" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="comfortable" />
                  <Label htmlFor="comfortable">
                    {language === 'en' ? "Comfortable" : "Confortável"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="compact" />
                  <Label htmlFor="compact">
                    {language === 'en' ? "Compact" : "Compacto"}
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "Notification Preferences" : "Preferências de Notificação"}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Configure how you want to be notified about updates" 
                  : "Configure como você quer ser notificado sobre atualizações"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notif">
                      {language === 'en' ? "Email Notifications" : "Notificações por Email"}
                    </Label>
                    <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      {language === 'en' 
                        ? "Receive updates via email" 
                        : "Receba atualizações via email"}
                    </p>
                  </div>
                  <Switch id="email-notif" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notif">
                      {language === 'en' ? "Push Notifications" : "Notificações Push"}
                    </Label>
                    <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      {language === 'en' 
                        ? "Receive notifications in the browser" 
                        : "Receba notificações no navegador"}
                    </p>
                  </div>
                  <Switch id="push-notif" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-updates">
                      {language === 'en' ? "Task Updates" : "Atualizações de Tarefas"}
                    </Label>
                    <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                      {language === 'en' 
                        ? "Get notified about task assignments and updates" 
                        : "Receba notificações sobre atribuições e atualizações de tarefas"}
                    </p>
                  </div>
                  <Switch id="task-updates" defaultChecked />
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications}>
                {language === 'en' ? "Save Preferences" : "Salvar Preferências"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? "API Integration Keys" : "Chaves de Integração de API"}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? "Manage API keys for external service integrations" 
                  : "Gerencie chaves de API para integrações com serviços externos"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="warning" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {language === 'en' ? "Important Security Notice" : "Aviso de Segurança Importante"}
                </AlertTitle>
                <AlertDescription>
                  {language === 'en' 
                    ? "In a production environment, API keys should be stored securely on the server side. This implementation is for demonstration purposes only." 
                    : "Em um ambiente de produção, as chaves de API devem ser armazenadas com segurança no lado do servidor. Esta implementação é apenas para fins de demonstração."}
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="google-api-key" className="flex items-center gap-2">
                    {language === 'en' ? "Google API Key" : "Chave de API do Google"}
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </Label>
                  <Input 
                    id="google-api-key" 
                    type="password"
                    value={googleApiKey}
                    onChange={(e) => setGoogleApiKey(e.target.value)}
                    placeholder={language === 'en' ? "Enter your Google API key" : "Insira sua chave de API do Google"} 
                  />
                  <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                    {language === 'en' 
                      ? "This key will be used for Gmail, Docs, Drive, Sheets, Slides, YouTube APIs" 
                      : "Esta chave será usada para APIs do Gmail, Docs, Drive, Sheets, Slides, YouTube"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serp-api-key" className="flex items-center gap-2">
                    {language === 'en' ? "SerpAPI Key" : "Chave de API do SerpAPI"}
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </Label>
                  <Input 
                    id="serp-api-key" 
                    type="password"
                    value={serpApiKey}
                    onChange={(e) => setSerpApiKey(e.target.value)}
                    placeholder={language === 'en' ? "Enter your SerpAPI key" : "Insira sua chave de API do SerpAPI"} 
                  />
                  <p className="text-sm text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                    {language === 'en' 
                      ? "Used for Search, News, Maps, Finance, Events, Local, and Trends APIs" 
                      : "Usada para APIs de Pesquisa, Notícias, Mapas, Finanças, Eventos, Local e Tendências"}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveApiKeys} className="w-full md:w-auto">
                {language === 'en' ? "Save API Keys" : "Salvar Chaves de API"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
