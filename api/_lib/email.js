const nodemailer = require('nodemailer');

const RECIPIENT_EMAIL = process.env.GMAIL_RECIPIENT || 'simonciniliquiplast@gmail.com';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getGmailConfig() {
  const address = process.env.GMAIL_ADDRESS;
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (!address || !appPassword) {
    throw new Error('GMAIL_ADDRESS e GMAIL_APP_PASSWORD devono essere configurati');
  }

  return { address, appPassword };
}

function createGmailTransporter() {
  const { address, appPassword } = getGmailConfig();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: address,
      pass: appPassword,
    },
  });
}

function buildEmailPayload(body) {
  const { formType } = body;

  if (formType === 'contact') {
    const name = escapeHtml(body.name);
    const email = escapeHtml(body.email);
    const subject = escapeHtml(body.subject);
    const message = escapeHtml(body.message).replace(/\n/g, '<br>');

    return {
      subject: `Contatto dal sito - ${subject}`,
      html: `
        <h2>Nuovo messaggio dal form di contatto</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Oggetto:</strong> ${subject}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message}</p>
      `,
      replyTo: body.email,
    };
  }

  if (formType === 'consultation') {
    const nome = escapeHtml(body.nome);
    const email = escapeHtml(body.email);
    const telefono = escapeHtml(body.telefono || 'Non specificato');
    const citta = escapeHtml(body.citta || 'Non specificata');
    const tipoCliente = escapeHtml(body.tipoCliente || 'Non specificato');
    const tipoProgetto = escapeHtml(body.tipoProgetto);
    const urgenza = escapeHtml(body.urgenza);
    const budget = escapeHtml(body.budget || 'Non specificato');
    const descrizione = escapeHtml(body.descrizione).replace(/\n/g, '<br>');

    return {
      subject: `Richiesta Consulenza - ${nome}`,
      html: `
        <h2>Nuova richiesta di consulenza</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefono:</strong> ${telefono}</p>
        <p><strong>Città:</strong> ${citta}</p>
        <p><strong>Tipo Cliente:</strong> ${tipoCliente}</p>
        ${body.tipoCliente === 'rivenditore' ? `
          <p><strong>Azienda:</strong> ${escapeHtml(body.nomeAzienda)}</p>
          <p><strong>P.IVA:</strong> ${escapeHtml(body.partitaIva)}</p>
          <p><strong>Settore:</strong> ${escapeHtml(body.settoreAttivita)}</p>
        ` : ''}
        <p><strong>Tipo Progetto:</strong> ${tipoProgetto}</p>
        <p><strong>Urgenza:</strong> ${urgenza}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Descrizione:</strong></p>
        <p>${descrizione}</p>
        <p><strong>Newsletter:</strong> ${body.newsletter ? 'Sì' : 'No'}</p>
      `,
      replyTo: body.email,
    };
  }

  throw new Error('Tipo form non supportato');
}

async function sendFormEmail(body) {
  const { address } = getGmailConfig();
  const transporter = createGmailTransporter();
  const { subject, html, replyTo } = buildEmailPayload(body);

  await transporter.sendMail({
    from: address,
    to: RECIPIENT_EMAIL,
    subject,
    html,
    replyTo,
  });
}

module.exports = {
  sendFormEmail,
};
