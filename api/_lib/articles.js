const defaultArticles = require('../../src/data/articles.json');
const { ensureSchema, getDatabaseKind, query } = require('./db');

function slugify(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 220) || 'articolo';
}

function parseGallery(value) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch {
    return [];
  }
}

function toArticle(row) {
  const date = row.published_at instanceof Date
    ? row.published_at.toISOString().slice(0, 10)
    : String(row.published_at || '').slice(0, 10);

  return {
    id: Number(row.id),
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image_url || '',
    gallery: parseGallery(row.gallery_json),
    category: row.category,
    author: row.author,
    readTime: row.read_time,
    publishedAt: date,
    published: Boolean(row.is_published),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeArticle(input = {}) {
  const title = String(input.title || '').trim();
  const excerpt = String(input.excerpt || '').trim();
  const content = String(input.content || '').trim();
  const publishedAt = String(input.publishedAt || '').slice(0, 10);

  if (!title || !excerpt || !content || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    const error = new Error('Titolo, riassunto, contenuto e data sono obbligatori.');
    error.statusCode = 400;
    throw error;
  }

  return {
    title: title.slice(0, 255),
    slug: slugify(input.slug || title),
    excerpt,
    content,
    image: String(input.image || '').trim(),
    gallery: parseGallery(input.gallery),
    category: String(input.category || 'Guide').trim().slice(0, 100) || 'Guide',
    author: String(input.author || 'Mauro Simoncini').trim().slice(0, 120) || 'Mauro Simoncini',
    readTime: String(input.readTime || '5 min').trim().slice(0, 30) || '5 min',
    publishedAt,
    published: input.published !== false,
  };
}

function normalizeId(id) {
  const value = Number(id);
  if (!Number.isSafeInteger(value) || value <= 0) {
    const error = new Error('Identificativo articolo non valido.');
    error.statusCode = 400;
    throw error;
  }
  return value;
}

async function makeUniqueSlug(candidate, excludeId) {
  const base = slugify(candidate);
  let slug = base;
  let suffix = 2;

  while (true) {
    const params = excludeId ? [slug, Number(excludeId)] : [slug];
    const condition = excludeId ? 'slug = ? AND id <> ?' : 'slug = ?';
    const result = await query(`SELECT id FROM articles WHERE ${condition} LIMIT 1`, params);
    if (!result.rows.length) return slug;
    slug = `${base}-${suffix++}`.slice(0, 255);
  }
}

async function insertArticle(input, options = {}) {
  const article = normalizeArticle(input);
  article.slug = await makeUniqueSlug(article.slug);

  const columns = `
    title, slug, excerpt, content, image_url, gallery_json, category,
    author, read_time, published_at, is_published
  `;
  const placeholders = '?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?';
  const values = [
    article.title,
    article.slug,
    article.excerpt,
    article.content,
    article.image,
    JSON.stringify(article.gallery),
    article.category,
    article.author,
    article.readTime,
    article.publishedAt,
    article.published,
  ];

  let sql;
  if (getDatabaseKind() === 'postgres') {
    sql = `INSERT INTO articles (${columns}) VALUES (${placeholders})`;
    sql += options.ignoreConflict ? ' ON CONFLICT (slug) DO NOTHING RETURNING id' : ' RETURNING id';
  } else {
    sql = `${options.ignoreConflict ? 'INSERT IGNORE' : 'INSERT'} INTO articles (${columns}) VALUES (${placeholders})`;
  }

  const result = await query(sql, values);
  if (!result.insertId) return null;
  return getArticleById(result.insertId, true);
}

async function seedArticlesOnce() {
  const marker = await query('SELECT meta_value FROM app_meta WHERE meta_key = ? LIMIT 1', ['articles_seed_v1']);
  if (marker.rows.length) return;

  for (const article of defaultArticles) {
    await insertArticle(article, { ignoreConflict: true });
  }

  if (getDatabaseKind() === 'postgres') {
    await query(
      'INSERT INTO app_meta (meta_key, meta_value) VALUES (?, ?) ON CONFLICT (meta_key) DO NOTHING',
      ['articles_seed_v1', new Date().toISOString()],
    );
  } else {
    await query(
      'INSERT IGNORE INTO app_meta (meta_key, meta_value) VALUES (?, ?)',
      ['articles_seed_v1', new Date().toISOString()],
    );
  }
}

async function prepare() {
  await ensureSchema();
  await seedArticlesOnce();
}

async function listArticles(includeDrafts = false) {
  await prepare();
  const result = await query(`
    SELECT *
    FROM articles
    ${includeDrafts ? '' : 'WHERE is_published = TRUE'}
    ORDER BY published_at DESC, id DESC
  `);
  return result.rows.map(toArticle);
}

async function getArticleById(id, includeDrafts = false) {
  await ensureSchema();
  const articleId = normalizeId(id);
  const result = await query(
    `SELECT * FROM articles WHERE id = ? ${includeDrafts ? '' : 'AND is_published = TRUE'} LIMIT 1`,
    [articleId],
  );
  return result.rows[0] ? toArticle(result.rows[0]) : null;
}

async function getArticleBySlug(slug) {
  await prepare();
  const result = await query(
    'SELECT * FROM articles WHERE slug = ? AND is_published = TRUE LIMIT 1',
    [String(slug || '')],
  );
  return result.rows[0] ? toArticle(result.rows[0]) : null;
}

async function createArticle(input) {
  await prepare();
  return insertArticle(input);
}

async function updateArticle(id, input) {
  await prepare();
  const articleId = normalizeId(id);
  const article = normalizeArticle(input);
  article.slug = await makeUniqueSlug(article.slug, articleId);

  const updatedAt = getDatabaseKind() === 'postgres' ? ', updated_at = CURRENT_TIMESTAMP' : '';
  const result = await query(`
    UPDATE articles
    SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?,
        gallery_json = ?, category = ?, author = ?, read_time = ?,
        published_at = ?, is_published = ?${updatedAt}
    WHERE id = ?
  `, [
    article.title,
    article.slug,
    article.excerpt,
    article.content,
    article.image,
    JSON.stringify(article.gallery),
    article.category,
    article.author,
    article.readTime,
    article.publishedAt,
    article.published,
    articleId,
  ]);

  if (!result.rowCount) return null;
  return getArticleById(articleId, true);
}

async function deleteArticle(id) {
  await prepare();
  const result = await query('DELETE FROM articles WHERE id = ?', [normalizeId(id)]);
  return result.rowCount > 0;
}

async function duplicateArticle(id) {
  await prepare();
  const source = await getArticleById(normalizeId(id), true);
  if (!source) return null;

  return insertArticle({
    ...source,
    title: `${source.title} (copia)`,
    slug: `${source.slug}-copia`,
    published: false,
  });
}

module.exports = {
  createArticle,
  deleteArticle,
  duplicateArticle,
  getArticleBySlug,
  listArticles,
  slugify,
  updateArticle,
};
