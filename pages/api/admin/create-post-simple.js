import dbConnect from '../../../lib/mongodb';
import { BlogPost, Admin } from '../../../lib/models';

// Simple auth check with timeout
const quickAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) {
    throw new Error('Authentication required');
  }
  
  const authPromise = Admin.findById(adminSession);
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Auth query timeout')), 5000)
  );
  
  const admin = await Promise.race([authPromise, timeoutPromise]);
  if (!admin) {
    throw new Error('Admin not found');
  }
  
  return admin;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const startTime = Date.now();
  const steps = {};

  try {
    // Step 1: Quick auth
    steps.step1_start = Date.now() - startTime;
    await quickAuth(req);
    steps.step1_auth = Date.now() - startTime;

    // Step 2: Database connection
    await dbConnect();
    steps.step2_dbConnect = Date.now() - startTime;

    // Step 3: Parse body (no file upload)
    const { title, excerpt, content } = req.body;
    
    if (!title || !excerpt || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, excerpt, and content are required',
        steps 
      });
    }

    steps.step3_validation = Date.now() - startTime;

    // Step 4: Create slug
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Step 5: Check duplicate with timeout
    const duplicatePromise = BlogPost.findOne({ slug });
    const duplicateTimeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Duplicate check timeout')), 5000)
    );
    
    const existingPost = await Promise.race([duplicatePromise, duplicateTimeoutPromise]);
    
    steps.step4_duplicateCheck = Date.now() - startTime;

    if (existingPost) {
      return res.status(400).json({ 
        success: false, 
        message: 'Un article avec ce titre existe déjà',
        steps 
      });
    }

    // Step 6: Create and save post (no image)
    const blogPost = new BlogPost({
      title,
      slug,
      excerpt,
      content,
      image: '/uploads/default-blog.jpg', // Default image
      categories: [],
      language: 'fr',
      published: false
    });

    const savePromise = blogPost.save();
    const saveTimeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Save operation timeout')), 5000)
    );
    
    await Promise.race([savePromise, saveTimeoutPromise]);
    
    steps.step5_save = Date.now() - startTime;

    res.status(201).json({ 
      success: true, 
      data: blogPost,
      totalTime: Date.now() - startTime,
      steps
    });

  } catch (error) {
    console.error('Simple create error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      totalTime: Date.now() - startTime,
      steps,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}