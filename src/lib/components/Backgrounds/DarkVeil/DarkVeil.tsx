import React from 'react';
import './DarkVeil.css';

interface DarkVeilProps {
  className?: string;
}

export const DarkVeil: React.FC<DarkVeilProps> = ({ className = '' }) => {
  return (
    <div className={`darkveil-container ${className}`} style={{
      background: 'radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 119, 198, 0.2) 0%, transparent 50%), linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      width: '100%',
      height: '100%'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        animation: 'float 20s ease-in-out infinite'
      }} />
    </div>
  );
};