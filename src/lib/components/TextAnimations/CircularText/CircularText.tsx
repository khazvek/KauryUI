import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CircularText.css';

interface CircularTextProps {
  text: string;
  onHover?: 'pause' | 'speedUp' | 'reverse';
  spinDuration?: number;
  className?: string;
  radius?: number;
  fontSize?: string;
}

export const CircularText: React.FC<CircularTextProps> = ({
  text,
  onHover = 'speedUp',
  spinDuration = 20,
  className = '',
  radius = 80,
  fontSize = '16px'
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    const angleStep = 360 / chars.length;

    textRef.current.innerHTML = chars
      .map((char, i) => {
        const angle = i * angleStep;
        return `<span class="circular-char" style="
          transform: rotate(${angle}deg) translateY(-${radius}px);
          font-size: ${fontSize};
        ">${char}</span>`;
      })
      .join('');
  }, [text, radius, fontSize]);

  return (
    <motion.div
      ref={textRef}
      className={`circular-text ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: spinDuration,
        repeat: Infinity,
        ease: 'linear'
      }}
      whileHover={
        onHover === 'speedUp'
          ? { transition: { duration: spinDuration / 2 } }
          : onHover === 'pause'
          ? { rotate: 0, transition: { duration: 0.5 } }
          : { rotate: -360, transition: { duration: spinDuration, repeat: Infinity } }
      }
    />
  );
};