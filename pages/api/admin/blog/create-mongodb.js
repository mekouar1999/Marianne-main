import dbConnect from '../../../../lib/mongodb';
import { BlogPost, Admin } from '../../../../lib/models';
import multer from 'multer';
import { promisify } from 'util';

// Simple auth check
const requireAuth = async (req) => {
  const adminSession = req.cookies['admin-session'];
  if (!adminSession) {
    throw new Error('Authentication required');
  }
  
  await dbConnect();
  const admin = await Admin.findById(adminSession);
  if (!admin) {
    throw new Error('Admin not found');
  }
  
  return admin;
};

// Use memory storage to keep files in memory
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    console.log('File filter check:', {
      mimetype: file.mimetype,
      originalname: file.originalname
    });
    
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const uploadMiddleware = promisify(upload.single('image'));

// Disable Next.js body parsing for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('=== MongoDB Image Storage API ===');
    
    // Check authentication
    await requireAuth(req);
    console.log('Authentication successful');

    // Handle file upload with memory storage
    console.log('Processing file upload...');
    await uploadMiddleware(req, res);
    
    // Get form data
    const { title, excerpt, content, categories, language, published } = req.body;
    console.log('Form data received:', { 
      title, 
      excerpt: excerpt?.substring(0, 50) + '...', 
      contentLength: content?.length,
      categories,
      language,
      published
    });

    if (!title || !excerpt || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, excerpt, and content are required'
      });
    }

    // Create slug
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ 
        success: false, 
        message: 'Un article avec ce titre existe déjà' 
      });
    }

    // Prepare blog post data
    const blogPostData = {
      title,
      slug,
      excerpt,
      content,
      categories: categories ? categories.split(',').map(cat => cat.trim()) : [],
      language: language || 'fr',
      published: published === 'true' || published === true,
      publishedAt: (published === 'true' || published === true) ? new Date() : null
    };

    // Handle image - store in MongoDB as base64
    if (req.file) {
      console.log('Processing image for MongoDB storage:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // Convert buffer to base64
      const base64Data = req.file.buffer.toString('base64');
      
      blogPostData.imageData = {
        data: base64Data,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
        size: req.file.size
      };
      
      // Create a data URL for the image field
      blogPostData.image = `data:${req.file.mimetype};base64,${base64Data}`;
      
      console.log('Image stored as base64, size:', base64Data.length);
    } else {
      console.log('No image uploaded, using default');
      blogPostData.image = '/uploads/default-blog.jpg';
    }

    // Create and save blog post
    console.log('Creating blog post...');
    const blogPost = new BlogPost(blogPostData);
    await blogPost.save();
    
    console.log('Blog post saved successfully with ID:', blogPost._id);

    // Return success (without the full base64 data to save bandwidth)
    const responseData = {
      ...blogPost.toObject(),
      imageData: req.file ? {
        filename: blogPost.imageData.filename,
        contentType: blogPost.imageData.contentType,
        size: blogPost.imageData.size,
        hasData: !!blogPost.imageData.data
      } : null
    };

    res.status(201).json({ 
      success: true, 
      data: responseData,
      message: 'Post created successfully with MongoDB image storage'
    });

  } catch (error) {
    console.error('MongoDB storage error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        message: 'La taille du fichier doit être inférieure à 5MB' 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Un article avec ce titre existe déjà' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Erreur lors de la création de l\'article',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}