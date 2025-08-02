import React, { useRef, useEffect } from 'react';
import './Aurora.css';

interface AuroraProps {
  colors?: string[];
  speed?: number;
  intensity?: number;
  className?: string;
}

export const Aurora: React.FC<AuroraProps> = ({
  colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
  speed = 1,
  intensity = 0.8,
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

    // Aurora animation variables
    let time = 0;
    const waves: Array<{
      amplitude: number;
      frequency: number;
      phase: number;
      color: string;
      opacity: number;
    }> = [];

    // Initialize waves
    colors.forEach((color, index) => {
      waves.push({
        amplitude: 50 + Math.random() * 100,
        frequency: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        color: color,
        opacity: 0.3 + Math.random() * 0.4
      });
    });

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 1)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.8)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw aurora waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.globalCompositeOperation = 'screen';
        
        // Create wave path
        for (let x = 0; x <= width; x += 2) {
          const y1 = height * 0.3 + 
            Math.sin(x * wave.frequency + time * speed + wave.phase) * wave.amplitude * intensity +
            Math.sin(x * wave.frequency * 2 + time * speed * 1.5 + wave.phase) * wave.amplitude * 0.5 * intensity;
          
          const y2 = height * 0.7 + 
            Math.sin(x * wave.frequency * 1.5 + time * speed * 0.8 + wave.phase + Math.PI) * wave.amplitude * 0.8 * intensity;

          if (x === 0) {
            ctx.moveTo(x, y1);
          } else {
            ctx.lineTo(x, y1);
          }
        }

        // Complete the path to create a filled area
        for (let x = width; x >= 0; x -= 2) {
          const y2 = height * 0.7 + 
            Math.sin(x * wave.frequency * 1.5 + time * speed * 0.8 + wave.phase + Math.PI) * wave.amplitude * 0.8 * intensity;
          ctx.lineTo(x, y2);
        }

        ctx.closePath();

        // Create gradient for this wave
        const waveGradient = ctx.createLinearGradient(0, height * 0.2, 0, height * 0.8);
        const color = wave.color;
        waveGradient.addColorStop(0, color + '00');
        waveGradient.addColorStop(0.5, color + Math.floor(wave.opacity * 255).toString(16).padStart(2, '0'));
        waveGradient.addColorStop(1, color + '00');

        ctx.fillStyle = waveGradient;
        ctx.fill();

        // Add some blur effect
        ctx.filter = 'blur(2px)';
        ctx.fill();
        ctx.filter = 'none';
      });

      // Add sparkle effects
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = height * 0.2 + Math.random() * height * 0.6;
        const sparkleIntensity = Math.sin(time * speed * 2 + i) * 0.5 + 0.5;
        
        if (sparkleIntensity > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, 1 + sparkleIntensity * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${sparkleIntensity * 0.8})`;
          ctx.fill();
        }
      }

      time += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, intensity]);

  return (
    <div className={`aurora-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="aurora-canvas"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};