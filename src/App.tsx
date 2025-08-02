import React, { useState } from 'react';
import { MainNavigation } from './components/MainNavigation';
import { LandingPage } from './components/LandingPage';
import { TextAnimationsSection } from './components/TextAnimationsSection';
import { BackgroundsSection } from './components/BackgroundsSection';
import { ToolsSection } from './components/ToolsSection';

function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (section !== 'text-animations' && section !== 'backgrounds' && section !== 'tools') {
      setActiveSubItem(null);
    }
  };

  const handleSubItemSelect = (subItem: string) => {
    setActiveSubItem(subItem);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
      case 'installation':
        return <LandingPage onNavigate={handleSectionChange} />;
      
      case 'tools':
        return (
          <ToolsSection 
            activeTool={activeSubItem}
            onToolSelect={handleSubItemSelect}
          />
        );
      
      case 'text-animations':
        return (
          <TextAnimationsSection
            selectedAnimation={activeSubItem}
            onAnimationSelect={handleSubItemSelect}
          />
        );
      
      case 'backgrounds':
        return (
          <BackgroundsSection
            selectedBackground={activeSubItem}
            onBackgroundSelect={handleSubItemSelect}
          />
        );
      
      default:
        return <LandingPage onNavigate={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <MainNavigation
        activeSection={activeSection}
        activeSubItem={activeSubItem}
        onSectionChange={handleSectionChange}
        onSubItemSelect={handleSubItemSelect}
      />
      
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;