import dbConnect from '../../../lib/mongodb';
import { BlogPost, Admin } from '../../../lib/models';

// Authentication check for admin access
const checkAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) {
    return false;
  }
  
  try {
    await dbConnect();
    const admin = await Admin.findById(adminSession);
    return !!admin;
  } catch (error) {
    return false;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { language = 'fr', published = 'true' } = req.query;
    const query = { language };
    
    // Security check: Only allow unpublished posts for authenticated admin users
    if (published === 'false') {
      const isAuthenticated = await checkAuth(req);
      if (!isAuthenticated) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required to access unpublished posts' 
        });
      }
      query.published = false;
    } else {
      // For public access, only return published posts
      query.published = true;
    }
    
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .select('-content -imageData.data'); // Exclude base64 data from list view for performance
      
    // For each post, if it has imageData but no base64 data, we'll serve via the image endpoint
    const postsWithImages = posts.map(post => {
      const postObj = post.toObject();
      if (postObj.imageData && !postObj.imageData.data) {
        postObj.image = `/api/images/${postObj._id}`;
      }
      return postObj;
    });
      
    res.json({ success: true, data: postsWithImages });
  } catch (error) {
    console.error('Blog fetch error:', error);
    res.status(500).json({ success: false, message: 'Error fetching blog posts' });
  }
}