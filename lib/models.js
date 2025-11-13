import mongoose from 'mongoose';

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  phone: { type: String, trim: true },
  subject: {
    type: String,
    required: true,
    enum: ["consulting", "formation", "audit", "other"],
  },
  message: { type: String, required: true, trim: true },
  language: { type: String, enum: ["fr", "en"], default: "fr" },
  status: {
    type: String,
    enum: ["new", "contacted", "closed"],
    default: "new",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Newsletter Subscription Schema
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  language: { type: String, enum: ["fr", "en"], default: "fr" },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true
  },
  excerpt: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  image: { 
    type: String, 
    required: true,
    default: '/uploads/default-blog.jpg'
  },
  imageData: {
    data: String, // base64 encoded image data
    contentType: String, // image/jpeg, image/png, etc.
    filename: String,
    size: Number
  },
  categories: [{ type: String, trim: true }],
  language: { type: String, enum: ["fr", "en"], default: "fr" },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Admin User Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);