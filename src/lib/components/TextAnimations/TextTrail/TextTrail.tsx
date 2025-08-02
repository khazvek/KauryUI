import React, { useEffect, useRef } from 'react';
import './TextTrail.css';

interface TextTrailProps {
  text: string;
  fontFamily?: string;
  fontWeight?: string;
  noiseFactor?: number;
  noiseScale?: number;
  rgbPersistFactor?: number;
  alphaPersistFactor?: number;
  animateColor?: boolean;
  startColor?: string;
  textColor?: string;
  backgroundColor?: string;
  colorCycleInterval?: number;
  supersample?: number;
  className?: string;
}

export const TextTrail: React.FC<TextTrailProps> = ({
  text,
  fontFamily = 'Arial',
  fontWeight = 'bold',
  noiseFactor = 1,
  noiseScale = 0.001,
  rgbPersistFactor = 0.9,
  alphaPersistFactor = 0.8,
  animateColor = false,
  startColor = '#ff0000',
  textColor = '#ffffff',
  backgroundColor = '#000000',
  colorCycleInterval = 3000,
  supersample = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * supersample;
    canvas.height = rect.height * supersample;
    ctx.scale(supersample, supersample);

    // Set font
    ctx.font = `${fontWeight} 48px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let time = 0;
    let colorPhase = 0;

    const animate = () => {
      // Create trail effect
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `${backgroundColor}${Math.floor(alphaPersistFactor * 255).toString(16).padStart(2, '0')}`;
      ctx.fillRect(0, 0, canvas.width / supersample, canvas.height / supersample);

      // Draw text with trail
      ctx.globalCompositeOperation = 'lighter';
      
      if (animateColor) {
        colorPhase = (time / colorCycleInterval) % 1;
        const hue = colorPhase * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      } else {
        ctx.fillStyle = textColor;
      }

      // Add noise effect
      const offsetX = Math.sin(time * noiseScale) * noiseFactor;
      const offsetY = Math.cos(time * noiseScale * 1.3) * noiseFactor;

      ctx.fillText(
        text,
        (canvas.width / supersample) / 2 + offsetX,
        (canvas.height / supersample) / 2 + offsetY
      );

      time += 16; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, fontFamily, fontWeight, noiseFactor, noiseScale, rgbPersistFactor, alphaPersistFactor, animateColor, startColor, textColor, backgroundColor, colorCycleInterval, supersample]);

  return (
    <canvas
      ref={canvasRef}
      className={`text-trail ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};