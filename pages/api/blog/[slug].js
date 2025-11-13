import dbConnect from '../../../lib/mongodb';
import { BlogPost } from '../../../lib/models';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { slug } = req.query;
    
    const post = await BlogPost.findOne({ 
      slug,
      published: true 
    });
    
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    
    res.json({ success: true, data: post });
  } catch (error) {
    console.error('Blog post fetch error:', error);
    res.status(500).json({ success: false, message: 'Error fetching blog post' });
  }
}