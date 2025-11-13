import dbConnect from '../../../../lib/mongodb';
import { BlogPost, Admin } from '../../../../lib/models';
import multer from 'multer';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';

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

// Use memory storage first to test if disk I/O is the issue
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 2 * 1024 * 1024, // Reduced to 2MB for testing
  },
  fileFilter: function (req, file, cb) {
    console.log('Memory storage - File filter check:', {
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
    console.log('=== Memory Storage Image Upload Test ===');
    
    // Check authentication
    await requireAuth(req);
    console.log('Authentication successful');

    // Handle file upload with memory storage
    console.log('Processing file upload with memory storage...');
    await uploadMiddleware(req, res);
    
    const fileInfo = req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer.length
    } : null;
    
    console.log('File upload result:', fileInfo);

    // Get form data
    const { title, excerpt, content } = req.body;
    console.log('Form data received:', { title, excerpt, contentLength: content?.length });

    if (!title || !excerpt || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title, excerpt, and content are required',
        fileInfo 
      });
    }

    // If we got here with a file, try to save it to disk
    let imagePath = '/uploads/default-blog.jpg';
    
    if (req.file) {
      try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const filename = `blog-test-${Date.now()}${path.extname(req.file.originalname)}`;
        const filepath = path.join(uploadDir, filename);
        
        console.log('Saving file to disk:', filepath);
        fs.writeFileSync(filepath, req.file.buffer);
        
        imagePath = `/uploads/${filename}`;
        console.log('File saved successfully:', imagePath);
      } catch (saveError) {
        console.error('Error saving file to disk:', saveError);
        // Continue with default image
      }
    }

    // Create slug
    const slug = `test-${title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')}-${Date.now()}`;

    // Create blog post
    const blogPost = new BlogPost({
      title,
      slug,
      excerpt,
      content,
      image: imagePath,
      categories: ['Test'],
      language: 'fr',
      published: false
    });

    await blogPost.save();
    console.log('Blog post saved successfully');

    res.status(201).json({ 
      success: true, 
      data: blogPost,
      fileInfo,
      message: 'Post created with memory storage test'
    });

  } catch (error) {
    console.error('Memory storage test error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    res.status(500).json({ 
      success: false, 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}