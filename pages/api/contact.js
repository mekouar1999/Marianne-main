import { Resend } from 'resend';
import dbConnect from '../../lib/mongodb';
import { Contact } from '../../lib/models';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, company, email, phone, subject, message, training } = req.body;
    
    // Save to database if connected
    try {
      await dbConnect();
      const contact = new Contact(req.body);
      await contact.save();
    } catch (dbError) {
      console.warn("Database save warning:", dbError.message);
    }

    // Send email using Resend if configured
    if (resend) {
      const fullName = firstName && lastName ? `${firstName} ${lastName}` : (req.body.name || 'Non spécifié');
      const emailSubject = subject || 'Nouveau message de contact';
      
      let emailContent = `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Société:</strong> ${company || 'Non spécifiée'}</p>
        ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
        ${training ? `<p><strong>Formation intéressée:</strong> ${training}</p>` : ''}
        <p><strong>Sujet:</strong> ${emailSubject}</p>
        <h3>Message:</h3>
        <p>${message || 'Aucun message spécifique'}</p>
        <hr>
        <p><em>Message envoyé depuis le formulaire de contact du site Customs Engineering Solutions</em></p>
      `;

      await resend.emails.send({
        from: 'Contact Form <contact@resend.dev>',
        to: ['martusiochenot@customs-solutions.fr'],
        subject: `[Site Web] ${emailSubject} - ${fullName}`,
        html: emailContent,
        replyTo: email,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Formulaire soumis avec succès",
    });
  } catch (error) {
    console.error("Contact form processing error:", error.message);
    return res.status(200).json({
      success: true,
      message: "Formulaire reçu avec succès",
    });
  }
}