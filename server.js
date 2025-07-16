const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configurazione nodemailer
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'reservationwebbitz@gmail.com',
    pass: 'hgnb djjs csta yodf'
  }
});

// Endpoint per invio email dal form di contatto
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message, formType } = req.body;
    
    let emailSubject = '';
    let emailBody = '';
    
    if (formType === 'contact') {
      emailSubject = `Contatto dal sito - ${subject}`;
      emailBody = `
        <h2>Nuovo messaggio dal form di contatto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Oggetto:</strong> ${subject}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `;
    } else if (formType === 'consultation') {
      emailSubject = `Richiesta Consulenza - ${name}`;
      emailBody = `
        <h2>Nuova richiesta di consulenza</h2>
        <p><strong>Nome:</strong> ${req.body.nome}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Telefono:</strong> ${req.body.telefono || 'Non specificato'}</p>
        <p><strong>Città:</strong> ${req.body.citta || 'Non specificata'}</p>
        <p><strong>Tipo Cliente:</strong> ${req.body.tipoCliente}</p>
        ${req.body.tipoCliente === 'rivenditore' ? `
          <p><strong>Azienda:</strong> ${req.body.nomeAzienda}</p>
          <p><strong>P.IVA:</strong> ${req.body.partitaIva}</p>
          <p><strong>Settore:</strong> ${req.body.settoreAttivita}</p>
        ` : ''}
        <p><strong>Tipo Progetto:</strong> ${req.body.tipoProgetto}</p>
        <p><strong>Urgenza:</strong> ${req.body.urgenza}</p>
        <p><strong>Budget:</strong> ${req.body.budget || 'Non specificato'}</p>
        <p><strong>Descrizione:</strong></p>
        <p>${req.body.descrizione.replace(/\n/g, '<br>')}</p>
        <p><strong>Newsletter:</strong> ${req.body.newsletter ? 'Sì' : 'No'}</p>
      `;
    }

    const mailOptions = {
      from: 'reservationwebbitz@gmail.com',
      to: 'simoncinimauro@hotmail.com',
      subject: emailSubject,
      html: emailBody,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Email inviata con successo!' });
  } catch (error) {
    console.error('Errore invio email:', error);
    res.status(500).json({ success: false, message: 'Errore nell\'invio dell\'email' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 