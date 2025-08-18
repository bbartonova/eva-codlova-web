// /api/contact.js
import nodemailer from 'nodemailer';

/**
 * Vercel serverless function – příjem z kontakt. formuláře a odeslání e-mailu.
 * Očekává JSON: { name, email, message }
 * Vrací: { ok: true, sent: true } při úspěchu
 *        { ok: true, sent: false, note: '...' } v test režimu (chybí SMTP proměnné)
 */

export default async function handler(req, res) {
  // povol pouze POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    // základní validace (frontend už validuje, ale backend to musí také hlídat)
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

    // ENV proměnné (nastavíš ve Vercelu)
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE, // 'true' nebo 'false'
      SMTP_USER,
      SMTP_PASS,
      MAIL_FROM, // např. 'info@uctovcb.cz'
      MAIL_TO, // např. 'info@uctovcb.cz'
    } = process.env;

    // Testovací režim (když chybí SMTP údaje) – vrátíme ok, ale nic neposíláme
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
      return res.status(200).json({
        ok: true,
        sent: false,
        note:
          'SMTP není nakonfigurováno (testovací režim). ' +
          'Doplň ENV proměnné ve Vercelu, aby se e-mail skutečně odeslal.',
      });
    }

    // transporter pro Forpsi (STARTTLS na 587)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST, // smtp.forpsi.com
      port: Number(SMTP_PORT || 587),
      secure: String(SMTP_SECURE || 'false') === 'true', // Forpsi: false pro 587 (STARTTLS)
      auth: {
        user: SMTP_USER, // např. info@uctovcb.cz
        pass: SMTP_PASS, // heslo ke schránce
      },
    });

    // zpráva
    const fromAddress = MAIL_FROM || SMTP_USER;
    const subject = `Nová poptávka z webu – ${name}`;

    const textBody =
      `Jméno: ${name}\n` + `E-mail: ${email}\n\n` + `Zpráva:\n${message}\n`;

    const htmlBody = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;">
        <h2>Nová poptávka z webu</h2>
        <p><strong>Jméno:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Zpráva:</strong></p>
        <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(
          message,
        )}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: fromAddress,
      to: MAIL_TO,
      replyTo: email, // aby šlo odpovědět rovnou tazateli
      subject,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({ ok: true, sent: true });
  } catch (err) {
    console.error('CONTACT API ERROR:', err);
    return res
      .status(500)
      .json({ ok: false, error: 'Nepodařilo se odeslat e-mail.' });
  }
}

// jednoduché escapování HTML
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
