'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { List, X } from '@phosphor-icons/react';
import { WaveMark } from './wave-mark';

const links = [
  { label: 'Apps', href: '/#apps' },
  { label: 'Jade Run', href: '/jaderun' },
  { label: 'Why Ohana', href: '/#ohana' },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Escape closes the sheet. Without this the only keyboard exit is
  // tabbing all the way to the close button.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-abyss-950/70 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <WaveMark className="w-6 text-tide-400" />
          <span className="text-[0.9375rem] font-semibold tracking-heading">Ohana Labs</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-sand-500 sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-sand-100">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:support@ohanalabs.app"
            className="hidden rounded-full bg-tide-400 px-4 py-2 text-sm font-semibold text-abyss-950 transition hover:bg-tide-200 active:scale-[0.98] sm:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-full text-sand-300 transition hover:bg-white/5 active:scale-95 sm:hidden"
          >
            <List size={20} />
          </button>
        </div>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.2 }}
          className="fixed inset-0 z-50 bg-abyss-950 p-5 sm:hidden"
        >
          <div className="flex h-16 items-center justify-between">
            <span className="flex items-center gap-2.5">
              <WaveMark className="w-6 text-tide-400" />
              <span className="text-[0.9375rem] font-semibold tracking-heading">Ohana Labs</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-full text-sand-300 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-6 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-5 text-2xl font-medium tracking-heading"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:support@ohanalabs.app"
              onClick={() => setOpen(false)}
              className="mt-8 rounded-full bg-tide-400 px-5 py-3.5 text-center text-sm font-semibold text-abyss-950"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
