# MAZTAA — Manual Setup Guide

This document outlines everything you need to configure manually before the website is fully production-ready.

---

## PHASE 1 — Brand

- [ ] Replace the MAZTAA favicon (`frontend/public/favicon.svg`) with your final logo SVG or ICO
- [ ] Verify the Outfit font renders correctly on all devices
- [ ] If you have a logo file, update `Navbar.jsx` and `MobileMenu.jsx` with an `<img>` tag instead of the inline SVG mark
- [ ] Replace `MAZTAA_DOMAIN` in `frontend/index.html` with your actual domain (e.g., `https://maztaa.com`)

---

## PHASE 2 — Website Content

Open `frontend/src/data/siteContent.js` and replace the following:

**Hero:**
- `HERO_CONTENT.headlineLine1` — Update headline if needed
- `HERO_CONTENT.headlineLine2` — Update second headline line
- `HERO_CONTENT.subheading`   — Update supporting text

**About:**
- `ABOUT_CONTENT.statement`   — Update the editorial statement
- `ABOUT_CONTENT.description` — Update studio description
- `ABOUT_CONTENT.philosophy`  — Update philosophy paragraph

**Projects (in `PROJECTS` array):**
- Replace `PROJECT_1_NAME`, `PROJECT_2_NAME`, `PROJECT_3_NAME`, `PROJECT_4_NAME`
- Replace `/images/projects/project-01.webp` etc. with your actual project image paths
- Replace `PROJECT_1_URL`, `PROJECT_2_URL`, `PROJECT_3_URL`, `PROJECT_4_URL` with live project URLs
- Update `category`, `description`, and `tags` for each project
- Upload project images to `frontend/public/images/projects/`

**Technologies:**
- Edit the `TECHNOLOGIES` array to add/remove technologies

**FAQ:**
- Edit `FAQ_ITEMS` to add or update questions and answers

---

## PHASE 3 — Whop Checkout Links

Open `frontend/src/data/siteContent.js` and update `WHOP_LINKS`:

```js
export const WHOP_LINKS = {
  starter:      'https://whop.com/checkout/your-starter-link',
  professional: 'https://whop.com/checkout/your-professional-link',
  businessPro:  'https://whop.com/checkout/your-business-pro-link', // optional
  custom:       'https://whop.com/checkout/your-custom-link',        // optional
};
```

- Activate Business Pro and Custom plans by setting `active: true` in `PRICING_PLANS` in `siteContent.js`

---

## PHASE 4 — Contact & Social Links

Open `frontend/src/data/siteContent.js` and update `SITE_LINKS`:

```js
export const SITE_LINKS = {
  email:     'hello@maztaa.com',
  instagram: 'https://instagram.com/maztaa',
  linkedin:  'https://linkedin.com/company/maztaa',
  github:    'https://github.com/maztaa',
  // legal links below...
};
```

---

## PHASE 5 — Legal Pages

Add your legal page URLs in `SITE_LINKS` in `siteContent.js`:

```js
terms:   'https://maztaa.com/terms',
privacy: 'https://maztaa.com/privacy',
refund:  'https://maztaa.com/refund',
eula:    'https://maztaa.com/eula',
```

Once set, Footer links will automatically render as clickable links (they are currently styled as inactive placeholders).

---

## PHASE 6 — Supabase Configuration

### 6.1 Verify Environment Variables

Ensure `frontend/.env` contains:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Locate these values in:
**Supabase Dashboard → Project → Settings → API**

### 6.2 Verify Google OAuth

In Supabase Dashboard:
1. Go to **Authentication → Providers**
2. Enable **Google**
3. Enter your **Client ID** and **Client Secret** from Google Cloud Console
4. Add redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`

In Google Cloud Console:
1. Go to **APIs & Services → Credentials**
2. Under **OAuth 2.0 Client IDs**, add:
   - Authorized redirect URIs: `https://your-project-id.supabase.co/auth/v1/callback`
   - Authorized JavaScript origins: your production domain

### 6.3 Run the SQL Schema

Open **Supabase Dashboard → SQL Editor** and paste the content of:

```
supabase/schema.sql
```

Click **Run** to create all tables, triggers, and RLS policies.

---

## PHASE 7 — Deployment

### 7.1 GitHub

- Push all code to a GitHub repository (if not already done)
- Ensure `.env` is listed in `.gitignore` (already configured)

### 7.2 Vercel

1. Go to [vercel.com](https://vercel.com) and import your GitHub repository
2. Set **Root Directory** to `frontend`
3. Framework: **Vite**
4. Add environment variables:
   - `VITE_SUPABASE_URL` → your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
5. Click **Deploy**

### 7.3 Domain

1. In Vercel → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records at your domain registrar as instructed by Vercel
4. Wait for SSL to provision (usually 5–15 minutes)

---

## PHASE 8 — Testing Checklist

After deployment, verify the following:

### General
- [ ] Website loads on mobile (360px, 390px, 430px)
- [ ] Website loads on tablet (768px, 1024px)
- [ ] Website loads on desktop (1280px, 1440px, 1920px)
- [ ] No horizontal overflow on any screen size
- [ ] Grain texture is visible but extremely subtle
- [ ] All fonts render correctly

### Navigation
- [ ] Desktop navbar links scroll to correct sections
- [ ] Mobile hamburger menu opens and closes correctly
- [ ] Mobile menu links navigate and close menu
- [ ] "Start a Project" CTA scrolls to pricing
- [ ] "View Our Work" scrolls to portfolio section
- [ ] Active section indicator moves correctly on scroll

### Sections
- [ ] Hero headline and subheading display correctly
- [ ] Technology rail scrolls horizontally
- [ ] About section layout correct at all widths
- [ ] Process step switcher works on desktop
- [ ] Process accordion works on mobile
- [ ] Portfolio cards display placeholder gradients (until images added)
- [ ] Pricing cards show correct plans (Starter + Professional active)
- [ ] Business Pro and Custom show "Coming Soon"
- [ ] FAQ accordion opens and closes correctly
- [ ] CTA section renders at all widths

### Interactions
- [ ] "Choose Plan" / "Start Project" buttons on Pricing trigger checkout (if Whop URLs are configured)
- [ ] "Client Login" triggers Google OAuth redirect
- [ ] All external links (social, legal) open correctly in new tab

### Accessibility
- [ ] Keyboard navigation works through navbar and FAQ
- [ ] Focus states are visible (red outline)
- [ ] ARIA labels on interactive elements
- [ ] Images have alt text

### Build
- [ ] `npm run build` completes with zero errors
- [ ] `npm run preview` renders correctly

---

*Generated by MAZTAA — Configuration Guide v1.0*
