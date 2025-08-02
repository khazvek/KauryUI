import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ASCIIText/ASCIIText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/ASCIIText/ASCIIText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ASCIIText/ASCIIText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ASCIIText/ASCIIText.tsx?raw';

export const asciiText = {
  ...(generateCliCommands('TextAnimations/ASCIIText')),
  installation: `npm i three`,
  usage: `import ASCIIText from './ASCIIText';

<ASCIIText
  text='hello_world'
  enableWaves={true}
  asciiFontSize={8}
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind,
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/BlurText/BlurText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/BlurText/BlurText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/BlurText/BlurText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/BlurText/BlurText.tsx?raw';

export const blurText = {
  ...(generateCliCommands('TextAnimations/BlurText')),
  installation: `npm i framer-motion`,
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
  code,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/CircularText/CircularText.jsx?raw';
import css from '@content/TextAnimations/CircularText/CircularText.css?raw';
import tailwind from '@tailwind/TextAnimations/CircularText/CircularText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/CircularText/CircularText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/CircularText/CircularText.tsx?raw';

export const circularText = {
  ...(generateCliCommands('TextAnimations/CircularText')),
  installation: `npm i framer-motion`,
  usage: `import CircularText from './CircularText';
  
<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/CountUp/CountUp.jsx?raw';
import tailwind from '@tailwind/TextAnimations/CountUp/CountUp.jsx?raw';
import tsCode from '@ts-default/TextAnimations/CountUp/CountUp.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/CountUp/CountUp.tsx?raw';

export const countup = {
  ...(generateCliCommands('TextAnimations/CountUp')),
  installation: `npm i framer-motion`,
  usage: `import CountUp from './CountUp'

<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/CurvedLoop/CurvedLoop.jsx?raw';
import css from '@content/TextAnimations/CurvedLoop/CurvedLoop.css?raw';
import tailwind from '@tailwind/TextAnimations/CurvedLoop/CurvedLoop.jsx?raw';
import tsCode from '@ts-default/TextAnimations/CurvedLoop/CurvedLoop.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/CurvedLoop/CurvedLoop.tsx?raw';

export const curvedLoop = {
  ...(generateCliCommands('TextAnimations/CurvedLoop')),
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
/>

// Non-interactive with slower speed
<CurvedLoop 
  marqueeText="Smooth Curved Animation"
  speed={1}
  curveAmount={300}
  interactive={false}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/DecryptedText/DecryptedText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/DecryptedText/DecryptedText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/DecryptedText/DecryptedText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/DecryptedText/DecryptedText.tsx?raw';

export const decryptedText = {
  ...(generateCliCommands('TextAnimations/DecryptedText')),
  installation: `npm i framer-motion`,
  usage: `import DecryptedText from './DecryptedText';

{/* Example 1: Defaults (hover to decrypt) */}
<DecryptedText text="Hover me!" />

{/* Example 2: Customized speed and characters */}
<DecryptedText
text="Customize me"
speed={100}
maxIterations={20}
characters="ABCD1234!?"
className="revealed"
parentClassName="all-letters"
encryptedClassName="encrypted"
/>

{/* Example 3: Animate on view (runs once) */}
<div style={{ marginTop: '4rem' }}>
<DecryptedText
  text="This text animates when in view"
  animateOn="view"
  revealDirection="center"
/>
</div>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/FallingText/FallingText.jsx?raw';
import css from '@content/TextAnimations/FallingText/FallingText.css?raw';
import tailwind from '@tailwind/TextAnimations/FallingText/FallingText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/FallingText/FallingText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/FallingText/FallingText.tsx?raw';

export const fallingText = {
  ...(generateCliCommands('TextAnimations/FallingText')),
  installation: `npm i matter-js

  //TS only
  npm i -D @types/matter-js`,
  usage: `import FallingText from './FallingText';
  
<FallingText
  text={\`KauryUI is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.\`}
  highlightWords={["React", "Bits", "animated", "components", "simplify"]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/FuzzyText/FuzzyText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/FuzzyText/FuzzyText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/FuzzyText/FuzzyText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/FuzzyText/FuzzyText.tsx?raw';

export const fuzzyText = {
  ...(generateCliCommands('TextAnimations/FuzzyText')),
  usage: `import FuzzyText from './FuzzyText';
  
<FuzzyText 
  baseIntensity={0.2} 
  hoverIntensity={hoverIntensity} 
  enableHover={enableHover}
>
  404
</FuzzyText>`,
  code,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/GlitchText/GlitchText.jsx?raw';
import css from '@content/TextAnimations/GlitchText/GlitchText.css?raw';
import tailwind from '@tailwind/TextAnimations/GlitchText/GlitchText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/GlitchText/GlitchText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/GlitchText/GlitchText.tsx?raw';

export const glitchText = {
  ...(generateCliCommands('TextAnimations/GlitchText')),
  usage: `import GlitchText from './GlitchText';
  
<GlitchText
  speed={1}
  enableShadows={true}
  enableOnHover={true}
  className='custom-class'
>
  KauryUI
</GlitchText>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/GradientText/GradientText.jsx?raw';
import css from '@content/TextAnimations/GradientText/GradientText.css?raw';
import tailwind from '@tailwind/TextAnimations/GradientText/GradientText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/GradientText/GradientText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/GradientText/GradientText.tsx?raw';


export const gradientText = {
  ...(generateCliCommands('TextAnimations/GradientText')),
  usage: `import GradientText from './GradientText'
  
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</GradientText>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}
import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/RotatingText/RotatingText.jsx?raw';
import css from '@content/TextAnimations/RotatingText/RotatingText.css?raw';
import tailwind from '@tailwind/TextAnimations/RotatingText/RotatingText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/RotatingText/RotatingText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/RotatingText/RotatingText.tsx?raw';


export const rotatingText = {
  ...(generateCliCommands('TextAnimations/RotatingText')),
  installation: `npm i framer-motion`,
  usage: `import RotatingText from './RotatingText'
  
<RotatingText
  texts={['React', 'Bits', 'Is', 'Cool!']}
  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ScrambledText/ScrambledText.jsx?raw';
import css from '@content/TextAnimations/ScrambledText/ScrambledText.css?raw';
import tailwind from '@tailwind/TextAnimations/ScrambledText/ScrambledText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ScrambledText/ScrambledText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ScrambledText/ScrambledText.tsx?raw';

export const scrambledTextCode = {
  ...(generateCliCommands('TextAnimations/ScrambledText')),
  installation: `npm i gsap`,
  usage: `// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

import ScrambledText from './ScrambledText';
  
<ScrambledText
  className="scrambled-text-demo"
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars={.:}
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Similique pariatur dignissimos porro eius quam doloremque 
  et enim velit nobis maxime.
</ScrambledText>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}
import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ScrollFloat/ScrollFloat.jsx?raw';
import css from '@content/TextAnimations/ScrollFloat/ScrollFloat.css?raw';
import tailwind from '@tailwind/TextAnimations/ScrollFloat/ScrollFloat.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ScrollFloat/ScrollFloat.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ScrollFloat/ScrollFloat.tsx?raw';

export const scrollFloat = {
  ...(generateCliCommands('TextAnimations/ScrollFloat')),
  installation: `npm i gsap`,
  usage: `import ScrollFloat from './ScrollFloat';

<ScrollFloat
  animationDuration={1}
  ease='back.inOut(2)'
  scrollStart='center bottom+=50%'
  scrollEnd='bottom bottom-=40%'
  stagger={0.03}
>
  KauryUI
</ScrollFloat>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ScrollReveal/ScrollReveal.jsx?raw';
import css from '@content/TextAnimations/ScrollReveal/ScrollReveal.css?raw';
import tailwind from '@tailwind/TextAnimations/ScrollReveal/ScrollReveal.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ScrollReveal/ScrollReveal.tsx?raw';

export const scrollReveal = {
  ...(generateCliCommands('TextAnimations/ScrollReveal')),
  installation: `npm i gsap`,
  usage: `import ScrollReveal from './ScrollReveal';

<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</ScrollReveal>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ScrollVelocity/ScrollVelocity.jsx?raw';
import css from '@content/TextAnimations/ScrollVelocity/ScrollVelocity.css?raw';
import tailwind from '@tailwind/TextAnimations/ScrollVelocity/ScrollVelocity.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ScrollVelocity/ScrollVelocity.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ScrollVelocity/ScrollVelocity.tsx?raw';

export const scrollVelocity = {
  ...(generateCliCommands('TextAnimations/ScrollVelocity')),
  installation: `npm i framer-motion`,
  usage: `import ScrollVelocity from './ScrollVelocity';
  
<ScrollVelocity
  texts={['KauryUI', 'Scroll Down']} 
  velocity={velocity} 
  className="custom-scroll-text"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/ShinyText/ShinyText.jsx?raw';
import css from '@content/TextAnimations/ShinyText/ShinyText.css?raw';
import tailwind from '@tailwind/TextAnimations/ShinyText/ShinyText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ShinyText/ShinyText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ShinyText/ShinyText.tsx?raw';

export const shinyText = {
  ...(generateCliCommands('TextAnimations/ShinyText')),
  usage: `import ShinyText from './ShinyText';
  
<ShinyText text="Just some shiny text!" disabled={false} speed={3} className='custom-class' />`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

// Fun fact: this is the first component ever made for KauryUI!

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/SplitText/SplitText.jsx?raw';
import tailwind from '@tailwind/TextAnimations/SplitText/SplitText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SplitText/SplitText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SplitText/SplitText.tsx?raw';

export const splitText = {
  ...(generateCliCommands('TextAnimations/SplitText')),
  installation: `npm install gsap`,
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
  code,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/TextCursor/TextCursor.jsx?raw';
import css from '@content/TextAnimations/TextCursor/TextCursor.css?raw';
import tailwind from '@tailwind/TextAnimations/TextCursor/TextCursor.jsx?raw';
import tsCode from '@ts-default/TextAnimations/TextCursor/TextCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/TextCursor/TextCursor.tsx?raw';

export const textCursor = {
  ...(generateCliCommands('TextAnimations/TextCursor')),
  installation: `npm i framer-motion`,
  usage: `import TextCursor from './TextCursor';

<TextCursor
  text="Hello!"
  delay={0.01}
  spacing={80}
  followMouseDirection={true}
  randomFloat={true}
  exitDuration={0.3}
  removalInterval={20}
  maxPoints={10}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/TextTrail/TextTrail.jsx?raw';
import css from '@content/TextAnimations/TextTrail/TextTrail.css?raw';
import tailwind from '@tailwind/TextAnimations/TextTrail/TextTrail.jsx?raw';
import tsCode from '@ts-default/TextAnimations/TextTrail/TextTrail.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/TextTrail/TextTrail.tsx?raw';

export const textTrail = {
  ...(generateCliCommands('TextAnimations/TextTrail')),
  installation: `npm i three`,
  usage: `import TextTrail from './TextTrail';

// Basic usage
<TextTrail text="Hello World" />

// Usage with all props
<TextTrail 
  text="KauryUI"
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

// With animated color cycling
<TextTrail 
  text="Colorful"
  animateColor={true}
  colorCycleInterval={1500}
  noiseFactor={1.5}
  noiseScale={0.002}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}

import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/TrueFocus/TrueFocus.jsx?raw';
import css from '@content/TextAnimations/TrueFocus/TrueFocus.css?raw';
import tailwind from '@tailwind/TextAnimations/TrueFocus/TrueFocus.jsx?raw';
import tsCode from '@ts-default/TextAnimations/TrueFocus/TrueFocus.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/TrueFocus/TrueFocus.tsx?raw';

export const trueFocus = {
  ...(generateCliCommands('TextAnimations/TrueFocus')),
  installation: `npm i framer-motion`,
  usage: `import TrueFocus from './TrueFocus';

<TrueFocus 
sentence="True Focus"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}
import { generateCliCommands } from '@/utils/utils';

import code from '@content/TextAnimations/VariableProximity/VariableProximity.jsx?raw';
import css from '@content/TextAnimations/VariableProximity/VariableProximity.css?raw';
import tailwind from '@tailwind/TextAnimations/VariableProximity/VariableProximity.jsx?raw';
import tsCode from '@ts-default/TextAnimations/VariableProximity/VariableProximity.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/VariableProximity/VariableProximity.tsx?raw';

export const variableProximity = {
  ...(generateCliCommands('TextAnimations/VariableProximity')),
  installation: `npm i framer-motion`,
  usage: `import { useRef } from 'react';
import VariableProximity from './VariableProximity';

const containerRef = useRef(null);

<div
ref={containerRef}
style={{position: 'relative'}}
>
  <VariableProximity
    label={'Hover me! And then star KauryUI on GitHub, or else...'}
    className={'variable-proximity-demo'}
    fromFontVariationSettings="'wght' 400, 'opsz' 9"
    toFontVariationSettings="'wght' 1000, 'opsz' 40"
    containerRef={containerRef}
    radius={100}
    falloff='linear'
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
}