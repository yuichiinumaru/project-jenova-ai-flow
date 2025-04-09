
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  BarChart, 
  Kanban, 
  Clock, 
  Workflow, 
  Network, 
  Braces, 
  BrainCircuit, 
  Settings,
  MessageSquare,
  Users,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type NavItem = {
  titleKey: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
};

export function AppSidebar() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const mainNavItems: NavItem[] = [
    {
      titleKey: "dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      titleKey: "kanban",
      href: "/kanban",
      icon: Kanban,
    },
    {
      titleKey: "timeline",
      href: "/timeline",
      icon: Clock,
    },
    {
      titleKey: "calendar",
      href: "/calendar",
      icon: Calendar,
    },
    {
      titleKey: "charts",
      href: "/charts",
      icon: BarChart,
    },
    {
      titleKey: "flowDiagram",
      href: "/flow",
      icon: Workflow,
    },
    {
      titleKey: "mindMap",
      href: "/mind-map",
      icon: Network,
    },
    {
      titleKey: "valueStream",
      href: "/value-stream",
      icon: Braces,
    },
    {
      titleKey: "teams",
      href: "/teams",
      icon: Users,
    },
  ];

  const otherNavItems: NavItem[] = [
    {
      titleKey: "intelligence",
      href: "/intelligence",
      icon: BrainCircuit,
    },
    {
      titleKey: "research",
      href: "/research",
      icon: Search,
    },
    {
      titleKey: "assistant",
      href: "/assistant",
      icon: MessageSquare,
    },
    {
      titleKey: "settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-64 dark-purple:bg-[#1f1631] dark-tactical:bg-[#1E2D24] dark-hacker:bg-[#0D0D0D] bg-white border-r shadow-sm lg:static dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <BrainCircuit className="w-6 h-6 text-jenova-primary dark-purple:text-purple-400 dark-tactical:text-green-600 dark-hacker:text-red-500" />
            <span className="text-xl font-bold dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">Jenova</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <nav className="p-2">
            <div className="my-2">
              <p className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase dark-purple:text-gray-500 dark-tactical:text-gray-500 dark-hacker:text-gray-500">Main</p>
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={location.pathname === item.href}
                    t={t}
                  />
                ))}
              </div>
            </div>
            <div className="my-2">
              <p className="px-2 py-1.5 text-xs font-medium text-gray-400 uppercase dark-purple:text-gray-500 dark-tactical:text-gray-500 dark-hacker:text-gray-500">Other</p>
              <div className="space-y-1">
                {otherNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={location.pathname === item.href}
                    t={t}
                  />
                ))}
              </div>
            </div>
          </nav>
        </div>
        <div className="p-4 border-t dark-purple:border-[#392c53] dark-tactical:border-[#384D3E] dark-hacker:border-[#1A1A1A]">
          <div className="flex items-center gap-4">
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">John Doe</p>
              <p className="text-xs text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, isActive, t }: { item: NavItem; isActive: boolean; t: (key: string) => string }) {
  return (
    <Link
      to={item.disabled ? "#" : item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
        isActive
          ? "bg-jenova-primary/10 text-jenova-primary dark-purple:bg-purple-500/20 dark-purple:text-purple-400 dark-tactical:bg-green-700/20 dark-tactical:text-green-600 dark-hacker:bg-red-600/20 dark-hacker:text-red-500"
          : "text-gray-700 hover:bg-gray-100 dark-purple:text-gray-300 dark-purple:hover:bg-[#2a1f45] dark-tactical:text-gray-300 dark-tactical:hover:bg-[#2A3C30] dark-hacker:text-gray-300 dark-hacker:hover:bg-[#1A1A1A]",
        item.disabled && "pointer-events-none opacity-60"
      )}
    >
      <item.icon className="w-5 h-5" />
      <span>{item.titleKey === "research" ? (t.language === 'en' ? "Deep Research" : "Pesquisa Profunda") : t(item.titleKey)}</span>
      {item.disabled && <span className="ml-auto text-xs text-gray-400">Soon</span>}
    </Link>
  );
}
