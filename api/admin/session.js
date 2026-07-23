const {
  clearSessionCookie,
  createSessionToken,
  getCredentials,
  safeEqual,
  setSessionCookie,
  validateMutationOrigin,
  verifySession,
} = require('../_lib/adminAuth');

const attempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 10 * 60;

function getClientKey(req) {
  return String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function getAttempt(key) {
  const current = attempts.get(key);
  if (!current || current.resetAt <= Date.now()) {
    const fresh = { count: 0, resetAt: Date.now() + LOCK_SECONDS * 1000 };
    attempts.set(key, fresh);
    return fresh;
  }
  return current;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const session = verifySession(req);
      return res.status(session ? 200 : 401).json({
        success: Boolean(session),
        authenticated: Boolean(session),
        user: session?.username,
      });
    }

    if (!validateMutationOrigin(req)) {
      return res.status(403).json({ success: false, message: 'Origine della richiesta non valida.' });
    }

    if (req.method === 'DELETE') {
      clearSessionCookie(req, res);
      return res.status(200).json({ success: true });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST, DELETE');
      return res.status(405).json({ success: false, message: 'Metodo non consentito.' });
    }

    const clientKey = getClientKey(req);
    const attempt = getAttempt(clientKey);
    if (attempt.count >= MAX_ATTEMPTS) {
      res.setHeader('Retry-After', String(Math.ceil((attempt.resetAt - Date.now()) / 1000)));
      return res.status(429).json({
        success: false,
        message: 'Troppi tentativi. Riprova tra qualche minuto.',
      });
    }

    const { username, password } = getCredentials();
    const valid = safeEqual(req.body?.username || '', username)
      && safeEqual(req.body?.password || '', password);

    if (!valid) {
      attempt.count += 1;
      return res.status(401).json({ success: false, message: 'Credenziali non corrette.' });
    }

    attempts.delete(clientKey);
    setSessionCookie(req, res, createSessionToken(username));
    return res.status(200).json({ success: true, authenticated: true, user: username });
  } catch (error) {
    console.error('Errore sessione admin:', error.message);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 503
        ? error.message
        : 'Impossibile completare l’accesso.',
    });
  }
};
