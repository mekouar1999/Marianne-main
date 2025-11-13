# Deployment Guide - Customs Engineering Solutions

This guide covers various deployment options for the Customs Engineering Solutions website.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Domain name configured (for production)

### Local Development
```bash
# Clone the repository
git clone <repository-url>
cd Marianne

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## 🌐 Production Deployment

### Option 1: Docker Compose (Recommended)

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd Marianne
   
   # Configure environment
   cp backend/.env.example backend/.env
   # Edit backend/.env with production values
   
   # Start services
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **SSL Setup with Let's Encrypt**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Get SSL certificate
   sudo certbot --nginx -d customs-engineering.fr -d www.customs-engineering.fr
   ```

### Option 2: Separate Hosting

#### Frontend (Vercel/Netlify)

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

**Netlify:**
```bash
# Build
cd frontend
npm run build

# Deploy dist folder to Netlify
```

#### Backend (Railway/Heroku/DigitalOcean)

**Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
cd backend
railway login
railway init
railway up
```

**Heroku:**
```bash
# Install Heroku CLI
# Create Heroku app
heroku create ces-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git subtree push --prefix backend heroku main
```

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)
1. Create account at https://cloud.mongodb.com
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

### Self-hosted MongoDB
```bash
# Install MongoDB
sudo apt install mongodb

# Start service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
use customs-engineering
db.createUser({
  user: "cesuser",
  pwd: "secure-password",
  roles: ["readWrite"]
})
```

## 🔧 Environment Configuration

### Production Environment Variables

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/customs-engineering

# Email (using Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact@customs-engineering.fr
SMTP_PASS=app-specific-password

# Security
JWT_SECRET=super-secure-random-string
CORS_ORIGINS=https://customs-engineering.fr,https://www.customs-engineering.fr

# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

**Frontend (.env):**
```env
VITE_API_URL=https://api.customs-engineering.fr
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 🔒 Security Checklist

### SSL/TLS
- [ ] SSL certificate installed
- [ ] HTTPS redirect configured
- [ ] HSTS headers enabled

### Application Security
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Security headers configured

### Database Security
- [ ] MongoDB authentication enabled
- [ ] Database user with minimal permissions
- [ ] Network access restricted
- [ ] Regular backups configured

## 📊 Monitoring & Logging

### Application Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start application with PM2
cd backend
pm2 start ecosystem.config.js

# Monitor
pm2 monit
pm2 logs
```

### Log Management
```bash
# Rotate logs
sudo apt install logrotate

# Configure log rotation
sudo nano /etc/logrotate.d/ces-app
```

### Health Checks
- Backend: `GET /api/health`
- Frontend: HTTP 200 response
- Database: Connection test

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd frontend && npm ci
          cd ../backend && npm ci
          
      - name: Build frontend
        run: cd frontend && npm run build
        
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/customs-engineering
            git pull origin main
            docker-compose down
            docker-compose up -d --build
```

## 🔧 Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Monitor server resources
- [ ] Check SSL certificate expiry
- [ ] Review security logs
- [ ] Backup database weekly

### Updates
```bash
# Update application
git pull origin main
docker-compose down
docker-compose up -d --build

# Update system packages
sudo apt update && sudo apt upgrade -y
```

### Backup Strategy
```bash
# Database backup
mongodump --uri="mongodb://user:pass@host:port/customs-engineering" --out=/backups/$(date +%Y%m%d)

# Application backup
tar -czf /backups/app-$(date +%Y%m%d).tar.gz /var/www/customs-engineering
```

## 🆘 Troubleshooting

### Common Issues

**Frontend not loading:**
- Check Nginx configuration
- Verify build files exist
- Check browser console for errors

**API not responding:**
- Check backend logs: `docker-compose logs backend`
- Verify database connection
- Check environment variables

**Database connection failed:**
- Verify MongoDB is running
- Check connection string
- Verify network access

### Debug Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh

# Check network connectivity
docker-compose exec backend ping mongodb
```

## 📞 Support

For deployment support:
- Email: tech@customs-engineering.fr
- Documentation: Check README.md
- Issues: GitHub Issues page

---

**Note:** Always test deployments in a staging environment before production deployment.
