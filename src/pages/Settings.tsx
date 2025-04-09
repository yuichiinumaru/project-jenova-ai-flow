
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function Settings() {
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  
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

  const handleLanguageChange = (newLanguage: 'en' | 'pt') => {
    setLanguage(newLanguage);
    toast({
      title: newLanguage === 'en' ? "Language Changed" : "Idioma Alterado",
      description: newLanguage === 'en' 
        ? "The application language has been set to English." 
        : "O idioma da aplicação foi alterado para Português.",
    });
  };

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
      </Tabs>
    </div>
  );
}
