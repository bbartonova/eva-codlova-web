// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM, // např. "web@uctovcb.cz"
  } = process.env;

  // Dev režim: pokud SMTP není nastaveno, "předstíráme" úspěch a logujeme
  const smtpReady =
    SMTP_HOST &&
    SMTP_PORT &&
    SMTP_USER &&
    SMTP_PASS &&
    CONTACT_TO &&
    CONTACT_FROM;

  if (!smtpReady) {
    console.warn('[contact] SMTP not configured yet. Payload:', {
      name,
      email,
      message,
    });
    return res.status(200).json({
      ok: true,
      sent: false,
      dev: true,
      message: 'Formulář přijat (dev mód, e-mail neodeslán).',
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // Forpsi obvykle 465/SSL nebo 587/TLS
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nová poptávka z webu – ${name}`,
      text: `Jméno: ${name}\nE-mail: ${email}\n\nZpráva:\n${message}`,
    });

    return res.status(200).json({ ok: true, sent: true });
  } catch (err) {
    console.error('[contact] send error:', err);
    return res.status(500).json({ ok: false, error: 'Send failed' });
  }
}
