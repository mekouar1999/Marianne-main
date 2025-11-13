import { Resend } from 'resend';
import dbConnect from '../../lib/mongodb';
import { Contact } from '../../lib/models';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, company, email, phone, subject, message, training } = req.body;
    
    // Save to database
    await dbConnect();
    const contact = new Contact(req.body);
    await contact.save();

    // Prepare email content
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

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Contact Form <contact@resend.dev>',
      to: ['martusiochenot@customs-solutions.fr'],
      subject: `[Site Web] ${emailSubject} - ${fullName}`,
      html: emailContent,
      replyTo: email,
    });

    console.log('Email sent successfully:', emailResponse.id);

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully and email sent",
      id: contact._id,
      emailId: emailResponse.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    
    // Even if email fails, we still want to save to database
    if (!req.body._saved) {
      try {
        await dbConnect();
        const contact = new Contact(req.body);
        await contact.save();
      } catch (dbError) {
        console.error("Database save error:", dbError);
      }
    }
    
    res.status(400).json({
      success: false,
      message: "Error processing contact form",
      error: error.message,
    });
  }
}