'use client';

import Image from 'next/image';
import type { AppData } from './apps/app-data';
import { ShotThumb, type Shot } from './shot-lightbox';

/** Screenshots when the app has them, the single preview frame when it
 *  does not. Every app in app-data currently has one or the other, so
 *  there is no third fallback branch to go stale. Shots open larger. */
export function AppVisual({ app }: { app: AppData }) {
  if (app.screenshotPaths.length > 0) {
    const shots: Shot[] = app.screenshotPaths.map((src, i) => ({
      src,
      alt: app.screenshotAlts?.[i] ?? `${app.name} screen ${i + 1}`,
    }));

    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {shots.map((shot, i) => (
          <ShotThumb
            key={shot.src}
            shots={shots}
            index={i}
            className={i === 1 ? 'sm:-translate-y-8' : ''}
            sizes="(min-width: 1024px) 16vw, 30vw"
            priority={i === 0}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[17rem]">
      <Image
        src={app.previewImageSrc as string}
        alt={app.previewImageAlt ?? `${app.name} on iPhone`}
        width={945}
        height={2048}
        priority
        sizes="(min-width: 1024px) 20vw, 60vw"
        className="h-auto w-full rounded-container shadow-glow ring-1 ring-white/10"
      />
    </div>
  );
}
