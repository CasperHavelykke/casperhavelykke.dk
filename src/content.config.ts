import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * One MDX file per project and language:
 *   src/content/projects/da/<name>.mdx
 *   src/content/projects/en/<name>.mdx
 * The two translations of a project share the file name. The URL uses the
 * file name too, unless the file sets its own `slug`.
 */
const projects = defineCollection({
  loader: glob({
    pattern: '{da,en}/*.{md,mdx}',
    base: './src/content/projects',
    generateId: ({ entry, data }) => {
      const [lang, file] = entry.split('/');
      const slug = typeof data.slug === 'string' ? data.slug : file.replace(/\.mdx?$/, '');
      return `${lang}/${slug}`;
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      kind: z.enum(['client', 'personal']),
      year: z.string().optional(),
      role: z.string().optional(),
      tech: z.array(z.string()).default([]),
      links: z
        .object({
          live: z.url().optional(),
          repo: z.url().optional(),
          appStore: z.url().optional(),
          googlePlay: z.url().optional(),
        })
        .default({}),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Shown on the front page. */
      featured: z.boolean().default(false),
      /** Lower numbers come first. */
      order: z.number().default(100),
      /** Drafts show up locally (`npm run dev`) but are left out of the build. */
      draft: z.boolean().default(false),
      slug: z.string().optional(),
    }),
});

export const collections = { projects };
