## Project

Job-hunting portfolio for casperhavelykke.dk. The owner writes in Danish; answer in Danish. Static Astro 7 site, served by Caddy on the owner's own Ubuntu server. It must not go online until `npm run check:launch` passes.

- Two languages: Danish at `/`, English at `/en/`. Section paths are translated (`routes` in `src/i18n/routes.ts`), UI strings live in `src/i18n/ui.ts`. Every page passes both language URLs to `Base.astro` for the language switch and hreflang.
- Projects: `src/content/projects/{da,en}/<name>.mdx`. The shared file name links translations; `slug` in frontmatter overrides the URL per language (handled by `generateId` in `src/content.config.ts`). `draft: true` entries render in dev only.
- Route files in `src/pages` are thin; the pages live in `src/views`.
- Design: porcelain and cobalt, one ink in a few strengths, no other hues. Colors are CSS variables in `src/styles/global.css` with a dark ("blueprint") variant. Type is Schibsted Grotesk via the Fonts API, Fragment Mono for code only. The hero's live dimension line (`MeasuredName.astro`) is the one bold element; keep the rest quiet.
- `compressHTML: true` is deliberate: Astro 7's JSX whitespace default drops spaces between text and links on separate lines.
- Grids that hold long content need `grid-cols-1` on mobile, or code blocks push the page wider than the screen.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
