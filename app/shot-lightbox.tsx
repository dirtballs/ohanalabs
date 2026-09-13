'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import Image from 'next/image';
import { CaretLeft, CaretRight, MagnifyingGlassPlus, X } from '@phosphor-icons/react';

export type Shot = { src: string; alt: string };

type LightboxProps = {
  shots: Shot[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function Lightbox({ shots, index, onClose, onPrev, onNext }: LightboxProps) {
  const titleId = useId();
  const shot = shots[index];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  if (!shot) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss-950/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <p id={titleId} className="sr-only">
        {shot.alt}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[101] inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-abyss-900/80 text-sand-100 transition hover:border-tide-400 hover:text-tide-200"
        aria-label="Close"
      >
        <X size={22} weight="bold" />
      </button>

      {shots.length > 1 ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 top-1/2 z-[101] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-abyss-900/80 text-sand-100 transition hover:border-tide-400 hover:text-tide-200 sm:left-6"
            aria-label="Previous screenshot"
          >
            <CaretLeft size={22} weight="bold" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 top-1/2 z-[101] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-abyss-900/80 text-sand-100 transition hover:border-tide-400 hover:text-tide-200 sm:right-6"
            aria-label="Next screenshot"
          >
            <CaretRight size={22} weight="bold" />
          </button>
        </>
      ) : null}

      <figure
        className="relative flex max-h-[min(92dvh,920px)] w-full max-w-[min(92vw,420px)] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1206}
          height={2622}
          sizes="(min-width: 640px) 420px, 92vw"
          className="h-auto max-h-[min(84dvh,860px)] w-auto rounded-inner shadow-glow ring-1 ring-white/15"
          priority
        />
        <figcaption className="mt-4 max-w-sm text-center text-sm leading-6 text-sand-300">
          {shot.alt}
          {shots.length > 1 ? (
            <span className="mt-1 block text-xs text-sand-600">
              {index + 1} / {shots.length}
            </span>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}

export function useShotLightbox(shots: Shot[]) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => {
    setIndex((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
  }, [shots.length]);
  const next = useCallback(() => {
    setIndex((i) => (i === null ? i : (i + 1) % shots.length));
  }, [shots.length]);

  const portal =
    index !== null ? (
      <Lightbox shots={shots} index={index} onClose={close} onPrev={prev} onNext={next} />
    ) : null;

  return { open, portal };
}

/** Horizontal strip used on /jaderun — thumbs open a bigger lightbox. */
export function ShotGallery({
  shots,
  sizes = '(min-width: 1024px) 18vw, (min-width: 640px) 28vw, 42vw',
  width = 1206,
  height = 2622,
  showCaptions = true,
}: {
  shots: Shot[];
  sizes?: string;
  width?: number;
  height?: number;
  showCaptions?: boolean;
}) {
  const { open, portal } = useShotLightbox(shots);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shots.map((shot, i) => (
          <figure key={shot.src} className="w-[42%] shrink-0 sm:w-[28%] lg:w-[18%]">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-inner text-left transition active:scale-[0.98]"
              aria-label={`View larger: ${shot.alt}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={width}
                height={height}
                sizes={sizes}
                className="h-auto w-full rounded-inner shadow-lift ring-1 ring-white/10 transition group-hover:ring-tide-400/60"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 inline-flex size-8 items-center justify-center rounded-full bg-abyss-950/70 text-sand-100 opacity-90 ring-1 ring-white/15 backdrop-blur-sm transition group-hover:bg-tide-400 group-hover:text-abyss-950">
                <MagnifyingGlassPlus size={16} weight="bold" />
              </span>
            </button>
            {showCaptions ? (
              <figcaption className="mt-3 text-xs leading-5 text-sand-600">{shot.alt}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {portal}
    </>
  );
}

/** Clickable shot for stacks/grids — parent supplies layout classes. */
export function ShotThumb({
  shots,
  index,
  className,
  sizes,
  width = 1179,
  height = 2556,
  priority = false,
}: {
  shots: Shot[];
  index: number;
  className?: string;
  sizes: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const { open, portal } = useShotLightbox(shots);
  const shot = shots[index];
  if (!shot) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => open(index)}
        className={`group relative block overflow-hidden text-left transition active:scale-[0.98] ${className ?? ''}`}
        aria-label={`View larger: ${shot.alt}`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full rounded-inner shadow-lift ring-1 ring-white/10 transition group-hover:ring-tide-400/60"
        />
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex size-7 items-center justify-center rounded-full bg-abyss-950/70 text-sand-100 opacity-0 ring-1 ring-white/15 backdrop-blur-sm transition group-hover:opacity-100 sm:opacity-90">
          <MagnifyingGlassPlus size={14} weight="bold" />
        </span>
      </button>
      {portal}
    </>
  );
}
