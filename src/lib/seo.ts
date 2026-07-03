const SITE_URL = 'https://getsavit.netlify.app';
const BRAND_NAME = 'Savit';
const AUTHOR_NAME = 'Richmond Constante';
const AUTHOR_URL = 'https://rcconstante.dev';
const THEME_COLOR = '#0D9488';
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;
const DEFAULT_IMAGE_WIDTH = '1045';
const DEFAULT_IMAGE_HEIGHT = '1341';

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

type StructuredData = JsonLdValue | JsonLdValue[];

export type SeoConfig = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  structuredData?: StructuredData;
};

const defaultKeywords = [
  'Savit',
  'bookmark manager',
  'save links',
  'content organizer',
  'read later app',
  'personal content library',
  'link organizer',
];

const publisher = {
  '@type': 'Person',
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
};

const appStoreUrl = 'https://apps.apple.com/us/app/savit-save-it-later-bookmark/id6763529989';

const buildUrl = (path: string) => {
  const normalizedPath = path === '/' ? '' : path;
  return `${SITE_URL}${normalizedPath}`;
};

const buildWebPageSchema = (config: SeoConfig): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: config.title,
  description: config.description,
  url: buildUrl(config.path),
  inLanguage: 'en-US',
  isPartOf: {
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: SITE_URL,
  },
  publisher,
});

export const HOME_SEO: SeoConfig = {
  title: 'Savit | Save It. Find It. Never Lose It.',
  description:
    'Savit is a personal content library for saving links, images, and text from any app, then organizing everything with collections and tags.',
  path: '/',
  image: DEFAULT_IMAGE,
  imageAlt: 'Savit app preview showing saved links and organized collections',
  imageWidth: DEFAULT_IMAGE_WIDTH,
  imageHeight: DEFAULT_IMAGE_HEIGHT,
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: BRAND_NAME,
      url: SITE_URL,
      description:
        'A personal content library for saving, organizing, and finding links, images, and text.',
      inLanguage: 'en-US',
      publisher,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: BRAND_NAME,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'iOS, Android',
      description:
        'Save links, images, and text from any app. Organize with collections and tags. Find anything instantly.',
      image: DEFAULT_IMAGE,
      url: SITE_URL,
      downloadUrl: appStoreUrl,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: publisher,
      publisher,
    },
  ],
};

export const PAGE_SEO = {
  privacy: {
    title: 'Privacy Policy | Savit',
    description:
      'Read the Savit Privacy Policy. Your saved content stays on your device, and Savit does not collect, sell, or share your personal data.',
    path: '/privacy',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'PrivacyPolicy',
      name: 'Savit Privacy Policy',
      url: buildUrl('/privacy'),
      publisher,
    },
  },
  terms: {
    title: 'Terms of Service | Savit',
    description:
      'Read the Savit Terms of Service for the content saving and organization app.',
    path: '/terms',
  },
  license: {
    title: 'Open Source Licenses | Savit',
    description:
      'Review the open-source licenses for third-party libraries used by Savit.',
    path: '/license',
  },
  support: {
    title: 'Support | Savit',
    description:
      'Get help with Savit, including email support, frequently asked questions, and troubleshooting information.',
    path: '/support',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Savit Support',
      description:
        'Support resources for Savit, including email support, FAQs, and troubleshooting information.',
      url: buildUrl('/support'),
      publisher,
    },
  },
} satisfies Record<string, SeoConfig>;

const ensureMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const ensureCanonical = (href: string) => {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const ensureStructuredData = (data: StructuredData) => {
  let element = document.querySelector<HTMLScriptElement>('#savit-structured-data');

  if (!element) {
    element = document.createElement('script');
    element.id = 'savit-structured-data';
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
};

export const applySeo = (config: SeoConfig) => {
  const canonicalUrl = buildUrl(config.path);
  const image = config.image ?? DEFAULT_IMAGE;
  const imageAlt = config.imageAlt ?? 'Savit app preview';
  const imageWidth = config.imageWidth ?? DEFAULT_IMAGE_WIDTH;
  const imageHeight = config.imageHeight ?? DEFAULT_IMAGE_HEIGHT;

  document.documentElement.lang = 'en';
  document.title = config.title;

  ensureCanonical(canonicalUrl);
  ensureMeta('name', 'description', config.description);
  ensureMeta('name', 'keywords', (config.keywords ?? defaultKeywords).join(', '));
  ensureMeta('name', 'author', AUTHOR_NAME);
  ensureMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  ensureMeta('name', 'theme-color', THEME_COLOR);

  ensureMeta('property', 'og:type', config.type ?? 'website');
  ensureMeta('property', 'og:url', canonicalUrl);
  ensureMeta('property', 'og:title', config.title);
  ensureMeta('property', 'og:description', config.description);
  ensureMeta('property', 'og:image', image);
  ensureMeta('property', 'og:image:alt', imageAlt);
  ensureMeta('property', 'og:image:width', imageWidth);
  ensureMeta('property', 'og:image:height', imageHeight);
  ensureMeta('property', 'og:site_name', BRAND_NAME);
  ensureMeta('property', 'og:locale', 'en_US');

  ensureMeta('name', 'twitter:card', 'summary_large_image');
  ensureMeta('name', 'twitter:title', config.title);
  ensureMeta('name', 'twitter:description', config.description);
  ensureMeta('name', 'twitter:image', image);
  ensureMeta('name', 'twitter:image:alt', imageAlt);

  ensureStructuredData(config.structuredData ?? buildWebPageSchema(config));

  return () => {
    if (config.path !== HOME_SEO.path) {
      applySeo(HOME_SEO);
    }
  };
};
