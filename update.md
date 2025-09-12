# Production App Update Guide

## Overview
This guide shows how to update your AI Portfolio application running on Docker containers using rsync to sync files from your development environment to production server.

## Prerequisites
- Development server with built application (`npm run build` completed)
- SSH access to production server (31.97.72.20)
- Production server running Docker containers: `nginx` and `ai-backend`

## Production Server Structure
```
/root/Nginx/main/
├── assets/
│   ├── index-C6MZcy23.js
│   └── index-o2_2Y2vp.css
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── public/
│       ├── assets/
│       │   ├── index-BsMp-DQw.css
│       │   └── index-fTiIahfj.js
│       └── index.html
└── index.html
```

## Update Process

### Step 1: Build Application (Development Server)
```bash
# On development server
cd /path/to/your/app
npm run build
```

### Step 2: Sync Files to Production

#### Update Backend Files
```bash
# Sync backend JavaScript file
rsync -chavzP --stats -e "ssh" dist/index.js root@31.97.72.20:/root/Nginx/main/backend/

# Sync backend public assets
rsync -chavzP --stats -e "ssh" dist/public/ root@31.97.72.20:/root/Nginx/main/backend/public/
```

#### Update Main Frontend Files (Nginx-served)
```bash
# Sync main frontend files
rsync -chavzP --stats -e "ssh" dist/public/ root@31.97.72.20:/root/Nginx/main/
```

### Step 3: Restart Production Containers
```bash
# SSH to production server
ssh root@31.97.72.20

# Navigate to app directory
cd /root/Nginx/main

# Restart containers
docker restart ai-backend nginx
```

### Step 4: Alternative - Full Container Rebuild (if needed)
```bash
# If you need to rebuild the backend container
ssh root@31.97.72.20
cd /root/Nginx/main

# Stop and remove backend container
docker stop ai-backend
docker rm ai-backend

# Rebuild backend container
cd backend/
docker build -t nginx-ai-backend .
cd ..

# Start new backend container
docker run -d --name ai-backend -p 5000:5000 nginx-ai-backend

# Restart nginx container
docker restart nginx
```

### Step 5: Verify Update
```bash
# Check containers status
docker ps

# Test backend health
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost/

# Check logs if needed
docker logs ai-backend
docker logs nginx
```

## One-Command Update Script

Create this script on your development server for quick updates:

```bash
#!/bin/bash
# update-production.sh

echo "Building application..."
npm run build

echo "Syncing backend files..."
rsync -chavzP --stats -e "ssh" dist/index.js root@31.97.72.20:/root/Nginx/main/backend/
rsync -chavzP --stats -e "ssh" dist/public/ root@31.97.72.20:/root/Nginx/main/backend/public/

echo "Syncing frontend files..."
rsync -chavzP --stats -e "ssh" dist/public/ root@31.97.72.20:/root/Nginx/main/

echo "Restarting containers..."
ssh root@31.97.72.20 "cd /root/Nginx/main && docker restart ai-backend nginx"

echo "Verifying update..."
ssh root@31.97.72.20 "docker ps"

echo "Production update complete!"
```

Make it executable:
```bash
chmod +x update-production.sh
./update-production.sh
```

## What Gets Updated

### Frontend Changes:
- Fixed navigation scrolling functionality
- Enhanced AI chat interface
- Updated contact information (p.budzan@aiconshub.com)
- LinkedIn profile integration
- Mobile responsiveness improvements
- Performance optimizations

### Backend Changes:
- AI chat endpoint connected to n8n workflow
- Enhanced error handling
- Contact form validation
- Health check endpoint
- Logging improvements

## Troubleshooting

### If containers don't start:
```bash
docker logs ai-backend
docker logs nginx
```

### If files aren't updating:
- Check rsync paths match your production structure
- Ensure SSH key authentication is working
- Verify file permissions after sync

### If backend API fails:
- Check if n8n webhook URL is configured correctly in backend/index.js
- Replace `YOUR_WEBHOOK_ID` with actual webhook ID
- Verify port 5000 is accessible

## Important Notes

1. **n8n Configuration**: Update the webhook ID in `backend/index.js`:
   ```javascript
   const n8nWebhookUrl = `https://n8n.aiconshub.com/webhook/YOUR_ACTUAL_WEBHOOK_ID`;
   ```

2. **File Permissions**: After rsync, files maintain their permissions. If needed:
   ```bash
   ssh root@31.97.72.20 "chmod -R 755 /root/Nginx/main/"
   ```

3. **Container Networking**: Ensure Docker containers can communicate:
   - Backend container: `ai-backend` on port 5000
   - Nginx container: `nginx` on port 80

4. **Backup**: Before major updates, backup your production data:
   ```bash
   ssh root@31.97.72.20 "tar -czf /backup/nginx-main-$(date +%Y%m%d).tar.gz -C /root/Nginx main/"
   ```

## Success Indicators

- ✅ Docker containers show "Up" status
- ✅ `/api/health` returns HTTP 200
- ✅ Frontend loads without console errors
- ✅ Navigation scrolling works smoothly
- ✅ AI chat interface responds
- ✅ Contact form validation working