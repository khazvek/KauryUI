import React, { useRef, useEffect } from 'react';
import './GridMotion.css';

interface GridMotionProps {
  className?: string;
}

export const GridMotion: React.FC<GridMotionProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create grid items
    const createGridItems = () => {
      container.innerHTML = '';
      
      for (let row = 0; row < 4; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        
        for (let col = 0; col < 7; col++) {
          const item = document.createElement('div');
          item.className = 'row__item';
          
          const inner = document.createElement('div');
          inner.className = 'row__item-inner';
          inner.style.background = `hsl(${(row * 7 + col) * 15}, 70%, 50%)`;
          inner.textContent = `${row * 7 + col + 1}`;
          
          item.appendChild(inner);
          rowDiv.appendChild(item);
        }
        
        container.appendChild(rowDiv);
      }
    };

    createGridItems();

    // Animate rows
    const animateRows = () => {
      const rows = container.querySelectorAll('.row');
      rows.forEach((row, index) => {
        const htmlRow = row as HTMLElement;
        const speed = 0.5 + index * 0.2;
        const direction = index % 2 === 0 ? 1 : -1;
        
        let position = 0;
        
        const animate = () => {
          position += speed * direction;
          htmlRow.style.transform = `translateX(${position}px)`;
          
          if (Math.abs(position) > 100) {
            position = 0;
          }
          
          requestAnimationFrame(animate);
        };
        
        animate();
      });
    };

    animateRows();
  }, []);

  return (
    <div className={`gridMotion-container ${className}`} ref={containerRef}>
      {/* Grid items will be created dynamically */}
    </div>
  );
};