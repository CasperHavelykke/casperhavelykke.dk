import type { Lang } from '../i18n/ui';

type Job = {
  name: string;
  url?: string;
  year: string;
  work: Record<Lang, string>;
};

/** Smaller freelance jobs, listed under the client case studies. Same order as the CV. */
export const freelance: Job[] = [
  {
    name: 'egulve.dk',
    url: 'https://egulve.dk',
    year: '2021',
    work: { da: 'Shopify, søgefilter, JavaScript og Liquid', en: 'Shopify, search filter, JavaScript and Liquid' },
  },
  {
    name: 'df3.dk',
    url: 'https://df3.dk',
    year: '2023',
    work: { da: 'WordPress, Divi, HTML og CSS', en: 'WordPress, Divi, HTML and CSS' },
  },
  {
    name: 'regneregler.dk',
    url: 'https://regneregler.dk',
    year: '2023',
    work: { da: 'WordPress, Elementor og JavaScript', en: 'WordPress, Elementor and JavaScript' },
  },
  { name: 'Prima Terapi', year: '2022', work: { da: 'WordPress', en: 'WordPress' } },
  { name: 'Blucon ApS', year: '2019', work: { da: 'WordPress', en: 'WordPress' } },
  { name: 'jungesalarmer.dk', url: 'https://jungesalarmer.dk', year: '2019', work: { da: 'WordPress', en: 'WordPress' } },
  {
    name: 'Excellent Systems A/S',
    year: '2019',
    work: {
      da: 'Billedbehandling, logoopsætning og illustrationer i Photoshop',
      en: 'Image editing, logo layout and custom illustrations in Photoshop',
    },
  },
];
