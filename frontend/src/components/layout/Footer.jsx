import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE_LINKS, FOOTER_CONTENT } from '../../data/siteContent';
import Logo from '../ui/Logo';

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.265 5.638L18.244 2.25zM17.083 20.75h1.833L6.997 4.083H5.034z"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LEGAL_DOCS = [
  { label: 'Terms of Service', href: SITE_LINKS.terms   },
  { label: 'Privacy Policy',   href: SITE_LINKS.privacy  },
  { label: 'Refund Policy',    href: SITE_LINKS.refund   },
];

const SOCIAL_LINKS = [
  { label: 'X / Twitter', href: SITE_LINKS.twitter   || '#', Icon: IconX         },
  { label: 'LinkedIn',    href: SITE_LINKS.linkedin   || '#', Icon: IconLinkedin  },
  { label: 'Instagram',   href: SITE_LINKS.instagram  || '#', Icon: IconInstagram },
  { label: 'GitHub',      href: SITE_LINKS.github     || '#', Icon: IconGithub    },
];

// Studio nav split into two logical sub-groups for the micro1 multi-col layout
const STUDIO_NAV = NAV_LINKS.filter(l => !l.href.includes('opportunities') && !l.href.includes('refer'));
const OPPORTUNITIES_NAV = [
  { label: 'Opportunities', href: '/opportunities' },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-[#edf1f8] overflow-hidden"
      aria-label="maztaa footer"
    >
      {/* ── Seamless Bottom Ambient Glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none z-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 10%, rgba(215,100,200,0.25) 0%, rgba(155,110,255,0.15) 40%, transparent 75%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* ── Main Grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 sm:pt-16 pb-0">

        {/* Top Section: Logo + 4 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 pb-12 border-b border-black/[0.06]">

          {/* Logo Block */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-3">
            <Link to="/" className="inline-block" aria-label="maztaa Home">
              <Logo className="text-2xl" />
            </Link>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-[200px]">
              {FOOTER_CONTENT.description}
            </p>
          </div>

          {/* Studio Links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-wider">
              Studio
            </p>
            <ul className="flex flex-col gap-2">
              {STUDIO_NAV.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link to={link.href} className="text-sm text-neutral-700 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-neutral-700 hover:text-black transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities Links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-wider">
              Work With Us
            </p>
            <ul className="flex flex-col gap-2">
              {OPPORTUNITIES_NAV.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-neutral-700 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`https://whop.com/maztaa-indol/support`} className="text-sm text-neutral-700 hover:text-black transition-colors">
                  1-on-1 Earning Discussion
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-wider">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {LEGAL_DOCS.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-700 hover:text-black transition-colors"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Support */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-heading font-semibold text-neutral-500 uppercase tracking-wider">
              Support
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`https://whop.com/maztaa-indol/support`} target='/blank' className="text-sm text-neutral-700 hover:text-black transition-colors">
                  1-on-1 Support
                </a>
              </li>
              <li>
                <Link to="/login" className="text-sm text-neutral-700 hover:text-black transition-colors">
                  Client Login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          <p className="text-xs text-neutral-500 font-medium order-2 sm:order-1">
            {FOOTER_CONTENT.copyright}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 order-1 sm:order-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) =>
              href === '#' ? null : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`maztaa on ${label}`}
                  className="text-neutral-500 hover:text-black transition-colors"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        {/* Massive Watermark — subtle, like micro1 */}
        

      </div>
    </footer>
  );
}