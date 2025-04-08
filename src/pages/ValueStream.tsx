
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileDown, FileUp, ZoomIn, ZoomOut } from 'lucide-react';

export default function ValueStream() {
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold mb-1">Value Stream Map</h2>
          <p className="text-gray-500">Analyze and optimize workflow efficiency</p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Process
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
            <CardTitle>Development Value Stream</CardTitle>
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
            Visualize value-adding activities and identify bottlenecks
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full pb-6">
          <div className="relative h-full bg-gray-50 dark-purple:bg-[#232840] dark-tactical:bg-[#2A3C30] dark-hacker:bg-[#1A1A1A] rounded-md border border-gray-200 dark-purple:border-[#2D3549] dark-tactical:border-[#384D3E] dark-hacker:border-[#242424] p-4 overflow-auto">
            {/* This is where the actual value stream would be rendered */}
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg text-gray-500 dark-purple:text-gray-400 dark-tactical:text-gray-400 dark-hacker:text-gray-400">
                Value stream visualization will be available in a future update
              </p>
              <p className="text-sm text-gray-400 dark-purple:text-gray-500 dark-tactical:text-gray-500 dark-hacker:text-gray-500 mt-2">
                Check back soon for interactive process mapping
              </p>
            </div>
            
            {/* Sample value stream map - this would be replaced with a real visualization library */}
            <div 
              className="relative w-[1200px] mx-auto my-8"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}
            >
              {/* Timeline */}
              <div className="absolute top-[410px] left-0 w-full h-2 bg-gray-300"></div>
              
              {/* Customer/Supplier */}
              <div className="absolute top-0 left-0 w-20 h-20 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-gray-600 flex items-center justify-center text-xs text-center">
                  Customer
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-20 h-20 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-gray-600 flex items-center justify-center text-xs text-center">
                  Customer
                </div>
              </div>
              
              {/* Process Boxes */}
              <div className="absolute top-[100px] left-[100px] w-[160px] h-[120px]">
                <div className="w-full h-full border-2 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] p-2">
                  <h4 className="text-sm font-bold mb-1">Requirements</h4>
                  <div className="text-xs">
                    <div>C/T: 2 days</div>
                    <div>C/O: 4 hours</div>
                    <div>Uptime: 95%</div>
                    <div>Batch: 1 feature</div>
                  </div>
                </div>
                <div className="w-full h-10 border-2 border-t-0 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] flex items-center justify-center">
                  <span className="text-xs">2 people</span>
                </div>
              </div>
              
              <div className="absolute top-[100px] left-[320px] w-[160px] h-[120px]">
                <div className="w-full h-full border-2 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] p-2">
                  <h4 className="text-sm font-bold mb-1">Design</h4>
                  <div className="text-xs">
                    <div>C/T: 3 days</div>
                    <div>C/O: 2 hours</div>
                    <div>Uptime: 90%</div>
                    <div>Batch: 1 feature</div>
                  </div>
                </div>
                <div className="w-full h-10 border-2 border-t-0 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] flex items-center justify-center">
                  <span className="text-xs">3 people</span>
                </div>
              </div>
              
              <div className="absolute top-[100px] left-[540px] w-[160px] h-[120px]">
                <div className="w-full h-full border-2 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] p-2">
                  <h4 className="text-sm font-bold mb-1">Development</h4>
                  <div className="text-xs">
                    <div>C/T: 5 days</div>
                    <div>C/O: 4 hours</div>
                    <div>Uptime: 85%</div>
                    <div>Batch: 1 feature</div>
                  </div>
                </div>
                <div className="w-full h-10 border-2 border-t-0 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] flex items-center justify-center">
                  <span className="text-xs">5 people</span>
                </div>
              </div>
              
              <div className="absolute top-[100px] left-[760px] w-[160px] h-[120px]">
                <div className="w-full h-full border-2 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] p-2">
                  <h4 className="text-sm font-bold mb-1">Testing</h4>
                  <div className="text-xs">
                    <div>C/T: 2 days</div>
                    <div>C/O: 1 hour</div>
                    <div>Uptime: 95%</div>
                    <div>Batch: 1 feature</div>
                  </div>
                </div>
                <div className="w-full h-10 border-2 border-t-0 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] flex items-center justify-center">
                  <span className="text-xs">3 people</span>
                </div>
              </div>
              
              <div className="absolute top-[100px] left-[980px] w-[160px] h-[120px]">
                <div className="w-full h-full border-2 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] p-2">
                  <h4 className="text-sm font-bold mb-1">Deployment</h4>
                  <div className="text-xs">
                    <div>C/T: 1 day</div>
                    <div>C/O: 2 hours</div>
                    <div>Uptime: 99%</div>
                    <div>Batch: 1 release</div>
                  </div>
                </div>
                <div className="w-full h-10 border-2 border-t-0 border-zenith-primary dark-purple:border-[#9b87f5] dark-tactical:border-[#4D6E58] dark-hacker:border-[#ea384c] bg-white dark-purple:bg-[#2D3549] dark-tactical:bg-[#384D3E] dark-hacker:bg-[#242424] flex items-center justify-center">
                  <span className="text-xs">2 people</span>
                </div>
              </div>
              
              {/* Inventory/Wait Triangles */}
              <div className="absolute top-[140px] left-[50px] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gray-400">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  1d wait
                </div>
              </div>
              
              <div className="absolute top-[140px] left-[270px] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gray-400">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  2d wait
                </div>
              </div>
              
              <div className="absolute top-[140px] left-[490px] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gray-400">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  1d wait
                </div>
              </div>
              
              <div className="absolute top-[140px] left-[710px] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gray-400">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  2d wait
                </div>
              </div>
              
              <div className="absolute top-[140px] left-[930px] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gray-400">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                  1d wait
                </div>
              </div>
              
              {/* Arrows */}
              <svg className="absolute top-0 left-0 w-full h-full">
                {/* Customer to first process */}
                <line x1="20" y1="160" x2="100" y2="160" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* Process to process */}
                <line x1="260" y1="160" x2="320" y2="160" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="480" y1="160" x2="540" y2="160" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="700" y1="160" x2="760" y2="160" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="920" y1="160" x2="980" y2="160" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* Last process to customer */}
                <line x1="1140" y1="160" x2="1180" y2="160" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* Timeline values */}
                <text x="100" y="440" className="text-xs fill-current">Day 0</text>
                <text x="320" y="440" className="text-xs fill-current">Day 3</text>
                <text x="540" y="440" className="text-xs fill-current">Day 8</text>
                <text x="760" y="440" className="text-xs fill-current">Day 15</text>
                <text x="980" y="440" className="text-xs fill-current">Day 19</text>
                <text x="1140" y="440" className="text-xs fill-current">Day 21</text>
                
                {/* Arrow definitions */}
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>
              </svg>
              
              {/* Information flow */}
              <div className="absolute top-[50px] left-0 w-full border-t-2 border-dashed border-gray-500"></div>
              <div className="absolute top-[30px] left-[10%] transform rotate-45 w-20 h-20 flex items-center">
                <svg width="30" height="30" className="text-gray-500">
                  <path d="M0,0 L30,30 M30,0 L0,30" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[30%] transform rotate-45 w-20 h-20 flex items-center">
                <svg width="30" height="30" className="text-gray-500">
                  <path d="M0,0 L30,30 M30,0 L0,30" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[50%] transform rotate-45 w-20 h-20 flex items-center">
                <svg width="30" height="30" className="text-gray-500">
                  <path d="M0,0 L30,30 M30,0 L0,30" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[70%] transform rotate-45 w-20 h-20 flex items-center">
                <svg width="30" height="30" className="text-gray-500">
                  <path d="M0,0 L30,30 M30,0 L0,30" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="absolute top-[30px] left-[90%] transform rotate-45 w-20 h-20 flex items-center">
                <svg width="30" height="30" className="text-gray-500">
                  <path d="M0,0 L30,30 M30,0 L0,30" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              
              {/* Timeline metrics */}
              <div className="absolute top-[300px] left-[100px] w-[1040px] h-[60px]">
                <div className="w-full h-full flex">
                  <div className="flex-1 p-2 border-2 border-r-0 border-gray-600 bg-green-100 dark-purple:bg-green-900 dark-tactical:bg-green-900 dark-hacker:bg-green-900 flex flex-col items-center justify-center">
                    <span className="text-xs">Value Added</span>
                    <span className="text-sm font-bold">13 days</span>
                  </div>
                  <div className="flex-1 p-2 border-2 border-gray-600 bg-red-100 dark-purple:bg-red-900 dark-tactical:bg-red-900 dark-hacker:bg-red-900 flex flex-col items-center justify-center">
                    <span className="text-xs">Non-Value Added</span>
                    <span className="text-sm font-bold">8 days</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-center">
                  <span className="font-bold">Process Efficiency:</span> 62% | 
                  <span className="font-bold"> Lead Time:</span> 21 days | 
                  <span className="font-bold"> Value-Added Time:</span> 13 days
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
