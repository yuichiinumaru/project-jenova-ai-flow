
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import KanbanBoard from "./pages/KanbanBoard";
import Timeline from "./pages/Timeline";
import Calendar from "./pages/Calendar";
import Charts from "./pages/Charts";
import FlowDiagram from "./pages/FlowDiagram";
import MindMap from "./pages/MindMap";
import ValueStream from "./pages/ValueStream";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Teams from "./pages/Teams";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/flow" element={<FlowDiagram />} />
            <Route path="/mind-map" element={<MindMap />} />
            <Route path="/value-stream" element={<ValueStream />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
