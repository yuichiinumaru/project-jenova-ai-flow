
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileDown, FileUp, ZoomIn, ZoomOut } from 'lucide-react';

export default function FlowDiagram() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Flow Diagram</h2>
          <p className="text-gray-500">Visualize workflow and processes</p>
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
            <CardTitle>Project Workflow</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">100%</span>
            </div>
          </div>
          <CardDescription>
            Interactive diagram showing project workflow stages
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full pb-6">
          <div className="relative h-full bg-gray-50 dark-purple:bg-[#232840] dark-tactical:bg-[#2A3C30] dark-hacker:bg-[#1A1A1A] rounded-md border border-gray-200 dark-purple:border-[#2D3549] dark-tactical:border-[#384D3E] dark-hacker:border-[#242424] p-4">
            {/* This is where the actual flow diagram would be rendered */}
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                Flow diagram will be available in a future update
              </p>
              <p className="text-sm text-gray-400 dark-purple:text-gray-500 dark-tactical:text-gray-500 dark-hacker:text-gray-500 mt-2">
                Check back soon for interactive workflow visualization
              </p>
            </div>
            
            {/* Sample diagram nodes and edges - these would be replaced with a real flow diagram library */}
            <div className="absolute top-20 left-20 w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Project Start
            </div>
            
            <div className="absolute top-20 left-64 w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Requirements
            </div>
            
            <div className="absolute top-20 left-[28rem] w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Design
            </div>
            
            <div className="absolute top-20 left-[42rem] w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Development
            </div>
            
            <div className="absolute top-60 left-[42rem] w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Testing
            </div>
            
            <div className="absolute top-60 left-[28rem] w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Deployment
            </div>
            
            <div className="absolute top-60 left-64 w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Feedback
            </div>
            
            <div className="absolute top-60 left-20 w-32 h-16 bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] rounded-md shadow-md flex items-center justify-center border border-gray-200 dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c]">
              Project End
            </div>
            
            {/* Static arrows to connect the nodes */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
                </marker>
              </defs>
              
              {/* Horizontal arrows */}
              <line x1="52" y1="28" x2="64" y2="28" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="96" y1="28" x2="164" y2="28" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="196" y1="28" x2="264" y2="28" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="296" y1="28" x2="364" y2="28" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="396" y1="28" x2="420" y2="28" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              
              {/* Vertical arrows */}
              <line x1="436" y1="36" x2="436" y2="60" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="396" y1="68" x2="364" y2="68" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="296" y1="68" x2="264" y2="68" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="196" y1="68" x2="164" y2="68" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="96" y1="68" x2="64" y2="68" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="52" y1="68" x2="52" y2="44" stroke="#888" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
