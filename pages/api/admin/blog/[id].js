import dbConnect from '../../../../lib/mongodb';
import { BlogPost, Admin } from '../../../../lib/models';
import multer from 'multer';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';

// Authentication middleware
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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
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
  try {
    // Check authentication
    await requireAuth(req);
    
    const { id } = req.query;
    
    if (req.method === 'GET') {
      await dbConnect();
      const post = await BlogPost.findById(id);
      
      if (!post) {
        return res.status(404).json({ success: false, message: 'Article non trouvé' });
      }
      
      res.json({ success: true, data: post });
    } else if (req.method === 'DELETE') {
      await dbConnect();
      
      const post = await BlogPost.findById(id);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Article non trouvé' });
      }
      
      // Delete image file if it's not the default
      if (post.image && post.image !== '/uploads/default-blog.jpg' && !post.image.startsWith('http')) {
        const imagePath = path.join('./public', post.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      await BlogPost.findByIdAndDelete(id);
      res.json({ success: true, message: 'Article supprimé avec succès' });
    } else if (req.method === 'PUT') {
      await dbConnect();
      
      // Handle file upload if present
      await uploadMiddleware(req, res);
      
      const { title, excerpt, content, categories, language, published } = req.body;
      
      if (!title || !excerpt || !content) {
        return res.status(400).json({ success: false, message: 'Le titre, l\'extrait et le contenu sont requis' });
      }
      
      // Find the existing post
      const existingPost = await BlogPost.findById(id);
      if (!existingPost) {
        return res.status(404).json({ success: false, message: 'Article non trouvé' });
      }
      
      // Generate slug from title
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      
      // Check if slug already exists (excluding current post)
      const duplicatePost = await BlogPost.findOne({ slug, _id: { $ne: id } });
      if (duplicatePost) {
        return res.status(400).json({ success: false, message: 'Un article avec ce titre existe déjà' });
      }
      
      // Prepare update data
      const updateData = {
        title,
        slug,
        excerpt,
        content,
        categories: categories ? categories.split(',').map(cat => cat.trim()) : [],
        language: language || 'fr',
        published: published === 'true' || published === true,
        updatedAt: new Date()
      };
      
      // Update publishedAt if changing from unpublished to published
      if ((published === 'true' || published === true) && !existingPost.published) {
        updateData.publishedAt = new Date();
      } else if (!(published === 'true' || published === true) && existingPost.published) {
        updateData.publishedAt = null;
      }
      
      // Handle image update
      if (req.file) {
        // Delete old image if it's not the default
        if (existingPost.image && existingPost.image !== '/uploads/default-blog.jpg' && !existingPost.image.startsWith('http')) {
          const oldImagePath = path.join('./public', existingPost.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.image = `/uploads/${req.file.filename}`;
      }
      
      const updatedPost = await BlogPost.findByIdAndUpdate(id, updateData, { new: true });
      res.json({ success: true, data: updatedPost });
    } else {
      res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }
  } catch (error) {
    if (error.message === 'Authentication required' || error.message === 'Admin not found') {
      return res.status(401).json({ success: false, message: error.message });
    }
    
    if (error.message === 'Only image files are allowed') {
      return res.status(400).json({ success: false, message: 'Seuls les fichiers image sont autorisés' });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'La taille du fichier doit être inférieure à 5MB' });
    }
    
    console.error('Blog API error:', error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
}