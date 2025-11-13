# MongoDB Atlas Setup for Vercel Deployment

## Critical Issue: IP Whitelist Configuration

The timeout error "La requête a pris trop de temps. Veuillez réessayer." is most likely caused by **MongoDB Atlas IP whitelist restrictions**.

### Problem
Vercel serverless functions don't have fixed IP addresses, so if MongoDB Atlas isn't configured to allow all IPs, connections will hang indefinitely.

### Solution

1. **Go to MongoDB Atlas Dashboard**
   - Navigate to your cluster
   - Go to "Network Access" in the left sidebar

2. **Add IP Whitelist Entry**
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" 
   - OR manually add: `0.0.0.0/0`
   - Add description: "Vercel Serverless Functions"

3. **Alternative: Vercel IP Ranges** (More Secure)
   - Get current Vercel IP ranges from: https://vercel.com/docs/concepts/edge-network/regions
   - Add each IP range individually

### Current Connection String
```
mongodb+srv://slaouisalaheddine20212022:VRuIVxeexmq8kKM3@cluster0.thtmxcz.mongodb.net/customs-engineering?retryWrites=true&w=majority
```

### Other Common Issues

1. **Cluster Paused**: Free tier clusters pause after 60 minutes of inactivity
2. **Connection Limits**: Free tier has limited concurrent connections
3. **Network Latency**: Atlas to Vercel connection can be slow

### Testing Endpoints Created

- `/api/admin/health-check` - Basic API functionality
- `/api/admin/db-test` - Database connection with detailed timing
- `/api/admin/test-connection` - Full auth + database test
- `/api/admin/create-post-simple` - Post creation without file upload

### Troubleshooting Steps

1. Test `/api/admin/health-check` - Should always work
2. Test `/api/admin/db-test` - Will show where connection fails
3. If db-test fails, check IP whitelist in MongoDB Atlas
4. If db-test works but post creation fails, issue is in application logic

### Production Settings

For production, consider:
- Using MongoDB Atlas dedicated clusters
- Implementing connection pooling
- Adding proper monitoring and alerting
- Using more restrictive IP whitelisting