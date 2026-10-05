# casperhavelykke.dk

My portfolio as a developer: case studies from client work and my own apps, in Danish and English. Built with Astro and served from a small server in my apartment.

**Live:** [casperhavelykke.dk](https://casperhavelykke.dk), and in English at [casperhavelykke.dk/en/](https://casperhavelykke.dk/en/)

> **Note on reuse:** This repository is public as a portfolio piece. There is deliberately no open source license, so all rights are reserved. You're welcome to read the code, but please don't reuse the texts, images or CV.

## What's on the site

- **Six case studies.** Two client projects from my job at Brating: a nine-step funeral order form in WooCommerce for Bedemand Haack, and a floor finder with square-metre calculators in Shopify for Gulvgiganten. Then my own apps Røket, Pejling and Loggen, and Socielly, my bachelor project from before AI coding tools.
- **Calculators you can try.** The Shopify calculators are recreated as React components and run on the case page.
- **About me, freelance work and a CV.** Freelance jobs since 2018 are listed with the client work, and the CV is a PDF.

## How it's built

| Layer | Choice |
|---|---|
| Framework | Astro 7 with static output, TypeScript |
| Content | MDX in content collections, validated with a Zod schema |
| Interactivity | React 19 islands, hydrated when they scroll into view |
| Styling | Tailwind CSS v4 on CSS-variable tokens, with a light and a dark theme |
| Type | Schibsted Grotesk and Fragment Mono through Astro's Fonts API, served from the site itself |
| Hosting | Caddy and Let's Encrypt on Ubuntu, running on a Lenovo ThinkCentre M920q |

Choices worth a look:

- **Two languages from one structure.** Danish is at `/` and English at `/en/`, with translated section paths such as `/projekter/` and `/en/projects/`. The two files for a case study share a file name, which is what links them, and an optional `slug` gives each language its own URL. Every page has hreflang links, and the language switch lands on the same page in the other language.
- **A launch guard.** `npm run check:launch` fails while a `TODO`, a `<Todo>` box or `draft: true` is left in `src`. The deploy script runs it before every build, so unfinished work can't reach the server.
- **One bold element.** The front page measures the name with a `ResizeObserver` and draws a dimension line with its width in pixels. Everything else stays quiet: one cobalt ink in a few strengths on porcelain, which turns into a blueprint in dark mode.
- **Accessible and light.** There's a skip link, visible focus, keyboard-operable calculators and reduced motion when the system asks for it, and axe reports no violations on any page in either theme. Pages are static HTML, images are resized to WebP at build time, React only loads on the two calculator pages, and hashed assets are cached for a year.

## Project structure

```text
src/
  content/projects/{da,en}/  case studies in MDX, one file per language
  content/about/             the about page in both languages
  components/                Astro components and the React calculators
  views/                     the pages; src/pages only holds thin routes
  i18n/                      UI strings and translated routes
  data/                      the skills list and freelance work
  config.ts                  name, email, profiles and CV
scripts/
  check-launch.mjs           the launch guard
  deploy.sh                  pulls, checks, builds and syncs on the server
  og-image.html              source of the share image
```

A new case study takes two files with the same name: `src/content/projects/da/<name>.mdx` and `src/content/projects/en/<name>.mdx`. The schema in `src/content.config.ts` lists the fields. `featured: true` puts a case on the front page, `order` sorts it, and `draft: true` shows it in development only.

## Running it locally

```bash
npm install
npm run dev
```

Requires Node 22.12 or newer.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server at `localhost:4321`, with drafts shown |
| `npm run build` | Builds the site to `dist/`, without drafts |
| `npm run preview` | Serves the build locally |
| `npm run check` | Type-checks the project |
| `npm run check:launch` | Lists everything that blocks a launch |

## Deployment

The site is static, so Caddy serves `dist/` directly and Node is only used to build it. On the server, `scripts/deploy.sh` pulls, runs the launch guard, builds and syncs the result to `/var/www/casperhavelykke.dk`. It stops at the first error, so the live site is never half updated.

```caddy
casperhavelykke.dk {
	root * /var/www/casperhavelykke.dk
	encode zstd gzip
	file_server

	@assets path /_astro/*
	header @assets Cache-Control "public, max-age=31536000, immutable"

	handle_errors {
		@404 expression {err.status_code} == 404
		rewrite @404 /404.html
		file_server
	}
}

www.casperhavelykke.dk {
	redir https://casperhavelykke.dk{uri} permanent
}
```

---

Built by **Casper Havelykke** · [casperhavelykke.dk](https://casperhavelykke.dk)
