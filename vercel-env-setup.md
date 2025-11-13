# Vercel Environment Variables Configuration

## Required Environment Variables

Set these environment variables in your Vercel dashboard:

### Production Environment Variables

1. **MONGODB_URI**
   ```
   mongodb+srv://slaouisalaheddine20212022:VRuIVxeexmq8kKM3@cluster0.thtmxcz.mongodb.net/customs-engineering?retryWrites=true&w=majority
   ```

2. **NODE_ENV**
   ```
   production
   ```

3. **JWT_SECRET**
   ```
   your-super-secret-jwt-key-change-this-in-production-xyz123
   ```

4. **SESSION_SECRET**
   ```
   your-session-secret-key-change-this-in-production-abc456
   ```

5. **PORT** (optional, Vercel handles this)
   ```
   5000
   ```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with the corresponding value
5. Choose the appropriate environment (Production, Preview, Development)

## Important Security Notes

- Change the JWT_SECRET and SESSION_SECRET to strong, unique values
- Never commit sensitive credentials to your repository
- Use different secrets for production and development environments

## Local Development

The `.env` file in the backend folder is already configured for local development with the MongoDB Atlas URI.

To run locally:
```bash
cd backend
npm install
node seed.js  # Run this once to seed the database
npm run dev
```

## Admin Credentials (After Seeding)

- Username: `admin`
- Password: `admin123`
- Email: `admin@customs-engineering.fr`

Access admin panel at: `https://yourdomain.com/admin/login`