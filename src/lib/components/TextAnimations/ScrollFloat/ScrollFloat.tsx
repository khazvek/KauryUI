import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: React.ReactNode;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  className?: string;
}

export const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  animationDuration = 1,
  ease = 'power2.out',
  scrollStart = 'top bottom',
  scrollEnd = 'bottom top',
  stagger = 0.1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.float-char');
    
    gsap.fromTo(chars, 
      {
        y: 100,
        opacity: 0,
        rotation: 10
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: animationDuration,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollStart,
          end: scrollEnd,
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger]);

  useEffect(() => {
    if (!containerRef.current) return;

    const text = containerRef.current.textContent || '';
    const chars = text.split('');
    
    containerRef.current.innerHTML = chars
      .map(char => `<span class="float-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
  }, [children]);

  return (
    <div ref={containerRef} className={`scroll-float ${className}`}>
      {children}
    </div>
  );
};