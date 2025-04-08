
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Users, 
  UserPlus, 
  UserMinus, 
  UserCog,
  Shield,
  ChevronDown 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

// Define team types
type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isAdmin: boolean;
};

type Team = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  color: string;
};

export default function Teams() {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([
    {
      id: '1',
      name: 'Comunicação',
      description: 'Responsável pela comunicação do mandato, conteúdo para redes sociais e branding.',
      color: 'bg-purple-500',
      members: [
        { id: '1', name: 'Ana Silva', role: 'Coordenadora', avatar: 'AS', isAdmin: true },
        { id: '2', name: 'Bruno Costa', role: 'Designer', avatar: 'BC', isAdmin: false },
        { id: '3', name: 'Carolina Lima', role: 'Social Media', avatar: 'CL', isAdmin: false },
      ]
    },
    {
      id: '2',
      name: 'Mobilização',
      description: 'Responsável pelo engajamento, atendimento e coleta de demandas da população.',
      color: 'bg-blue-500',
      members: [
        { id: '4', name: 'Diego Santos', role: 'Coordenador', avatar: 'DS', isAdmin: true },
        { id: '5', name: 'Elena Oliveira', role: 'Atendimento', avatar: 'EO', isAdmin: false },
      ]
    },
    {
      id: '3',
      name: 'Fiscalização',
      description: 'Monitora gastos da prefeitura, ações, nomeações e busca irregularidades.',
      color: 'bg-green-500',
      members: [
        { id: '6', name: 'Fábio Mendes', role: 'Coordenador', avatar: 'FM', isAdmin: true },
        { id: '7', name: 'Gabriela Castro', role: 'Analista', avatar: 'GC', isAdmin: false },
      ]
    },
    {
      id: '4',
      name: 'Políticas Públicas',
      description: 'Estudo e análise de políticas públicas, pesquisas e embasamento teórico.',
      color: 'bg-yellow-500',
      members: [
        { id: '8', name: 'Hugo Lima', role: 'Coordenador', avatar: 'HL', isAdmin: true },
        { id: '9', name: 'Isabela Rocha', role: 'Pesquisadora', avatar: 'IR', isAdmin: false },
      ]
    },
    {
      id: '5',
      name: 'Execução Legislativa',
      description: 'Elaboração de projetos de lei, requerimentos e outros documentos jurídicos.',
      color: 'bg-red-500',
      members: [
        { id: '10', name: 'João Pereira', role: 'Coordenador', avatar: 'JP', isAdmin: true },
        { id: '11', name: 'Karina Souza', role: 'Advogada', avatar: 'KS', isAdmin: false },
      ]
    }
  ]);

  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [currentUser, setCurrentUser] = useState<TeamMember>({
    id: '12',
    name: 'John Doe',
    role: 'Administrador',
    avatar: 'JD',
    isAdmin: true
  });

  // Function to check if user is admin
  const isUserAdmin = currentUser.isAdmin;

  // Function to add a new team
  const handleAddTeam = () => {
    if (newTeam.name.trim() === '') {
      toast({
        title: "Erro",
        description: "O nome da equipe é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTeamObj: Team = {
      id: (teams.length + 1).toString(),
      name: newTeam.name,
      description: newTeam.description,
      members: [currentUser],
      color: randomColor
    };

    setTeams([...teams, newTeamObj]);
    setNewTeam({ name: '', description: '' });
    
    toast({
      title: "Equipe criada",
      description: `A equipe ${newTeam.name} foi criada com sucesso.`
    });
  };

  // Function to add a member to a team (simulated)
  const handleAddMember = (teamId: string) => {
    toast({
      title: "Funcionalidade simulada",
      description: "Em um ambiente real, isto abriria um modal para adicionar novos membros."
    });
  };

  // Function to remove a member from a team (simulated)
  const handleRemoveMember = (teamId: string, memberId: string) => {
    if (!isUserAdmin) {
      toast({
        title: "Permissão negada",
        description: "Apenas administradores podem remover membros.",
        variant: "destructive"
      });
      return;
    }

    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(member => member.id !== memberId)
        };
      }
      return team;
    }));

    toast({
      title: "Membro removido",
      description: "O membro foi removido da equipe."
    });
  };

  // Function to toggle admin status (simulated)
  const handleToggleAdmin = (teamId: string, memberId: string) => {
    if (!isUserAdmin) {
      toast({
        title: "Permissão negada",
        description: "Apenas administradores podem alterar permissões.",
        variant: "destructive"
      });
      return;
    }

    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.map(member => 
            member.id === memberId 
              ? { ...member, isAdmin: !member.isAdmin } 
              : member
          )
        };
      }
      return team;
    }));

    toast({
      title: "Permissões atualizadas",
      description: "As permissões do membro foram atualizadas."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Gerenciamento de Equipes</h2>
          <p className="text-gray-500">Visualize e gerencie as equipes do gabinete</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Equipe
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Equipe</DialogTitle>
                <DialogDescription>
                  Adicione uma nova equipe ao sistema. Você será automaticamente adicionado como membro.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="team-name">Nome da Equipe</Label>
                  <Input 
                    id="team-name" 
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                    placeholder="Digite o nome da equipe" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="team-description">Descrição</Label>
                  <Input 
                    id="team-description" 
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                    placeholder="Descreva o propósito da equipe" 
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddTeam}>Criar Equipe</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className={`${team.color} text-white rounded-t-lg`}>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription className="text-white/80">{team.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Membros</h3>
                {isUserAdmin && (
                  <Button size="sm" variant="outline" onClick={() => handleAddMember(team.id)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {team.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-zenith-primary text-white rounded-full flex items-center justify-center mr-3">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          {member.role}
                          {member.isAdmin && <Shield className="h-3 w-3 ml-1 text-zenith-primary" />}
                        </p>
                      </div>
                    </div>
                    
                    {isUserAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleAdmin(team.id, member.id)}>
                            <UserCog className="h-4 w-4 mr-2" />
                            {member.isAdmin ? "Remover admin" : "Tornar admin"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRemoveMember(team.id, member.id)}>
                            <UserMinus className="h-4 w-4 mr-2" />
                            Remover da equipe
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
