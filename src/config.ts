import type { Lang } from './i18n/ui';

/**
 * Personal details shown across the site. Links and files that are `null`
 * are hidden until they are filled in, so the site never shows a dead link.
 */
export const site = {
  name: 'Casper Havelykke',

  email: 'c.havelykke@outlook.com',

  github: 'https://github.com/CasperHavelykke' as string | null,
  linkedin: 'https://www.linkedin.com/in/casper-havelykke-larsen/' as string | null,
  worksome: 'https://use.worksome.com/profile/42356' as string | null,

  /** Shown in the introduction on the front page. */
  location: 'Kalundborg' as string | null,

  /** The CV is in English, so both languages share it. */
  cv: {
    da: '/cv/casper-havelykke-larsen-cv.pdf',
    en: '/cv/casper-havelykke-larsen-cv.pdf',
  } as Record<Lang, string | null>,

  /** Shown when the site is shared on LinkedIn and elsewhere. Made from scripts/og-image.html. */
  ogImage: '/og.png' as string | null,
};
