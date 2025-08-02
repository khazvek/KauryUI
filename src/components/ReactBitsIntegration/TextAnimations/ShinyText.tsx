import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 3,
  className = ''
}) => {
  const animationStyle = {
    animationDuration: `${speed}s`
  } as React.CSSProperties;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={!disabled ? animationStyle : {}}
    >
      {text}
    </span>
  );
};