import React, { useRef, useEffect } from 'react';
import './Squares.css';

interface SquaresProps {
  className?: string;
}

export const Squares: React.FC<SquaresProps> = ({ className = '' }) => {
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
    const squares: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      speed: number;
      color: string;
    }> = [];

    // Initialize squares
    const gridSize = 60;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 6; y++) {
        squares.push({
          x: x * gridSize + gridSize / 2,
          y: y * gridSize + gridSize / 2,
          size: 20 + Math.random() * 20,
          rotation: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 1,
          color: `hsl(${(x + y) * 30}, 70%, 60%)`
        });
      }
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw squares
      squares.forEach((square, index) => {
        const wave = Math.sin(time * square.speed + index * 0.5);
        const currentSize = square.size + wave * 10;
        const currentRotation = square.rotation + time * 0.5;

        ctx.save();
        ctx.translate(square.x, square.y);
        ctx.rotate(currentRotation);
        
        ctx.fillStyle = square.color;
        ctx.globalAlpha = 0.7 + wave * 0.3;
        ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);
        
        ctx.restore();
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
    <div className={`squares-container ${className}`}>
      <canvas ref={canvasRef} className="squares-canvas" />
    </div>
  );
};