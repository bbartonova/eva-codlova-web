// /api/contact.js
import nodemailer from 'nodemailer';

// Pomocná funkce: načte a naparsuje JSON body i na "raw" Node.js serverless funkcích
async function readJsonBody(req) {
  // pokud už je objekt, použij ho
  if (req.body && typeof req.body === 'object') return req.body;

  // jinak načti stream
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return null;

  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const body = await readJsonBody(req);
    const { name, email, message } = body || {};

    // základní validace
    if (
      !name ||
      !email ||
      !message ||
      String(name).trim().length < 2 ||
      String(message).trim().length < 5
    ) {
      return res
        .status(400)
        .json({ ok: false, error: 'Vyplňte prosím všechna pole správně.' });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE, // 'true' | 'false'
      SMTP_USER,
      SMTP_PASS,
      MAIL_FROM, // např. info@uctovcb.cz
      MAIL_TO, // např. info@uctovcb.cz
      CONTACT_DEBUG, // 'true' -> pošle detail chyby v JSON
    } = process.env;

    // když chybí SMTP proměnné, vrať test režim (aby frontend ukázal OK)
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
      return res.status(200).json({
        ok: true,
        sent: false,
        note:
          'SMTP není nakonfigurováno (testovací režim). ' +
          'Doplň ENV proměnné ve Vercelu, aby se e-mail skutečně odeslal.',
      });
    }

    const fromAddress = MAIL_FROM || SMTP_USER;
    const recipients = [
      MAIL_TO, // hlavní cíl (info@uctovcb.cz)
      'evacodlova@seznam.cz',
      'bartonova.blanka@seznam.cz',
    ];

    const subject =
      'EC ÚČTO V ČB - uctovcb.cz - Nová zpráva z kontaktního formuláře';

    const textBody =
      `Jméno: ${name}\n` + `E-mail: ${email}\n\n` + `Zpráva:\n${message}\n`;

    const htmlBody = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;">
        <h2>Nová zpráva z kontaktního formuláře</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Zpráva:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(
          message,
        )}</pre>
      </div>
    `;

    // pokus 1: 587/STARTTLS
    const primary = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: String(SMTP_SECURE || 'false') === 'true', // pro 587 má být false
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    try {
      await primary.sendMail({
        from: fromAddress,
        to: recipients,
        replyTo: email,
        subject,
        text: textBody,
        html: htmlBody,
      });
      return res.status(200).json({ ok: true, sent: true });
    } catch (err1) {
      // fallback 465/SSL
      console.error('Primary SMTP failed, try 465 SSL:', err1?.message);
      const fallback = nodemailer.createTransport({
        host: SMTP_HOST,
        port: 465,
        secure: true,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      try {
        await fallback.sendMail({
          from: fromAddress,
          to: recipients,
          replyTo: email,
          subject,
          text: textBody,
          html: htmlBody,
        });
        return res.status(200).json({ ok: true, sent: true });
      } catch (err2) {
        console.error('Fallback SMTP failed:', err2?.message);
        return res.status(500).json({
          ok: false,
          error: 'Nepodařilo se odeslat e-mail.',
          ...(CONTACT_DEBUG === 'true' && {
            debug: {
              primary_error: err1?.message || String(err1),
              fallback_error: err2?.message || String(err2),
            },
          }),
        });
      }
    }
  } catch (err) {
    console.error('CONTACT API ERROR:', err);
    return res
      .status(500)
      .json({ ok: false, error: 'Nepodařilo se odeslat e-mail.' });
  }
}
