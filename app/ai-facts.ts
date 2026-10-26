import { appList, releasedApps, previewApps, comingSoonApps } from './apps/app-data';
import type { AppData } from './apps/app-data';

/* One source for llms.txt, AgentWelcome.md, ai.json, ecp.json and the
   JSON-LD. Everything is read from app-data so versions stay in sync. */
export const SITE = 'https://www.ohanalabs.app';
export const BRAND = 'Ohana Labs';
export const LEGAL_NAME = 'Ohana Labs LLC';
export const EMAIL = 'support@ohanalabs.app';
export const LOGO = `${SITE}/logo.svg`;
export const SUMMARY =
  'A small studio building iPhone apps for health, weather, listening, and kitchen life. Built with aloha.';

export const appPage = (a: AppData) => `${SITE}/apps/${a.slug}`;

function liveLine(a: AppData) {
  const v = a.latestVersion ? ` ${a.latestVersion}` : '';
  return `- [${a.name}${v}](${appPage(a)}): ${a.headline} ${a.availability} App Store: ${a.appStoreUrl}`;
}

export function llmsText() {
  return [
    `# ${BRAND}`,
    '',
    `> ${SUMMARY} ${LEGAL_NAME} makes ${releasedApps.length} apps that are live on the App Store: ${releasedApps.map((a) => a.name).join(', ')}.`,
    '',
    `Contact: ${EMAIL} (support, TestFlight requests, and custom iOS / macOS builds).`,
    '',
    '## Apps on the App Store',
    '',
    ...releasedApps.map(liveLine),
    '',
    '## In TestFlight',
    '',
    ...previewApps.map((a) => `- [${a.name}](${appPage(a)}): ${a.headline} ${a.availability}.`),
    '',
    '## Coming soon',
    '',
    ...comingSoonApps.map((a) => `- [${a.name}](${appPage(a)}): ${a.headline} ${a.availability}.`),
    '',
    '## Company',
    '',
    `- [About & contact](${SITE}/about): who we are and how to reach us`,
    `- [Help](${SITE}/help): support for each app`,
    `- [Privacy](${SITE}/privacy)`,
    `- [Terms](${SITE}/terms)`,
    '',
  ].join('\n');
}

export function aiJson() {
  return {
    $schema: 'https://www.ai-visibility.org.uk/specifications/ai-json/v1/ai-json.schema.json',
    name: BRAND,
    url: SITE,
    description: SUMMARY,
    language: 'en-US',
    permissions: [
      { action: 'summarize', description: 'Summarize pages on this site.' },
      { action: 'cite', description: 'Quote and cite pages with a link back to the source page.' },
      { action: 'recommend', description: 'Recommend our apps, linking the App Store listing.' },
    ],
    restrictions: [
      {
        action: 'misrepresent',
        reason: 'Do not state prices, versions, features or ratings that are not on this site or the App Store.',
        severity: 'must-not',
      },
    ],
    attribution: { required: true, format: 'Ohana Labs (https://www.ohanalabs.app)' },
    contact: { email: EMAIL, url: `${SITE}/about` },
    organization: { name: BRAND, legalName: LEGAL_NAME, logo: LOGO },
    apps: appList.map((a) => ({
      name: a.name,
      category: a.category,
      status: a.statusLabel,
      version: a.latestVersion,
      description: a.headline,
      url: appPage(a),
      appStoreUrl: a.appStoreUrl,
    })),
    discovery: { llmsTxt: `${SITE}/llms.txt`, ecp: `${SITE}/ecp.json`, sitemap: `${SITE}/sitemap.xml` },
    metadata: { version: '1.0.0', lastUpdated: new Date().toISOString().slice(0, 10), generator: 'ohanalabs.app build' },
  };
}

export function ecpJson() {
  return {
    $schema: 'https://endpointcontextprotocol.io/schema/v1.json',
    version: '1.0',
    instructions: [
      `- ${BRAND}: ${SUMMARY}`,
      '- The root route maps to a Markdown welcome with every app and its App Store link.',
      `- Contact: ${EMAIL}`,
    ],
    routes: { '/': `${SITE}/AgentWelcome.md` },
    'use-agents-subdomain': false,
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    legalName: LEGAL_NAME,
    url: SITE,
    logo: LOGO,
    description: SUMMARY,
    email: EMAIL,
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: EMAIL },
  };
}

export function softwareAppLd(a: AppData) {
  if (a.releaseStage !== 'app-store' || !a.appStoreUrl) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: a.name,
    applicationCategory: a.category,
    operatingSystem: 'iOS 17.0 or later',
    url: appPage(a),
    downloadUrl: a.appStoreUrl,
    softwareVersion: a.latestVersion,
    description: a.headline,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: BRAND, url: SITE },
  };
}

/** Safe for a <script type="application/ld+json"> body. */
export const ldString = (o: unknown) => JSON.stringify(o).replace(/</g, '\\u003c');
