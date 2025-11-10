# Google AdSense Integration Guide

## Setup Steps

### 1. Get Your AdSense Account
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign up or log in
3. Add your website and verify ownership
4. Wait for approval (can take 1-2 weeks)

### 2. Get Your AdSense ID
Once approved:
1. Go to AdSense Dashboard
2. Navigate to **Account** → **Settings** → **Account information**
3. Copy your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

**Important**: Replace `XXXXXXXXXXXXXXXX` with your actual publisher ID.

### 4. Create Ad Units in AdSense

1. In AdSense Dashboard, go to **Ads** → **By ad unit**
2. Click **New ad unit**
3. Choose **Display ads**
4. Configure your ad (name it, choose size, etc.)
5. Click **Create**
6. Copy the **Ad slot ID** (a number like `1234567890`)

Create ad units for different positions:
- Header/Banner ad
- Sidebar ad
- Footer ad (optional)

### 5. Add Ad Slots to Your App

Add the ad slot IDs to `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_AD_SLOT_HEADER=1234567890
NEXT_PUBLIC_AD_SLOT_SIDEBAR=0987654321
```

### 6. Use the GoogleAdsense Component

The `GoogleAdsense` component is already created. Here's how to use it:

```typescript
import { GoogleAdsense } from "@/components/GoogleAdsense";

// In your component
<GoogleAdsense 
  adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER || ""} 
/>
```

### Example: Adding Ads to the Editor Page

Edit `src/components/Editor.tsx` to add ads:

```typescript
import { GoogleAdsense } from "./GoogleAdsense";

export function Editor() {
  // ... existing code ...

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Left column */}
      <div className="lg:col-span-7 bg-white rounded-lg shadow-xl p-6">
        {/* Ad above the editor */}
        {process.env.NEXT_PUBLIC_AD_SLOT_HEADER && (
          <div className="mb-4">
            <GoogleAdsense
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_HEADER}
              adFormat="horizontal"
            />
          </div>
        )}
        
        {/* ... rest of editor ... */}
      </div>

      {/* Right column - Sidebar with ad */}
      <div className="lg:col-span-3">
        {/* Ad in sidebar */}
        {process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR && (
          <div className="mb-4">
            <GoogleAdsense
              adSlot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR}
              adFormat="rectangle"
            />
          </div>
        )}
        
        <Sidebar metrics={metrics} />
      </div>
    </div>
  );
}
```

## Best Practices

### Ad Placement
- **Above the fold**: Header ads perform well
- **Within content**: Sidebar ads on desktop
- **Between sections**: Natural breaks in content
- **Don't overdo it**: Too many ads hurt user experience

### AdSense Policies
⚠️ **Important**: Follow [AdSense Program Policies](https://support.google.com/adsense/answer/48182)
- Don't click your own ads
- Don't ask others to click
- Don't place ads on pages with prohibited content
- Ensure proper ad placement (not misleading)

### Testing
1. **Development**: Ads won't show in development mode
2. **Production**: Deploy to test ads
3. **Wait time**: New ads may take 10-30 minutes to appear
4. **Check Console**: Look for AdSense errors in browser console

## Troubleshooting

### Ads Not Showing?
1. **Check approval**: Account must be approved
2. **Check site verification**: Site must be verified in AdSense
3. **Check environment variables**: Ensure IDs are correct
4. **Check browser console**: Look for errors
5. **Wait**: Ads can take 10-30 minutes after deployment
6. **Ad blockers**: Disable ad blockers for testing

### Common Errors
- `adsbygoogle.push() error: No slot size for availableWidth=0`: Ad container too small
- `TagError: adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them`: Duplicate ad units

## Performance Tips
- Use `loading="lazy"` for below-the-fold ads
- Minimize ad unit count (3-5 per page is good)
- Place ads strategically for user experience
- Monitor ad performance in AdSense dashboard

## Vercel Deployment

The AdSense integration works automatically on Vercel:

1. Push your code to Git
2. In Vercel Dashboard, go to **Settings** → **Environment Variables**
3. Add your environment variables:
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`
   - `NEXT_PUBLIC_AD_SLOT_HEADER`
   - `NEXT_PUBLIC_AD_SLOT_SIDEBAR`
4. Redeploy your app

Environment variables will be injected at build time.

## Revenue Tips
1. **Quality content**: Better content = more visitors = more revenue
2. **SEO optimization**: Use the tool to optimize your own content
3. **User experience**: Fast loading, mobile-friendly
4. **Traffic**: More visitors = more ad impressions
5. **Ad placement**: Experiment with positions
6. **Monitor**: Check AdSense reports regularly

---

**Note**: Replace `https://textgauge.com` with your actual domain in all files (sitemap, robots.txt, metadata).
