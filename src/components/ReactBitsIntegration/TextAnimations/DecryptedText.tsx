import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  animateOn?: 'hover' | 'view' | 'load';
  revealDirection?: 'start' | 'center' | 'end';
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  animateOn = 'hover',
  revealDirection = 'start',
  className = '',
  parentClassName = '',
  encryptedClassName = ''
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const getRandomChar = () => {
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const decrypt = () => {
    if (isAnimating || (animateOn === 'view' && hasAnimated)) return;
    
    setIsAnimating(true);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            let revealIndex: number;
            
            switch (revealDirection) {
              case 'center':
                const center = Math.floor(text.length / 2);
                revealIndex = Math.abs(index - center);
                break;
              case 'end':
                revealIndex = text.length - 1 - index;
                break;
              default: // 'start'
                revealIndex = index;
            }

            if (revealIndex < iteration) {
              return char;
            }
            return getRandomChar();
          })
          .join('')
      );

      if (iteration >= text.length + maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
        setIsAnimating(false);
        if (animateOn === 'view') {
          setHasAnimated(true);
        }
      }

      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'load') {
      decrypt();
    } else if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            decrypt();
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animateOn, hasAnimated]);

  const handleInteraction = () => {
    if (animateOn === 'hover') {
      decrypt();
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${parentClassName} ${isAnimating ? encryptedClassName : ''}`}
      onMouseEnter={handleInteraction}
      style={{ cursor: animateOn === 'hover' ? 'pointer' : 'default' }}
    >
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {displayText}
      </motion.span>
    </div>
  );
};