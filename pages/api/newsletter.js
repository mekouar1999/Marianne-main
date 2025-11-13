import dbConnect from '../../lib/mongodb';
import { Newsletter } from '../../lib/models';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { email, language } = req.body;

    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(409).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    const newsletter = new Newsletter({ email, language });
    await newsletter.save();

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(400).json({
      success: false,
      message: "Error subscribing to newsletter",
      errors: error.errors,
    });
  }
}