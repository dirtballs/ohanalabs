'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, X } from '@phosphor-icons/react';
import {
  cloudKit,
  loadChannelIndex,
  loadList,
  saveList,
  FAVORITES_KEY,
  GROUP_ORDER_KEY,
  HIDDEN_KEY,
  PROVIDER_GROUPS_KEY,
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
  const [groupOrder, setGroupOrder] = useState<string[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [providerGroups, setProviderGroups] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const dirty = touched.size > 0;

  const markTouched = useCallback((key: string) => {
    setTouched((current) => (current.has(key) ? current : new Set(current).add(key)));
  }, []);

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
        const [index, favs, groups, hiddenIDs, provider] = await Promise.all([
          loadChannelIndex(database),
          loadList(database, FAVORITES_KEY),
          loadList(database, GROUP_ORDER_KEY),
          loadList(database, HIDDEN_KEY),
          loadList(database, PROVIDER_GROUPS_KEY),
        ]);
        if (cancelled) return;
        setDb(database);
        setChannels(index);
        setFavorites(favs);
        setGroupOrder(groups);
        setHidden(hiddenIDs);
        setProviderGroups(provider);
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
    // Already a favourite, or already hidden — either way it is not a suggestion.
    const chosen = new Set([...favorites, ...hidden]);
    // A provider can carry dozens of variants of one brand; eight was hiding most of
    // them with no indication there was more.
    return channels
      .filter((c) => !chosen.has(c.id) && c.name.toLowerCase().includes(term))
      .slice(0, 60);
  }, [search, channels, favorites, hidden]);

  const move = useCallback((index: number, delta: number) => {
    setFavorites((current) => {
      const target = index + delta;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return next;
    });
    markTouched(FAVORITES_KEY);
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites((current) => current.filter((f) => f !== id));
    markTouched(FAVORITES_KEY);
  }, []);

  const add = useCallback((id: string) => {
    setFavorites((current) => (current.includes(id) ? current : [...current, id]));
    markTouched(FAVORITES_KEY);
  }, [markTouched]);

  /// Categories in the order the app shows them: anything you have explicitly
  /// reordered first, then the provider's own declared order, then anything left.
  const groups = useMemo(() => {
    const appearance: string[] = [];
    const seen = new Set<string>();
    for (const channel of channels) {
      if (!channel.group || seen.has(channel.group)) continue;
      seen.add(channel.group);
      appearance.push(channel.group);
    }
    const fromProvider = providerGroups.filter((g) => seen.has(g));
    const providerSet = new Set(fromProvider);
    const base = [...fromProvider, ...appearance.filter((g) => !providerSet.has(g))];
    const pinned = groupOrder.filter((g) => seen.has(g));
    const pinnedSet = new Set(pinned);
    return [...pinned, ...base.filter((g) => !pinnedSet.has(g))];
  }, [channels, groupOrder, providerGroups]);

  const hiddenSet = useMemo(() => new Set(hidden), [hidden]);

  const idsByGroup = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const channel of channels) {
      if (!channel.group) continue;
      const list = map.get(channel.group);
      if (list) list.push(channel.id);
      else map.set(channel.group, [channel.id]);
    }
    return map;
  }, [channels]);

  /// Matches the app: a category counts as hidden when every channel in it is.
  const isGroupHidden = useCallback(
    (group: string) => {
      const ids = idsByGroup.get(group);
      return !!ids?.length && ids.every((id) => hiddenSet.has(id));
    },
    [idsByGroup, hiddenSet],
  );

  const toggleGroupHidden = useCallback(
    (group: string) => {
      const ids = idsByGroup.get(group) ?? [];
      const hide = !isGroupHidden(group);
      setHidden((current) => {
        const next = new Set(current);
        for (const id of ids) {
          if (hide) next.add(id);
          else next.delete(id);
        }
        return [...next];
      });
      markTouched(HIDDEN_KEY);
    },
    [idsByGroup, isGroupHidden, markTouched],
  );

  const moveGroup = useCallback(
    (index: number, delta: number) => {
      setGroupOrder(() => {
        const next = [...groups];
        const target = index + delta;
        if (target < 0 || target >= next.length) return groups;
        const [item] = next.splice(index, 1);
        next.splice(target, 0, item);
        return next;
      });
      markTouched(GROUP_ORDER_KEY);
    },
    [groups],
  );

  const unhide = useCallback((id: string) => {
    setHidden((current) => current.filter((h) => h !== id));
    markTouched(HIDDEN_KEY);
  }, [markTouched]);

  const hide = useCallback((id: string) => {
    setHidden((current) => (current.includes(id) ? current : [...current, id]));
    markTouched(HIDDEN_KEY);
  }, [markTouched]);

  const save = useCallback(async () => {
    if (!db) return;
    setSaving(true);
    setMessage(null);
    try {
      // Only what was actually edited. Writing all three unconditionally meant a list
      // that failed to load came back as empty and overwrote good data.
      if (touched.has(FAVORITES_KEY)) await saveList(db, FAVORITES_KEY, favorites);
      if (touched.has(GROUP_ORDER_KEY)) await saveList(db, GROUP_ORDER_KEY, groups);
      // The app stores this sorted; match it so the two agree.
      if (touched.has(HIDDEN_KEY)) await saveList(db, HIDDEN_KEY, [...hidden].sort());
      setTouched(new Set());
      setMessage('Saved. Your Apple TV will pick this up next time Lumen syncs.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save.');
    } finally {
      setSaving(false);
    }
  }, [db, favorites, groups, hidden, touched]);

  return (
    <div className="space-y-8">
      {/* Always mounted, only hidden. CloudKit JS injects its Apple-branded button into
          this node during setUpAuth(), which runs on first render — so rendering the
          node only once the status is 'signed-out' means it does not exist yet when
          CloudKit looks for it, and no sign-in button ever appears. */}
      <div
        className={
          status === 'signed-out' ? 'rounded-2xl border border-abyss-700 bg-abyss-900 p-6' : 'hidden'
        }
      >
        <p className="text-sm text-sand-300">
          Sign in with the same Apple Account you use on your Apple TV. Ohana Labs never sees your
          credentials or your channel list — the browser talks to iCloud directly.
        </p>
        <div id="apple-sign-in-button" className="mt-4" />
      </div>

      {status === 'loading' ? (
        <p className="text-sm text-sand-500">Connecting to iCloud…</p>
      ) : null}

      {status === 'error' ? (
        <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-6">
          <p className="text-sm text-red-200">{message}</p>
        </div>
      ) : null}

      {status !== 'ready' ? null : (
      <>
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
          <ul className="mt-2 max-h-[32rem] space-y-2 overflow-y-auto pr-1">
            {results.map((channel) => (
              <li key={channel.id}>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => add(channel.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-abyss-700 bg-abyss-900 px-4 py-3 text-left transition hover:border-abyss-600"
                  >
                    <Plus size={15} weight="bold" className="shrink-0 text-sand-500" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-sand-100">
                        {channel.name}
                      </span>
                      <span className="block truncate text-xs text-sand-500">{channel.group}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => hide(channel.id)}
                    className="shrink-0 rounded-xl border border-abyss-700 px-3 py-3 text-xs font-semibold text-sand-500 transition hover:text-sand-100"
                  >
                    Hide
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sand-500">
          Category order
        </h2>
        <p className="mb-3 text-sm text-sand-600">
          The order categories appear in your guide.
        </p>
        <ol className="space-y-2">
          {groups.map((group, index) => (
            <li
              key={group}
              className="flex items-center gap-3 rounded-xl border border-abyss-700 bg-abyss-900 px-4 py-3"
            >
              <span className="w-6 shrink-0 text-right text-sm tabular-nums text-sand-500">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                <span className={isGroupHidden(group) ? 'text-sand-600 line-through' : 'text-sand-100'}>
                  {group}
                </span>
                <span className="ml-2 text-xs text-sand-600">
                  {idsByGroup.get(group)?.length ?? 0}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleGroupHidden(group)}
                  className="rounded-lg border border-abyss-700 px-3 py-1.5 text-xs font-semibold text-sand-500 transition hover:text-sand-100"
                >
                  {isGroupHidden(group) ? 'Show' : 'Hide'}
                </button>
                <IconButton label="Move up" onClick={() => moveGroup(index, -1)} disabled={index === 0}>
                  <ArrowUp size={15} weight="bold" />
                </IconButton>
                <IconButton
                  label="Move down"
                  onClick={() => moveGroup(index, 1)}
                  disabled={index === groups.length - 1}
                >
                  <ArrowDown size={15} weight="bold" />
                </IconButton>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {hidden.length > 0 ? (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sand-500">
            Hidden channels
          </h2>
          <ul className="space-y-2">
            {hidden.filter((id) => !isGroupHidden(byID.get(id)?.group ?? '')).slice(0, 200).map((id) => (
              <li
                key={id}
                className="flex items-center gap-3 rounded-xl border border-abyss-700 bg-abyss-900 px-4 py-3"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-sand-300">
                  {byID.get(id)?.name ?? id}
                </span>
                <button
                  type="button"
                  onClick={() => unhide(id)}
                  className="rounded-lg border border-abyss-700 px-3 py-1.5 text-xs font-semibold text-sand-300 transition hover:text-sand-100"
                >
                  Unhide
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {message ? <p className="text-sm text-sand-500">{message}</p> : null}
      </>
      )}
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
