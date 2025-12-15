# Ethan & Ryan Romance Generator 💕

A spicy romance story generator featuring Ethan (always the dominant one) and Ryan.

## Local Development

```bash
npm install
npm run dev
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
| Build Pack | **Nixpacks** (auto-detected) |
| Port | **3000** |
| Build Command | `npm run build` |
| Start Command | `npm run preview -- --host --port 3000` |

Or for static deployment:
| Setting | Value |
|---------|-------|
| Build Pack | **Nixpacks** |
| Is Static Site | **Yes** |
| Output Directory | **dist** |

### Step 4: Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Your app is live! 🎉

### Optional: Custom Domain

1. Go to your app settings in Coolify
2. Add your domain in the **Domains** field
3. Coolify will auto-configure SSL via Let's Encrypt

## Notes

- This app uses the Anthropic API client-side for story generation
- The API key is handled by the claude.ai environment (for artifact use)
- For standalone deployment, you'd need to add your own API key handling

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Anthropic Claude API
