import type { Lang } from '../i18n/ui';

type Job = {
  name: string;
  url?: string;
  /** The site has been taken down, so it gets a note instead of a link. */
  offline?: boolean;
  year: string;
  work: Record<Lang, string>;
};

/** Smaller freelance jobs, listed under the client case studies. Same order as the CV. */
export const freelance: Job[] = [
  {
    name: 'egulve.dk',
    url: 'https://egulve.dk',
    year: '2021',
    work: {
      da: 'Kvm-prisberegner til gulvene i Shopify, bygget i JavaScript og Liquid',
      en: 'Square-metre price calculator for the flooring in Shopify, built in JavaScript and Liquid',
    },
  },
  {
    name: 'df3.dk',
    offline: true,
    year: '2023',
    work: {
      da: 'Komplet WordPress-side med Divi til et projekt i Glyngøre, med egne tilpasninger af tema og galleri',
      en: 'A complete WordPress site with Divi for a project in Glyngøre, with my own changes to the theme and gallery',
    },
  },
  {
    name: 'regneregler.dk',
    url: 'https://regneregler.dk',
    year: '2023',
    work: {
      da: 'Genopbygget fra en forældet kodebase i WordPress med Elementor, med det oprindelige design 1:1',
      en: 'Rebuilt from an outdated codebase in WordPress with Elementor, keeping the original design 1:1',
    },
  },
  { name: 'Blucon ApS', year: '2019', work: { da: 'WordPress', en: 'WordPress' } },
  { name: 'jungesalarmer.dk', offline: true, year: '2019', work: { da: 'WordPress', en: 'WordPress' } },
  {
    name: 'Excellent Systems A/S',
    url: 'https://skoleplast.dk',
    year: '2019',
    work: {
      da: 'Illustrationer af direktøren, som stadig bruges på skoleplast.dk, og frilægning af billeder i Photoshop',
      en: "Illustrations of the company's director, still in use on skoleplast.dk, and image cut-outs in Photoshop",
    },
  },
];
