import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './VariableProximity.css';

interface VariableProximityProps {
  label: string;
  className?: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  containerRef?: React.RefObject<HTMLElement> | null;
  radius?: number;
  falloff?: 'linear' | 'exponential';
}

export const VariableProximity: React.FC<VariableProximityProps> = ({
  label,
  className = '',
  fromFontVariationSettings = "'wght' 400",
  toFontVariationSettings = "'wght' 900",
  containerRef = null,
  radius = 100,
  falloff = 'exponential'
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const fontWeight = useMotionValue(400);
  const springWeight = useSpring(fontWeight, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return;

      const rect = textRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      let proximity = Math.max(0, 1 - distance / radius);
      
      if (falloff === 'exponential') {
        proximity = proximity * proximity;
      }

      // Interpolate font weight
      const minWeight = 400;
      const maxWeight = 900;
      const weight = minWeight + (maxWeight - minWeight) * proximity;
      fontWeight.set(weight);

      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const target = containerRef?.current || document;
    target.addEventListener('mousemove', handleMouseMove);

    return () => {
      target.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef, radius, falloff, fontWeight]);

  return (
    <motion.span
      ref={textRef}
      className={`variable-proximity ${className}`}
      style={{
        fontVariationSettings: springWeight.get() 
          ? `'wght' ${springWeight.get()}`
          : fromFontVariationSettings
      }}
    >
      {label}
    </motion.span>
  );
};