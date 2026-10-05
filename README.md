# casperhavelykke.dk

Min portfolio, bygget med [Astro](https://docs.astro.build), TypeScript, Tailwind CSS og MDX. Siden findes på dansk (`/`) og engelsk (`/en/`).

## Kom i gang

```sh
npm install
npm run dev          # http://localhost:4321
```

| Kommando               | Hvad den gør                                              |
| :--------------------- | :-------------------------------------------------------- |
| `npm run dev`          | Starter udviklingsserveren. Kladder vises her.            |
| `npm run build`        | Bygger den færdige side til `dist/`. Kladder udelades.    |
| `npm run preview`      | Viser det byggede site lokalt.                            |
| `npm run check`        | Typetjek af hele projektet.                               |
| `npm run check:launch` | Viser alt, der mangler, før siden må gå online.           |

## Indhold

| Hvad                         | Hvor                                          |
| :--------------------------- | :-------------------------------------------- |
| Navn, mail, profiler, CV     | `src/config.ts`                               |
| Projekter                    | `src/content/projects/da/` og `.../en/`       |
| Om mig                       | `src/content/about/da.mdx` og `en.mdx`        |
| Teknologilisten på forsiden  | `src/data/skills.ts`                          |
| Tekster i menu, knapper m.m. | `src/i18n/ui.ts`                              |

### Tilføj et projekt

1. Opret `src/content/projects/da/<navn>.mdx` og `src/content/projects/en/<navn>.mdx` med samme filnavn. Det er sådan, de to sprog kobles sammen.
2. Udfyld felterne i toppen af filen (se de eksisterende projekter og skemaet i `src/content.config.ts`):
   - `kind`: `client` eller `personal`
   - `featured: true` viser projektet på forsiden, og `order` styrer rækkefølgen.
   - `slug` giver den engelske udgave sin egen URL, fx `slug: shopify-sections`.
   - `draft: true` viser projektet lokalt, men udelader det fra det byggede site.
3. Skriv casen: problem, løsning og resultat.

### Billeder

Læg skærmbilleder i `src/assets/projects/` og henvis til dem fra projektfilen:

```yaml
cover: ../../../assets/projects/bedemand.png
coverAlt: Produktvælgeren, hvor kunden sammensætter sin bestilling
```

Astro laver automatisk mindre udgaver i moderne formater. Billeder inde i selve casen indsættes med almindelig Markdown: `![Beskrivelse](../../../assets/projects/billede.png)`.

### CV

`public/cv/casper-havelykke-larsen-cv.pdf` er dit CV (`CV_General.html`) printet til PDF med Chrome, men uden telefonnummeret, fordi alle kan hente filen. Lav den på samme måde, når CV'et ændrer sig.

### Det, der mangler

`<Todo>…</Todo>` markerer tekst, der skal skrives. Den kan bruges i alle MDX-filer uden import og vises som en stiplet boks. `// TODO:`-kommentarer markerer resten.

## Før siden går online

Kør `npm run check:launch`. Den viser hver TODO og hver kladde og afslutter med en fejl, så længe der er noget tilbage.

- [ ] Alle cases er skrevet, og `draft: true` er fjernet.
- [x] Kunderne har sagt ja til at blive vist, eller casen er anonym.
- [x] Skærmbilleder er lagt ind med `cover` og `coverAlt`.
- [x] `src/config.ts`: mail, LinkedIn, GitHub, by og CV'er (PDF i `public/cv/`).
- [ ] Delingsbillede på 1200×630 px i `public/`, angivet som `ogImage` i `src/config.ts`.
- [ ] Teknologilisten i `src/data/skills.ts` er gennemgået.
- [ ] Siden er tjekket på mobil, i lyst og mørkt tema og med tastatur.
- [ ] Repoet på GitHub er gjort offentligt (*Settings → Change visibility*), så linket på "Om mig" virker.

## Drift

Siden er statisk. `npm run build` laver mappen `dist/`, som Caddy serverer direkte. Node bruges kun til at bygge, så der kører ingen Node-proces på serveren.

### Første gang

1. **DNS hos Simply:** A-posterne for `casperhavelykke.dk` og `www.casperhavelykke.dk` skal pege på serverens IP, den samme som loggen.app. Lad MX-posten være.
2. **Koden på serveren:** Det kræver Node 22.12 eller nyere, og at repoet er offentligt, eller at serveren har adgang til det.

   ```sh
   git clone https://github.com/CasperHavelykke/casperhavelykke.dk.git ~/casperhavelykke.dk
   sudo mkdir -p /var/www/casperhavelykke.dk
   sudo chown "$USER": /var/www/casperhavelykke.dk
   cd ~/casperhavelykke.dk && ./scripts/deploy.sh
   ```

3. **Caddy:** Læg blokken herunder i `/etc/caddy/Caddyfile`, og kør `sudo systemctl reload caddy`. Vent, til DNS peger på serveren, så Caddy kan hente certifikatet med det samme.

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

### Opdateringer

Push til GitHub, og kør `./scripts/deploy.sh` fra `~/casperhavelykke.dk` på serveren. Scriptet henter koden, kører `check:launch`, bygger og lægger siden ud. Det stopper, hvis noget fejler, så siden aldrig bliver halvt opdateret.
