# Scripts Documentation

## Blog Post Seeding Script

### Overview
The `seed-blog-posts.js` script populates the database with sample blog posts in both French and English, covering topics relevant to customs and international trade.

### Usage

```bash
npm run seed-blog
```

Or run directly:
```bash
node scripts/seed-blog-posts.js
```

### What it does

1. **Connects to MongoDB** using the `MONGODB_URI` environment variable
2. **Clears existing blog posts** (optional - can be commented out)
3. **Inserts 10 new blog posts** (5 French, 5 English)
4. **Displays summary** of seeded posts

### Blog Post Topics

#### French Posts:
- Les nouvelles réglementations douanières UE 2024
- Optimiser ses coûts douaniers : 5 stratégies efficaces
- Certification OEA : Guide complet 2024
- Brexit et commerce : adaptation des flux commerciaux
- Transformation numérique en douane : Tendances 2024

#### English Posts:
- New EU Customs Regulations 2024
- Optimizing Customs Costs: 5 Effective Strategies
- AEO Certification: Complete Guide 2024
- Brexit and Trade: Adapting Commercial Flows
- Digital Transformation in Customs: Trends 2024

### Post Structure

Each blog post includes:
- **Title** and **slug** (URL-friendly version)
- **Excerpt** (summary)
- **Full content** (HTML formatted)
- **Categories** (relevant tags)
- **Language** (fr or en)
- **Published status** (all set to published)
- **Publication date** (spread across 2024)
- **Default image** (uses /uploads/default-blog.jpg)

### Requirements

- **Environment Variables**: `MONGODB_URI` must be set in `.env.local`
- **Dependencies**: 
  - `mongoose` (for database operations)
  - `dotenv` (for environment variables)

### Customization

To add more blog posts or modify existing ones:

1. Edit the `blogPosts` array in `seed-blog-posts.js`
2. Follow the existing structure for new posts
3. Run the script to update the database

### Safety Notes

- The script clears all existing blog posts before seeding
- Comment out the `BlogPost.deleteMany({})` line to preserve existing posts
- Always backup your database before running in production

### Troubleshooting

- **Connection Error**: Check your `MONGODB_URI` in `.env.local`
- **Permission Error**: Ensure database user has write permissions
- **Module Not Found**: Run `npm install` to install dependencies