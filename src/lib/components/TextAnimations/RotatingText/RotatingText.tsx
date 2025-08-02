import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingText.css';

interface RotatingTextProps {
  texts: string[];
  mainClassName?: string;
  staggerFrom?: 'first' | 'last' | 'center';
  initial?: any;
  animate?: any;
  exit?: any;
  staggerDuration?: number;
  splitLevelClassName?: string;
  transition?: any;
  rotationInterval?: number;
}

export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = '',
  staggerFrom = 'first',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
  staggerDuration = 0.05,
  splitLevelClassName = '',
  transition = { duration: 0.5 },
  rotationInterval = 2000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  const chars = currentText.split('');

  return (
    <div className={`rotating-text ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={splitLevelClassName}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: staggerDuration,
                staggerDirection: staggerFrom === 'last' ? -1 : 1
              }
            },
            exit: {
              transition: {
                staggerChildren: staggerDuration / 2,
                staggerDirection: staggerFrom === 'last' ? 1 : -1
              }
            }
          }}
        >
          {chars.map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: initial,
                visible: animate,
                exit: exit
              }}
              transition={transition}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};