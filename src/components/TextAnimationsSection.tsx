import React, { useState } from 'react';
import { Type } from 'lucide-react';
import { AnimationViewer } from './AnimationViewer';
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

interface TextAnimationsSectionProps {
  selectedAnimation: string | null;
  onAnimationSelect: (animationId: string) => void;
}

interface AnimationConfig {
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

export const TextAnimationsSection: React.FC<TextAnimationsSectionProps> = ({
  selectedAnimation,
  onAnimationSelect
}) => {
  const [customProps, setCustomProps] = useState<{ [key: string]: any }>({});

  const animations: AnimationConfig[] = [
    {
      id: 'split-text',
      title: 'Split Text',
      description: 'Animate text by splitting it into characters, words, or lines with GSAP',
      component: (props) => (
        <SplitText
          text={props.text || "Hello, GSAP!"}
          delay={props.delay || 100}
          duration={props.duration || 0.6}
          ease={props.ease || "power3.out"}
          splitType={props.splitType || "chars"}
          from={{ opacity: 0, y: props.fromY || 40 }}
          to={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        />
      ),
      code: `import SplitText from "./SplitText";

<SplitText
  text="Hello, GSAP!"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  className="text-4xl font-bold"
/>`,
      installation: 'npm install gsap',
      usage: `import SplitText from "./SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

<SplitText
  text="Hello, GSAP!"
  className="text-2xl font-semibold text-center"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
  onLetterAnimationComplete={handleAnimationComplete}
/>`,
      customizationProps: [
        { name: 'text', type: 'string', default: 'Hello, GSAP!', description: 'The text to animate' },
        { name: 'delay', type: 'range', default: 100, description: 'Delay between each character (ms)', options: [0, 500, 10] },
        { name: 'duration', type: 'range', default: 0.6, description: 'Animation duration (seconds)', options: [0.1, 2, 0.1] },
        { name: 'ease', type: 'select', default: 'power3.out', description: 'Animation easing', options: ['power1.out', 'power2.out', 'power3.out', 'back.out(1.7)', 'elastic.out'] },
        { name: 'splitType', type: 'select', default: 'chars', description: 'How to split the text', options: ['chars', 'words', 'lines'] },
        { name: 'fromY', type: 'range', default: 40, description: 'Initial Y offset', options: [-100, 100, 5] }
      ],
      defaultProps: { text: 'Hello, GSAP!', delay: 100, duration: 0.6, ease: 'power3.out', splitType: 'chars', fromY: 40 }
    },
    {
      id: 'blur-text',
      title: 'Blur Text',
      description: 'Text that animates in with a blur effect and smooth transitions',
      component: (props) => (
        <BlurText
          text={props.text || "Isn't this so cool?!"}
          delay={props.delay || 150}
          animateBy={props.animateBy || "words"}
          direction={props.direction || "top"}
          className="text-4xl font-bold text-white"
        />
      ),
      code: `import BlurText from "./BlurText";

<BlurText
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  className="text-2xl mb-8"
/>`,
      installation: 'npm i framer-motion',
      usage: `import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

<BlurText
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>`,
      customizationProps: [
        { name: 'text', type: 'string', default: "Isn't this so cool?!", description: 'The text to animate' },
        { name: 'delay', type: 'range', default: 150, description: 'Delay between animations (ms)', options: [0, 500, 10] },
        { name: 'animateBy', type: 'select', default: 'words', description: 'Animation unit', options: ['words', 'letters'] },
        { name: 'direction', type: 'select', default: 'top', description: 'Animation direction', options: ['top', 'bottom', 'left', 'right'] }
      ],
      defaultProps: { text: "Isn't this so cool?!", delay: 150, animateBy: 'words', direction: 'top' }
    },
    {
      id: 'circular-text',
      title: 'Circular Text',
      description: 'Text arranged in a circular pattern with rotation animation',
      component: (props) => (
        <div className="w-full h-48 flex items-center justify-center">
          <CircularText
            text={props.text || "REACT*BITS*COMPONENTS*"}
            onHover={props.onHover || "speedUp"}
            spinDuration={props.spinDuration || 20}
            className="text-white"
          />
        </div>
      ),
      code: `import CircularText from './CircularText';

<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,
      installation: 'npm i framer-motion',
      usage: `import CircularText from './CircularText';
  
<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,
      customizationProps: [
        { name: 'text', type: 'string', default: 'REACT*BITS*COMPONENTS*', description: 'The text to display in circle' },
        { name: 'spinDuration', type: 'range', default: 20, description: 'Rotation duration (seconds)', options: [5, 60, 1] },
        { name: 'onHover', type: 'select', default: 'speedUp', description: 'Hover behavior', options: ['speedUp', 'pause', 'reverse'] }
      ],
      defaultProps: { text: 'REACT*BITS*COMPONENTS*', spinDuration: 20, onHover: 'speedUp' }
    },
    {
      id: 'curved-loop',
      title: 'Curved Loop',
      description: 'Text following a curved path with smooth looping animation',
      component: (props) => (
        <div className="w-full h-48 flex items-center justify-center">
          <CurvedLoop 
            marqueeText={props.marqueeText || "CURVED ✦ LOOP ✦ ANIMATION ✦"}
            speed={props.speed || 2}
            curveAmount={props.curveAmount || 400}
            direction={props.direction || "right"}
            interactive={props.interactive ?? true}
            className="text-purple-400"
          />
        </div>
      ),
      code: `import CurvedLoop from './CurvedLoop';

<CurvedLoop 
  marqueeText="CURVED ✦ LOOP ✦ ANIMATION ✦"
  speed={2}
  curveAmount={400}
  direction="right"
  interactive={true}
/>`,
      usage: `import CurvedLoop from './CurvedLoop';

// Basic usage
<CurvedLoop marqueeText="Welcome to KauryUI ✦" />

// With custom props
<CurvedLoop 
  marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
  speed={3}
  curveAmount={500}
  direction="right"
  interactive={true}
  className="custom-text-style"
/>`,
      customizationProps: [
        { name: 'marqueeText', type: 'string', default: 'CURVED ✦ LOOP ✦ ANIMATION ✦', description: 'Text to display on the curve' },
        { name: 'speed', type: 'range', default: 2, description: 'Animation speed', options: [0.5, 5, 0.1] },
        { name: 'curveAmount', type: 'range', default: 400, description: 'Curve intensity', options: [100, 800, 10] },
        { name: 'direction', type: 'select', default: 'right', description: 'Animation direction', options: ['left', 'right'] },
        { name: 'interactive', type: 'boolean', default: true, description: 'Enable mouse interaction' }
      ],
      defaultProps: { marqueeText: 'CURVED ✦ LOOP ✦ ANIMATION ✦', speed: 2, curveAmount: 400, direction: 'right', interactive: true }
    },
    {
      id: 'fuzzy-text',
      title: 'Fuzzy Text',
      description: 'Text with a fuzzy, distorted effect that responds to interaction',
      component: (props) => (
        <FuzzyText 
          baseIntensity={props.baseIntensity || 0.2} 
          hoverIntensity={props.hoverIntensity || 0.8} 
          enableHover={props.enableHover ?? true}
        >
          <span className="text-4xl font-bold text-red-400">{props.text || "FUZZY"}</span>
        </FuzzyText>
      ),
      code: `import FuzzyText from './FuzzyText';
  
<FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={0.8} 
  enableHover={true}
>
  FUZZY TEXT
</FuzzyText>`,
      usage: `import FuzzyText from './FuzzyText';
  
<FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={hoverIntensity} 
  enableHover={enableHover}
>
  404
</FuzzyText>`,
      customizationProps: [
        { name: 'text', type: 'string', default: 'FUZZY', description: 'Text content' },
        { name: 'baseIntensity', type: 'range', default: 0.2, description: 'Base blur intensity', options: [0, 1, 0.1] },
        { name: 'hoverIntensity', type: 'range', default: 0.8, description: 'Hover blur intensity', options: [0, 2, 0.1] },
        { name: 'enableHover', type: 'boolean', default: true, description: 'Enable hover effect' }
      ],
      defaultProps: { text: 'FUZZY', baseIntensity: 0.2, hoverIntensity: 0.8, enableHover: true }
    },
    {
      id: 'shiny-text',
      title: 'Shiny Text',
      description: 'Elegant shine effect that sweeps across the text continuously',
      component: (props) => (
        <ShinyText
          text={props.text || "Just some shiny text!"}
          speed={props.speed || 3}
          disabled={props.disabled || false}
          className="text-4xl font-bold text-gray-300"
        />
      ),
      code: `import ShinyText from './ShinyText';
  
<ShinyText 
  text="Just some shiny text!" 
  disabled={false} 
  speed={3} 
  className='custom-class' 
/>`,
      usage: `import ShinyText from './ShinyText';
  
<ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />`,
      customizationProps: [
        { name: 'text', type: 'string', default: 'Just some shiny text!', description: 'Text to make shiny' },
        { name: 'speed', type: 'range', default: 3, description: 'Animation speed', options: [1, 10, 0.5] },
        { name: 'disabled', type: 'boolean', default: false, description: 'Disable animation' }
      ],
      defaultProps: { text: 'Just some shiny text!', speed: 3, disabled: false }
    }
  ];

  const selectedAnimationConfig = animations.find(a => a.id === selectedAnimation);

  if (!selectedAnimation || !selectedAnimationConfig) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Select a Text Animation</h2>
          <p className="text-gray-400">Choose an animation from the sidebar to see it in action</p>
        </div>
      </div>
    );
  }

  const currentProps = {
    ...selectedAnimationConfig.defaultProps,
    ...customProps[selectedAnimation]
  };

  return (
    <AnimationViewer
      title={selectedAnimationConfig.title}
      description={selectedAnimationConfig.description}
      component={selectedAnimationConfig.component(currentProps)}
      code={selectedAnimationConfig.code}
      installation={selectedAnimationConfig.installation}
      usage={selectedAnimationConfig.usage}
      customizationProps={selectedAnimationConfig.customizationProps}
      currentProps={currentProps}
      onPropsChange={(newProps) => {
        setCustomProps(prev => ({
          ...prev,
          [selectedAnimation]: newProps
        }));
      }}
    />
  );
};