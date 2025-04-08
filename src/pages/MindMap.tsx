
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileDown, FileUp, ZoomIn, ZoomOut } from 'lucide-react';

export default function MindMap() {
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Mind Map</h2>
          <p className="text-gray-500">Organize ideas and concepts visually</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Node
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>
      
      <Card className="h-[calc(100vh-14rem)]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Project Concept Map</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoomLevel}%</span>
            </div>
          </div>
          <CardDescription>
            Visualize project concepts and their relationships
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full pb-6">
          <div className="relative h-full bg-gray-50 dark-purple:bg-[#232840] dark-tactical:bg-[#2A3C30] dark-hacker:bg-[#1A1A1A] rounded-md border border-gray-200 dark-purple:border-[#2D3549] dark-tactical:border-[#384D3E] dark-hacker:border-[#242424] p-4 overflow-hidden">
            {/* This is where the actual mind map would be rendered */}
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                Mind map visualization will be available in a future update
              </p>
              <p className="text-sm text-gray-400 dark-purple:text-gray-500 dark-tactical:text-gray-500 dark-hacker:text-gray-500 mt-2">
                Check back soon for interactive concept mapping
              </p>
            </div>
            
            {/* Sample mind map nodes and connections - these would be replaced with a real mind map library */}
            <div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `translate(-50%, -50%) scale(${zoomLevel / 100})` }}
            >
              {/* Central node */}
              <div className="absolute w-40 h-16 bg-zenith-primary text-white rounded-full shadow-md flex items-center justify-center border-2 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 0, top: 0 }}>
                Project Vision
              </div>
              
              {/* Main branches - first level */}
              <div className="absolute w-36 h-14 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: -180, top: -90 }}>
                Goals
              </div>
              
              <div className="absolute w-36 h-14 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 180, top: -90 }}>
                Features
              </div>
              
              <div className="absolute w-36 h-14 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: -180, top: 90 }}>
                Resources
              </div>
              
              <div className="absolute w-36 h-14 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 180, top: 90 }}>
                Timeline
              </div>
              
              {/* Second level - Goals */}
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: -300, top: -150 }}>
                Business
              </div>
              
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: -300, top: -70 }}>
                Technical
              </div>
              
              {/* Second level - Features */}
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 300, top: -150 }}>
                Core
              </div>
              
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 300, top: -70 }}>
                Advanced
              </div>
              
              {/* Second level - Resources */}
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: -300, top: 70 }}>
                Team
              </div>
              
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: -300, top: 150 }}>
                Budget
              </div>
              
              {/* Second level - Timeline */}
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 300, top: 70 }}>
                Milestones
              </div>
              
              <div className="absolute w-32 h-12 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] text-gray-800 dark-purple:text-gray-200 dark-tactical:text-gray-200 dark-hacker:text-gray-200 rounded-full shadow-md flex items-center justify-center border border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]" style={{ left: 300, top: 150 }}>
                Deadlines
              </div>
              
              {/* Connections */}
              <svg className="absolute w-full h-full" style={{ top: 0, left: 0 }}>
                {/* Connect center to main branches */}
                <line x1="20" y1="8" x2="-162" y2="-83" stroke="#888" strokeWidth="2" />
                <line x1="20" y1="8" x2="162" y2="-83" stroke="#888" strokeWidth="2" />
                <line x1="20" y1="8" x2="-162" y2="97" stroke="#888" strokeWidth="2" />
                <line x1="20" y1="8" x2="162" y2="97" stroke="#888" strokeWidth="2" />
                
                {/* Connect Goals to sub-nodes */}
                <line x1="-180" y1="-90" x2="-300" y2="-150" stroke="#888" strokeWidth="2" />
                <line x1="-180" y1="-90" x2="-300" y2="-70" stroke="#888" strokeWidth="2" />
                
                {/* Connect Features to sub-nodes */}
                <line x1="180" y1="-90" x2="300" y2="-150" stroke="#888" strokeWidth="2" />
                <line x1="180" y1="-90" x2="300" y2="-70" stroke="#888" strokeWidth="2" />
                
                {/* Connect Resources to sub-nodes */}
                <line x1="-180" y1="90" x2="-300" y2="70" stroke="#888" strokeWidth="2" />
                <line x1="-180" y1="90" x2="-300" y2="150" stroke="#888" strokeWidth="2" />
                
                {/* Connect Timeline to sub-nodes */}
                <line x1="180" y1="90" x2="300" y2="70" stroke="#888" strokeWidth="2" />
                <line x1="180" y1="90" x2="300" y2="150" stroke="#888" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
