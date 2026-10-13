import mongoose from 'mongoose';

// Contact Form Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, default: "" },
  lastName: { type: String, trim: true, default: "" },
  name: { type: String, trim: true, default: "" },
  company: { type: String, trim: true, default: "" },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: { type: String, trim: true, default: "" },
  subject: {
    type: String,
    trim: true,
    default: "contact",
  },
  training: { type: String, trim: true, default: "" },
  message: { type: String, trim: true, default: "" },
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

// Veille Réglementaire Schema (no image required)
const veillePostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true
  },
  excerpt: { type: String, trim: true },
  summary: { type: String, trim: true },
  content: { type: String, required: true },
  category: { type: String, trim: true, default: "Réglementation" },
  source: { type: String, trim: true },
  sourceUrl: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  language: { type: String, enum: ["fr", "en"], default: "fr" },
  published: { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);
export const VeillePost = mongoose.models.VeillePost || mongoose.model("VeillePost", veillePostSchema);
export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

// Consulting page editable content (service cards)
const consultingCardSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  features: [{ type: String, trim: true }],
  color: { type: String, default: '' }
}, { _id: false });

const consultingContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'consulting-services' },
  fr: [consultingCardSchema],
  en: [consultingCardSchema],
  updatedAt: { type: Date, default: Date.now }
});

export const ConsultingContent = mongoose.models.ConsultingContent || mongoose.model("ConsultingContent", consultingContentSchema);

// Experience page editable content (client testimonials)
const testimonialCardSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: '' },
  position: { type: String, trim: true, default: '' },
  company: { type: String, trim: true, default: '' },
  text: { type: String, trim: true, default: '' },
  results: [{ type: String, trim: true }],
  photo: { type: String, default: '' },
  date: { type: String, default: '' }
}, { _id: false });

const experienceContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'experience-testimonials' },
  fr: [testimonialCardSchema],
  en: [testimonialCardSchema],
  updatedAt: { type: Date, default: Date.now }
});

export const ExperienceContent = mongoose.models.ExperienceContent || mongoose.model("ExperienceContent", experienceContentSchema);

// Formation page editable content (training program cards)
const formationCardSchema = new mongoose.Schema({
  id: { type: String, trim: true, default: '' },
  title: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
}, { _id: false });

const formationContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'formation-trainings' },
  fr: [formationCardSchema],
  en: [formationCardSchema],
  updatedAt: { type: Date, default: Date.now }
});

export const FormationContent = mongoose.models.FormationContent || mongoose.model("FormationContent", formationContentSchema);