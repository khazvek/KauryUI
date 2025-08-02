import React, { useState } from 'react';
import { AnimationViewer } from './AnimationViewer';
import { Aurora } from '../lib/components/Backgrounds/Aurora/Aurora';
import { Balatro } from '../lib/components/Backgrounds/Balatro/Balatro';
import { Beams } from '../lib/components/Backgrounds/Beams/Beams';
import { DarkVeil } from '../lib/components/Backgrounds/DarkVeil/DarkVeil';
import { Dither } from '../lib/components/Backgrounds/Dither/Dither';
import { DotGrid } from '../lib/components/Backgrounds/DotGrid/DotGrid';
import { GridDistortion } from '../lib/components/Backgrounds/GridDistortion/GridDistortion';
import { GridMotion } from '../lib/components/Backgrounds/GridMotion/GridMotion';
import { Hyperspeed } from '../lib/components/Backgrounds/Hyperspeed/Hyperspeed';
import { Iridescence } from '../lib/components/Backgrounds/Iridescence/Iridescence';
import { Lightning } from '../lib/components/Backgrounds/Lightning/Lightning';
import { LiquidChrome } from '../lib/components/Backgrounds/LiquidChrome/LiquidChrome';
import { Orb } from '../lib/components/Backgrounds/Orb/Orb';
import { Particles } from '../lib/components/Backgrounds/Particles/Particles';
import { RippleGrid } from '../lib/components/Backgrounds/RippleGrid/RippleGrid';
import { Squares } from '../lib/components/Backgrounds/Squares/Squares';
import { Threads } from '../lib/components/Backgrounds/Threads/Threads';
import { Waves } from '../lib/components/Backgrounds/Waves/Waves';
import { Palette } from 'lucide-react';

interface BackgroundsSectionProps {
  selectedBackground: string | null;
  onBackgroundSelect: (backgroundId: string) => void;
}

interface BackgroundConfig {
  id: string;
  title: string;
  description: string;
  component: (props: any) => React.ReactNode;
  code: string;
  installation?: string;
  usage: string;
  customizationProps: Array<{
    name: string;
    type: string;
    default: any;
    description: string;
    options?: any[];
  }>;
  defaultProps: any;
}

export const BackgroundsSection: React.FC<BackgroundsSectionProps> = ({
  selectedBackground,
  onBackgroundSelect
}) => {
  const [customProps, setCustomProps] = useState<{ [key: string]: any }>({});

  const backgrounds: BackgroundConfig[] = [
    {
      id: 'aurora',
      title: 'Aurora',
      description: 'Beautiful aurora borealis effect with flowing colors',
      component: (props) => (
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <Aurora 
            colors={props.colors || ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']}
            speed={props.speed || 1.2}
            intensity={props.intensity || 0.9}
          />
        </div>
      ),
      code: `import { Aurora } from './Aurora';

<Aurora 
  colors={['#10b981', '#3b82f6', '#8b5cf6']}
  speed={1.5}
  intensity={0.8}
/>`,
      usage: `import { Aurora } from './Aurora';

<Aurora 
  colors={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']}
  speed={1.2}
  intensity={0.9}
  className="w-full h-full"
/>`,
      customizationProps: [
        { name: 'speed', type: 'range', default: 1.2, description: 'Animation speed', options: [0.1, 3, 0.1] },
        { name: 'intensity', type: 'range', default: 0.9, description: 'Effect intensity', options: [0.1, 2, 0.1] }
      ],
      defaultProps: { speed: 1.2, intensity: 0.9, colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'] }
    },
    {
      id: 'particles',
      title: 'Particles',
      description: 'Interactive particle system with mouse interaction',
      component: (props) => (
        <div className="w-full h-64 rounded-lg overflow-hidden bg-black">
          <Particles />
        </div>
      ),
      code: `import { Particles } from './Particles';

<Particles />`,
      installation: 'npm i three',
      usage: `import { Particles } from './Particles';

<Particles />`,
      customizationProps: [],
      defaultProps: {}
    },
    {
      id: 'waves',
      title: 'Waves',
      description: 'Smooth animated waves with customizable colors',
      component: (props) => (
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <Waves />
        </div>
      ),
      code: `import { Waves } from './Waves';

<Waves />`,
      installation: 'npm i gsap',
      usage: `import { Waves } from './Waves';

<Waves />`,
      customizationProps: [],
      defaultProps: {}
    }
  ];

  const selectedBackgroundConfig = backgrounds.find(b => b.id === selectedBackground);

  if (!selectedBackground || !selectedBackgroundConfig) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Select a Background</h2>
          <p className="text-gray-400">Choose a background from the sidebar to see it in action</p>
        </div>
      </div>
    );
  }

  const currentProps = {
    ...selectedBackgroundConfig.defaultProps,
    ...customProps[selectedBackground]
  };

  return (
    <AnimationViewer
      title={selectedBackgroundConfig.title}
      description={selectedBackgroundConfig.description}
      component={selectedBackgroundConfig.component(currentProps)}
      code={selectedBackgroundConfig.code}
      installation={selectedBackgroundConfig.installation}
      usage={selectedBackgroundConfig.usage}
      customizationProps={selectedBackgroundConfig.customizationProps}
      currentProps={currentProps}
      onPropsChange={(newProps) => {
        setCustomProps(prev => ({
          ...prev,
          [selectedBackground]: newProps
        }));
      }}
    />
  );
};