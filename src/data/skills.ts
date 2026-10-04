import type { Lang } from '../i18n/ui';

type Group = { title: string; items: string[] };

// TODO: Gennemgå listen, så den kun indeholder det, du gerne vil tale om til en samtale.
export const skills: Record<Lang, Group[]> = {
  da: [
    {
      title: 'Frontend',
      items: ['TypeScript og JavaScript', 'React og Next.js', 'Astro', 'HTML og CSS', 'Tailwind CSS'],
    },
    {
      title: 'Apps',
      items: ['React Native', 'Progressive Web Apps', 'Udgivelse i App Store og Google Play'],
    },
    {
      title: 'Webshops og CMS',
      items: ['Shopify og Liquid', 'WooCommerce', 'WordPress', 'PHP'],
    },
    {
      title: 'Backend og drift',
      items: ['Node.js', 'Prisma og MariaDB', 'Auth.js', 'Linux-server med Caddy'],
    },
  ],
  en: [
    {
      title: 'Frontend',
      items: ['TypeScript and JavaScript', 'React and Next.js', 'Astro', 'HTML and CSS', 'Tailwind CSS'],
    },
    {
      title: 'Apps',
      items: ['React Native', 'Progressive Web Apps', 'Publishing to the App Store and Google Play'],
    },
    {
      title: 'E-commerce and CMS',
      items: ['Shopify and Liquid', 'WooCommerce', 'WordPress', 'PHP'],
    },
    {
      title: 'Backend and hosting',
      items: ['Node.js', 'Prisma and MariaDB', 'Auth.js', 'Linux server with Caddy'],
    },
  ],
};
