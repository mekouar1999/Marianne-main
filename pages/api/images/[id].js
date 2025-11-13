import dbConnect from '../../../lib/mongodb';
import { BlogPost } from '../../../lib/models';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { id } = req.query;
    
    // Find the blog post with the image
    const post = await BlogPost.findById(id);
    
    if (!post || !post.imageData || !post.imageData.data) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Convert base64 back to buffer
    const imageBuffer = Buffer.from(post.imageData.data, 'base64');
    
    // Set appropriate headers
    res.setHeader('Content-Type', post.imageData.contentType);
    res.setHeader('Content-Length', imageBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    
    // Send the image
    res.status(200).send(imageBuffer);
    
  } catch (error) {
    console.error('Image serve error:', error);
    res.status(500).json({ success: false, message: 'Error serving image' });
  }
}