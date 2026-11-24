import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { EASE } from '../lib/utils';
import { useFinePointer, useReducedMotion } from '../lib/motion';

/**
 * Dot + trailing ring cursor. Desktop / fine pointers only, and never
 * for reduced-motion users. The native cursor is hidden only after this
 * mounts, so a JS failure still leaves a usable pointer.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.55 });

  useEffect(() => {
    if (!fine || reduced) return undefined;

    setActive(true);
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const hit = e.target.closest?.(
        'a, button, [data-cursor], input, select, textarea, label, [role="tab"]'
      );
      setHovering(Boolean(hit));
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-custom-cursor');
      setActive(false);
    };
  }, [fine, reduced, x, y]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0 -ml-[22px] -mt-[22px]"
      >
        <motion.div
          animate={{ scale: hovering ? 1.75 : 1, opacity: hovering ? 0.7 : 0.35 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="h-11 w-11 rounded-full border-[1.5px] border-accent"
        />
      </motion.div>

      {/* dot */}
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 -ml-[4px] -mt-[4px]"
      >
        <motion.div
          animate={{ scale: hovering ? 1.9 : 1 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_3px_rgba(250,246,236,0.65)]"
        />
      </motion.div>
    </div>
  );
}
