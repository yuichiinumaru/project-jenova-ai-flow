
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface DocumentEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function DocumentEditor({ content, onChange, placeholder = "Comece a digitar aqui..." }: DocumentEditorProps) {
  return (
    <Card className="border-0 shadow-none dark-purple:bg-transparent dark-tactical:bg-transparent dark-hacker:bg-transparent">
      <CardContent className="p-0">
        <Textarea 
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[500px] resize-none dark-purple:bg-[#392c53]/30 dark-purple:border-[#392c53] dark-purple:text-gray-200 dark-tactical:bg-[#384D3E]/30 dark-tactical:border-[#384D3E] dark-tactical:text-gray-200 dark-hacker:bg-[#1A1A1A]/50 dark-hacker:border-[#1A1A1A] dark-hacker:text-gray-200"
        />
      </CardContent>
    </Card>
  );
}
