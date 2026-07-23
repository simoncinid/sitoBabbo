import fallbackArticles from '../data/articles.json';

const slugify = (value = '') => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');

export const formatArticleDate = (value, long = false) => {
  if (!value) return '';
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);
  return new Intl.DateTimeFormat('it-IT', long
    ? { day: 'numeric', month: 'long', year: 'numeric' }
    : { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
};

export async function fetchArticles() {
  try {
    const response = await fetch('/api/articles', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Articoli non disponibili');
    const data = await response.json();
    return data.articles;
  } catch {
    return fallbackArticles
      .filter((article) => article.published)
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  }
}

export async function fetchArticle(slug) {
  try {
    const response = await fetch(`/api/articles?slug=${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Articolo non disponibile');
    const data = await response.json();
    return data.article;
  } catch {
    return fallbackArticles.find((article) => article.published && article.slug === slug)
      || fallbackArticles.find((article) => article.published && slugify(article.title) === slug)
      || null;
  }
}

export { slugify };
