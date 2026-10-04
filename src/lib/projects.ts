import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { projectPath, routes, type Alternates } from '../i18n/routes';

export type Project = CollectionEntry<'projects'>;

const includeDrafts = import.meta.env.DEV;

export const projectLang = (project: Project) => project.id.split('/')[0] as Lang;

export const projectSlug = (project: Project) => project.id.slice(project.id.indexOf('/') + 1);

/** Translations of the same project share a file name. */
const projectKey = (project: Project) =>
  project.filePath?.split(/[\\/]/).pop()?.replace(/\.mdx?$/, '') ?? projectSlug(project);

const isPublished = (project: Project) => includeDrafts || !project.data.draft;

export async function getProjects(lang: Lang) {
  const projects = await getCollection(
    'projects',
    (project) => projectLang(project) === lang && isPublished(project),
  );

  return projects.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title, lang),
  );
}

/** Where the language switcher should go: the translated case, or the project list if there is none. */
export async function getProjectAlternates(project: Project): Promise<Alternates> {
  const key = projectKey(project);
  const translations = await getCollection(
    'projects',
    (entry) => projectKey(entry) === key && isPublished(entry),
  );

  const pathFor = (lang: Lang) => {
    const match = translations.find((entry) => projectLang(entry) === lang);
    return match ? projectPath(lang, projectSlug(match)) : routes.projects[lang];
  };

  return { da: pathFor('da'), en: pathFor('en') };
}
