const mysql = require('mysql2/promise');
const { Pool: PostgresPool } = require('pg');

const REQUIRED_ENV = ['DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT', 'DB_USER'];
let pool;
let schemaPromise;

function getDatabaseKind() {
  const explicit = String(process.env.DB_DIALECT || '').toLowerCase();
  if (explicit === 'postgres' || explicit === 'postgresql' || explicit === 'pg') return 'postgres';
  if (explicit === 'mysql' || explicit === 'mariadb') return 'mysql';
  return String(process.env.DB_PORT) === '5432' ? 'postgres' : 'mysql';
}

function getCertificate() {
  const value = process.env.TLS_CERT;
  if (!value) return undefined;

  const withNewlines = value.replace(/\\n/g, '\n');
  if (withNewlines.includes('BEGIN CERTIFICATE')) return withNewlines;

  try {
    const decoded = Buffer.from(value, 'base64').toString('utf8');
    return decoded.includes('BEGIN CERTIFICATE') ? decoded : withNewlines;
  } catch {
    return withNewlines;
  }
}

function wantsSsl() {
  const value = String(process.env.DB_SSL || '').toLowerCase();
  return !['', '0', 'false', 'off', 'no', 'disabled'].includes(value) || Boolean(process.env.TLS_CERT);
}

function getConfig() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Configurazione database incompleta: ${missing.join(', ')}`);
  }

  return {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  };
}

function getPool() {
  if (pool) return pool;

  const config = getConfig();
  const certificate = getCertificate();
  const ssl = wantsSsl()
    ? { rejectUnauthorized: Boolean(certificate), ...(certificate ? { ca: certificate } : {}) }
    : undefined;

  if (getDatabaseKind() === 'postgres') {
    pool = new PostgresPool({
      ...config,
      ssl,
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    });
  } else {
    pool = mysql.createPool({
      ...config,
      ssl,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      dateStrings: true,
      enableKeepAlive: true,
    });
  }

  return pool;
}

function postgresPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

async function query(sql, params = []) {
  const activePool = getPool();

  if (getDatabaseKind() === 'postgres') {
    const result = await activePool.query(postgresPlaceholders(sql), params);
    return {
      rows: result.rows,
      rowCount: result.rowCount,
      insertId: result.rows?.[0]?.id,
    };
  }

  const [result] = await activePool.execute(sql, params);
  return {
    rows: Array.isArray(result) ? result : [],
    rowCount: result.affectedRows || 0,
    insertId: result.insertId,
  };
}

async function ensureSchema() {
  if (schemaPromise) return schemaPromise;

  schemaPromise = (async () => {
    if (getDatabaseKind() === 'postgres') {
      await query(`
        CREATE TABLE IF NOT EXISTS articles (
          id BIGSERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          image_url TEXT NOT NULL DEFAULT '',
          gallery_json TEXT NOT NULL DEFAULT '[]',
          category VARCHAR(100) NOT NULL DEFAULT 'Guide',
          author VARCHAR(120) NOT NULL DEFAULT 'Mauro Simoncini',
          read_time VARCHAR(30) NOT NULL DEFAULT '5 min',
          published_at DATE NOT NULL,
          is_published BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `);
      await query(`
        CREATE TABLE IF NOT EXISTS app_meta (
          meta_key VARCHAR(100) PRIMARY KEY,
          meta_value TEXT NOT NULL
        )
      `);
    } else {
      await query(`
        CREATE TABLE IF NOT EXISTS articles (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          excerpt TEXT NOT NULL,
          content LONGTEXT NOT NULL,
          image_url TEXT NOT NULL,
          gallery_json LONGTEXT NOT NULL,
          category VARCHAR(100) NOT NULL DEFAULT 'Guide',
          author VARCHAR(120) NOT NULL DEFAULT 'Mauro Simoncini',
          read_time VARCHAR(30) NOT NULL DEFAULT '5 min',
          published_at DATE NOT NULL,
          is_published BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      await query(`
        CREATE TABLE IF NOT EXISTS app_meta (
          meta_key VARCHAR(100) NOT NULL PRIMARY KEY,
          meta_value TEXT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }
  })().catch((error) => {
    schemaPromise = undefined;
    throw error;
  });

  return schemaPromise;
}

module.exports = {
  ensureSchema,
  getDatabaseKind,
  query,
};
