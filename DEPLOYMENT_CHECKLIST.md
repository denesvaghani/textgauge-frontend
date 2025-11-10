# TextGauge Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Update Domain References
Replace `https://textgauge.com` with your actual domain in:
- [ ] `src/app/layout.tsx` (metadata.openGraph.url and alternates.canonical)
- [ ] `src/app/sitemap.ts` (baseUrl)
- [ ] `public/robots.txt` (Sitemap URL)

### 2. SEO Configuration
- [ ] Verify page title and description are accurate
- [ ] Check that keywords are relevant
- [ ] Ensure structured data is correct
- [ ] Test meta tags using [Meta Tags Debugger](https://metatags.io/)

### 3. Google AdSense Setup (Optional)
- [ ] Apply for Google AdSense account
- [ ] Wait for approval (1-2 weeks)
- [ ] Get your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
- [ ] Create ad units in AdSense dashboard
- [ ] Get ad slot IDs

### 4. Environment Variables (For AdSense)
If using AdSense, create `.env.local` locally:
```bash
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_HEADER=1234567890
NEXT_PUBLIC_AD_SLOT_SIDEBAR=0987654321
```

### 5. Build & Test Locally
```bash
npm run build
npm run start
```
- [ ] Check all pages load correctly
- [ ] Test text analysis functionality
- [ ] Verify keyword tracking works
- [ ] Test all text transformation buttons
- [ ] Check responsive design (mobile/tablet/desktop)

## 🚀 Vercel Deployment Steps

### 1. Push to GitHub
```bash
git push origin feat/migrate-backend-into-next
```

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository

### 3. Configure Project Settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `textgauge-frontend` (if in monorepo) or `./` (if standalone)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 4. Add Environment Variables (Optional - For AdSense)
In Vercel Project Settings → Environment Variables:
```
NEXT_PUBLIC_GOOGLE_ADSENSE_ID = ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_HEADER = 1234567890
NEXT_PUBLIC_AD_SLOT_SIDEBAR = 0987654321
```
Select: ☑️ Production ☑️ Preview ☑️ Development

### 5. Deploy!
Click "Deploy" and wait for build to complete (2-3 minutes)

## 📊 Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Visit your Vercel URL (e.g., `your-app.vercel.app`)
- [ ] Test all functionality
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)

### 2. Custom Domain Setup (Optional)
1. In Vercel → Settings → Domains
2. Add your custom domain (e.g., `textgauge.com`)
3. Configure DNS records (Vercel provides instructions)
4. Wait for DNS propagation (can take 24-48 hours)

### 3. SEO Submission
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
  - Add property: `https://yourdomain.com`
  - Verify ownership
  - Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Submit to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Check robots.txt is accessible: `https://yourdomain.com/robots.txt`

### 4. Performance Testing
- [ ] Run [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Check [GTmetrix](https://gtmetrix.com/)
- [ ] Test with [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [ ] Aim for 90+ scores

### 5. Analytics Setup (Optional)
Consider adding:
- Google Analytics 4
- Vercel Analytics (free with Vercel)
- Plausible or similar privacy-friendly analytics

### 6. Monitor & Maintain
- [ ] Check Vercel deployment logs for errors
- [ ] Monitor AdSense revenue (if enabled)
- [ ] Track search rankings
- [ ] Monitor user feedback
- [ ] Regular updates and improvements

## 🔧 Common Issues & Solutions

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility
- Try rebuilding: Deployments → Click "..." → Redeploy

### Domain Not Working
- DNS propagation can take 24-48 hours
- Verify DNS records are correct
- Check Vercel domain settings
- Try clearing browser cache

### Ads Not Showing
- AdSense approval required first
- Site must be live and indexed by Google
- Ads can take 10-30 minutes to appear
- Check browser console for errors
- Disable ad blockers for testing

### SEO Not Working
- Google indexing takes time (1-2 weeks)
- Submit sitemap to Search Console
- Create quality backlinks
- Ensure meta tags are correct
- Check robots.txt allows crawling

## 📈 SEO Tips for Success

1. **Content Marketing**: Write blog posts about SEO, word counting, content optimization
2. **Backlinks**: Share on social media, forums, relevant communities
3. **Keywords**: Target long-tail keywords like "free word counter", "SEO keyword density checker"
4. **Update Content**: Regularly improve and update the tool
5. **Mobile-First**: Ensure excellent mobile experience
6. **Speed**: Keep the site fast (use Vercel Edge Network)
7. **User Experience**: Listen to user feedback and iterate

## 🎯 Success Metrics

Track these to measure success:
- **Traffic**: Daily/monthly visitors
- **SEO Rankings**: Position for target keywords
- **Engagement**: Time on site, bounce rate
- **Conversions**: Tool usage rate
- **Revenue**: AdSense earnings (if enabled)
- **Performance**: Page load times, Core Web Vitals

---

## Quick Deploy Command

```bash
# From project root
git add -A
git commit -m "Ready for production deployment"
git push origin feat/migrate-backend-into-next

# Then deploy on Vercel dashboard or CLI:
vercel --prod
```

---

**Questions?** Check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Google AdSense Help](https://support.google.com/adsense)
- [Google Search Console Help](https://support.google.com/webmasters)
