import React, { useRef, useEffect } from 'react';
import './Orb.css';

interface OrbProps {
  className?: string;
}

export const Orb: React.FC<OrbProps> = ({ className = '' }) => {
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

      // Dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Orb position
      const orbX = width / 2 + Math.sin(time * 0.5) * 100;
      const orbY = height / 2 + Math.cos(time * 0.3) * 50;
      const orbSize = 60 + Math.sin(time) * 20;

      // Create radial gradient for orb
      const gradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbSize);
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
      gradient.addColorStop(0.3, 'rgba(50, 150, 255, 0.6)');
      gradient.addColorStop(0.7, 'rgba(0, 100, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 50, 255, 0)');

      // Draw orb
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = 'rgba(100, 200, 255, 0.5)';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      time += 0.016;
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
    <div className={`orb-container ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};