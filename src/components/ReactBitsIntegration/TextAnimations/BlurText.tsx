import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getDirection = () => {
    switch (direction) {
      case 'top':
        return { y: -20 };
      case 'bottom':
        return { y: 20 };
      case 'left':
        return { x: -20 };
      case 'right':
        return { x: 20 };
      default:
        return { y: -20 };
    }
  };

  const variants: Variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      ...getDirection()
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      x: 0,
      y: 0
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: 0.1
      }
    }
  };

  const splitText = () => {
    if (animateBy === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={variants}
          className="inline-block mr-2"
          onAnimationComplete={index === text.split(' ').length - 1 ? onAnimationComplete : undefined}
        >
          {word}
        </motion.span>
      ));
    } else {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={variants}
          className="inline-block"
          onAnimationComplete={index === text.length - 1 ? onAnimationComplete : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {splitText()}
    </motion.div>
  );
};