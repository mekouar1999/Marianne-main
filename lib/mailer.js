import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

let cachedTransporter = null;
let cachedConfigKey = null;

/**
 * Loads SMTP configuration from process.env with direct disk fallback
 * to guarantee that environment variables are read even before a server restart.
 */
function getSmtpConfig() {
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
    '/Users/user/Desktop/Marianne-main/.env',
  ];

  const diskVars = {};
  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      try {
        const parsed = dotenv.parse(fs.readFileSync(p, 'utf8'));
        Object.assign(diskVars, parsed);
      } catch (e) {}
    }
  }

  const host = (process.env.SMTP_HOST || diskVars.SMTP_HOST || 'smtp.gmail.com').trim();
  const user = (process.env.SMTP_USER || diskVars.SMTP_USER || '').replace(/["']/g, '').trim();
  const rawPass = (process.env.SMTP_PASS || diskVars.SMTP_PASS || '').replace(/["']/g, '').trim();
  const pass = rawPass.replace(/\s+/g, '');
  const port = parseInt(process.env.SMTP_PORT || diskVars.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const from = (process.env.SMTP_FROM || diskVars.SMTP_FROM || '').replace(/^["']|["']$/g, '').trim() ||
    `"Customs Engineering Solutions" <${user}>`;
  const adminEmail = (process.env.ADMIN_EMAIL || diskVars.ADMIN_EMAIL || 'martusiochenot@customs-solutions.fr').replace(/["']/g, '').trim();

  return { host, user, pass, port, secure, from, adminEmail };
}

export async function getTransporter() {
  const config = getSmtpConfig();
  const { host, user, pass, port, secure } = config;
  const currentKey = `${host}:${user}:${pass}:${port}:${secure}`;

  if (cachedTransporter && cachedConfigKey === currentKey) {
    return cachedTransporter;
  }

  if (user && pass) {
    const isGmail = host === 'smtp.gmail.com' || user.endsWith('@gmail.com');
    const transportOpts = isGmail
      ? {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user, pass },
        }
      : {
          host,
          port,
          secure,
          auth: { user, pass },
          tls: { rejectUnauthorized: false },
        };

    cachedTransporter = nodemailer.createTransport(transportOpts);
    cachedConfigKey = currentKey;
    console.log(`[Mailer] Transport SMTP configuré avec succès pour : ${user}`);
    return cachedTransporter;
  }

  console.warn('[Mailer] SMTP credentials manquants. Mode test Ethereal...');
  try {
    const testAccount = await nodemailer.createTestAccount();
    cachedTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    cachedConfigKey = 'ethereal';
    return cachedTransporter;
  } catch (err) {
    return nodemailer.createTransport({ host: 'localhost', port: 1025, ignoreTLS: true });
  }
}

/**
 * Sends both the user confirmation receipt and the admin notification.
 */
export async function sendContactEmails({
  firstName = '',
  lastName = '',
  name = '',
  company = '',
  email = '',
  phone = '',
  subject = 'contact',
  training = '',
  message = '',
  language = 'fr',
}) {
  const config = getSmtpConfig();
  const transporter = await getTransporter();

  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim() || name || 'Visiteur';
  const senderEmail = email.trim();
  const fromAddress = config.from;
  const adminRecipient = config.adminEmail;

  const isEn = language === 'en';

  const subjectLabels = {
    consulting: isEn ? 'Customs Consulting' : 'Conseil Douanier',
    formation: isEn ? 'Training & Workshops' : 'Formation professionnelle',
    audit: isEn ? 'Customs Audit' : 'Audit Douanier',
    other: isEn ? 'Other request' : 'Autre demande',
  };
  const subjectDisplay = subjectLabels[subject] || subject || (isEn ? 'Contact request' : 'Demande de contact');

  const currentDate = new Date().toLocaleDateString(isEn ? 'en-US' : 'fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const results = {
    adminEmailSent: false,
    userEmailSent: false,
    userError: null,
    adminError: null,
  };

  // 1. Email to the User (Accusé de réception confirmant la prise en charge)
  try {
    const userSubject = isEn
      ? `We have received your message — Customs Engineering Solutions`
      : `Nous avons bien reçu votre message — Customs Engineering Solutions`;

    const userHtml = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'fr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${userSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6fa; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #040E25 0%, #002B54 60%, #005596 100%); padding: 36px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 1px;">
                CUSTOMS ENGINEERING <span style="color: #22d3ee;">SOLUTIONS</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #93c5fd; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">
                ${isEn ? 'International Customs & Regulatory Expertise' : 'Conseil & Expertise Douanière Internationale'}
              </p>
            </td>
          </tr>

          <!-- Cyan accent bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #22d3ee, #3b82f6); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 32px 24px 32px;">
              <h2 style="margin: 0 0 16px 0; color: #040E25; font-size: 20px; font-weight: 700;">
                ${isEn ? `Hello ${fullName},` : `Bonjour ${fullName},`}
              </h2>
              
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155;">
                ${
                  isEn
                    ? 'Thank you for reaching out to <strong>Customs Engineering Solutions</strong>. We confirm that your message has been successfully received.'
                    : 'Nous vous confirmons que votre message a bien été reçu par <strong>Customs Engineering Solutions</strong>.'
                }
              </p>

              <!-- Highlight Box -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 14px 18px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #065f46; font-weight: 600;">
                  ${
                    isEn
                      ? 'We are reviewing your request and will get back to you as soon as possible.'
                      : 'Nous prenons connaissance de votre demande et vous répondrons dans les plus brefs délais.'
                  }
                </p>
              </div>

              <!-- Recap Table -->
              <h3 style="margin: 24px 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">
                ${isEn ? 'Summary of your submission' : 'Récapitulatif de votre demande'}
              </h3>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px;">
                <tr>
                  <td width="35%" style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${isEn ? 'Date' : 'Date'}</td>
                  <td style="color: #0f172a; border-bottom: 1px solid #e2e8f0;">${currentDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${isEn ? 'Subject' : 'Objet'}</td>
                  <td style="color: #0f172a; border-bottom: 1px solid #e2e8f0;"><strong>${subjectDisplay}</strong></td>
                </tr>
                ${
                  training
                    ? `<tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${isEn ? 'Training Program' : 'Programme souhaité'}</td>
                  <td style="color: #0f172a; border-bottom: 1px solid #e2e8f0;"><strong style="color: #005596;">${training}</strong></td>
                </tr>`
                    : ''
                }
                ${
                  company
                    ? `<tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${isEn ? 'Company' : 'Société'}</td>
                  <td style="color: #0f172a; border-bottom: 1px solid #e2e8f0;">${company}</td>
                </tr>`
                    : ''
                }
                ${
                  phone
                    ? `<tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">${isEn ? 'Phone' : 'Téléphone'}</td>
                  <td style="color: #0f172a; border-bottom: 1px solid #e2e8f0;">${phone}</td>
                </tr>`
                    : ''
                }
                ${
                  message
                    ? `<tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top;">${isEn ? 'Your message' : 'Votre message'}</td>
                  <td style="color: #334155; white-space: pre-wrap; font-size: 13px;">${message}</td>
                </tr>`
                    : ''
                }
              </table>

              <!-- Closing Note -->
              <p style="margin: 24px 0 8px 0; font-size: 14px; color: #475569;">
                ${
                  isEn
                    ? 'In the meantime, feel free to explore our website to discover our services and latest regulatory insights.'
                    : 'Dans l\'attente de cet échange, vous pouvez consulter notre site pour découvrir nos offres d\'accompagnement et nos dernières actualités douanières.'
                }
              </p>
            </td>
          </tr>

          <!-- Signature / Contact Card -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 14px; font-weight: 700; color: #040E25;">Marianne Martusio-Chenot</p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color: #005596;">
                      📞 <a href="tel:+33640501602" style="color: #005596; text-decoration: none;">+33 6 40 50 16 02</a>
                      &nbsp;|&nbsp;
                      ✉️ <a href="mailto:martusiochenot@customs-solutions.fr" style="color: #005596; text-decoration: none;">martusiochenot@customs-solutions.fr</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #040E25; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                © 2026 Customs Engineering Solutions. Tous droits réservés.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b;">
                ${isEn ? 'This is an automatic notification sent following your form submission.' : 'Cet email est un accusé de réception automatique généré suite à votre demande.'}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    console.log(`[Mailer] Envoi de l'accusé de réception à ${senderEmail}...`);
    const userMailResult = await transporter.sendMail({
      from: fromAddress,
      to: senderEmail,
      replyTo: adminRecipient,
      subject: userSubject,
      html: userHtml,
    });

    results.userEmailSent = true;
    console.log(`[Mailer] ✓ Accusé de réception envoyé avec succès à : ${senderEmail} (MessageId: ${userMailResult.messageId})`);
  } catch (err) {
    results.userError = err.message;
    console.error(`[Mailer] ✗ Erreur lors de l'envoi de l'accusé de réception à ${senderEmail} :`, err.message);
  }

  // 2. Email to the Admin (Marianne)
  try {
    const adminSubject = `[Nouveau contact web] ${fullName}${company ? ` (${company})` : ''} - ${subjectDisplay}`;

    const adminHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${adminSubject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background-color: #040E25; padding: 24px; color: white;">
              <span style="display: inline-block; background-color: #22d3ee; color: #040E25; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; margin-bottom: 8px;">
                Nouveau formulaire reçu
              </span>
              <h2 style="margin: 0; font-size: 20px; font-weight: 700;">${fullName}</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Reçu le ${currentDate}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; margin-bottom: 20px;">
                <tr>
                  <td width="30%" style="color: #64748b; font-weight: 600;">Email:</td>
                  <td><a href="mailto:${senderEmail}" style="color: #0284c7; text-decoration: underline;"><strong>${senderEmail}</strong></a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Téléphone:</td>
                  <td>${phone ? `<a href="tel:${phone}" style="color: #0284c7;">${phone}</a>` : '—'}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Société:</td>
                  <td><strong>${company || '—'}</strong></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Sujet:</td>
                  <td><span style="display: inline-block; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${subjectDisplay}</span></td>
                </tr>
                ${
                  training
                    ? `<tr>
                  <td style="color: #64748b; font-weight: 600;">Formation:</td>
                  <td><strong style="color: #005596;">${training}</strong></td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Langue:</td>
                  <td>${language ? language.toUpperCase() : 'FR'}</td>
                </tr>
              </table>

              <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase;">Message du client :</h4>
              <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; font-size: 14px; color: #1e293b; white-space: pre-wrap; margin-bottom: 24px;">
                ${message || '<em>Aucun message texte fourni</em>'}
              </div>

              <!-- Quick action button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${senderEmail}?subject=Re: ${encodeURIComponent(subjectDisplay)} - Customs Engineering Solutions"
                       style="display: inline-block; background-color: #002B54; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                      ✉️ Répondre directement à ${fullName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
              Message généré depuis le formulaire de contact du site <strong>Customs Engineering Solutions</strong>.<br>
              Vous pouvez retrouver tous les formulaires dans votre <a href="/admin/contact" style="color: #0284c7;">espace d'administration</a>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    console.log(`[Mailer] Envoi de la notification admin à ${adminRecipient}...`);
    const adminMailResult = await transporter.sendMail({
      from: fromAddress,
      to: adminRecipient,
      replyTo: senderEmail,
      subject: adminSubject,
      html: adminHtml,
    });

    results.adminEmailSent = true;
    console.log(`[Mailer] ✓ Notification admin envoyée avec succès à : ${adminRecipient} (MessageId: ${adminMailResult.messageId})`);
  } catch (err) {
    results.adminError = err.message;
    console.error(`[Mailer] ✗ Erreur lors de l'envoi de la notification admin à ${adminRecipient} :`, err.message);
  }

  return results;
}
