import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TrueFocus.css';

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  manualMode = false,
  blurAmount = 3,
  borderColor = '#ffffff',
  animationDuration = 2,
  pauseBetweenAnimations = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedWordIndex, setFocusedWordIndex] = useState(-1);
  const words = sentence.split(' ');

  useEffect(() => {
    if (manualMode) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setFocusedWordIndex(currentIndex);
      currentIndex = (currentIndex + 1) % (words.length + 1);
      
      if (currentIndex === 0) {
        setFocusedWordIndex(-1);
        setTimeout(() => {}, pauseBetweenAnimations * 1000);
      }
    }, animationDuration * 1000);

    return () => clearInterval(interval);
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  return (
    <div ref={containerRef} className={`true-focus-container ${className}`}>
      <div className="focus-text">
        {words.map((word, index) => (
          <span key={index} className="focus-word-wrapper">
            <motion.span
              className={`focus-word ${index === focusedWordIndex ? 'focused' : ''}`}
              style={{
                filter: index === focusedWordIndex ? 'blur(0px)' : `blur(${blurAmount}px)`,
                position: 'relative'
              }}
              animate={{
                filter: index === focusedWordIndex ? 'blur(0px)' : `blur(${blurAmount}px)`
              }}
              transition={{ duration: 0.3 }}
            >
              {word}
              {index === focusedWordIndex && (
                <motion.div
                  className="focus-border"
                  style={{ borderColor }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.span>
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </div>
    </div>
  );
};