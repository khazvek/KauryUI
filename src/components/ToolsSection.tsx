import React, { useState } from 'react';
import { 
  Layout, 
  Image, 
  Code, 
  Library, 
  BarChart3,
  Wrench
} from 'lucide-react';
import { FormBuilder } from './FormBuilder';
import { FaviconGenerator } from './FaviconGenerator';
import { EmbedGenerator } from './EmbedGenerator';
import { IconLibrary } from './IconLibrary';
import { DashboardComponents } from './DashboardComponents';

interface ToolsSectionProps {
  activeTool: string | null;
  onToolSelect: (toolId: string) => void;
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({
  activeTool,
  onToolSelect
}) => {
  const tools = [
    { id: 'form-builder', label: 'Form Builder', icon: Layout, component: FormBuilder },
    { id: 'favicon-generator', label: 'Favicon Generator', icon: Image, component: FaviconGenerator },
    { id: 'embed-generator', label: 'Embed Generator', icon: Code, component: EmbedGenerator },
    { id: 'icon-library', label: 'Icon Library', icon: Library, component: IconLibrary },
    { id: 'dashboard-components', label: 'Dashboard Components', icon: BarChart3, component: DashboardComponents }
  ];

  const selectedTool = tools.find(tool => tool.id === activeTool);

  if (!activeTool || !selectedTool) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Select a Tool</h2>
          <p className="text-gray-400">Choose a tool from the sidebar to get started</p>
        </div>
      </div>
    );
  }

  const ToolComponent = selectedTool.component;

  return (
    <div className="flex-1">
      <ToolComponent onNavigate={() => {}} />
    </div>
  );
};