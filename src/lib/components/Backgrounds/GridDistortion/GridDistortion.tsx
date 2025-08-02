import React, { useRef, useEffect } from 'react';
import './GridDistortion.css';

interface GridDistortionProps {
  className?: string;
}

export const GridDistortion: React.FC<GridDistortionProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      const gridSize = 40;
      const distortionStrength = 20;

      ctx.strokeStyle = 'rgba(0, 255, 150, 0.3)';
      ctx.lineWidth = 1;

      // Draw distorted grid
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 2) {
          const distortionX = Math.sin(y * 0.01 + time) * distortionStrength;
          const distortionY = Math.cos(x * 0.01 + time * 0.8) * distortionStrength * 0.5;
          
          if (y === 0) {
            ctx.moveTo(x + distortionX, y + distortionY);
          } else {
            ctx.lineTo(x + distortionX, y + distortionY);
          }
        }
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const distortionX = Math.sin(y * 0.01 + time) * distortionStrength * 0.5;
          const distortionY = Math.cos(x * 0.01 + time * 0.8) * distortionStrength;
          
          if (x === 0) {
            ctx.moveTo(x + distortionX, y + distortionY);
          } else {
            ctx.lineTo(x + distortionX, y + distortionY);
          }
        }
        ctx.stroke();
      }

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`distortion-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};