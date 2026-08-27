'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Scroll reveal. Motivation: sequence. The page tells a story in order
 * (who we are, what shipped, what is coming, why), and revealing each
 * beat as it arrives matches that reading order instead of dumping the
 * whole page at once.
 *
 * `initial` is deliberately NOT gated on useReducedMotion. That hook
 * returns false during SSR and true on the client for anyone with the OS
 * setting on, so gating `initial` made the server and client markup
 * disagree and React logged a hydration mismatch. Only `transition`
 * varies, which never reaches the server-rendered DOM. Reduced-motion
 * users are additionally covered by the CSS override in globals.css,
 * which forces these elements visible regardless of scroll position.
 */
const from = { opacity: 0, y: 22 };
const to = { opacity: 1, y: 0 };
const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for sibling items that should cascade in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: reduce ? 0 : stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: from,
        shown: { ...to, transition: reduce ? { duration: 0 } : { duration: 0.6, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
