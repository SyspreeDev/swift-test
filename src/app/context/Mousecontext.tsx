/**
 * MouseContext — single shared mouse position for the whole app.
 *
 * Previously each component (AnimatedOrnament, FloatingOrnament,
 * BackgroundAnimations, InteractiveDecorations) attached its OWN
 * window mousemove listener causing 4+ simultaneous setState cascades.
 *
 * This context attaches ONE listener, capped to 60 fps via RAF,
 * and exposes Framer Motion MotionValues so consumers derive
 * transforms without triggering any React re-renders.
 */
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';

interface MouseContextValue {
  rawX:    MotionValue<number>;
  rawY:    MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

const MouseContext = createContext<MouseContextValue | null>(null);
const SPRING = { damping: 25, stiffness: 100 };

export function MouseProvider({ children }: { children: ReactNode }) {
  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const smoothX = useSpring(rawX, SPRING);
  const smoothY = useSpring(rawY, SPRING);

  useEffect(() => {
    let rafId: number | null = null;
    let pX = 0, pY = 0;

    const onMove = (e: MouseEvent) => {
      pX = e.clientX; pY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rawX.set(pX); rawY.set(pY);
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [rawX, rawY]);

  return (
    <MouseContext.Provider value={{ rawX, rawY, smoothX, smoothY }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse(): MouseContextValue {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error('useMouse must be used inside <MouseProvider>');
  return ctx;
}