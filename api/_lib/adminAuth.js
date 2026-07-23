const crypto = require('crypto');

const COOKIE_NAME = 'mai_senza_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function safeEqual(left, right) {
  const leftHash = crypto.createHash('sha256').update(String(left)).digest();
  const rightHash = crypto.createHash('sha256').update(String(right)).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
}

function getCredentials() {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    const error = new Error('Credenziali amministratore non configurate.');
    error.statusCode = 503;
    throw error;
  }
  return { username, password };
}

function sign(value) {
  const { password } = getCredentials();
  return crypto.createHmac('sha256', password).update(value).digest('base64url');
}

function createSessionToken(username) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function parseCookies(header = '') {
  return header.split(';').reduce((cookies, item) => {
    const index = item.indexOf('=');
    if (index === -1) return cookies;
    cookies[item.slice(0, index).trim()] = decodeURIComponent(item.slice(index + 1).trim());
    return cookies;
  }, {});
}

function verifySession(req) {
  try {
    const token = parseCookies(req.headers.cookie)[COOKIE_NAME];
    if (!token) return null;
    const [payload, signature] = token.split('.');
    if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;

    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    const { username } = getCredentials();
    if (!safeEqual(session.username, username) || session.expiresAt <= Date.now() / 1000) return null;
    return session;
  } catch {
    return null;
  }
}

function requireAdmin(req, res) {
  const session = verifySession(req);
  if (!session) {
    res.status(401).json({ success: false, message: 'Sessione non valida o scaduta.' });
    return null;
  }
  return session;
}

function isSecureRequest(req) {
  return process.env.VERCEL === '1'
    || req.headers['x-forwarded-proto'] === 'https';
}

function setSessionCookie(req, res, token) {
  const secure = isSecureRequest(req) ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}${secure}`,
  );
}

function clearSessionCookie(req, res) {
  const secure = isSecureRequest(req) ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`,
  );
}

function validateMutationOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

module.exports = {
  clearSessionCookie,
  createSessionToken,
  getCredentials,
  requireAdmin,
  safeEqual,
  setSessionCookie,
  validateMutationOrigin,
  verifySession,
};
