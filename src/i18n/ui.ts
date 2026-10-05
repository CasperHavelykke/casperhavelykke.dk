export const langs = ['da', 'en'] as const;
export type Lang = (typeof langs)[number];

export const htmlLang: Record<Lang, string> = { da: 'da', en: 'en' };
export const ogLocale: Record<Lang, string> = { da: 'da_DK', en: 'en_GB' };
export const numberLocale: Record<Lang, string> = { da: 'da-DK', en: 'en-GB' };

const da = {
  'skip.content': 'Gå til indhold',
  'nav.label': 'Hovedmenu',
  'nav.projects': 'Projekter',
  'nav.about': 'Om mig',
  'nav.contact': 'Kontakt',
  'lang.switch': 'English',
  'lang.switchLabel': 'Read this page in English',

  'home.title': 'Frontend-udvikler',
  'home.description':
    'Portfolio for Casper Havelykke: frontend i React og TypeScript, apps og skræddersyede webshopløsninger i Shopify og WooCommerce.',
  'home.intro':
    'Frontend-udvikler. Jeg bygger brugerflader i React og TypeScript, apps til iOS og Android og skræddersyede løsninger til webshops i Shopify og WooCommerce.',
  'home.location': 'Jeg bor i {location} og flytter gerne for det rette job.',
  'home.available': 'Lige nu søger jeg job som udvikler, og jeg er åben for både frontend og backend.',
  'home.cta.projects': 'Se projekter',
  'home.cta.cv': 'Hent CV (PDF)',
  'home.featured': 'Udvalgte projekter',
  'home.allProjects': 'Se alle projekter',
  'home.skills': 'Det arbejder jeg med',
  'measure.label': 'Bredden på overskriften i pixels',

  'projects.title': 'Projekter',
  'projects.description': 'Kundeopgaver og egne projekter af Casper Havelykke.',
  'projects.intro':
    'Opgaver for kunder og projekter, jeg har bygget på egen hånd. Hver case fortæller, hvad problemet var, og hvordan jeg løste det.',
  'projects.client': 'Kundeopgaver',
  'projects.personal': 'Egne projekter',
  'projects.empty': 'Der er ingen projekter i denne kategori endnu.',
  'projects.freelance': 'Som freelancer',
  'projects.freelanceIntro': 'Fra 2018 til 2025 tog jeg opgaver som freelance webudvikler og grafisk designer.',
  'projects.offline': 'ikke længere online',

  'project.kind.client': 'Kundeopgave',
  'project.kind.personal': 'Eget projekt',
  'project.kind.study': 'Studieprojekt',
  'project.draft': 'Kladde',
  'project.read': 'Læs casen',
  'project.meta': 'Om projektet',
  'project.type': 'Type',
  'project.year': 'År',
  'project.role': 'Rolle',
  'project.tech': 'Teknologier',
  'project.links': 'Links',
  'project.link.live': 'Se siden',
  'project.link.repo': 'Kode på GitHub',
  'project.link.appStore': 'App Store',
  'project.link.googlePlay': 'Google Play',
  'project.back': 'Alle projekter',
  'project.next': 'Næste projekt',

  'about.title': 'Om mig',
  'about.description': 'Om Casper Havelykke, og hvordan denne side er bygget.',
  'about.site': 'Om denne side',
  'about.portrait': 'Portræt af {name}',

  'contact.title': 'Kontakt',
  'contact.lead': 'Har du en stilling eller en opgave, jeg kunne passe til, så skriv til mig.',
  'contact.profiles': 'Profiler og CV',
  'contact.cv': 'CV (PDF)',
  'contact.colophon': 'Bygget med Astro og hostet på min egen server.',
} as const;

type Key = keyof typeof da;

const en: Record<Key, string> = {
  'skip.content': 'Skip to content',
  'nav.label': 'Main menu',
  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'lang.switch': 'Dansk',
  'lang.switchLabel': 'Læs siden på dansk',

  'home.title': 'Frontend developer',
  'home.description':
    'Portfolio of Casper Havelykke: frontend in React and TypeScript, apps, and custom e-commerce work in Shopify and WooCommerce.',
  'home.intro':
    'Frontend developer. I build interfaces in React and TypeScript, apps for iOS and Android, and custom solutions for Shopify and WooCommerce stores.',
  'home.location': "I live in {location}, Denmark, and I’m happy to relocate for the right job.",
  'home.available': "I’m currently looking for a developer role, and I’m open to both frontend and backend work.",
  'home.cta.projects': 'See projects',
  'home.cta.cv': 'Download CV (PDF)',
  'home.featured': 'Selected work',
  'home.allProjects': 'See all projects',
  'home.skills': 'What I work with',
  'measure.label': 'Width of the heading in pixels',

  'projects.title': 'Projects',
  'projects.description': 'Client work and personal projects by Casper Havelykke.',
  'projects.intro':
    "Work for clients and projects I’ve built on my own. Each case study covers the problem and how I solved it.",
  'projects.client': 'Client work',
  'projects.personal': 'Personal projects',
  'projects.empty': 'There are no projects in this category yet.',
  'projects.freelance': 'As a freelancer',
  'projects.freelanceIntro': 'From 2018 to 2025 I took on work as a freelance web developer and graphic designer.',
  'projects.offline': 'no longer online',

  'project.kind.client': 'Client project',
  'project.kind.personal': 'Personal project',
  'project.kind.study': 'Study project',
  'project.draft': 'Draft',
  'project.read': 'Read the case study',
  'project.meta': 'About the project',
  'project.type': 'Type',
  'project.year': 'Year',
  'project.role': 'Role',
  'project.tech': 'Tech',
  'project.links': 'Links',
  'project.link.live': 'Visit site',
  'project.link.repo': 'Code on GitHub',
  'project.link.appStore': 'App Store',
  'project.link.googlePlay': 'Google Play',
  'project.back': 'All projects',
  'project.next': 'Next project',

  'about.title': 'About me',
  'about.description': 'About Casper Havelykke and how this site is built.',
  'about.site': 'About this site',
  'about.portrait': 'Portrait of {name}',

  'contact.title': 'Contact',
  'contact.lead': 'If you have a role or a project I might be a good fit for, send me an email.',
  'contact.profiles': 'Profiles and CV',
  'contact.cv': 'CV (PDF)',
  'contact.colophon': 'Built with Astro and hosted on my own server.',
};

const strings: Record<Lang, Record<Key, string>> = { da, en };

export function useTranslations(lang: Lang) {
  return (key: Key, vars: Record<string, string> = {}) =>
    strings[lang][key].replace(/\{(\w+)\}/g, (_, name: string) => vars[name] ?? '');
}
