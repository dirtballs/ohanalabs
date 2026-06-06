export type AppData = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  shortDescription: string;
  longDescription: string;
  iconSrc: string;
  iconAlt: string;
  appStoreUrl: string;
  storeLabel: string;
  priceLabel: string;
  availability: string;
  gradient: string;
  accent: string;
  screenshotPaths: string[];
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
    headline: 'The complete GLP-1 tracker for injections, progress, nutrition, and follow-through.',
    shortDescription:
      'Track injections, weight, doses, side effects, meals, labs, and progress in one thoughtful place designed to make health routines feel manageable.',
    longDescription:
      'Steady is built for people using semaglutide, tirzepatide, retatrutide, and compounded GLP-1 medications who want one clear system for staying consistent.',
    iconSrc: '/apps/steady-icon.png',
    iconAlt: 'Steady app icon',
    appStoreUrl: 'https://apps.apple.com/us/app/steady-glp-1-tracker/id6761083351',
    storeLabel: 'Download on the App Store',
    priceLabel: 'Free download with in-app purchases',
    availability: 'Now on the App Store for iPhone',
    gradient: 'from-rose-100 via-white to-sky-100',
    accent: 'bg-rose-500',
    screenshotPaths: [
      '/apps/steady/screenshot-1.webp',
      '/apps/steady/screenshot-2.webp',
      '/apps/steady/screenshot-3.webp',
    ],
    highlights: [
      'Apple Health sync for weight, sleep, and wellness context',
      'AI food scan, macro logging, and protein tracking',
      'PDF exports and a browser dashboard at steadydose.app',
      'Lab tracking, reminders, and post-GLP-1 mode',
    ],
    featureSections: [
      {
        title: 'Track your injections',
        items: [
          'Log every dose with date, time, site, and notes',
          'Rotate injection sites with a body map tracker',
          'Set reminders and visualize medication cycles across the week',
        ],
      },
      {
        title: 'See your progress clearly',
        items: [
          'Track weight, milestones, body measurements, and non-scale victories',
          'Compare progress photos and follow trend charts over time',
          'Monitor food noise, energy, and muscle-preservation habits',
        ],
      },
      {
        title: 'Stay organized between visits',
        items: [
          'Manage vials, refill timing, and titration history',
          'Export clinician-ready PDFs for appointments',
          'Review labs and keep your health story in one place',
        ],
      },
    ],
    supportFaqs: [
      {
        question: 'Who is Steady for?',
        answer:
          'Steady is designed for GLP-1 users who want one place to track doses, weight, side effects, meals, progress, and provider-ready exports.',
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
      'See current conditions, hourly forecasts, alerts, radar, AQI, and smart weather guidance in a clean interface that stays out of the way.',
    longDescription:
      'Skylight is a privacy-first weather app built for people who actually want to understand what is happening outside without ads, noise, or subscription games.',
    iconSrc: '/apps/skylight-icon.png',
    iconAlt: 'Skylight app icon',
    appStoreUrl: 'https://apps.apple.com/us/app/skylight-your-weather/id6769922192',
    storeLabel: 'Download on the App Store',
    priceLabel: '$2.99 one-time unlock for Skylight Pro',
    availability: 'Now on the App Store for iPhone',
    gradient: 'from-amber-100 via-white to-cyan-100',
    accent: 'bg-amber-400',
    screenshotPaths: [
      '/apps/skylight/screenshot-1.webp',
      '/apps/skylight/screenshot-2.webp',
      '/apps/skylight/screenshot-3.webp',
    ],
    highlights: [
      'No ads, no account required, no tracking',
      'Radar, AQI, rain timing, and smart outlook cards',
      'Widgets, saved places, and weather alerts',
      'One-time Pro purchase instead of a recurring subscription',
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
        title: 'Skylight Pro',
        items: [
          'Animated precipitation radar over a live map',
          'Real-time AQI with PM2.5 and health guidance',
          '10-day forecast, deeper detail, and smart weather notifications',
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
          'No. Skylight Pro is a one-time $2.99 purchase according to the current App Store listing.',
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
];

export function getAppBySlug(slug: string) {
  return appList.find((app) => app.slug === slug);
}
