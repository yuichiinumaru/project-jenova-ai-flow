
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { Menu, MessageSquare, X, Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatDrawer } from './ChatDrawer';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { NewsTicker } from './NewsTicker';

// Define theme types
export type ThemeType = 'light' | 'dark-purple' | 'dark-tactical' | 'dark-hacker';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('light');

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark-purple', 'dark-tactical', 'dark-hacker');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark-purple:bg-[#1A1F2C] dark-tactical:bg-[#1E2D24] dark-hacker:bg-[#0D0D0D]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:static fixed inset-y-0 left-0 z-30`}>
        <AppSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b dark-purple:bg-[#1A1F2C] dark-purple:border-[#2D3549] dark-tactical:bg-[#1E2D24] dark-tactical:border-[#384D3E] dark-hacker:bg-[#0D0D0D] dark-hacker:border-[#1A1A1A] dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-xl font-semibold">Project Jenova</h1>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark-purple')}>
                  <Moon className="mr-2 h-4 w-4 text-purple-400" />
                  <span>Dark Purple</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark-tactical')}>
                  <Moon className="mr-2 h-4 w-4 text-green-600" />
                  <span>Tactical Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark-hacker')}>
                  <Moon className="mr-2 h-4 w-4 text-red-500" />
                  <span>Hacker</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setChatOpen(true)}
              className="relative"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-jenova-accent text-[10px] font-medium text-white">
                1
              </span>
            </Button>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 dark-purple:bg-[#1A1F2C] dark-purple:text-gray-200 dark-tactical:bg-[#1E2D24] dark-tactical:text-gray-200 dark-hacker:bg-[#0D0D0D] dark-hacker:text-gray-200">
          <Outlet />
        </main>

        {/* News Ticker */}
        <NewsTicker />
      </div>

      {/* AI Chat Drawer */}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
