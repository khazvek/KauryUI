import React from 'react';
import { Sparkles, Zap, Code, Palette, Layers, ArrowRight, Github, Star, Play, Download, Users, Globe, Shield, Rocket, Layout, Image, Type, Library, Dumbbell as Embed, Settings, BarChart3, Wand2, Paintbrush, Grid3X3, MousePointer, Cpu, Terminal, Boxes } from 'lucide-react';
import { BlurText } from './ReactBitsIntegration/TextAnimations/BlurText';
import { GlitchText } from './ReactBitsIntegration/TextAnimations/GlitchText';
import { ShinyText } from './ReactBitsIntegration/TextAnimations/ShinyText';
import { SplitText } from './ReactBitsIntegration/TextAnimations/SplitText';
import './ReactBitsIntegration/TextAnimations/GlitchText.css';

interface LandingPageProps {
  onNavigate: (component: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300 font-medium">Powered by React Bits • 90+ Components</span>
            </div>
            
            <div className="mb-8">
              <BlurText
                text="Build Beautiful Web Interfaces"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
              />
              <div className="mt-4">
                <GlitchText
                  speed={0.8}
                  enableShadows={true}
                  enableOnHover={false}
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent"
                >
                  with KauryUI
                </GlitchText>
              </div>
            </div>
            
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              <ShinyText 
                text="Complete toolkit for creating stunning forms, components, and animations."
                speed={4}
                className="inline"
              />
              <br />
              <SplitText
                text="From form builders to text animations - everything you need in one place."
                delay={80}
                duration={0.6}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                className="inline"
              />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-200">
            <button 
              onClick={() => onNavigate('tools')}
              className="group bg-gradient-to-r from-pink-500 to-violet-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-pink-500/25"
            >
              <Play className="w-5 h-5" />
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => onNavigate('text-animations')}
              className="group bg-gray-900/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-gray-600 flex items-center space-x-2"
            >
              <Type className="w-5 h-5" />
              <span>View Animations</span>
            </button>
            
            <button className="group bg-gray-900/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-gray-600 flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <BlurText
              text="Complete Development Toolkit"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            />
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              <ShinyText 
                text="Everything you need to build modern web interfaces, from components to utilities"
                speed={5}
              />
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Layout className="w-6 h-6" />,
                title: "Form Builder",
                description: "Visual form creator with live preview",
                available: true,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Image className="w-6 h-6" />,
                title: "Backgrounds",
                description: "Beautiful gradient and pattern backgrounds",
                available: true,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Grid3X3 className="w-6 h-6" />,
                title: "Components",
                description: "Pre-built UI components library",
                available: false,
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Animations",
                description: "Smooth CSS and JS animations",
                available: false,
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Type className="w-6 h-6" />,
                title: "Text Animations",
                description: "90+ animated text effects from React Bits",
                available: true,
                gradient: "from-red-500 to-pink-500"
              },
              {
                icon: <Library className="w-6 h-6" />,
                title: "Icon Library",
                description: "Curated collection of modern icons",
                available: true,
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: <Embed className="w-6 h-6" />,
                title: "Embed Generator",
                description: "Generate embeddable widgets and components",
                available: true,
                gradient: "from-teal-500 to-cyan-500"
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Favicon Generator",
                description: "Create favicons from text or images",
                available: true,
                gradient: "from-violet-500 to-purple-500"
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Dashboard Components",
                description: "Charts, metrics, and dashboard widgets",
                available: true,
                gradient: "from-blue-500 to-indigo-500"
              }
            ].map((tool, index) => (
              <div 
                key={index}
                className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 transition-all duration-300 hover:scale-105 animate-fade-in-up overflow-hidden hover:border-gray-700/50 ${
                  tool.available 
                    ? 'hover:bg-gray-800/50 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/10' 
                    : 'opacity-75'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  if (tool.available) {
                    if (tool.title === 'Form Builder') {
                      onNavigate('tools');
                    } else if (tool.title === 'Favicon Generator') {
                      onNavigate('tools');
                    } else if (tool.title === 'Embed Generator') {
                      onNavigate('tools');
                    } else if (tool.title === 'Icon Library') {
                      onNavigate('tools');
                    } else if (tool.title === 'Dashboard Components') {
                      onNavigate('tools');
                    } else if (tool.title === 'Text Animations') {
                      onNavigate('text-animations');
                    } else if (tool.title === 'Backgrounds') {
                      onNavigate('backgrounds');
                    }
                  }
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">{tool.title}</h3>
                    {!tool.available && (
                      <div className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full border border-gray-700">
                        Soon
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                  
                  {tool.available && (
                    <div className="mt-4 flex items-center text-gray-300 text-sm group-hover:text-white transition-colors">
                      <span className="font-medium">Try it now</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <BlurText
              text="Why Choose KauryUI?"
              delay={100}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            />
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Built for modern developers who want beautiful, accessible, and performant components
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Fast",
                description: "Optimized animations with 60fps performance and minimal bundle impact"
              },
              {
                icon: <Code className="w-6 h-6" />,
                title: "React Bits Powered",
                description: "Built on top of React Bits with 90+ premium components and animations"
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "Fully Customizable",
                description: "Extensive theming system with CSS variables and custom properties"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Accessible by Default",
                description: "WCAG 2.1 compliant with full keyboard navigation and screen reader support"
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Modern React",
                description: "Built with modern React patterns, hooks, and TypeScript for type safety"
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "CDN Ready",
                description: "Available on jsDelivr and unpkg for instant integration"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800/30 hover:bg-gray-800/30 hover:border-gray-700/50 transition-all duration-300 animate-fade-in-up hover:shadow-lg hover:shadow-purple-500/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-700/50 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50 relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative z-10">
              <BlurText
                text="Ready to Build Something Amazing?"
                delay={120}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              />
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                <ShinyText 
                  text="Join thousands of developers creating beautiful interfaces with KauryUI's complete toolkit"
                  speed={6}
                />
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => onNavigate('tools')}
                  className="group bg-gradient-to-r from-pink-500 to-violet-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-pink-500/25"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Start Building Now</span>
                </button>
                
                <button 
                  onClick={() => onNavigate('text-animations')}
                  className="group bg-gray-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-gray-600 flex items-center justify-center space-x-2"
                >
                  <Type className="w-5 h-5" />
                  <span>Explore Animations</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <GlitchText
                speed={2}
                enableShadows={false}
                enableOnHover={true}
                className="text-xl font-bold text-white"
              >
                KauryUI
              </GlitchText>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Star className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800/50 text-center text-gray-400 text-sm">
            <p>&copy; 2024 KauryUI. Built with ❤️ for developers. Powered by React Bits.</p>
          </div>
        </div>
      </footer>

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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};