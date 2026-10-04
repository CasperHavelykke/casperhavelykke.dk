// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://casperhavelykke.dk',
  trailingSlash: 'always',

  // Astro 7 defaults to JSX whitespace rules, which silently drop the space
  // between a line of text and a link on the next line. Keep HTML rules.
  compressHTML: true,

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },

  integrations: [react(), mdx(), sitemap()],

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-schibsted',
      weights: ['400 900'],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Fragment Mono',
      cssVariable: '--font-fragment',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['monospace'],
    },
  ],

  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
