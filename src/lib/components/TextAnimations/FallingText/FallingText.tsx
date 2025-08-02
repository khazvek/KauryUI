import React, { useEffect, useRef, useState } from 'react';
import './FallingText.css';

interface FallingTextProps {
  text: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: 'hover' | 'click' | 'auto';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
  mouseConstraintStiffness?: number;
  className?: string;
}

export const FallingText: React.FC<FallingTextProps> = ({
  text,
  highlightWords = [],
  highlightClass = 'highlight',
  trigger = 'hover',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.8,
  fontSize = '1rem',
  mouseConstraintStiffness = 0.8,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const processText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const isHighlighted = highlightWords.includes(word);
      return (
        <span
          key={index}
          className={`falling-word ${isHighlighted ? highlightClass : ''} ${isActive ? 'active' : ''}`}
          style={{ 
            fontSize,
            animationDelay: `${index * 0.1}s`,
            '--gravity': gravity,
            '--stiffness': mouseConstraintStiffness
          } as React.CSSProperties}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      );
    });
  };

  const handleTrigger = () => {
    if (trigger === 'hover' || trigger === 'click') {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    if (trigger === 'auto') {
      setIsActive(true);
    }
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      style={{ backgroundColor }}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
      onMouseLeave={trigger === 'hover' ? () => setIsActive(false) : undefined}
      onClick={trigger === 'click' ? handleTrigger : undefined}
    >
      <div className="falling-text">
        {processText(text)}
      </div>
    </div>
  );
};