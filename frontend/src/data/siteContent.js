// ============================================================
// Maztaa — Centralized Website Content
// Single source of truth for all copy, links, and data.
// ============================================================

export const SITE_CONFIG = {
  name: 'Maztaa',
  tagline: 'Web Design & Development Studio',
  description: 'Custom websites and digital experiences built around your business. High-performance, human-designed, and built to convert.',
  url: 'https://Maztaa.com',
};

// ────────────────────────────────────────────────────────────
// NAVIGATION
// ────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Opportunities', href: '/opportunities' },
];

// ────────────────────────────────────────────────────────────
// EXTERNAL LINKS & PLACEHOLDERS
// ────────────────────────────────────────────────────────────
export const SITE_LINKS = {
  email: 'hello@Maztaa.com',
  instagram: 'INSTAGRAM_URL',
  linkedin: 'LINKEDIN_URL',
  github: 'GITHUB_URL',
  terms: '/docs/terms-of-service.pdf',
  privacy: '/docs/privacy-policy.pdf',
  refund: '/docs/refund-policy.pdf',
  eula: '/docs/eula.pdf',
};

// ────────────────────────────────────────────────────────────
// WHOP CHECKOUT LINKS (Full & 40-30-30% Milestone Placeholders)
// ────────────────────────────────────────────────────────────
export const WHOP_LINKS = {
  starter: {
    full: 'https://whop.com/checkout/plan_B1Mocyk0NFz7p', // Full $800 upfront
    milestone: 'https://whop.com/checkout/plan_DXCJKpooxfPJT_milestone_40', // 40% initial deposit ($320)
  },
  professional: {
    full: 'https://whop.com/checkout/plan_lU05AVwVqUhoW', // Full $1,500 upfront
    milestone: 'https://whop.com/checkout/plan_xwYUESNYuiFjB_milestone_40', // 40% initial deposit ($600)
  },
  businessPro: {
    full: 'https://whop.com/checkout/business-pro-full-placeholder', // Full $2,800 upfront
    milestone: 'https://whop.com/checkout/business-pro-milestone-40-placeholder', // 40% initial deposit ($1,120)
  },
  custom: {
    full: 'https://whop.com/checkout/custom-full-placeholder',
    milestone: 'https://whop.com/checkout/custom-milestone-40-placeholder',
  },
};

// ────────────────────────────────────────────────────────────
// WHOP PLAN IDs — Used by the embedded CheckoutElement
// Extract just the plan_XXX portion from WHOP_LINKS URLs.
// null = placeholder (falls back to redirect to whop.com).
// ────────────────────────────────────────────────────────────
export const WHOP_PLAN_IDS = {
  starter: {
    full: 'plan_B1Mocyk0NFz7p',      // $800 upfront
    milestone: 'plan_DXCJKpooxfPJT', // $320 deposit (40%)
  },
  professional: {
    full: 'plan_lU05AVwVqUhoW',      // $1,500 upfront
    milestone: 'plan_xwYUESNYuiFjB', // $600 deposit (40%)
  },
  businessPro: {
    full: null,      // Replace with real plan_XXX once created
    milestone: null,
  },
  custom: {
    full: null,      // Replace with real plan_XXX once created
    milestone: null,
  },
};

// ────────────────────────────────────────────────────────────
// HERO SECTION
// ────────────────────────────────────────────────────────────
export const HERO_CONTENT = {
  headlineLine1: 'Your business has a story.',
  headlineLine2: 'Make it worth explaining',
  subheading: 'Custom websites and digital experiences built around your business.',
  ctaPrimary: { label: 'View Our Work', href: '#work' },
};

// ────────────────────────────────────────────────────────────
// TECHNOLOGIES SECTION
// ────────────────────────────────────────────────────────────
export const TECHNOLOGIES = [
  { name: 'React', purpose: 'Component Architecture' },
  { name: 'Next.js', purpose: 'Production Framework' },
  { name: 'Tailwind CSS', purpose: 'Design Systems' },
  { name: 'Framer Motion', purpose: 'Micro-Interactions' },
  { name: 'Supabase', purpose: 'Backend & Database' },
  { name: 'Vite', purpose: 'Modern Build Tooling' },
  { name: 'PostgreSQL', purpose: 'Relational Data' },
  { name: 'Vercel', purpose: 'Global Edge Deployment' },
];

// ────────────────────────────────────────────────────────────
// ABOUT SECTION
// ────────────────────────────────────────────────────────────
export const ABOUT_CONTENT = {
  statement: `We design digital experiences that make your business impossible to ignore.`,
  description: `Maztaa was built on a simple belief: your website should be your strongest business asset. We combine bold, editorial aesthetics with modern frontend engineering to create custom digital platforms that elevate your brand and drive real client acquisition.`,
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
    name: 'Biznorx Company',
    category: 'Recruitment',
    description: 'A recruitment and workforce solutions platform designed to help organizations make confident hiring decisions.',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Supabase', 'Lucide-React'],
    image: '/images/projects/project01.webp',
    url: 'https://biznorx.com',
    featured: true,
  },
  {
    id: 'project-2',
    name: 'WorkSphere OKR Software',
    category: 'Startup & Growth Platform',
    description: 'A goal management platform that helps teams and organizations track progress towards their objectives.',
    tags: ['Next.js', 'Supabase', 'Tailwind', 'Framer Motion', 'Lucide-React', 'shadcn UI', 'Vercel', 'Google Auth'],
    image: '/images/projects/project02.webp',
    url: 'https://momentum-vert-chi.vercel.app/dashboard',
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
      { label: 'Custom Website Pages', included: true },
      { label: 'Responsive Mobile & Tablet Design', included: true },
      { label: 'Custom Brand-Based UI/UX', included: true },
      { label: 'Contact & Inquiry System', included: true },
      { label: 'Click-to-Call & WhatsApp Integration', included: true },
      { label: 'Google Maps Integration', included: true },
      { label: 'Social Media Integration', included: true },
      { label: 'CMS / Content Management', included: false },
      { label: 'Basic SEO Setup', included: true },
      { label: 'Advanced SEO & Metadata', included: false },
      { label: 'Performance Optimization', included: true },
      { label: 'Analytics & Conversion Tracking', included: false },
      { label: 'Domain Connection & Deployment', included: true },
      { label: 'SSL & Security Configuration', included: true },
      { label: 'Custom Backend / API Development', included: false },
      { label: 'Supabase Database Integration', included: false },
      { label: 'User Authentication & Google Login', included: false },
      { label: 'Role-Based User Access', included: false },
      { label: 'Admin Dashboard', included: false },
      { label: 'Client / Customer Management Portal', included: false },
      { label: 'Booking & Scheduling System', included: false },
      { label: 'Third-Party API Integrations', included: false },
      { label: 'Payment Gateway Integration', included: false },
      { label: 'Custom Web Application Features', included: false },
      { label: 'Post-Launch Support', included: true },
      { label: 'Ongoing Maintenance Options', included: false },
    ],
    milestones: [
      { label: 'Deposit to Start', percent: '40%', amount: '$320' },
      { label: 'After Dev Review', percent: '30%', amount: '$240' },
      { label: 'Before Final Launch', percent: '30%', amount: '$240' },
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
      { label: 'Custom Website Pages', included: true },
      { label: 'Responsive Mobile & Tablet Design', included: true },
      { label: 'Custom Brand-Based UI/UX', included: true },
      { label: 'Contact & Inquiry System', included: true },
      { label: 'Click-to-Call & WhatsApp Integration', included: true },
      { label: 'Google Maps Integration', included: true },
      { label: 'Social Media Integration', included: true },
      { label: 'CMS / Content Management', included: true },
      { label: 'Basic SEO Setup', included: true },
      { label: 'Advanced SEO & Metadata', included: true },
      { label: 'Performance Optimization', included: true },
      { label: 'Analytics & Conversion Tracking', included: false },
      { label: 'Domain Connection & Deployment', included: true },
      { label: 'SSL & Security Configuration', included: true },
      { label: 'Custom Backend / API Development', included: true },
      { label: 'Supabase Database Integration', included: true },
      { label: 'User Authentication & Google Login', included: true },
      { label: 'Role-Based User Access', included: false },
      { label: 'Admin Dashboard', included: false },
      { label: 'Client / Customer Management Portal', included: false },
      { label: 'Booking & Scheduling System', included: false },
      { label: 'Third-Party API Integrations', included: true },
      { label: 'Payment Gateway Integration', included: false },
      { label: 'Custom Web Application Features', included: false },
      { label: 'Post-Launch Support', included: true },
      { label: 'Ongoing Maintenance Options', included: false },
    ],
    milestones: [
      { label: 'Deposit to Start', percent: '40%', amount: '$600' },
      { label: 'After Dev Review', percent: '30%', amount: '$450' },
      { label: 'Before Final Launch', percent: '30%', amount: '$450' },
    ],
  },
  // {
  //   id: 'business-pro',
  //   name: 'Business Pro',
  //   price: '$2,800',
  //   description: 'Comprehensive digital system with full database integration, portal, and checkout flow.',
  //   popular: false,
  //   active: true,
  //   whopKey: 'businessPro',
  //   theme: {
  //     gradient: 'from-[#fff0f3] to-[#ffffff]',
  //     border: 'border-[#ffd2dc]',
  //     accentBadge: 'bg-rose-50 text-rose-700 border-rose-200',
  //   },
  //   features: [
  //     { label: 'Custom Website Pages', included: true },
  //     { label: 'Responsive Mobile & Tablet Design', included: true },
  //     { label: 'Custom Brand-Based UI/UX', included: true },
  //     { label: 'Contact & Inquiry System', included: true },
  //     { label: 'Click-to-Call & WhatsApp Integration', included: true },
  //     { label: 'Google Maps Integration', included: true },
  //     { label: 'Social Media Integration', included: true },
  //     { label: 'CMS / Content Management', included: true },
  //     { label: 'Basic SEO Setup', included: true },
  //     { label: 'Advanced SEO & Metadata', included: true },
  //     { label: 'Performance Optimization', included: true },
  //     { label: 'Analytics & Conversion Tracking', included: true },
  //     { label: 'Domain Connection & Deployment', included: true },
  //     { label: 'SSL & Security Configuration', included: true },
  //     { label: 'Custom Backend / API Development', included: true },
  //     { label: 'Supabase Database Integration', included: true },
  //     { label: 'User Authentication & Google Login', included: true },
  //     { label: 'Role-Based User Access', included: true },
  //     { label: 'Admin Dashboard', included: true },
  //     { label: 'Client / Customer Management Portal', included: true },
  //     { label: 'Booking & Scheduling System', included: true },
  //     { label: 'Third-Party API Integrations', included: true },
  //     { label: 'Payment Gateway Integration', included: false },
  //     { label: 'Custom Web Application Features', included: false },
  //     { label: 'Post-Launch Support', included: true },
  //     { label: 'Ongoing Maintenance Options', included: false },
  //   ],
  //   milestones: [
  //     { label: 'Deposit to Start', percent: '40%', amount: '$1,120' },
  //     { label: 'After Dev Review', percent: '30%', amount: '$840' },
  //     { label: 'Before Final Launch', percent: '30%', amount: '$840' },
  //   ],
  // },
  // {
  //   id: 'custom',
  //   name: 'Enterprise / Custom',
  //   price: '$4,500+',
  //   description: 'Tailored solutions for complex product requirements, multi-tenant apps, or platforms.',
  //   popular: false,
  //   active: true,
  //   whopKey: 'custom',
  //   theme: {
  //     gradient: 'from-[#edfbf6] to-[#ffffff]',
  //     border: 'border-[#d0f2e3]',
  //     accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  //   },
  //   features: [
  //     { label: 'Custom Website Pages', included: true },
  //     { label: 'Responsive Mobile & Tablet Design', included: true },
  //     { label: 'Custom Brand-Based UI/UX', included: true },
  //     { label: 'Contact & Inquiry System', included: true },
  //     { label: 'Click-to-Call & WhatsApp Integration', included: true },
  //     { label: 'Google Maps Integration', included: true },
  //     { label: 'Social Media Integration', included: true },
  //     { label: 'CMS / Content Management', included: true },
  //     { label: 'Basic SEO Setup', included: true },
  //     { label: 'Advanced SEO & Metadata', included: true },
  //     { label: 'Performance Optimization', included: true },
  //     { label: 'Analytics & Conversion Tracking', included: true },
  //     { label: 'Domain Connection & Deployment', included: true },
  //     { label: 'SSL & Security Configuration', included: true },
  //     { label: 'Custom Backend / API Development', included: true },
  //     { label: 'Supabase Database Integration', included: true },
  //     { label: 'User Authentication & Google Login', included: true },
  //     { label: 'Role-Based User Access', included: true },
  //     { label: 'Admin Dashboard', included: true },
  //     { label: 'Client / Customer Management Portal', included: true },
  //     { label: 'Booking & Scheduling System', included: true },
  //     { label: 'Third-Party API Integrations', included: true },
  //     { label: 'Payment Gateway Integration', included: true },
  //     { label: 'Custom Web Application Features', included: true },
  //     { label: 'Post-Launch Support', included: true },
  //     { label: 'Ongoing Maintenance Options', included: true },
  //   ],
  //   milestones: [
  //     { label: 'Deposit to Start', percent: '40%', amount: 'Custom' },
  //     { label: 'Milestone 2 Delivery', percent: '30%', amount: 'Custom' },
  //     { label: 'Final Launch Delivery', percent: '30%', amount: 'Custom' },
  //   ],
  // },
];




// ────────────────────────────────────────────────────────────
// FAQ
// ────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: 'What exactly does Maztaa build?',
    answer:
      'Maztaa designs and develops custom websites and digital experiences for businesses. Depending on the plan, this can include business websites, CMS features, databases, authentication, booking systems, dashboards, API integrations, and custom web applications.',
  },

  {
    question: 'Which plan is right for my business?',
    answer:
      'Starter is ideal for businesses that need a polished online presence. Professional adds advanced functionality and integrations. Business Pro is designed for businesses needing a more complete digital system (Currently Unavailable). Larger or unique requirements can use a Custom Project.',
  },

  {
    question: 'How does the 40/30/30 payment structure work?',
    answer:
      'Projects are divided into three milestones: 40% to begin, 30% after the agreed development milestone and review, and 30% before final launch and handover. Your exact payment schedule is confirmed before the project begins.',
  },

  {
    question: 'How do I purchase a website plan?',
    answer:
      'Choose the plan that fits your needs and use the checkout button to purchase through Whop. After your purchase, we will collect your project requirements and begin the agreed onboarding and development process.',
  },

  {
    question: 'Is the website completely custom or based on a template?',
    answer:
      `Maztaa websites are designed around your business, brand, content, and goals. We do not simply install a generic template and replace its text. The exact level of customization depends on the plan you choose.`,
  },

  {
    question: 'How long will my website take to build?',
    answer:
      'Typical Starter projects take around 1–2 weeks, Professional projects around 2–3 weeks, and Business Pro projects around 3–4 weeks. Custom projects may take longer depending on functionality, integrations, content, and scope.',
  },

  {
    question: 'What do I need to provide before development starts?',
    answer:
      'You should provide your business information, logo or brand assets, website content, images, contact details, and any examples or references you like. We guide you through the requirements so you do not need to prepare everything yourself.',
  },

  {
    question: 'Will my website work on phones, tablets, and desktops?',
    answer:
      'Yes. Every Maztaa website is built responsively for modern mobile, tablet, laptop, and desktop screens. Layouts, typography, navigation, images, and interactions are adjusted for different screen sizes.',
  },

  {
    question: 'Can you connect my domain and hosting?',
    answer:
      'Yes. We can connect your domain and deploy your website to the appropriate hosting platform. Domain registration, renewals, hosting, and usage-based third-party services are included only when specifically stated in your selected plan.',
  },

  {
    question: 'Can you add login, databases, booking systems, or other custom features?',
    answer:
      'Yes. Depending on your plan, we can build features such as Supabase databases, Google Login, user accounts, booking systems, dashboards, APIs, and third-party integrations. Requirements outside the plan can be quoted separately.',
  },

  {
    question: 'How many revisions do I get?',
    answer:
      'Each plan includes a defined number of revision rounds. Revisions cover reasonable changes to the agreed design or functionality. New features, major redesigns, or changes outside the agreed scope may require an additional fee.',
  },

  {
    question: 'Who owns the website and code after I pay?',
    answer:
      'After full payment, ownership or usage rights for the agreed final deliverables are transferred according to your project agreement. Maztaa retains its pre-existing tools, reusable components, frameworks, and development resources.',
  },

  {
    question: 'What happens after my website launches?',
    answer:
      'Your plan includes a defined period of post-launch support. We can help resolve issues related to the delivered project during that period. Ongoing maintenance, new features, content updates, and larger changes can be arranged separately.',
  },

  {
    question: 'What if I need something that is not included in a plan?',
    answer:
      'No problem. We can scope the additional requirement and provide a separate quote before starting the work. For larger or highly customized requirements, we can create a Custom Project with its own scope, timeline, and milestone structure.',
  },

  {
    question: 'What happens if I change my mind or need to cancel?',
    answer:
      'Cancellation and refund eligibility depends on the project stage, work already completed, third-party costs, your project agreement, and applicable law. Our Refund & Cancellation Policy explains the process in detail.',
  },

  {
    question: 'Do you provide ongoing website maintenance?',
    answer:
      'Yes. Maintenance can be arranged after launch for businesses that need ongoing updates, content changes, technical improvements, monitoring, or new functionality. Maintenance is separate unless specifically included in your selected plan.',
  },
];
// ────────────────────────────────────────────────────────────
// CTA SECTION
// ────────────────────────────────────────────────────────────
export const CTA_CONTENT = {
  headline: `Your business is ready.\nIs your website?`,
  subheading: 'Let’s build a digital experience that reflects the caliber of your work and turns visitors into clients.',
  ctaPrimary: { label: 'Start a Project', href: '#pricing' },
  ctaSecondary: { label: 'Explore Opportunities', href: '/opportunities' },
};

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
export const FOOTER_CONTENT = {
  description: 'Maztaa is an independent web design and development studio crafting high-converting digital experiences for ambitious businesses.',
  copyright: `© ${new Date().getFullYear()} Maztaa. All rights reserved.`,
};
