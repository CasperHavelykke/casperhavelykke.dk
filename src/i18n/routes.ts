import type { Lang } from './ui';

/** Danish lives at the root, English under /en/. Section names are translated. */
export const routes = {
  home: { da: '/', en: '/en/' },
  projects: { da: '/projekter/', en: '/en/projects/' },
  about: { da: '/om/', en: '/en/about/' },
} satisfies Record<string, Record<Lang, string>>;

export type Alternates = Record<Lang, string>;

export const projectPath = (lang: Lang, slug: string) => `${routes.projects[lang]}${slug}/`;
