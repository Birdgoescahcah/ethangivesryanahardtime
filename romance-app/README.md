# Ethan & Ryan Romance Generator 💕

A spicy romance story generator featuring Ethan (always the dominant one) and Ryan.

## Local Development

```bash
npm install
npm run build
ANTHROPIC_API_KEY=your_key_here npm start
```

## Deploying to Coolify

### Step 1: Push to GitHub/GitLab

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/romance-generator.git
git branch -M main
git push -u origin main
```

### Step 2: Add to Coolify

1. In your Coolify dashboard, click **+ Add Resource**
2. Select **Public Repository** (or connect your GitHub/GitLab for private repos)
3. Paste your repository URL
4. Click **Check Repository**

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| Build Pack | **Nixpacks** |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Port | **3000** |

### Step 4: Add Environment Variable

**IMPORTANT:** Add your Anthropic API key:

1. Go to **Environment Variables** in your app settings
2. Add: `ANTHROPIC_API_KEY` = `your-api-key-here`
3. Save

### Step 5: Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Your app is live! 🎉

## Tech Stack

- React 18 + Vite
- Express.js backend
- Tailwind CSS
- Anthropic Claude API
