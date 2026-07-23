const { sendFormEmail } = require('./_lib/email');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!req.body?.formType) {
      return res.status(400).json({
        success: false,
        message: 'Dati del form mancanti o non validi',
      });
    }

    await sendFormEmail(req.body);

    res.status(200).json({ success: true, message: 'Email inviata con successo!' });
  } catch (error) {
    console.error('Errore invio email:', error);

    const isConfigError = error.message.includes('GMAIL_');
    res.status(500).json({
      success: false,
      message: isConfigError
        ? 'Servizio email non configurato'
        : 'Errore nell\'invio dell\'email',
    });
  }
};
