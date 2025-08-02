import React from 'react';
import { 
  Type, 
  Palette, 
  Layout, 
  Image, 
  Code, 
  Library, 
  BarChart3,
  Sparkles,
  Home,
  Settings,
  Wrench
} from 'lucide-react';

interface MainNavigationProps {
  activeSection: string;
  activeSubItem: string | null;
  onSectionChange: (section: string) => void;
  onSubItemSelect: (subItem: string) => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  activeSection,
  activeSubItem,
  onSectionChange,
  onSubItemSelect
}) => {
  const textAnimations = [
    'split-text',
    'blur-text', 
    'circular-text',
    'text-type',
    'shiny-text',
    'text-pressure',
    'curved-loop',
    'fuzzy-text',
    'gradient-text',
    'text-trail',
    'falling-text',
    'text-cursor',
    'decrypted-text',
    'true-focus',
    'scroll-float',
    'scroll-reveal'
  ];

  const backgrounds = [
    'aurora',
    'balatro', 
    'beams',
    'darkveil',
    'dither',
    'dotgrid',
    'griddistortion',
    'gridmotion',
    'hyperspeed',
    'iridescence',
    'lightning',
    'liquidchrome',
    'orb',
    'particles',
    'ripplegrid',
    'squares',
    'threads',
    'waves'
  ];

  const tools = [
    { id: 'form-builder', label: 'Form Builder', icon: Layout },
    { id: 'favicon-generator', label: 'Favicon Generator', icon: Image },
    { id: 'embed-generator', label: 'Embed Generator', icon: Code },
    { id: 'icon-library', label: 'Icon Library', icon: Library },
    { id: 'dashboard-components', label: 'Dashboard Components', icon: BarChart3 }
  ];

  const formatLabel = (id: string) => {
    return id.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const renderNavItem = (id: string, label: string, isActive: boolean, onClick: () => void, hasNew = false) => (
    <button
      key={id}
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm">{label}</span>
        {hasNew && (
          <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">New</span>
        )}
      </div>
    </button>
  );

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">KauryUI</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-6">
          {/* Get Started */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Get Started
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => onSectionChange('home')}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Introduction</span>
              </button>
              <button
                onClick={() => onSectionChange('installation')}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-all duration-200 ${
                  activeSection === 'installation'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Installation</span>
              </button>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Tools
            </h3>
            <div className="space-y-1">
              {tools.map(tool => {
                const IconComponent = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSectionChange('tools');
                      onSubItemSelect(tool.id);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-all duration-200 ${
                      activeSection === 'tools' && activeSubItem === tool.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{tool.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Animations */}
          <div>
            <button
              onClick={() => onSectionChange('text-animations')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-all duration-200 mb-3 ${
                activeSection === 'text-animations'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Type className="w-4 h-4" />
              <span className="text-sm font-medium">Text Animations</span>
            </button>
            
            {activeSection === 'text-animations' && (
              <div className="ml-4 space-y-1">
                {textAnimations.map(animation => 
                  renderNavItem(
                    animation,
                    formatLabel(animation),
                    activeSubItem === animation,
                    () => onSubItemSelect(animation),
                    animation === 'text-type' || animation === 'curved-loop'
                  )
                )}
              </div>
            )}
          </div>

          {/* Backgrounds */}
          <div>
            <button
              onClick={() => onSectionChange('backgrounds')}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-all duration-200 mb-3 ${
                activeSection === 'backgrounds'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span className="text-sm font-medium">Backgrounds</span>
            </button>
            
            {activeSection === 'backgrounds' && (
              <div className="ml-4 space-y-1">
                {backgrounds.map(background => 
                  renderNavItem(
                    background,
                    formatLabel(background),
                    activeSubItem === background,
                    () => onSubItemSelect(background)
                  )
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};