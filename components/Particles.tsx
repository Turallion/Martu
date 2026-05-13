'use client';

import { motion } from 'framer-motion';

const items = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: (i % 9) * 0.55,
  size: 12 + (i % 5) * 5,
  char: i % 4 === 0 ? '✦' : i % 3 === 0 ? '♡' : '♥',
}));

export default function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-pink-300/55 drop-shadow-[0_0_12px_rgba(244,114,182,.75)]"
          style={{ left: p.left, bottom: -40, fontSize: p.size }}
          animate={{ y: ['0vh', '-112vh'], x: [0, p.id % 2 ? 28 : -22, 0], opacity: [0, .72, 0], rotate: [0, 16, -12] }}
          transition={{ duration: 10 + (p.id % 6), delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}
