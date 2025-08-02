import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: Record<string, any>;
  to?: Record<string, any>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasAnimated.current) return;

    // Split text into elements based on splitType
    const splitText = () => {
      const textContent = text;
      let elements: HTMLElement[] = [];

      if (splitType === 'chars') {
        // Split by characters
        const chars = textContent.split('');
        container.innerHTML = '';
        
        chars.forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.transformOrigin = 'center bottom';
          container.appendChild(span);
          elements.push(span);
        });
      } else if (splitType === 'words') {
        // Split by words
        const words = textContent.split(' ');
        container.innerHTML = '';
        
        words.forEach((word, index) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.transformOrigin = 'center bottom';
          span.style.marginRight = '0.25em';
          container.appendChild(span);
          elements.push(span);
        });
      } else if (splitType === 'lines') {
        // Split by lines (simplified - assumes line breaks in text)
        const lines = textContent.split('\n');
        container.innerHTML = '';
        
        lines.forEach((line, index) => {
          const div = document.createElement('div');
          div.textContent = line;
          div.style.transformOrigin = 'center bottom';
          container.appendChild(div);
          elements.push(div);
        });
      }

      return elements;
    };

    // Animation function
    const animateElements = () => {
      const elements = splitText();
      
      // Set initial state
      gsap.set(elements, from);

      // Create timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }
      });

      // Animate elements with stagger
      tl.to(elements, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
      });

      hasAnimated.current = true;
    };

    // Intersection Observer for scroll-triggered animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            animateElements();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className={`split-text ${className}`}
      style={{ textAlign }}
    >
      {text}
    </div>
  );
};