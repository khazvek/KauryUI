import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './ScrambledText.css';

interface ScrambledTextProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  trigger?: 'hover' | 'click' | 'auto';
}

export const ScrambledText: React.FC<ScrambledTextProps> = ({
  children,
  className = '',
  radius = 50,
  duration = 1,
  speed = 0.5,
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
  trigger = 'hover'
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [originalText, setOriginalText] = useState('');

  useEffect(() => {
    if (textRef.current) {
      setOriginalText(textRef.current.textContent || '');
    }
  }, [children]);

  const scrambleText = () => {
    if (!textRef.current || !originalText) return;

    const chars = originalText.split('');
    const timeline = gsap.timeline();

    // Scramble phase
    timeline.to(textRef.current, {
      duration: duration * speed,
      ease: 'power2.inOut',
      onUpdate: function() {
        const progress = this.progress();
        const scrambledText = chars.map((char, index) => {
          if (char === ' ') return ' ';
          if (Math.random() < progress) return char;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        
        if (textRef.current) {
          textRef.current.textContent = scrambledText;
        }
      }
    });

    // Reveal phase
    timeline.to(textRef.current, {
      duration: duration * (1 - speed),
      ease: 'power2.out',
      onUpdate: function() {
        const progress = this.progress();
        const revealedText = chars.map((char, index) => {
          if (char === ' ') return ' ';
          const charProgress = (progress * chars.length - index) / chars.length;
          return charProgress > 0 ? char : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }).join('');
        
        if (textRef.current) {
          textRef.current.textContent = revealedText;
        }
      },
      onComplete: () => {
        if (textRef.current) {
          textRef.current.textContent = originalText;
        }
      }
    });
  };

  const handleTrigger = () => {
    scrambleText();
  };

  useEffect(() => {
    if (trigger === 'auto') {
      scrambleText();
    }
  }, [trigger]);

  return (
    <div
      ref={textRef}
      className={`scrambled-text ${className}`}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
    >
      {children}
    </div>
  );
};