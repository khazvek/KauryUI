import React, { useState } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  baseIntensity?: number;
  hoverIntensity?: number;
  enableHover?: boolean;
  className?: string;
}

export const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  baseIntensity = 0,
  hoverIntensity = 0.5,
  enableHover = true,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentIntensity = enableHover && isHovered ? hoverIntensity : baseIntensity;
  
  const filterStyle = {
    filter: `blur(${currentIntensity * 2}px) contrast(${1 + currentIntensity}) saturate(${1 + currentIntensity * 0.5})`,
    transition: 'filter 0.3s ease',
    textShadow: currentIntensity > 0 ? `0 0 ${currentIntensity * 10}px currentColor` : 'none'
  };

  return (
    <span
      className={className}
      style={filterStyle}
      onMouseEnter={() => enableHover && setIsHovered(true)}
      onMouseLeave={() => enableHover && setIsHovered(false)}
    >
      {children}
    </span>
  );
};