import React, { useRef, useEffect } from 'react';
import './Waves.css';

interface WavesProps {
  className?: string;
}

export const Waves: React.FC<WavesProps> = ({ className = '' }) => {
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

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(0.5, '#1e40af');
      gradient.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw multiple wave layers
      const waves = [
        { amplitude: 30, frequency: 0.02, speed: 1, color: 'rgba(59, 130, 246, 0.6)', offset: 0 },
        { amplitude: 25, frequency: 0.025, speed: 0.8, color: 'rgba(96, 165, 250, 0.5)', offset: height * 0.1 },
        { amplitude: 20, frequency: 0.03, speed: 1.2, color: 'rgba(147, 197, 253, 0.4)', offset: height * 0.2 }
      ];

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.fillStyle = wave.color;

        for (let x = 0; x <= width; x += 2) {
          const y = height * 0.6 + wave.offset + 
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * wave.amplitude * 0.5;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      });

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
    <div className={`waves-container ${className}`}>
      <canvas ref={canvasRef} className="waves-canvas" />
    </div>
  );
};