import type { AppData } from './apps/app-data';

/* The App Store is the source of truth for "what version is out and when".
   app-data's latestVersion / latestReleaseDate go stale between site ships,
   so the homepage asks Apple's public lookup API on the server and caches
   the answer. Any failure (network, timeout, odd JSON) falls back to
   app-data, so this can never break the page. */

const REVALIDATE_SECONDS = 6 * 60 * 60;
const TIMEOUT_MS = 4000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type LatestRelease = {
  slug: string;
  version: string;
  /** Calendar date in Pacific time, YYYY-MM-DD. */
  releaseDate: string;
  /** Strip title, only when app-data's headline matches this version. */
  headline?: string;
  source: 'app-store' | 'app-data';
};

const appStoreId = (url?: string) => url?.match(/\/id(\d+)/)?.[1];

/** Apple returns UTC instants; the studio dates releases in Pacific time. */
function pacificDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

async function lookup(ids: string[]) {
  const found = new Map<string, { version: string; releaseDate: string }>();
  if (ids.length === 0) return found;
  try {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${ids.join(',')}&country=us`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return found;
    const body = (await res.json()) as { results?: Array<Record<string, unknown>> };
    for (const r of body.results ?? []) {
      const id = String(r.trackId ?? '');
      const version = typeof r.version === 'string' ? r.version.trim() : '';
      const date =
        typeof r.currentVersionReleaseDate === 'string' ? pacificDate(r.currentVersionReleaseDate) : undefined;
      if (id && /^\d+(\.\d+)*$/.test(version) && date) found.set(id, { version, releaseDate: date });
    }
  } catch {
    // Fall back to app-data below.
  }
  return found;
}

/** Latest release for every live app, keyed by slug. Never throws. */
export async function getLatestReleases(apps: AppData[]): Promise<Record<string, LatestRelease>> {
  const live = apps.filter((a) => a.releaseStage === 'app-store');
  const store = await lookup(live.map((a) => appStoreId(a.appStoreUrl)).filter((id): id is string => !!id));
  const out: Record<string, LatestRelease> = {};
  for (const a of live) {
    const hit = store.get(appStoreId(a.appStoreUrl) ?? '');
    const version = hit?.version ?? a.latestVersion;
    const releaseDate = hit?.releaseDate ?? a.latestReleaseDate;
    if (!version || !releaseDate) continue;
    out[a.slug] = {
      slug: a.slug,
      version,
      releaseDate,
      headline: a.latestHeadline && a.latestVersion === version ? a.latestHeadline : undefined,
      source: hit ? 'app-store' : 'app-data',
    };
  }
  return out;
}

/** "Nov 10, 2026" from YYYY-MM-DD, read as a plain calendar date. */
export function formatReleaseDate(ymd: string) {
  const d = new Date(`${ymd}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return ymd;
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' }).format(d);
}

/** Releases from the last 14 days, newest first. */
export function recentFromLatest(latest: Record<string, LatestRelease>, now: Date = new Date()) {
  return Object.values(latest)
    .filter((r) => now.getTime() - new Date(`${r.releaseDate}T00:00:00Z`).getTime() <= 14 * DAY_MS)
    .sort((x, y) => y.releaseDate.localeCompare(x.releaseDate));
}
