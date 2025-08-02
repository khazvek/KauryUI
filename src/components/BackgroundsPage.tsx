import React, { useState } from 'react';
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
import { 
  ArrowLeft, 
  Palette, 
  Eye,
  Code,
  Download,
  Copy,
  Check,
  Play,
  Sparkles,
  Zap,
  Globe,
  Layers,
  MousePointer,
  Settings
} from 'lucide-react';

interface BackgroundsPageProps {
  onNavigate: (view: string) => void;
}

interface BackgroundDemo {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  category: 'animated' | 'static' | 'interactive';
  difficulty: 'easy' | 'medium' | 'hard';
  dependencies: string[];
  preview: string;
}

export const BackgroundsPage: React.FC<BackgroundsPageProps> = ({ onNavigate }) => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'animated' | 'static' | 'interactive'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Placeholder backgrounds - will be populated as we integrate react-bits components
  const backgrounds: BackgroundDemo[] = [
    {
      id: 'aurora',
      title: 'Aurora',
      description: 'Beautiful aurora borealis effect with flowing colors',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <Aurora 
            colors={['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444']}
            speed={1.2}
            intensity={0.9}
          />
        </div>
      ),
      code: `import { Aurora } from './lib/components/Backgrounds/Aurora/Aurora';

<Aurora 
  colors={['#10b981', '#3b82f6', '#8b5cf6']}
  speed={1.5}
  intensity={0.8}
/>`,
      category: 'animated',
      difficulty: 'medium',
      dependencies: [],
      preview: 'gradient-aurora'
    },
    {
      id: 'balatro',
      title: 'Balatro',
      description: 'Dynamic abstract background with fluid shapes and colors',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <Balatro />
        </div>
      ),
      code: `import { Balatro } from './lib/components/Backgrounds/Balatro/Balatro';

<Balatro />`,
      category: 'animated',
      difficulty: 'medium',
      dependencies: [],
      preview: 'balatro'
    },
    {
      id: 'beams',
      title: 'Beams',
      description: 'Animated light beams with customizable colors and directions',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-900">
          <Beams />
        </div>
      ),
      code: `import { Beams } from './lib/components/Backgrounds/Beams/Beams';

<Beams />`,
      category: 'animated',
      difficulty: 'medium',
      dependencies: [],
      preview: 'beams'
    },
    {
      id: 'darkveil',
      title: 'Dark Veil',
      description: 'Mysterious dark veil effect with subtle animations',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <DarkVeil />
        </div>
      ),
      code: `import { DarkVeil } from './lib/components/Backgrounds/DarkVeil/DarkVeil';

<DarkVeil />`,
      category: 'static',
      difficulty: 'easy',
      dependencies: [],
      preview: 'darkveil'
    },
    {
      id: 'dither',
      title: 'Dither',
      description: 'Retro dithering effect with pixelated patterns',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <Dither />
        </div>
      ),
      code: `import { Dither } from './lib/components/Backgrounds/Dither/Dither';

<Dither />`,
      category: 'static',
      difficulty: 'medium',
      dependencies: [],
      preview: 'dither'
    },
    {
      id: 'dotgrid',
      title: 'Dot Grid',
      description: 'Interactive dot grid with mouse interaction effects',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <DotGrid />
        </div>
      ),
      code: `import { DotGrid } from './lib/components/Backgrounds/DotGrid/DotGrid';

<DotGrid />`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: [],
      preview: 'dotgrid'
    },
    {
      id: 'griddistortion',
      title: 'Grid Distortion',
      description: 'Distorted grid pattern with wave-like animations',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <GridDistortion />
        </div>
      ),
      code: `import { GridDistortion } from './lib/components/Backgrounds/GridDistortion/GridDistortion';

<GridDistortion />`,
      category: 'animated',
      difficulty: 'hard',
      dependencies: [],
      preview: 'griddistortion'
    },
    {
      id: 'gridmotion',
      title: 'Grid Motion',
      description: 'Dynamic grid with motion effects and perspective transforms',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <GridMotion />
        </div>
      ),
      code: `import { GridMotion } from './lib/components/Backgrounds/GridMotion/GridMotion';

<GridMotion />`,
      category: 'animated',
      difficulty: 'hard',
      dependencies: [],
      preview: 'gridmotion'
    },
    {
      id: 'hyperspeed',
      title: 'Hyperspeed',
      description: 'Star field effect simulating hyperspeed travel',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-black">
          <Hyperspeed />
        </div>
      ),
      code: `import { Hyperspeed } from './lib/components/Backgrounds/Hyperspeed/Hyperspeed';

<Hyperspeed />`,
      category: 'animated',
      difficulty: 'hard',
      dependencies: [],
      preview: 'hyperspeed'
    },
    {
      id: 'iridescence',
      title: 'Iridescence',
      description: 'Iridescent color-shifting background with rainbow effects',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <Iridescence />
        </div>
      ),
      code: `import { Iridescence } from './lib/components/Backgrounds/Iridescence/Iridescence';

<Iridescence />`,
      category: 'animated',
      difficulty: 'medium',
      dependencies: [],
      preview: 'iridescence'
    },
    {
      id: 'lightning',
      title: 'Lightning',
      description: 'Electric lightning effects with branching patterns',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-900">
          <Lightning />
        </div>
      ),
      code: `import { Lightning } from './lib/components/Backgrounds/Lightning/Lightning';

<Lightning />`,
      category: 'animated',
      difficulty: 'hard',
      dependencies: [],
      preview: 'lightning'
    },
    {
      id: 'liquidchrome',
      title: 'Liquid Chrome',
      description: 'Metallic liquid chrome effect with reflective surfaces',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <LiquidChrome />
        </div>
      ),
      code: `import { LiquidChrome } from './lib/components/Backgrounds/LiquidChrome/LiquidChrome';

<LiquidChrome />`,
      category: 'animated',
      difficulty: 'hard',
      dependencies: [],
      preview: 'liquidchrome'
    },
    {
      id: 'orb',
      title: 'Orb',
      description: 'Floating orb with glow effects and smooth movement',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-900">
          <Orb />
        </div>
      ),
      code: `import { Orb } from './lib/components/Backgrounds/Orb/Orb';

<Orb />`,
      category: 'animated',
      difficulty: 'medium',
      dependencies: [],
      preview: 'orb'
    },
    {
      id: 'particles',
      title: 'Particles',
      description: 'Interactive particle system with mouse interaction',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-black">
          <Particles />
        </div>
      ),
      code: `import { Particles } from './lib/components/Backgrounds/Particles/Particles';

<Particles />`,
      category: 'interactive',
      difficulty: 'hard',
      dependencies: ['three'],
      preview: 'particles'
    },
    {
      id: 'ripplegrid',
      title: 'Ripple Grid',
      description: 'Grid with ripple effects spreading from interaction points',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <RippleGrid />
        </div>
      ),
      code: `import { RippleGrid } from './lib/components/Backgrounds/RippleGrid/RippleGrid';

<RippleGrid />`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: [],
      preview: 'ripplegrid'
    },
    {
      id: 'squares',
      title: 'Squares',
      description: 'Animated squares pattern with geometric transformations',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <Squares />
        </div>
      ),
      code: `import { Squares } from './lib/components/Backgrounds/Squares/Squares';

<Squares />`,
      category: 'animated',
      difficulty: 'medium',
      dependencies: [],
      preview: 'squares'
    },
    {
      id: 'threads',
      title: 'Threads',
      description: 'Interconnected threads with flowing animations',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-900">
          <Threads />
        </div>
      ),
      code: `import { Threads } from './lib/components/Backgrounds/Threads/Threads';

<Threads />`,
      category: 'animated',
      difficulty: 'hard',
      dependencies: [],
      preview: 'threads'
    },
    {
      id: 'waves',
      title: 'Waves',
      description: 'Smooth animated waves with customizable colors',
      component: (
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <Waves />
        </div>
      ),
      code: `import { Waves } from './lib/components/Backgrounds/Waves/Waves';

<Waves />`,
      category: 'animated',
      difficulty: 'easy',
      dependencies: ['gsap'],
      preview: 'waves'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Backgrounds', count: backgrounds.length },
    { id: 'animated', label: 'Animated', count: backgrounds.filter(b => b.category === 'animated').length },
    { id: 'static', label: 'Static', count: backgrounds.filter(b => b.category === 'static').length },
    { id: 'interactive', label: 'Interactive', count: backgrounds.filter(b => b.category === 'interactive').length }
  ];

  const filteredBackgrounds = activeCategory === 'all' 
    ? backgrounds 
    : backgrounds.filter(b => b.category === activeCategory);

  const copyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center space-x-2 text-gray-400 hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Background Components</h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-3xl">
            Beautiful animated backgrounds powered by React Bits. Interactive effects, smooth animations, 
            and stunning visual elements for modern web interfaces.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Backgrounds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredBackgrounds.map((background, index) => (
            <div
              key={background.id}
              className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Demo Area */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                {/* Background Demo */}
                <div className="relative z-10 rounded-lg overflow-hidden border border-gray-600">
                  {background.component}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    background.category === 'animated' ? 'bg-blue-500/20 text-blue-400' :
                    background.category === 'interactive' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {background.category}
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{background.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{background.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(background.difficulty)}`}>
                    {background.difficulty}
                  </div>
                </div>

                {/* Dependencies */}
                {background.dependencies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Dependencies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {background.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-mono"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Section */}
                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-300">Usage:</h4>
                    <button
                      onClick={() => copyCode(background.code, background.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {copiedCode === background.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-xs">{copiedCode === background.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{background.code}</code>
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedDemo(selectedDemo === background.id ? null : background.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{selectedDemo === background.id ? 'Hide Details' : 'View Details'}</span>
                  </button>
                  
                  <button
                    onClick={() => copyCode(background.code, background.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    <Code className="w-4 h-4" />
                    <span>Get Code</span>
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedDemo === background.id && (
                  <div className="mt-6 pt-6 border-t border-gray-700 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-white mb-3">Features:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• High-performance animations</li>
                          <li>• Fully customizable props</li>
                          <li>• TypeScript support</li>
                          <li>• Responsive design</li>
                          <li>• GPU accelerated</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white mb-3">Use Cases:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Hero section backgrounds</li>
                          <li>• Landing page effects</li>
                          <li>• Loading screens</li>
                          <li>• Interactive elements</li>
                          <li>• Brand presentations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-2xl font-semibold text-white">React Bits Integration</h2>
          </div>
          
          <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
            We're currently integrating all the beautiful background components from React Bits. 
            Each background will be carefully ported with full customization options.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">High Performance</h3>
              <p className="text-gray-400">GPU-accelerated animations for smooth 60fps performance</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MousePointer className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Interactive</h3>
              <p className="text-gray-400">Mouse and touch interactions for engaging experiences</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Customizable</h3>
              <p className="text-gray-400">Extensive props for colors, speed, and behavior</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3">Available Backgrounds from React Bits</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300 mb-4">
              {[
                'Balatro', 'Beams', 'DarkVeil', 'Dither', 'DotGrid',
                'GridDistortion', 'GridMotion', 'Hyperspeed', 'Iridescence',
                'Lightning', 'LiquidChrome', 'Orb', 'Particles', 'RippleGrid',
                'Squares', 'Threads', 'Waves'
              ].map((bg) => (
                <div key={bg} className="bg-gray-800 px-3 py-2 rounded-lg text-center">
                  {bg}
                </div>
              ))}
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium text-sm">Integrated:</span>
              </div>
              <div className="text-sm text-gray-300 flex flex-wrap gap-2">
                <span className="bg-gray-800 px-2 py-1 rounded">Aurora</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Balatro</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Beams</span>
                <span className="bg-gray-800 px-2 py-1 rounded">DarkVeil</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Dither</span>
                <span className="bg-gray-800 px-2 py-1 rounded">DotGrid</span>
                <span className="bg-gray-800 px-2 py-1 rounded">GridDistortion</span>
                <span className="bg-gray-800 px-2 py-1 rounded">GridMotion</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Hyperspeed</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Iridescence</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Lightning</span>
                <span className="bg-gray-800 px-2 py-1 rounded">LiquidChrome</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Orb</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Particles</span>
                <span className="bg-gray-800 px-2 py-1 rounded">RippleGrid</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Squares</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Threads</span>
                <span className="bg-gray-800 px-2 py-1 rounded">Waves</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};