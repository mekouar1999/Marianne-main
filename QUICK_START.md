# 🚀 Quick Start Guide - Admin Backoffice

## Step 1: Add MongoDB Connection String

Create a file called `.env.local` in the root directory:

```bash
MONGODB_URI=your-mongodb-connection-string
```

**Get your MongoDB connection string:**
1. Go to your MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with your database name (e.g., `customs-engineering`)

Example:
```
MONGODB_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/customs-engineering?retryWrites=true&w=majority
```

## Step 2: Create Admin Account

Run this command:
```bash
node scripts/create-admin.js
```

You'll be prompted to enter:
- Username (press Enter for default: admin)
- Email (press Enter for default: admin@ces.com) 
- Full name (press Enter for default: Administrator)
- Password (press Enter for default: admin123)

**⚠️ Save your credentials!**

## Step 3: Start the Server

```bash
npm run dev
```

## Step 4: Access Admin Panel

### Option 1: Footer Icon
- Scroll to the bottom of any page
- Click the small **user icon** in the footer (bottom right)

### Option 2: Direct URL
- Navigate to: `http://localhost:3000/admin/login`

## Step 5: Login & Create Posts!

1. Login with your credentials
2. Click "Créer un article" (Create article)
3. Fill in the blog post details
4. Upload an image
5. Set to "Published" if ready
6. Click "Publier l'article"
7. View your post on the blog page!

---

## 📍 Admin Features

✅ **Create** blog posts with rich text editor  
✅ **Edit** existing posts  
✅ **Delete** posts  
✅ **Upload images** (up to 5MB)  
✅ **Draft/Publish** status  
✅ **Multi-language** support (FR/EN)  
✅ **Categories** tagging  

---

## 🔍 Where to Find the Admin Login

The admin login icon is a small user icon located in the **footer** at the bottom of every page, on the right side next to the copyright text.

---

## ⚠️ Important

- Keep your `.env.local` file secure
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Use strong passwords in production
- Images are stored in `/public/uploads/`

---

## 🆘 Troubleshooting

**Can't connect to MongoDB?**
- Check your connection string in `.env.local`
- Verify your MongoDB Atlas IP whitelist settings
- Make sure your cluster is active

**Can't login?**
- Verify admin account was created: Check terminal output
- Try creating a new admin with different username
- Clear browser cookies and try again

**Images not uploading?**
- Check if `/public/uploads/` directory exists
- Verify file size is under 5MB
- Only image files are accepted

---

Ready to add your MongoDB connection string and get started! 🎉
