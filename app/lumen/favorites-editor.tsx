'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, X } from '@phosphor-icons/react';
import {
  cloudKit,
  loadChannelIndex,
  loadFavorites,
  saveFavorites,
  type Channel,
  type CloudKitDatabase,
} from './cloudkit';

type Status = 'loading' | 'signed-out' | 'ready' | 'error';

export function FavoritesEditor({ apiToken }: { apiToken: string }) {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState<string | null>(null);
  const [db, setDb] = useState<CloudKitDatabase | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!apiToken) {
      setStatus('error');
      setMessage('This page is not configured with a CloudKit API token yet.');
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        const container = await cloudKit(apiToken);
        const identity = await container.setUpAuth();
        if (cancelled) return;
        if (!identity) {
          setStatus('signed-out');
          return;
        }
        const database = container.privateCloudDatabase;
        const [index, favs] = await Promise.all([
          loadChannelIndex(database),
          loadFavorites(database),
        ]);
        if (cancelled) return;
        setDb(database);
        setChannels(index);
        setFavorites(favs);
        setStatus('ready');
        if (index.length === 0) {
          setMessage('No channel list found yet. Open Lumen on your Apple TV once so it can publish one.');
        }
      } catch (error) {
        if (cancelled) return;
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Could not reach iCloud.');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiToken]);

  const byID = useMemo(() => new Map(channels.map((c) => [c.id, c])), [channels]);

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return [];
    const chosen = new Set(favorites);
    return channels
      .filter((c) => !chosen.has(c.id) && c.name.toLowerCase().includes(term))
      .slice(0, 8);
  }, [search, channels, favorites]);

  const move = useCallback((index: number, delta: number) => {
    setFavorites((current) => {
      const target = index + delta;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
    setDirty(true);
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((current) => current.filter((f) => f !== id));
    setDirty(true);
  }, []);

  const add = useCallback((id: string) => {
    setFavorites((current) => (current.includes(id) ? current : [...current, id]));
    setSearch('');
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    if (!db) return;
    setSaving(true);
    setMessage(null);
    try {
      await saveFavorites(db, favorites);
      setDirty(false);
      setMessage('Saved. Your Apple TV will pick this up next time Lumen syncs.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  }, [db, favorites]);

  if (status === 'loading') {
    return <p className="text-sm text-sand-500">Connecting to iCloud…</p>;
  }

  if (status === 'signed-out') {
    return (
      <div className="rounded-2xl border border-abyss-700 bg-abyss-900 p-6">
        <p className="text-sm text-sand-300">
          Sign in with the same Apple Account you use on your Apple TV. Ohana Labs never sees your
          credentials or your channel list — the browser talks to iCloud directly.
        </p>
        {/* CloudKit JS renders its own Apple-branded button into this element. */}
        <div id="apple-sign-in-button" className="mt-4" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-6">
        <p className="text-sm text-red-200">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-sand-500">
            Favorites, in guide order
          </h2>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className="rounded-full bg-sand-100 px-4 py-1.5 text-sm font-semibold text-abyss-950 transition disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save to iCloud'}
          </button>
        </div>

        {favorites.length === 0 ? (
          <p className="rounded-2xl border border-abyss-700 bg-abyss-900 p-6 text-sm text-sand-500">
            No favorites yet. Search below to add the first one — it will sit at the top of your guide.
          </p>
        ) : (
          <ol className="space-y-2">
            {favorites.map((id, index) => {
              const channel = byID.get(id);
              return (
                <li
                  key={id}
                  className="flex items-center gap-3 rounded-xl border border-abyss-700 bg-abyss-900 px-4 py-3"
                >
                  <span className="w-6 shrink-0 text-right text-sm tabular-nums text-sand-500">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-sand-100">
                      {channel?.name ?? 'Channel no longer in your playlist'}
                    </span>
                    {channel?.group ? (
                      <span className="block truncate text-xs text-sand-500">{channel.group}</span>
                    ) : null}
                  </span>
                  <span className="flex shrink-0 items-center gap-1">
                    <IconButton label="Move up" onClick={() => move(index, -1)} disabled={index === 0}>
                      <ArrowUp size={15} weight="bold" />
                    </IconButton>
                    <IconButton
                      label="Move down"
                      onClick={() => move(index, 1)}
                      disabled={index === favorites.length - 1}
                    >
                      <ArrowDown size={15} weight="bold" />
                    </IconButton>
                    <IconButton label="Remove" onClick={() => remove(id)}>
                      <X size={15} weight="bold" />
                    </IconButton>
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sand-500">
          Add a channel
        </h2>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search your channels"
          className="w-full rounded-xl border border-abyss-700 bg-abyss-900 px-4 py-3 text-sm text-sand-100 outline-none placeholder:text-sand-600 focus:border-tide-500"
        />
        {results.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {results.map((channel) => (
              <li key={channel.id}>
                <button
                  type="button"
                  onClick={() => add(channel.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-abyss-700 bg-abyss-900 px-4 py-3 text-left transition hover:border-abyss-600"
                >
                  <Plus size={15} weight="bold" className="shrink-0 text-sand-500" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-sand-100">
                      {channel.name}
                    </span>
                    <span className="block truncate text-xs text-sand-500">{channel.group}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {message ? <p className="text-sm text-sand-500">{message}</p> : null}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border border-abyss-700 p-2 text-sand-500 transition hover:text-sand-100 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
