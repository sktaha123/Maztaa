// ============================================================
// MAZTAA — Centralized Website Content
// Single source of truth for all copy, links, and data.
// ============================================================

export const SITE_CONFIG = {
  name: 'MAZTAA',
  tagline: 'Web Design & Development Studio',
  description: 'Custom websites and digital experiences built around your business. High-performance, human-designed, and built to convert.',
  url: 'https://maztaa.com',
};

// ────────────────────────────────────────────────────────────
// NAVIGATION
// ────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',         href: '/#about'         },
  { label: 'Work',          href: '/#work'          },
  { label: 'Process',       href: '/#process'       },
  { label: 'Pricing',       href: '/#pricing'       },
  { label: 'FAQ',           href: '/#faq'           },
  { label: 'Opportunities', href: '/opportunities'  },
];

// ────────────────────────────────────────────────────────────
// EXTERNAL LINKS & PLACEHOLDERS
// ────────────────────────────────────────────────────────────
export const SITE_LINKS = {
  email:     'hello@maztaa.com',
  instagram: 'INSTAGRAM_URL',
  linkedin:  'LINKEDIN_URL',
  github:    'GITHUB_URL',
  terms:     '/docs/terms-of-service.pdf',
  privacy:   '/docs/privacy-policy.pdf',
  refund:    '/docs/refund-policy.pdf',
  eula:      '/docs/eula.pdf',
};

// ────────────────────────────────────────────────────────────
// WHOP CHECKOUT LINKS
// ────────────────────────────────────────────────────────────
export const WHOP_LINKS = {
  starter:      'https://whop.com/checkout/plan_DXCJKpooxfPJT',
  professional: 'https://whop.com/checkout/plan_xwYUESNYuiFjB',
  businessPro:  'https://whop.com/checkout/business-pro-plan-placeholder',
  custom:       'https://whop.com/checkout/custom-plan-placeholder',
};

// ────────────────────────────────────────────────────────────
// HERO SECTION
// ────────────────────────────────────────────────────────────
export const HERO_CONTENT = {
  headlineLine1: 'Your business has a story.',
  headlineLine2: 'Make it worth explaining',
  subheading: 'Custom websites and digital experiences built around your business.',
  ctaPrimary:   { label: 'View Our Work', href: '#work' },
};

// ────────────────────────────────────────────────────────────
// TECHNOLOGIES SECTION
// ────────────────────────────────────────────────────────────
export const TECHNOLOGIES = [
  { name: 'React',         purpose: 'Component Architecture' },
  { name: 'Next.js',       purpose: 'Production Framework'   },
  { name: 'Tailwind CSS',  purpose: 'Design Systems'         },
  { name: 'Framer Motion', purpose: 'Micro-Interactions'     },
  { name: 'Supabase',      purpose: 'Backend & Database'     },
  { name: 'Vite',          purpose: 'Modern Build Tooling'   },
  { name: 'PostgreSQL',    purpose: 'Relational Data'        },
  { name: 'Vercel',        purpose: 'Global Edge Deployment' },
];

// ────────────────────────────────────────────────────────────
// ABOUT SECTION
// ────────────────────────────────────────────────────────────
export const ABOUT_CONTENT = {
  statement: `We design digital experiences that make your business impossible to ignore.`,
  description: `MAZTAA was built on a simple belief: your website should be your strongest business asset. We combine bold, editorial aesthetics with modern frontend engineering to create custom digital platforms that elevate your brand and drive real client acquisition.`,
  philosophy: `Every business has a distinct story. We build digital spaces tailored specifically to your clients' psychology and your conversion goals.`,
  capabilities: [
    'Custom Brand & UI Design',
    'High-Performance Web Development',
    'E-Commerce & Checkout Systems',
    'Client Portals & Web Applications',
    'Responsive Mobile-First Architecture',
    'Conversion Rate & SEO Optimization',
  ],
};

// ────────────────────────────────────────────────────────────
// PROCESS STEPS
// ────────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    short: 'Understanding your goals & audience',
    detail: 'We analyze your business, competitive positioning, and target audience to establish a clear architectural direction.',
    deliverables: ['Creative Brief', 'Sitemap Structure', 'Technical Scope'],
  },
  {
    number: '02',
    title: 'Design',
    short: 'Editorial UI & visual identity',
    detail: 'We design bespoke wireframes and high-fidelity prototypes centered around clarity, hierarchy, and bold aesthetics.',
    deliverables: ['Figma Design System', 'Component Mockups', 'Interactive Flow'],
  },
  {
    number: '03',
    title: 'Develop',
    short: 'Clean, modern frontend code',
    detail: 'We build your website with clean, modular React and Tailwind code, ensuring fast load times and fluid micro-animations.',
    deliverables: ['Production React Code', 'Animation System', 'Mobile Optimization'],
  },
  {
    number: '04',
    title: 'Review',
    short: 'Refine based on agreed feedback',
    detail: 'We work through structured feedback rounds to refine the project. Feedback is addressed systematically and documented.',
    deliverables: ['Revision Rounds', 'QA Testing', 'Cross-Device Validation'],
  },
  {
    number: '05',
    title: 'Launch',
    short: 'Production deployment & handover',
    detail: 'We deploy your site to global edge servers, configure DNS, verify SEO metadata, and provide comprehensive handover documentation.',
    deliverables: ['Domain Connection', 'SEO & Analytics Setup', 'Codebase Handover'],
  },
];

// ────────────────────────────────────────────────────────────
// PORTFOLIO / PROJECTS
// ────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: 'project-1',
    name: 'Aethel Studio',
    category: 'Architecture & Design',
    description: 'A minimalist portfolio and client acquisition platform built for a contemporary architectural practice.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    image: '/images/projects/project-01.webp',
    url: 'https://example.com/aethel',
    featured: true,
  },
  {
    id: 'project-2',
    name: 'Vanguard Capital',
    category: 'Fintech & Investment',
    description: 'High-trust digital experience with client onboarding workflows and secure investment portal.',
    tags: ['Next.js', 'Supabase', 'Tailwind'],
    image: '/images/projects/project-02.webp',
    url: 'https://example.com/vanguard',
    featured: false,
  },
  {
    id: 'project-3',
    name: 'Lumina Skin',
    category: 'E-Commerce & Wellness',
    description: 'High-converting direct-to-consumer store with custom checkout flow and product discovery system.',
    tags: ['React', 'Whop API', 'Tailwind'],
    image: '/images/projects/project-03.webp',
    url: 'https://example.com/lumina',
    featured: false,
  },
  {
    id: 'project-4',
    name: 'Pulse Analytics',
    category: 'SaaS Platform',
    description: 'Interactive analytics dashboard and marketing website built for a modern data intelligence startup.',
    tags: ['React', 'PostgreSQL', 'Charts'],
    image: '/images/projects/project-04.webp',
    url: 'https://example.com/pulse',
    featured: false,
  },
];

// ────────────────────────────────────────────────────────────
// PRICING PLANS
// ────────────────────────────────────────────────────────────
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$800',
    description: 'Ideal for local businesses and professionals ready for a modern digital presence.',
    popular: false,
    active: true,
    whopKey: 'starter',
    theme: {
      gradient: 'from-[#edf4ff] to-[#ffffff]',
      border: 'border-[#d2e2fa]',
      accentBadge: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    features: [
      { label: 'Custom 1–3 Page Website',    included: true },
      { label: 'Responsive Design (Mobile)',   included: true },
      { label: 'Contact & Inquiry System',    included: true },
      { label: 'SEO & Performance Setup',     included: true },
      { label: 'Client Management Portal',   included: false },
      { label: 'Custom Backend Integrations', included: false },
    ],
    milestones: [
      { label: 'Deposit to Start',        percent: '40%', amount: '$320' },
      { label: 'After Dev Review',        percent: '30%', amount: '$240' },
      { label: 'Before Final Launch',     percent: '30%', amount: '$240' },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$1,500',
    description: 'For growing businesses requiring custom features, advanced UX, and CMS capabilities.',
    popular: true,
    active: true,
    whopKey: 'professional',
    theme: {
      gradient: 'from-[#f3eeff] to-[#ffffff]',
      border: 'border-[#dcd0ff]',
      accentBadge: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    features: [
      { label: 'Custom 5–8 Page Website',    included: true },
      { label: 'Micro-Interactions & Motion', included: true },
      { label: 'Interactive Project Showcase',included: true },
      { label: 'Client Portal Integration',  included: true },
      { label: 'Advanced SEO & Analytics',   included: true },
      { label: 'Custom Backend API',          included: false },
    ],
    milestones: [
      { label: 'Deposit to Start',        percent: '40%', amount: '$600' },
      { label: 'After Dev Review',        percent: '30%', amount: '$450' },
      { label: 'Before Final Launch',     percent: '30%', amount: '$450' },
    ],
  },
  {
    id: 'business-pro',
    name: 'Business Pro',
    price: '$2,800',
    description: 'Comprehensive digital system with full database integration, portal, and checkout flow.',
    popular: false,
    active: true,
    whopKey: 'businessPro',
    theme: {
      gradient: 'from-[#fff0f3] to-[#ffffff]',
      border: 'border-[#ffd2dc]',
      accentBadge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    features: [
      { label: 'Full Web App & Portal',       included: true },
      { label: 'Database & Auth System',      included: true },
      { label: 'Checkout & Payment Flow',     included: true },
      { label: 'Custom Admin Dashboard',      included: true },
      { label: 'Priority Launch Support',     included: true },
      { label: 'Speed & Security Guarantee',  included: true },
    ],
    milestones: [
      { label: 'Deposit to Start',        percent: '40%', amount: '$1,120' },
      { label: 'After Dev Review',        percent: '30%', amount: '$840' },
      { label: 'Before Final Launch',     percent: '30%', amount: '$840' },
    ],
  },
  {
    id: 'custom',
    name: 'Enterprise / Custom',
    price: '$4,500+',
    description: 'Tailored solutions for complex product requirements, multi-tenant apps, or platforms.',
    popular: false,
    active: true,
    whopKey: 'custom',
    theme: {
      gradient: 'from-[#edfbf6] to-[#ffffff]',
      border: 'border-[#d0f2e3]',
      accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    features: [
      { label: 'Full Custom Architecture',    included: true },
      { label: 'Dedicated Design Sprints',    included: true },
      { label: 'Custom API & DB Modeling',    included: true },
      { label: 'Automated CI/CD Pipeline',    included: true },
      { label: 'SLA & 90-Day Handover QA',    included: true },
      { label: 'Dedicated Lead Engineer',     included: true },
    ],
    milestones: [
      { label: 'Deposit to Start',        percent: '40%', amount: 'Custom' },
      { label: 'Milestone 2 Delivery',    percent: '30%', amount: 'Custom' },
      { label: 'Final Launch Delivery',   percent: '30%', amount: 'Custom' },
    ],
  },
];




// ────────────────────────────────────────────────────────────
// FAQ
// ────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'How does the milestone payment structure work?',
    answer: 'Every project is structured into three clear milestones: 40% initial deposit to begin design and discovery, 30% after you review and approve the functional development build, and the final 30% before official domain deployment and code handover. No surprises, no hidden fees.',
  },
  {
    question: 'How long does a typical website project take?',
    answer: 'Starter projects typically launch within 1–2 weeks. Professional and Business Pro projects generally take 2–4 weeks depending on scope, custom interactions, and asset preparation.',
  },
  {
    question: 'Will my website look and work great on mobile devices?',
    answer: 'Absolutely. Every website we create is engineered mobile-first with fluid responsive layouts, optimized images, fast touch interactions, and zero horizontal overflow across any screen size.',
  },
  {
    question: 'Can I update content on my website after launch?',
    answer: 'Yes. All project content, copy, pricing, and external links are centralized in structured data files (or connected to Supabase CMS), making future updates straightforward.',
  },
  {
    question: 'What do I need to prepare before we get started?',
    answer: 'You only need a general idea of your goals, target audience, and any brand assets you already have (logos, copy, photography). We handle the creative direction, design system, and technical implementation from start to finish.',
  },
];

// ────────────────────────────────────────────────────────────
// CTA SECTION
// ────────────────────────────────────────────────────────────
export const CTA_CONTENT = {
  headline: `Your business is ready.\nIs your website?`,
  subheading: 'Let’s build a digital experience that reflects the caliber of your work and turns visitors into clients.',
  ctaPrimary:   { label: 'Start a Project', href: '#pricing' },
  ctaSecondary: { label: 'Explore Opportunities', href: '/opportunities' },
};

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
export const FOOTER_CONTENT = {
  description: 'MAZTAA is an independent web design and development studio crafting high-converting digital experiences for ambitious businesses.',
  copyright: `© ${new Date().getFullYear()} MAZTAA. All rights reserved.`,
};
