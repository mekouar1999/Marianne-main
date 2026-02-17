# Admin Backoffice Setup Guide

## 🎯 Overview
Your website now has a complete admin backoffice system for managing blog posts dynamically!

## 🔑 Access Points

### 1. **Admin Login Icon**
- Located in the **footer** (bottom right corner)
- Small user icon with "Admin" text
- Click to access the login page

### 2. **Direct URL**
- Login: `http://localhost:3000/admin/login`
- Dashboard: `http://localhost:3000/admin/dashboard`

## 📝 Setup Instructions

### Step 1: Create `.env.local` File
1. Copy `.env.local.example` to `.env.local`
2. Add your MongoDB connection string:

```env
MONGODB_URI=your-mongodb-connection-string-here
```

### Step 2: Create Admin User
Run this script to create your first admin account:

```bash
node scripts/create-admin.js
```

Follow the prompts to create username and password.

## 🎨 Features

### Admin Dashboard
- **View all blog posts** (published and drafts)
- **Create new posts** with rich text editor
- **Edit existing posts**
- **Delete posts**
- **Upload images** (up to 5MB)
- **Set published status**
- **Multi-language support** (French/English)

### Blog Post Management
Each post includes:
- Title
- Excerpt (short description)
- Full content (rich text)
- Featured image
- Categories
- Language selection
- Published/Draft status
- Automatic slug generation

## 🔐 Security

- **Cookie-based authentication**
- **Password hashing with bcrypt**
- **Protected API routes**
- **Session management**
- **HttpOnly cookies**

## 📊 MongoDB Collections

Your database will have these collections:
- `admins` - Admin users
- `blogposts` - Blog articles
- `contacts` - Contact form submissions
- `newsletters` - Newsletter subscriptions

## 🚀 Getting Started

1. **Add MongoDB URI to `.env.local`**
2. **Create admin account**: `node scripts/create-admin.js`
3. **Start development server**: `npm run dev`
4. **Click admin icon in footer** or go to `/admin/login`
5. **Login with your credentials**
6. **Start creating blog posts!**

## 📝 Creating Your First Blog Post

1. Login to admin dashboard
2. Click "Créer un article" button
3. Fill in the form:
   - Title (required)
   - Excerpt (required)
   - Content (required)
   - Upload image (optional but recommended)
   - Add categories (optional)
   - Choose language
   - Set published status
4. Click "Publier l'article"
5. View your post on the blog page!

## 🔧 API Endpoints

### Public
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/[slug]` - Get single blog post

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/me` - Get current admin
- `GET /api/admin/blog` - Get all posts (including drafts)
- `POST /api/admin/blog/create-mongodb` - Create new post
- `PUT /api/admin/blog/[id]` - Update post
- `DELETE /api/admin/blog/[id]` - Delete post

## 💡 Tips

1. **Images**: Use high-quality images (max 5MB)
2. **Excerpts**: Keep under 200 characters for best display
3. **Categories**: Use consistent category names
4. **Drafts**: Create posts as drafts first, publish when ready
5. **SEO**: Good titles and excerpts help with search engines

## ⚠️ Important Notes

- Always keep your `.env.local` file secure and never commit it to git
- Use strong passwords for admin accounts
- Back up your MongoDB database regularly
- Images are stored in `/public/uploads/` directory

## 🐛 Troubleshooting

### Can't login?
- Check MongoDB connection string in `.env.local`
- Verify admin account was created successfully
- Check browser console for errors

### Images not uploading?
- Ensure `/public/uploads/` directory exists and is writable
- Check file size (must be under 5MB)
- Verify file type (images only)

### Posts not appearing?
- Check if post is set to "published"
- Verify correct language is selected
- Clear browser cache

## 📧 Support

For issues or questions, check the browser console and server logs for detailed error messages.
