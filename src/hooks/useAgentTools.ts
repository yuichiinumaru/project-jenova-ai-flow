
import { useState } from 'react';
import { AgentTool, getAllTools } from '@/services/agentTools';
import { useToast } from './use-toast';

export function useAgentTools() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const tools = getAllTools();

  const executeTool = async (toolName: string, params: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const tool = tools.find(t => t.name === toolName);
      
      if (!tool) {
        throw new Error(`Tool "${toolName}" not found or not available`);
      }
      
      const result = await tool.execute(params);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast({
        title: 'Tool Execution Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tools,
    executeTool,
    isLoading,
    error,
  };
}
