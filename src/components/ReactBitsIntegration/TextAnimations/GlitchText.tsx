import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: React.ReactNode;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = ''
}) => {
  const [isGlitching, setIsGlitching] = useState(!enableOnHover);

  useEffect(() => {
    if (!enableOnHover) {
      setIsGlitching(true);
    }
  }, [enableOnHover]);

  const glitchStyle = {
    '--after-duration': `${3 / speed}s`,
    '--before-duration': `${2 / speed}s`,
    '--after-shadow': enableShadows ? '-10px 0 red' : 'none',
    '--before-shadow': enableShadows ? '10px 0 cyan' : 'none'
  } as React.CSSProperties;

  return (
    <div
      className={`glitch ${enableOnHover ? 'enable-on-hover' : ''} ${className}`}
      data-text={children}
      style={glitchStyle}
      onMouseEnter={() => enableOnHover && setIsGlitching(true)}
      onMouseLeave={() => enableOnHover && setIsGlitching(false)}
    >
      {children}
    </div>
  );
};