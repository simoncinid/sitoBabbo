const express = require('express');
const cors = require('cors');
const path = require('path');
const { sendFormEmail } = require('./api/_lib/email');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/send-email', async (req, res) => {
  try {
    if (!req.body?.formType) {
      return res.status(400).json({
        success: false,
        message: 'Dati del form mancanti o non validi',
      });
    }

    await sendFormEmail(req.body);

    res.json({ success: true, message: 'Email inviata con successo!' });
  } catch (error) {
    console.error('Errore invio email:', error);
    res.status(500).json({ success: false, message: 'Errore nell\'invio dell\'email' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
