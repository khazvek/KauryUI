import React from 'react';
import './GradientText.css';

interface GradientTextProps {
  children: React.ReactNode;
  colors: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors,
  animationSpeed = 3,
  showBorder = false,
  className = ''
}) => {
  const gradientStyle = {
    '--gradient-colors': colors.join(', '),
    '--animation-speed': `${animationSpeed}s`,
    '--border-display': showBorder ? 'block' : 'none'
  } as React.CSSProperties;

  return (
    <span 
      className={`gradient-text ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
};