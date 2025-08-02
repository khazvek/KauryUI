import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Type, 
  Sparkles, 
  Zap,
  Eye,
  MousePointer,
  Play,
  Palette,
  Code,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { BlurText } from './ReactBitsIntegration/TextAnimations/BlurText';
import { GlitchText } from './ReactBitsIntegration/TextAnimations/GlitchText';
import { ShinyText } from './ReactBitsIntegration/TextAnimations/ShinyText';
import { DecryptedText } from './ReactBitsIntegration/TextAnimations/DecryptedText';
import { SplitText } from './ReactBitsIntegration/TextAnimations/SplitText';
import { CircularText } from '../lib/components/TextAnimations/CircularText/CircularText';
import { CountUp } from '../lib/components/TextAnimations/CountUp/CountUp';
import { CurvedLoop } from '../lib/components/TextAnimations/CurvedLoop/CurvedLoop';
import { FallingText } from '../lib/components/TextAnimations/FallingText/FallingText';
import { FuzzyText } from '../lib/components/TextAnimations/FuzzyText/FuzzyText';
import { GradientText } from '../lib/components/TextAnimations/GradientText/GradientText';
import { RotatingText } from '../lib/components/TextAnimations/RotatingText/RotatingText';
import { ScrambledText } from '../lib/components/TextAnimations/ScrambledText/ScrambledText';
import { ScrollFloat } from '../lib/components/TextAnimations/ScrollFloat/ScrollFloat';
import { ScrollReveal } from '../lib/components/TextAnimations/ScrollReveal/ScrollReveal';
import { ScrollVelocity } from '../lib/components/TextAnimations/ScrollVelocity/ScrollVelocity';
import { TextCursor } from '../lib/components/TextAnimations/TextCursor/TextCursor';
import { TextTrail } from '../lib/components/TextAnimations/TextTrail/TextTrail';
import { TrueFocus } from '../lib/components/TextAnimations/TrueFocus/TrueFocus';
import { VariableProximity } from '../lib/components/TextAnimations/VariableProximity/VariableProximity';
import './ReactBitsIntegration/TextAnimations/GlitchText.css';
import '../lib/components/TextAnimations/CircularText/CircularText.css';
import '../lib/components/TextAnimations/CurvedLoop/CurvedLoop.css';
import '../lib/components/TextAnimations/FallingText/FallingText.css';
import '../lib/components/TextAnimations/GradientText/GradientText.css';
import '../lib/components/TextAnimations/RotatingText/RotatingText.css';
import '../lib/components/TextAnimations/ScrambledText/ScrambledText.css';
import '../lib/components/TextAnimations/ScrollFloat/ScrollFloat.css';
import '../lib/components/TextAnimations/ScrollReveal/ScrollReveal.css';
import '../lib/components/TextAnimations/ScrollVelocity/ScrollVelocity.css';
import '../lib/components/TextAnimations/TextCursor/TextCursor.css';
import '../lib/components/TextAnimations/TextTrail/TextTrail.css';
import '../lib/components/TextAnimations/TrueFocus/TrueFocus.css';
import '../lib/components/TextAnimations/VariableProximity/VariableProximity.css';

interface TextAnimationsPageProps {
  onNavigate: (view: string) => void;
}

interface AnimationDemo {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  category: 'entrance' | 'interactive' | 'continuous';
  difficulty: 'easy' | 'medium' | 'hard';
  dependencies: string[];
}

export const TextAnimationsPage: React.FC<TextAnimationsPageProps> = ({ onNavigate }) => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'entrance' | 'interactive' | 'continuous'>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const animations: AnimationDemo[] = [
    {
      id: 'blur-text',
      title: 'Blur Text',
      description: 'Text that animates in with a blur effect and smooth transitions',
      component: (
        <BlurText
          text="Beautiful blur animation!"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        />
      ),
      code: `<BlurText
  text="Beautiful blur animation!"
  delay={100}
  animateBy="words"
  direction="top"
  className="text-4xl font-bold"
/>`,
      category: 'entrance',
      difficulty: 'easy',
      dependencies: ['framer-motion']
    },
    {
      id: 'glitch-text',
      title: 'Glitch Text',
      description: 'Cyberpunk-style glitch effect with customizable colors and speed',
      component: (
        <GlitchText
          speed={1.5}
          enableShadows={true}
          enableOnHover={true}
          className="text-4xl font-bold text-white"
        >
          GLITCH EFFECT
        </GlitchText>
      ),
      code: `<GlitchText
  speed={1.5}
  enableShadows={true}
  enableOnHover={true}
  className="text-4xl font-bold"
>
  GLITCH EFFECT
</GlitchText>`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: []
    },
    {
      id: 'shiny-text',
      title: 'Shiny Text',
      description: 'Elegant shine effect that sweeps across the text continuously',
      component: (
        <ShinyText
          text="Shimmering text effect!"
          speed={3}
          className="text-4xl font-bold text-gray-300"
        />
      ),
      code: `<ShinyText
  text="Shimmering text effect!"
  speed={3}
  className="text-4xl font-bold"
/>`,
      category: 'continuous',
      difficulty: 'easy',
      dependencies: []
    },
    {
      id: 'decrypted-text',
      title: 'Decrypted Text',
      description: 'Matrix-style decryption effect with customizable characters',
      component: (
        <DecryptedText
          text="DECRYPTION COMPLETE"
          speed={80}
          maxIterations={15}
          animateOn="hover"
          className="text-3xl font-bold text-green-400 font-mono"
        />
      ),
      code: `<DecryptedText
  text="DECRYPTION COMPLETE"
  speed={80}
  maxIterations={15}
  animateOn="hover"
  className="text-3xl font-bold font-mono"
/>`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: ['framer-motion']
    },
    {
      id: 'split-text',
      title: 'Split Text',
      description: 'GSAP-powered text animation that splits text into characters, words, or lines',
      component: (
        <SplitText
          text="GSAP Split Animation!"
          delay={50}
          duration={0.8}
          ease="back.out(1.7)"
          splitType="chars"
          from={{ opacity: 0, y: 50, rotation: 10 }}
          to={{ opacity: 1, y: 0, rotation: 0 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600"
        />
      ),
      code: `<SplitText
  text="GSAP Split Animation!"
  delay={50}
  duration={0.8}
  ease="back.out(1.7)"
  splitType="chars"
  from={{ opacity: 0, y: 50, rotation: 10 }}
  to={{ opacity: 1, y: 0, rotation: 0 }}
  className="text-4xl font-bold"
/>`,
      category: 'entrance',
      difficulty: 'medium',
      dependencies: ['gsap']
    },
    {
      id: 'circular-text',
      title: 'Circular Text',
      description: 'Text arranged in a circular pattern with rotation animation',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <CircularText
            text="REACT*BITS*COMPONENTS*"
            onHover="speedUp"
            spinDuration={20}
            className="text-white"
          />
        </div>
      ),
      code: `<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="text-white"
/>`,
      category: 'continuous',
      difficulty: 'medium',
      dependencies: ['framer-motion']
    },
    {
      id: 'count-up',
      title: 'Count Up',
      description: 'Animated number counter with customizable formatting',
      component: (
        <CountUp
          from={0}
          to={1000}
          separator=","
          direction="up"
          duration={2}
          className="text-4xl font-bold text-blue-400"
        />
      ),
      code: `<CountUp
  from={0}
  to={1000}
  separator=","
  direction="up"
  duration={2}
  className="text-4xl font-bold"
/>`,
      category: 'entrance',
      difficulty: 'easy',
      dependencies: ['framer-motion']
    },
    {
      id: 'curved-loop',
      title: 'Curved Loop',
      description: 'Text following a curved path with smooth looping animation',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <CurvedLoop 
            marqueeText="CURVED ✦ LOOP ✦ ANIMATION ✦"
            speed={2}
            curveAmount={400}
            direction="right"
            interactive={true}
            className="text-purple-400"
          />
        </div>
      ),
      code: `<CurvedLoop 
  marqueeText="CURVED ✦ LOOP ✦ ANIMATION ✦"
  speed={2}
  curveAmount={400}
  direction="right"
  interactive={true}
/>`,
      category: 'continuous',
      difficulty: 'medium',
      dependencies: []
    },
    {
      id: 'falling-text',
      title: 'Falling Text',
      description: 'Physics-based text animation with Matter.js',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <FallingText
            text="Physics based animation with falling letters!"
            highlightWords={["Physics", "animation", "falling"]}
            highlightClass="text-cyan-400"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.8}
            fontSize="1.5rem"
            mouseConstraintStiffness={0.9}
          />
        </div>
      ),
      code: `<FallingText
  text="Physics based animation!"
  highlightWords={["Physics", "animation"]}
  trigger="hover"
  gravity={0.8}
  fontSize="1.5rem"
/>`,
      category: 'interactive',
      difficulty: 'hard',
      dependencies: ['matter-js', '@types/matter-js']
    },
    {
      id: 'fuzzy-text',
      title: 'Fuzzy Text',
      description: 'Text with a fuzzy, distorted effect that responds to interaction',
      component: (
        <FuzzyText 
          baseIntensity={0.2} 
          hoverIntensity={0.8} 
          enableHover={true}
        >
          <span className="text-4xl font-bold text-red-400">FUZZY</span>
        </FuzzyText>
      ),
      code: `<FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={0.8} 
  enableHover={true}
>
  FUZZY TEXT
</FuzzyText>`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: []
    },
    {
      id: 'gradient-text',
      title: 'Gradient Text',
      description: 'Animated gradient text with flowing colors',
      component: (
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="text-4xl font-bold"
        >
          Gradient Animation
        </GradientText>
      ),
      code: `<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
>
  Gradient Animation
</GradientText>`,
      category: 'continuous',
      difficulty: 'easy',
      dependencies: []
    },
    {
      id: 'rotating-text',
      title: 'Rotating Text',
      description: 'Text that rotates through different words with smooth transitions',
      component: (
        <RotatingText
          texts={['React', 'Bits', 'Is', 'Amazing!']}
          mainClassName="px-4 bg-cyan-500 text-black overflow-hidden py-2 rounded-lg text-2xl font-bold"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      ),
      code: `<RotatingText
  texts={['React', 'Bits', 'Is', 'Amazing!']}
  mainClassName="px-4 bg-cyan-500 text-black py-2 rounded-lg"
  rotationInterval={2000}
/>`,
      category: 'continuous',
      difficulty: 'medium',
      dependencies: ['framer-motion']
    },
    {
      id: 'scrambled-text',
      title: 'Scrambled Text',
      description: 'Text that scrambles and unscrambles with GSAP animation',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <ScrambledText
            className="text-2xl font-bold text-green-400"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:!@#$%^&*()"
          >
            Scrambled text animation with GSAP power!
          </ScrambledText>
        </div>
      ),
      code: `<ScrambledText
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:!@#$%^&*()"
>
  Scrambled text animation!
</ScrambledText>`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: ['gsap']
    },
    {
      id: 'scroll-float',
      title: 'Scroll Float',
      description: 'Text that floats and animates based on scroll position',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
          >
            <span className="text-4xl font-bold text-yellow-400">FLOAT</span>
          </ScrollFloat>
        </div>
      ),
      code: `<ScrollFloat
  animationDuration={1}
  ease="back.inOut(2)"
  stagger={0.03}
>
  FLOATING TEXT
</ScrollFloat>`,
      category: 'entrance',
      difficulty: 'medium',
      dependencies: ['gsap']
    },
    {
      id: 'scroll-reveal',
      title: 'Scroll Reveal',
      description: 'Text that reveals with blur and rotation effects on scroll',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
            <span className="text-2xl font-bold text-orange-400">
              Scroll to reveal this amazing text animation!
            </span>
          </ScrollReveal>
        </div>
      ),
      code: `<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  Scroll to reveal text!
</ScrollReveal>`,
      category: 'entrance',
      difficulty: 'medium',
      dependencies: ['gsap']
    },
    {
      id: 'scroll-velocity',
      title: 'Scroll Velocity',
      description: 'Text that responds to scroll velocity with dynamic effects',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <ScrollVelocity
            texts={['VELOCITY', 'SCROLL']} 
            velocity={2} 
            className="text-3xl font-bold text-pink-400"
          />
        </div>
      ),
      code: `<ScrollVelocity
  texts={['VELOCITY', 'SCROLL']} 
  velocity={2} 
  className="text-3xl font-bold"
/>`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: ['framer-motion']
    },
    {
      id: 'text-cursor',
      title: 'Text Cursor',
      description: 'Interactive text that follows mouse cursor with trail effects',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <TextCursor
            text="FOLLOW"
            delay={0.01}
            spacing={80}
            followMouseDirection={true}
            randomFloat={true}
            exitDuration={0.3}
            removalInterval={20}
            maxPoints={10}
          />
        </div>
      ),
      code: `<TextCursor
  text="FOLLOW"
  delay={0.01}
  spacing={80}
  followMouseDirection={true}
  randomFloat={true}
  maxPoints={10}
/>`,
      category: 'interactive',
      difficulty: 'hard',
      dependencies: ['framer-motion']
    },
    {
      id: 'text-trail',
      title: 'Text Trail',
      description: '3D text with trailing effects using Three.js',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <TextTrail 
            text="3D TRAIL"
            fontFamily="Figtree"
            fontWeight="900"
            noiseFactor={1.2}
            noiseScale={0.001}
            rgbPersistFactor={0.95}
            alphaPersistFactor={0.92}
            animateColor={true}
            startColor="#ff6b6b"
            textColor="#4ecdc4"
            backgroundColor="#1a1a2e"
            colorCycleInterval={2000}
            supersample={2}
          />
        </div>
      ),
      code: `<TextTrail 
  text="3D TRAIL"
  animateColor={true}
  startColor="#ff6b6b"
  textColor="#4ecdc4"
  colorCycleInterval={2000}
/>`,
      category: 'continuous',
      difficulty: 'hard',
      dependencies: ['three']
    },
    {
      id: 'true-focus',
      title: 'True Focus',
      description: 'Text with focus frame animation and blur effects',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <TrueFocus 
            sentence="TRUE FOCUS"
            manualMode={false}
            blurAmount={5}
            borderColor="#ff0080"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </div>
      ),
      code: `<TrueFocus 
  sentence="TRUE FOCUS"
  manualMode={false}
  blurAmount={5}
  borderColor="#ff0080"
  animationDuration={2}
/>`,
      category: 'continuous',
      difficulty: 'medium',
      dependencies: ['framer-motion']
    },
    {
      id: 'variable-proximity',
      title: 'Variable Proximity',
      description: 'Text with variable font weight based on mouse proximity',
      component: (
        <div className="w-full h-48 flex items-center justify-center">
          <VariableProximity
            label="Hover me! Variable font magic"
            className="text-2xl text-white"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={null}
            radius={100}
            falloff="linear"
          />
        </div>
      ),
      code: `<VariableProximity
  label="Hover me! Variable font magic"
  fromFontVariationSettings="'wght' 400, 'opsz' 9"
  toFontVariationSettings="'wght' 1000, 'opsz' 40"
  radius={100}
  falloff="linear"
/>`,
      category: 'interactive',
      difficulty: 'medium',
      dependencies: ['framer-motion']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Animations', count: animations.length },
    { id: 'entrance', label: 'Entrance', count: animations.filter(a => a.category === 'entrance').length },
    { id: 'interactive', label: 'Interactive', count: animations.filter(a => a.category === 'interactive').length },
    { id: 'continuous', label: 'Continuous', count: animations.filter(a => a.category === 'continuous').length }
  ];

  const filteredAnimations = activeCategory === 'all' 
    ? animations 
    : animations.filter(a => a.category === activeCategory);

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
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Type className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Text Animations</h1>
          </div>
          
          <p className="text-gray-400 text-lg max-w-3xl">
            Beautiful text animations powered by React Bits. Interactive effects, smooth transitions, 
            and eye-catching typography animations for modern web interfaces.
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
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Animations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAnimations.map((animation, index) => (
            <div
              key={animation.id}
              className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Demo Area */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 min-h-[200px] flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20"></div>
                </div>
                
                {/* Animation Demo */}
                <div className="relative z-10 text-center">
                  {animation.component}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    animation.category === 'entrance' ? 'bg-blue-500/20 text-blue-400' :
                    animation.category === 'interactive' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {animation.category}
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{animation.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{animation.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(animation.difficulty)}`}>
                    {animation.difficulty}
                  </div>
                </div>

                {/* Dependencies */}
                {animation.dependencies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Dependencies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {animation.dependencies.map((dep) => (
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
                      onClick={() => copyCode(animation.code, animation.id)}
                      className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      {copiedCode === animation.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-xs">{copiedCode === animation.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{animation.code}</code>
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedDemo(selectedDemo === animation.id ? null : animation.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{selectedDemo === animation.id ? 'Hide Details' : 'View Details'}</span>
                  </button>
                  
                  <button
                    onClick={() => copyCode(animation.code, animation.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    <Code className="w-4 h-4" />
                    <span>Get Code</span>
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedDemo === animation.id && (
                  <div className="mt-6 pt-6 border-t border-gray-700 animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-white mb-3">Features:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Smooth animations with Framer Motion</li>
                          <li>• Fully customizable props</li>
                          <li>• TypeScript support</li>
                          <li>• Responsive design</li>
                          <li>• Accessibility friendly</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-white mb-3">Use Cases:</h5>
                        <ul className="text-sm text-gray-400 space-y-1">
                          <li>• Hero section headlines</li>
                          <li>• Call-to-action buttons</li>
                          <li>• Loading states</li>
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

        {/* Info Section */}
        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-semibold text-white">About Text Animations</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Performance Optimized</h3>
              <p className="text-gray-400 text-sm">
                All animations are optimized for smooth 60fps performance using modern CSS and JavaScript techniques.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Interactive</h3>
              <p className="text-gray-400 text-sm">
                Many animations respond to user interactions like hover, click, or scroll for engaging experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Customizable</h3>
              <p className="text-gray-400 text-sm">
                Every animation comes with extensive customization options for colors, timing, and behavior.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3">Getting Started</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">1. Install Dependencies</h4>
                <p className="mb-3">Most animations require Framer Motion:</p>
                <code className="bg-gray-800 px-3 py-1 rounded text-pink-400">npm install framer-motion</code>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">2. Copy Component</h4>
                <p>Click "Get Code" on any animation above to copy the component code and integrate it into your project.</p>
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