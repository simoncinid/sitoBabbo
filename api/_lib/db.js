const mysql = require('mysql2/promise');
const { Pool: PostgresPool } = require('pg');
const tls = require('tls');

const REQUIRED_ENV = ['DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT', 'DB_USER'];
let pool;
let schemaPromise;

function isEnabled(value) {
  return !['', '0', 'false', 'off', 'no', 'disabled'].includes(String(value || '').toLowerCase());
}

function getDatabaseKind(env = process.env) {
  const explicit = String(env.DB_DIALECT || '').toLowerCase();
  if (explicit === 'postgres' || explicit === 'postgresql' || explicit === 'pg') return 'postgres';
  if (explicit === 'mysql' || explicit === 'mariadb') return 'mysql';

  const connectionString = String(env.DATABASE_URL || '').trim().toLowerCase();
  if (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://')) {
    return 'postgres';
  }
  if (connectionString.startsWith('mysql://') || connectionString.startsWith('mariadb://')) {
    return 'mysql';
  }

  return String(env.DB_PORT) === '5432' ? 'postgres' : 'mysql';
}

function normalizeTlsPem(value) {
  if (!value) return undefined;

  const extractPemBlocks = (input) => {
    const expanded = String(input)
      .trim()
      .replace(/\\r/g, '')
      .replace(/\\n/g, '\n');
    const blocks = expanded.match(
      /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g,
    );
    return blocks?.length ? blocks.join('\n') : undefined;
  };

  const directPem = extractPemBlocks(value);
  if (directPem) return directPem;

  try {
    const decoded = Buffer.from(String(value).trim(), 'base64').toString('utf8');
    return extractPemBlocks(decoded) || String(value).trim();
  } catch {
    return String(value).trim();
  }
}

function extractHostFromDatabaseUrl(connectionString) {
  try {
    return new URL(connectionString).hostname || undefined;
  } catch {
    return undefined;
  }
}

function stripSslParamsFromDatabaseUrl(connectionString) {
  try {
    const parsed = new URL(connectionString);
    ['ssl', 'sslmode', 'sslcert', 'sslkey', 'sslrootcert'].forEach((key) => {
      parsed.searchParams.delete(key);
    });
    return parsed.toString();
  } catch {
    return connectionString;
  }
}

function getDiscreteConfig(env = process.env) {
  const missing = REQUIRED_ENV.filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(`Configurazione database incompleta: ${missing.join(', ')}`);
  }

  return {
    host: env.DB_HOST,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT),
  };
}

function resolveSslConfig(env = process.env, host) {
  const certificate = normalizeTlsPem(env.TLS_CERT);
  if (certificate) {
    return {
      rejectUnauthorized: true,
      ca: certificate,
      ...(host ? {
        checkServerIdentity: (_servername, peerCertificate) => (
          tls.checkServerIdentity(host, peerCertificate)
        ),
      } : {}),
    };
  }
  return isEnabled(env.DB_SSL) ? { rejectUnauthorized: false } : undefined;
}

function resolvePgPoolConfig(env = process.env) {
  const rawConnectionString = String(env.DATABASE_URL || '').trim();

  if (rawConnectionString) {
    const hostFromUrl = extractHostFromDatabaseUrl(rawConnectionString);
    const mustForceSslConfig = Boolean(normalizeTlsPem(env.TLS_CERT) || isEnabled(env.DB_SSL));
    const config = {
      connectionString: mustForceSslConfig
        ? stripSslParamsFromDatabaseUrl(rawConnectionString)
        : rawConnectionString,
      ...(hostFromUrl ? { host: hostFromUrl } : {}),
    };
    const ssl = resolveSslConfig(env, hostFromUrl);
    if (ssl) config.ssl = ssl;
    return config;
  }

  const config = getDiscreteConfig(env);
  const ssl = resolveSslConfig(env, config.host);
  return { ...config, ...(ssl ? { ssl } : {}) };
}

function resolveMysqlPoolConfig(env = process.env) {
  const config = getDiscreteConfig(env);
  const certificate = normalizeTlsPem(env.TLS_CERT);
  const ssl = certificate
    ? { rejectUnauthorized: true, ca: certificate }
    : (isEnabled(env.DB_SSL) ? { rejectUnauthorized: false } : undefined);
  return { ...config, ...(ssl ? { ssl } : {}) };
}

function getPool() {
  if (pool) return pool;

  if (getDatabaseKind() === 'postgres') {
    pool = new PostgresPool({
      ...resolvePgPoolConfig(),
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    });
  } else {
    pool = mysql.createPool({
      ...resolveMysqlPoolConfig(),
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
  extractHostFromDatabaseUrl,
  ensureSchema,
  getDatabaseKind,
  normalizeTlsPem,
  query,
  resolvePgPoolConfig,
  stripSslParamsFromDatabaseUrl,
};
