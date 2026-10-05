import type { Lang } from '../i18n/ui';

type Group = { title: string; items: string[] };

export const skills: Record<Lang, Group[]> = {
  da: [
    {
      title: 'Frontend',
      items: ['TypeScript og JavaScript', 'React og Next.js', 'Astro', 'HTML og CSS', 'Tailwind CSS'],
    },
    {
      title: 'Apps',
      items: ['React Native og Expo', 'Progressive Web Apps', 'Udgivelse i App Store og Google Play'],
    },
    {
      title: 'Webshops og CMS',
      items: ['Shopify og Liquid', 'WooCommerce', 'WordPress, Elementor og Divi', 'PHP'],
    },
    {
      title: 'Backend og drift',
      items: ['Node.js og GraphQL', 'Firebase og Firestore', 'SQLite', 'OAuth 2.0 og MCP', 'Linux-server med Caddy'],
    },
    {
      title: 'Værktøjer',
      items: ['Git', 'Claude Code', 'Photoshop'],
    },
  ],
  en: [
    {
      title: 'Frontend',
      items: ['TypeScript and JavaScript', 'React and Next.js', 'Astro', 'HTML and CSS', 'Tailwind CSS'],
    },
    {
      title: 'Apps',
      items: ['React Native and Expo', 'Progressive Web Apps', 'Publishing to the App Store and Google Play'],
    },
    {
      title: 'E-commerce and CMS',
      items: ['Shopify and Liquid', 'WooCommerce', 'WordPress, Elementor and Divi', 'PHP'],
    },
    {
      title: 'Backend and hosting',
      items: ['Node.js and GraphQL', 'Firebase and Firestore', 'SQLite', 'OAuth 2.0 and MCP', 'Linux server with Caddy'],
    },
    {
      title: 'Tools',
      items: ['Git', 'Claude Code', 'Photoshop'],
    },
  ],
};
