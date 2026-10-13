import dbConnect from '../../lib/mongodb';
import { Contact } from '../../lib/models';
import { sendContactEmails } from '../../lib/mailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      name,
      company,
      email,
      phone,
      subject,
      message,
      training,
      language = 'fr',
    } = req.body || {};

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email requis' });
    }

    // Normaliser prénom / nom si un champ "name" unique a été transmis
    const derivedFirstName = firstName || (name ? name.split(' ')[0] : '');
    const derivedLastName = lastName || (name ? name.split(' ').slice(1).join(' ') : '');

    // 1. Sauvegarde dans MongoDB pour consultation dans le back office (/admin/contact)
    let savedContact = null;
    try {
      await dbConnect();
      savedContact = await Contact.create({
        firstName: derivedFirstName,
        lastName: derivedLastName,
        name: name || `${derivedFirstName} ${derivedLastName}`.trim(),
        company: company || '',
        email: email.trim(),
        phone: phone || '',
        subject: subject || (training ? 'formation' : 'contact'),
        training: training || '',
        message: message || '',
        language: language || 'fr',
        status: 'new',
      });
    } catch (dbError) {
      console.warn('Database save warning:', dbError.message);
    }

    // 2. Envoi automatique via Nodemailer :
    // - Accusé de réception au visiteur ("Nous avons bien reçu votre mail et vous répondons dans les plus brefs délais")
    // - Notification à l'administrateur
    try {
      await sendContactEmails({
        firstName: derivedFirstName,
        lastName: derivedLastName,
        name: name || `${derivedFirstName} ${derivedLastName}`.trim(),
        company,
        email,
        phone,
        subject: subject || (training ? 'formation' : 'contact'),
        training,
        message,
        language,
      });
    } catch (mailError) {
      console.error('Nodemailer send warning:', mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Formulaire soumis avec succès',
      data: savedContact ? { id: savedContact._id } : null,
    });
  } catch (error) {
    console.error('Contact form processing error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors du traitement du formulaire',
    });
  }
}