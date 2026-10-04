import type { Lang } from './i18n/ui';

/**
 * Personal details shown across the site. Links and files that are `null`
 * are hidden until they are filled in, so the site never shows a dead link.
 */
export const site = {
  name: 'Casper Havelykke',

  email: 'c.havelykke@outlook.com',

  // TODO: Indsæt links til dine profiler.
  github: null as string | null,
  linkedin: null as string | null,

  // TODO: Skriv din by, fx 'Aarhus'. Vises i introduktionen på forsiden.
  location: null as string | null,

  // TODO: Læg CV'erne i public/cv/ og skriv stierne her, fx '/cv/casper-havelykke-cv.pdf'.
  cv: { da: null, en: null } as Record<Lang, string | null>,

  // TODO: Læg et 1200×630 px billede i public/ til deling på LinkedIn m.fl., fx '/og.png'.
  ogImage: null as string | null,
};
