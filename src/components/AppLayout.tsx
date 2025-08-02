import React from 'react';
import { 
  Home, 
  Wrench, 
  Type, 
  Palette, 
  Sparkles,
  Layout,
  Image,
  Library,
  BarChart3,
  Code,
  Settings,
  Github,
  Star
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  category?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  activeSection, 
  onSectionChange 
}) => {
  const navItems: NavItem[] = [
    // Main sections
    { id: 'home', label: 'Get Started', icon: Home },
    { id: 'introduction', label: 'Introduction', icon: Sparkles, category: 'Get Started' },
    { id: 'installation', label: 'Installation', icon: Settings, category: 'Get Started' },
    
    // Tools section
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'form-builder', label: 'Form Builder', icon: Layout, category: 'Tools' },
    { id: 'favicon-generator', label: 'Favicon Generator', icon: Image, category: 'Tools' },
    { id: 'embed-generator', label: 'Embed Generator', icon: Code, category: 'Tools' },
    { id: 'icon-library', label: 'Icon Library', icon: Library, category: 'Tools' },
    { id: 'dashboard-components', label: 'Dashboard Components', icon: BarChart3, category: 'Tools' },
    
    // Components sections
    { id: 'text-animations', label: 'Text Animations', icon: Type },
    { id: 'backgrounds', label: 'Backgrounds', icon: Palette }
  ];

  const categories = [
    'Get Started',
    'Tools'
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = activeSection === item.id;
    const IconComponent = item.icon;
    
    return (
      <button
        key={item.id}
        onClick={() => onSectionChange(item.id)}
        className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'text-gray-300 hover:text-white hover:bg-gray-800'
        }`}
      >
        <IconComponent className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium">{item.label}</span>
        {item.label === 'Text Type' && (
          <span className="ml-auto px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">New</span>
        )}
        {item.label === 'Curved Loop' && (
          <span className="ml-auto px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">New</span>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">KauryUI</h1>
          </div>
          <p className="text-sm text-gray-400 mt-2">Modern UI Components</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-6">
            {/* Main sections without categories */}
            <div className="space-y-1">
              {navItems.filter(item => !item.category).map(renderNavItem)}
            </div>

            {/* Categorized sections */}
            {categories.map(category => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="space-y-1">
                  {navItems.filter(item => item.category === category).map(renderNavItem)}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Star className="w-4 h-4" />
                <span className="text-sm">Star</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};