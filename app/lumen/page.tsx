import type { Metadata } from 'next';
import { SiteNav } from '../site-chrome';
import { BackLink, InnerPage, PageHeader } from '../page-shell';
import { FavoritesEditor } from './favorites-editor';

export const metadata: Metadata = {
  title: 'Lumen Companion',
  description: 'Edit your Lumen guide favorites from the web. Changes sync to your Apple TV over iCloud.',
  alternates: { canonical: 'https://www.ohanalabs.app/lumen' },
  robots: { index: false, follow: false },
};

export default function LumenPage() {
  const apiToken = process.env.NEXT_PUBLIC_CLOUDKIT_TOKEN ?? '';

  return (
    <>
      <SiteNav />
      <InnerPage>
        <BackLink href="/apps">All apps</BackLink>
        <PageHeader
          eyebrow="Lumen"
          title="Set up your guide from here"
          lede="Reorder your favorites with a keyboard instead of a remote. Everything is stored in your own iCloud account and syncs to the Apple TV."
        />
        <div className="mt-14">
          <FavoritesEditor apiToken={apiToken} />
        </div>
        <p className="mt-16 max-w-[60ch] text-sm leading-7 text-sand-600">
          Playlist sources stay on your device on purpose. Adding one means typing a provider
          username and password, and those are better off never passing through a browser.
        </p>
      </InnerPage>
    </>
  );
}
