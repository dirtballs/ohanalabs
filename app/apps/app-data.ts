export type AppData = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  shortDescription: string;
  longDescription: string;
  iconSrc: string;
  iconAlt: string;
  releaseStage: 'app-store' | 'testflight' | 'coming-soon';
  availability: string;
  statusLabel: string;
  priceLabel: string;
  appStoreUrl?: string;
  primaryLink?: {
    label: string;
    href: string;
  };
  /** Optional override for AppStack details link (defaults to /apps/{slug}). */
  detailHref?: string;
  screenshotPaths: string[];
  screenshotAlts?: string[];
  previewImageSrc?: string;
  previewImageAlt?: string;
  highlights: string[];
  featureSections: Array<{
    title: string;
    items: string[];
  }>;
  supportFaqs: Array<{
    question: string;
    answer: string;
  }>;
  privacySections: Array<{
    title: string;
    body: string;
  }>;
};

export const appList: AppData[] = [
  {
    slug: 'steady',
    name: 'Steady',
    category: 'GLP-1 tracking',
    headline: 'Today, doses, weight, and the journey — one GLP-1 home.',
    shortDescription:
      'See what’s next for your shot, log the dose, watch the scale, and keep the story of your weeks in one place.',
    longDescription:
      'Steady helps people using semaglutide, tirzepatide, retatrutide, and compounded GLP-1 medications stay organized with reminders, trends, exports, and day-to-day health context.',
    iconSrc: '/apps/steady-icon.png',
    iconAlt: 'Steady app icon',
    releaseStage: 'app-store',
    availability: 'Available now on the App Store for iPhone',
    statusLabel: 'Live on the App Store',
    priceLabel: 'Free download with in-app purchases',
    appStoreUrl: 'https://apps.apple.com/us/app/steady-glp-1-tracker/id6761083351',
    primaryLink: {
      label: 'Download on the App Store',
      href: 'https://apps.apple.com/us/app/steady-glp-1-tracker/id6761083351',
    },
    screenshotPaths: [
      '/apps/steady/screenshot-1.webp',
      '/apps/steady/screenshot-2.webp',
      '/apps/steady/screenshot-3.webp',
    ],
    screenshotAlts: [
      'Steady Today — next dose, weight, and daily essentials',
      'Steady Doses — dose timeline with sites and weekly windows',
      'Steady Weight — weight journey and recent weigh-ins',
    ],
    highlights: [
      'Today board for next dose, weight, water, protein, and check-ins',
      'Dose timeline with sites and weekly windows',
      'Weight journey charts tied to dose chapters',
      'Apple Health sync and provider-ready exports',
    ],
    featureSections: [
      {
        title: 'Track your injections',
        items: [
          'Log every dose with date, time, site, and notes',
          'See sites on a timeline and rotate through weekly windows',
          'Set reminders so the next shot is waiting on Today',
        ],
      },
      {
        title: 'See your progress clearly',
        items: [
          'Watch the scale next to starting weight and the goal you set',
          'Follow weight journey charts alongside dose chapters',
          'Keep water, protein, and daily check-ins on the same board',
        ],
      },
      {
        title: 'Stay organized between visits',
        items: [
          'Sync weight and wellness context from Apple Health',
          'Export clinician-ready PDFs for appointments and check-ins',
          'Keep the story of your weeks in one place instead of scattered notes',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'Who is Steady for?',
        answer:
          'Steady is for GLP-1 users who want one place for the next shot, the dose log, the scale, and a week-by-week story they can export for a visit.',
      },
      {
        question: 'Does Steady sync with Apple Health?',
        answer:
          'Yes. Steady integrates with Apple Health for supported data like weight and sleep so your progress can stay in sync.',
      },
      {
        question: 'Can I share data with my provider?',
        answer:
          'Yes. Steady supports PDF exports designed to make doctor visits and check-ins easier to prepare for.',
      },
    ],
    privacySections: [
      {
        title: 'Health and account data',
        body:
          'Steady may process health-related information you choose to log, such as injections, weight, labs, meals, reminders, and account-linked sync data needed to provide core app functionality.',
      },
      {
        title: 'Analytics and diagnostics',
        body:
          'Steady may use limited analytics, diagnostics, and app interaction data to improve reliability, understand feature usage, and troubleshoot issues.',
      },
      {
        title: 'Support and exports',
        body:
          'If you contact support or generate exports, the information you choose to send may be used only to respond to your request or provide the export feature.',
      },
      {
        title: 'Choices and questions',
        body:
          'For privacy questions, support, or requests related to information you shared through Steady, contact support@ohanalabs.app.',
      },
    ],
  },
  {
    slug: 'skylight',
    name: 'Skylight',
    category: 'Weather',
    headline: 'A focused weather app for people who want clarity instead of clutter.',
    shortDescription:
      'See current conditions, hourly forecasts, radar, alerts, AQI, and smart weather guidance in a clean interface that stays out of the way.',
    longDescription:
      'Skylight is a privacy-first weather app built for people who want to understand what is happening outside without ads, noise, account walls, or subscription games.',
    iconSrc: '/apps/skylight-icon.png',
    iconAlt: 'Skylight app icon',
    releaseStage: 'app-store',
    availability: 'Available now on the App Store for iPhone',
    statusLabel: 'Live on the App Store',
    priceLabel: '$4.99 one-time unlock for Skylight Ultra',
    appStoreUrl: 'https://apps.apple.com/us/app/skylight-your-weather/id6769922192',
    primaryLink: {
      label: 'Download on the App Store',
      href: 'https://apps.apple.com/us/app/skylight-your-weather/id6769922192',
    },
    screenshotPaths: [
      '/apps/skylight/screenshot-1.webp',
      '/apps/skylight/screenshot-2.webp',
      '/apps/skylight/screenshot-3.webp',
    ],
    screenshotAlts: [
      'Skylight Home — current conditions and hourly forecast',
      'Skylight Live Radar — observed radar over the islands',
      'Skylight Outlook — the days ahead',
    ],
    highlights: [
      'No ads, no account required, and no tracking',
      'Radar, AQI, rain timing, golden hour, and smart outlook cards',
      'Widgets, saved places, and weather alerts',
      'One-time Ultra purchase instead of a recurring subscription',
    ],
    featureSections: [
      {
        title: 'Useful free weather',
        items: [
          'Current conditions, feels-like temperature, humidity, UV, wind, and visibility',
          '24-hour forecast, 5-day outlook, moon phase, and saved locations',
          'National Weather Service alerts and home screen widgets',
        ],
      },
      {
        title: 'Skylight Ultra',
        items: [
          'Animated precipitation radar over a live map',
          'Real-time AQI with PM2.5 and health guidance',
          '10-day forecast, deeper detail, smart notifications, and richer planning tools',
        ],
      },
      {
        title: 'Built with care',
        items: [
          'Powered by Open-Meteo with ECMWF, GFS, and ICON model data',
          'Designed to stay fast, bright, and easy to read',
          'Location is used to fetch weather, not to build a profile',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'Do I need an account to use Skylight?',
        answer:
          'No. Skylight does not require an account to see your weather, saved places, widgets, alerts, or forecasts.',
      },
      {
        question: 'Is Skylight a subscription?',
        answer:
          'No. Skylight Ultra is a one-time $4.99 unlock, not a subscription.',
      },
      {
        question: 'Does Skylight track me?',
        answer:
          'No tracking is part of the current product positioning. Skylight is designed to use location only to fetch weather and not to store or sell personal data.',
      },
    ],
    privacySections: [
      {
        title: 'Data collection',
        body:
          'Skylight is designed to avoid collecting personal data. The current App Store privacy disclosure states that the developer does not collect data from this app.',
      },
      {
        title: 'Location use',
        body:
          'If you allow location access, Skylight uses it to fetch local weather conditions and forecasts. That location context is used for the forecast itself, not for advertising or profiling.',
      },
      {
        title: 'No account required',
        body:
          'Skylight does not require you to create an account, which helps keep the product lightweight and privacy-first.',
      },
      {
        title: 'Questions',
        body:
          'For privacy questions or support related to Skylight, contact support@ohanalabs.app.',
      },
    ],
  },
  {
    slug: 'aloud',
    name: 'Aloud',
    category: 'Audiobooks',
    headline: 'A beautiful Audiobookshelf player with built-in discovery, requests, and offline listening.',
    shortDescription:
      'Browse your library, request new titles, download books for offline playback, and resume where you left off in a cleaner listening experience.',
    longDescription:
      'Aloud is an iPhone app for Audiobookshelf users that combines a polished player, a better library experience, and ReadMeABook-powered discovery so finding and requesting your next listen feels effortless.',
    iconSrc: '/apps/aloud/icon.png',
    iconAlt: 'Aloud app icon',
    releaseStage: 'testflight',
    availability: 'Currently in TestFlight for iPhone',
    statusLabel: 'In TestFlight',
    priceLabel: 'Pre-release preview',
    primaryLink: {
      label: 'Contact about TestFlight',
      href: 'mailto:support@ohanalabs.app?subject=Aloud%20TestFlight',
    },
    screenshotPaths: [],
    previewImageSrc: '/apps/aloud/library-preview.png',
    previewImageAlt: 'Aloud library screen showing continue listening',
    highlights: [
      'Audiobookshelf library with progress filters and a Continue Listening hero',
      'ReadMeABook discovery with search, trending titles, and one-tap requests',
      'Offline downloads, mini player controls, and full-player scrubbing',
      'Home screen widget, Siri shortcuts, and progress sync back to your server',
    ],
    featureSections: [
      {
        title: 'A better library view',
        items: [
          'Filter by all, in progress, finished, or not started',
          'Search by book, author, narrator, or series',
          'Pick up quickly with a Continue Listening hero and clear badges',
        ],
      },
      {
        title: 'Built for listening',
        items: [
          'Use the floating mini player for fast control from anywhere in the app',
          'Open the full player for scrubbing, skip controls, and lock-screen playback',
          'Download books on-device for offline listening with per-track progress',
        ],
      },
      {
        title: 'Discovery without friction',
        items: [
          'Browse featured and trending titles through ReadMeABook',
          'Request new books in a tap and let your server import them',
          'Use widgets and Siri shortcuts to jump back into your current listen',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'Who is Aloud for?',
        answer:
          'Aloud is built for Audiobookshelf users who want a more polished iPhone listening experience with better discovery and easier playback.',
      },
      {
        question: 'Is Aloud available on the App Store?',
        answer:
          'Not yet. Aloud is currently in TestFlight while Ohana Labs continues refining the app.',
      },
      {
        question: 'Does Aloud require a server?',
        answer:
          'Aloud is designed for Audiobookshelf libraries and can also demo sample content from the sign-in flow when available.',
      },
    ],
    privacySections: [
      {
        title: 'Library and account data',
        body:
          'Aloud uses the Audiobookshelf server details and account information you provide so it can sign in, load your library, sync playback progress, and support downloads.',
      },
      {
        title: 'Playback and downloads',
        body:
          'The app stores playback state, downloads, and app preferences needed to provide a smooth listening experience across sessions.',
      },
      {
        title: 'Support requests',
        body:
          'If you contact support or share screenshots, that information is used only to help troubleshoot issues, improve TestFlight builds, or respond to your question.',
      },
      {
        title: 'Questions',
        body:
          'For privacy questions or TestFlight support related to Aloud, contact support@ohanalabs.app.',
      },
    ],
  },
  {
    slug: 'ohana-kitchen',
    name: 'Ohana Kitchen',
    category: 'Recipes',
    headline: 'A warm, local-first recipe app for calmer cooking, better planning, and meals you will actually make.',
    shortDescription:
      'Save recipes from the web, organize your cookbook, plan the week, build shopping lists, and cook with a focused step-by-step mode.',
    longDescription:
      'Ohana Kitchen is a new recipe app from Ohana Labs that brings together Safari import, a clean cookbook, meal planning, shopping lists, and Live Activity timers in one thoughtful kitchen companion.',
    iconSrc: '/apps/ohana-kitchen/icon.png',
    iconAlt: 'Ohana Kitchen app icon',
    releaseStage: 'testflight',
    availability: 'Currently in TestFlight for iPhone',
    statusLabel: 'In TestFlight',
    priceLabel: 'Pre-release preview',
    primaryLink: {
      label: 'Contact about TestFlight',
      href: 'mailto:support@ohanalabs.app?subject=Ohana%20Kitchen%20TestFlight',
    },
    screenshotPaths: [],
    previewImageSrc: '/apps/ohana-kitchen/home-teaser.png',
    previewImageAlt: 'Ohana Kitchen cookbook preview',
    highlights: [
      'Cookbook browsing with search, filters, and a clean visual grid',
      'Import recipes from Safari links with ingredients, steps, and photos',
      'Cook mode with step-by-step guidance and Live Activity timers',
      'Meal planning and shopping lists built into the same flow',
    ],
    featureSections: [
      {
        title: 'A calmer cookbook',
        items: [
          'Browse recipes in a clean grid with search and category filters',
          'Open a recipe with hero imagery, scaled servings, ingredients, and steps',
          'Keep your collection local-first and easy to manage',
        ],
      },
      {
        title: 'Save recipes from anywhere',
        items: [
          'Paste a recipe URL to auto-fill title, ingredients, steps, and image',
          'Use the Safari share extension to save recipes straight into the app',
          'Turn scattered web inspiration into a cookbook you will actually use',
        ],
      },
      {
        title: 'Plan and cook with less chaos',
        items: [
          'Use cook mode for focused, step-by-step preparation',
          'Run timers in Live Activities while you stay on task',
          'Build a 14-day meal plan and shopping lists from your saved recipes',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'What is Ohana Kitchen?',
        answer:
          'Ohana Kitchen is a new Ohana Labs recipe app focused on recipe import, meal planning, shopping lists, and a calmer cooking flow.',
      },
      {
        question: 'Is Ohana Kitchen available yet?',
        answer:
          'Not yet. Ohana Kitchen is currently being refined in TestFlight before a wider release.',
      },
      {
        question: 'Can it save recipes from the web?',
        answer:
          'Yes. The current app direction includes URL import and a Safari share extension to bring recipes into your cookbook quickly.',
      },
    ],
    privacySections: [
      {
        title: 'Recipe and planning data',
        body:
          'Ohana Kitchen stores recipe, meal plan, timer, and shopping list information needed to provide the core product experience you choose to use.',
      },
      {
        title: 'Imported content',
        body:
          'If you import recipes from websites or use the share extension, the source content you choose to save is processed to populate recipe details inside the app.',
      },
      {
        title: 'Support requests',
        body:
          'If you email support during TestFlight, any information you share is used only to answer your request, investigate bugs, or improve the app before release.',
      },
      {
        title: 'Questions',
        body:
          'For privacy questions or TestFlight support related to Ohana Kitchen, contact support@ohanalabs.app.',
      },
    ],
  },
  {
    slug: 'sling',
    name: 'Sling',
    category: 'Links and clipboard',
    headline: 'Links move between your iPhone and Mac. So does everything you copy.',
    shortDescription:
      'Send a page from either device and it lands on the other. Everything you copy is kept as well, so your clipboard becomes a searchable history instead of a single slot you keep overwriting.',
    longDescription:
      'Sling does two jobs. It hands links between your iPhone and Mac: send one from the share sheet at night and the tab is waiting when you log in, or send one from the Mac and your phone gets a quiet notification. It is also a proper clipboard manager. Every copy is kept rather than replaced by the next one, building a history you can search, pin, and paste from a keyboard on your phone. Links and clips both sync through your own iCloud, images stay on the Mac they came from, and anything a password manager marks confidential is never recorded.',
    iconSrc: '/apps/sling/icon.png',
    iconAlt: 'Sling app icon',
    releaseStage: 'coming-soon',
    availability: 'iPhone app in TestFlight; Mac app coming soon',
    statusLabel: 'Coming soon',
    priceLabel: 'Pre-release preview',
    primaryLink: {
      label: 'Contact about TestFlight',
      href: 'mailto:support@ohanalabs.app?subject=Sling%20TestFlight',
    },
    screenshotPaths: [],
    previewImageSrc: '/apps/sling/archive-preview.png',
    previewImageAlt: 'Sling archive on iPhone showing sent links as cards',
    highlights: [
      'Share from Safari on iPhone and the page opens on your Mac',
      'Send from your Mac too, with a notification on your phone',
      'A clipboard that keeps every copy instead of overwriting the last one',
      'Search back through what you copied, and pin the things you reuse',
      'A paste keyboard on iPhone for dropping any clip into any app',
      'A searchable archive of every link, with pin, archive, and delete',
      'Syncs through your own iCloud account with no servers in between',
    ],
    featureSections: [
      {
        title: 'Send from either device',
        items: [
          'Share from Safari on iPhone, or from the Share menu on your Mac',
          'Use Shortcuts on both, or the Action button on your iPhone',
          'Links arrive in a second or two without you doing anything else',
        ],
      },
      {
        title: 'A clipboard that remembers',
        items: [
          'Every copy is kept, so the last one no longer replaces the one before',
          'Search the history by what you copied or the app you copied it from',
          'Pin the snippets you paste constantly and they stay at the top',
          'A keyboard on iPhone for pasting any clip into whatever you are typing',
          'Copy on the Mac and it is on your phone by the time you pick it up',
          'Images stay on the Mac, and password manager copies are never recorded',
        ],
      },
      {
        title: 'Mac to iPhone as well',
        items: [
          'Send the page you are reading on your Mac straight to your phone',
          'Your phone shows a quiet notification; tap it to open the link there',
          'Useful for reading later, or for anything easier to do on a phone',
        ],
      },
      {
        title: 'Waiting for you in the morning',
        items: [
          'Send links from bed and the tabs are open when you log in',
          'Anything sent while the Mac was asleep opens once you unlock it',
          'Links older than a week stay in the archive instead of opening',
        ],
      },
      {
        title: 'An archive, not just a pipe',
        items: [
          'Every link becomes a card with its title, site, and preview image',
          'Search by title, site, or the device that sent it',
          'Pin what matters, archive what you have finished, delete the rest',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'What do I need to use Sling?',
        answer:
          'An iPhone and a Mac signed into the same iCloud account. The Mac app needs to be running to open links, and it lives in the menu bar so it stays out of the way.',
      },
      {
        question: 'What happens to what I copy?',
        answer:
          'Text and links you copy on your Mac sync to your other devices through your own private iCloud database, so they are there when you open Sling on your phone. Images are never synced, and copies that password managers mark as confidential are never recorded at all. Clipboard history is deleted after a week unless you pin it, and a setting limits syncing to only the clips you pin if you would rather.',
      },
      {
        question: 'Does Sling wake my Mac?',
        answer:
          'No. Nothing in Sling wakes a sleeping Mac. Links sent while it is asleep are delivered when you wake it and log in, so the tabs are simply there when you sit down.',
      },
      {
        question: 'When is it available?',
        answer:
          'The iPhone app is in TestFlight now and the Mac app is being finished for direct download. Email support@ohanalabs.app if you would like to try it early.',
      },
    ],
    privacySections: [
      {
        title: 'Where your links are stored',
        body:
          'Links you send are stored in your own private iCloud database using CloudKit. Ohana Labs runs no server for Sling and cannot see the links you send.',
      },
      {
        title: 'What Sling keeps from your clipboard',
        body:
          'Text and links you copy are saved to your own private iCloud database so they are on both devices. Images are never synced and stay on the Mac they were copied from, and anything a password manager marks as confidential is never recorded at all. Clipboard history is deleted after a week unless you pin it, and a setting limits syncing to only the clips you pin if you would rather keep the rest local.',
      },
      {
        title: 'No account and no analytics',
        body:
          'Sling has no sign-up, no account, and no third-party analytics or advertising SDKs. It uses the iCloud account already on your devices.',
      },
      {
        title: 'Link previews',
        body:
          'To show a title and preview image on each card, the app requests the page you shared directly from that website. Those requests come from your device, not from Ohana Labs.',
      },
      {
        title: 'Questions',
        body:
          'For privacy questions or TestFlight support related to Sling, contact support@ohanalabs.app.',
      },
    ],
  },
  {
    slug: 'jade-run',
    name: 'Jade Run',
    category: 'Tile matching',
    headline: 'Match tiles. Build a run.',
    shortDescription:
      'A tile matching game about reading the board, keeping a clean chain, and choosing the charm that changes the run. Clear every tile before the board locks.',
    longDescription:
      'Jade Run is a tile matching game from Ohana Labs. Match free tiles, keep a combo chain, and draft charms that bend scoring, tempo, and finish bonuses. Classic and Quick runs, a daily shared board, and friend challenges with JR2 codes.',
    iconSrc: '/apps/jade-run-icon.png',
    iconAlt: 'Jade Run app icon',
    releaseStage: 'coming-soon',
    availability: 'Coming soon to the App Store for iPhone',
    statusLabel: 'App Store soon',
    priceLabel: 'Pre-release',
    primaryLink: {
      label: 'Ask for TestFlight',
      href: 'mailto:support@ohanalabs.app?subject=Jade%20Run%20TestFlight',
    },
    detailHref: '/jaderun',
    screenshotPaths: [],
    highlights: [
      'Free-tile matching with depth and combo scoring',
      'Charm shelf that bends tempo, score, and finish bonuses',
      'Quick Run and Classic Run board ladders',
      'Daily shared board and friend challenges with JR2 codes',
    ],
    featureSections: [
      {
        title: 'How a run works',
        items: [
          'Match free tiles before the board locks',
          'Keep a five-second combo rhythm for multiplier climbs',
          'Draft charms that change depth, tempo, suits, and clear bonus',
        ],
      },
      {
        title: 'Boards and challenges',
        items: [
          'Quick Run: three compact boards',
          'Classic Run: eight boards with rising targets',
          'Daily UTC board and JR2 friend challenges',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'When is Jade Run available?',
        answer:
          'Jade Run is coming soon to the App Store. Email support@ohanalabs.app with subject Jade Run TestFlight if you want an early build.',
      },
      {
        question: 'Where are the rules?',
        answer:
          'The full how-to-play guide lives at ohanalabs.app/jaderun — scoring, charms, layouts, and challenges.',
      },
    ],
    privacySections: [
      {
        title: 'Questions',
        body:
          'For privacy questions related to Jade Run, contact support@ohanalabs.app.',
      },
    ],
  },

];

export const releasedApps = appList.filter((app) => app.releaseStage === 'app-store');

export const previewApps = appList.filter((app) => app.releaseStage === 'testflight');

export const comingSoonApps = appList.filter((app) => app.releaseStage === 'coming-soon');

export function getAppBySlug(slug: string) {
  return appList.find((app) => app.slug === slug);
}
