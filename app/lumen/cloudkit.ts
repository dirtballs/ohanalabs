/* CloudKit JS bridge for the Lumen companion editor.

   Lumen stores each setting as its own `LumenSetting` record in the signed-in
   person's *private* database, so nothing here touches a server we run — the
   browser talks to iCloud directly and we never see the data.

   Swift writes values as `Data`; CloudKit hands those to JS as base64 strings,
   so every read and write goes through the encode/decode pair below. */

export const CONTAINER = 'iCloud.com.nicholaslutz.lumen';
export const FAVORITES_KEY = 'lumen.favorites';
export const GROUP_ORDER_KEY = 'lumen.groupOrder';
export const HIDDEN_KEY = 'lumen.hiddenIDs';
export const PROVIDER_GROUPS_KEY = 'lumen.providerGroups';

type CloudKitRecord = {
  recordName: string;
  recordChangeTag?: string;
  fields: Record<string, { value: unknown }>;
  // Present on the entries CloudKit returns for records it refused.
  serverErrorCode?: string;
  reason?: string;
};

type CloudKitDatabase = {
  performQuery(query: unknown): Promise<{ records: CloudKitRecord[]; hasErrors?: boolean }>;
  saveRecords(records: unknown): Promise<{ records: CloudKitRecord[]; hasErrors?: boolean }>;
  fetchRecords(names: string | string[]): Promise<{ records: CloudKitRecord[] }>;
};

type CloudKitContainer = {
  setUpAuth(): Promise<{ userRecordName: string } | null>;
  whenUserSignsIn(): Promise<{ userRecordName: string }>;
  whenUserSignsOut(): Promise<void>;
  privateCloudDatabase: CloudKitDatabase;
};

declare global {
  interface Window {
    CloudKit?: {
      configure(config: unknown): void;
      getDefaultContainer(): CloudKitContainer;
    };
  }
}

let ready: Promise<CloudKitContainer> | null = null;

/** Loads Apple's SDK once and configures the container. */
export function cloudKit(apiToken: string): Promise<CloudKitContainer> {
  if (ready) return ready;

  ready = new Promise<CloudKitContainer>((resolve, reject) => {
    const start = () => {
      const CloudKit = window.CloudKit;
      if (!CloudKit) {
        reject(new Error('CloudKit JS failed to load'));
        return;
      }
      CloudKit.configure({
        containers: [
          {
            containerIdentifier: CONTAINER,
            apiTokenAuth: { apiToken, persist: true },
            // TestFlight and App Store builds write to production, so the editor
            // has to read production too or it will look empty.
            environment: 'production',
          },
        ],
      });
      resolve(CloudKit.getDefaultContainer());
    };

    if (window.CloudKit) {
      start();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.apple-cloudkit.com/ck/2/cloudkit.js';
    script.async = true;
    script.onload = start;
    script.onerror = () => reject(new Error('CloudKit JS failed to load'));
    document.head.appendChild(script);
  });

  return ready;
}

function decodeBytes(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function encodeBytes(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

export type Channel = { id: string; name: string; group: string; logo?: string | null };

/** The channel list Lumen publishes so this page can show names, not identifiers. */
export async function loadChannelIndex(db: CloudKitDatabase): Promise<Channel[]> {
  const result = await db.fetchRecords('lumen.channelIndex');
  const record = result.records?.[0];
  const asset = record?.fields?.asset?.value as { downloadURL?: string } | undefined;
  if (!asset?.downloadURL) return [];
  const response = await fetch(asset.downloadURL);
  if (!response.ok) return [];
  return (await response.json()) as Channel[];
}

/** Every setting Lumen syncs is a JSON array or object in a Bytes field. */
export async function loadList(db: CloudKitDatabase, key: string): Promise<string[]> {
  const result = await db.fetchRecords(key);
  const json = decodeBytes(result.records?.[0]?.fields?.blob?.value);
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

/** Writes a list back. The app picks it up on its next sync. */
export async function saveList(
  db: CloudKitDatabase,
  key: string,
  values: string[],
): Promise<void> {
  // Updating an existing record requires its change tag. Without one CloudKit rejects
  // the save as a conflict — and reports that per record rather than on the response,
  // so the old check saw success while nothing was written.
  let recordChangeTag: string | undefined;
  try {
    const existing = await db.fetchRecords(key);
    recordChangeTag = existing.records?.[0]?.recordChangeTag;
  } catch {
    // No record yet; creating one needs no tag.
  }

  const record: Record<string, unknown> = {
    recordType: 'LumenSetting',
    recordName: key,
    fields: {
      key: { value: key },
      blob: { value: encodeBytes(JSON.stringify(values)) },
    },
  };
  if (recordChangeTag) record.recordChangeTag = recordChangeTag;

  const response = await db.saveRecords(record);
  const refused = (response.records ?? []).find((r) => r.serverErrorCode || r.reason);
  if (response.hasErrors || refused) {
    throw new Error(
      refused?.reason ?? refused?.serverErrorCode ?? 'iCloud rejected the change',
    );
  }

  // Read it straight back. A save that reports success but stores nothing is exactly
  // the failure that kept losing favourites, so do not trust the response alone.
  const check = await loadList(db, key);
  const expected = JSON.stringify(values);
  if (JSON.stringify(check) !== expected) {
    throw new Error(
      `iCloud accepted the save but stored ${check.length} of ${values.length} items. ` +
        `Saved record "${key}" came back as: ${JSON.stringify(check).slice(0, 120)}`,
    );
  }
}

export const loadFavorites = (db: CloudKitDatabase) => loadList(db, FAVORITES_KEY);
export const saveFavorites = (db: CloudKitDatabase, ids: string[]) =>
  saveList(db, FAVORITES_KEY, ids);

export type { CloudKitContainer, CloudKitDatabase };
