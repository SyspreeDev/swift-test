import React, { createContext, useContext, useEffect } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';

interface MouseContextType {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export const useMouse = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMouse must be used within a MouseProvider');
  }
  return context;
};

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <MouseContext.Provider value={{ smoothX, smoothY }}>
      {children}
    </MouseContext.Provider>
  );
};