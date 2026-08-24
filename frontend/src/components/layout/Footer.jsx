import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE_LINKS, FOOTER_CONTENT } from '../../data/siteContent';
import Logo from '../ui/Logo';

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LEGAL_DOCS = [
  { label: 'Terms of Service', href: SITE_LINKS.terms   },
  { label: 'Privacy Policy',   href: SITE_LINKS.privacy  },
  { label: 'Refund Policy',    href: SITE_LINKS.refund   },
  { label: 'EULA Agreement',   href: SITE_LINKS.eula     },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: SITE_LINKS.instagram, key: 'INSTAGRAM_URL', Icon: IconInstagram },
  { label: 'LinkedIn',  href: SITE_LINKS.linkedin,  key: 'LINKEDIN_URL',  Icon: IconLinkedin  },
  { label: 'GitHub',    href: SITE_LINKS.github,    key: 'GITHUB_URL',    Icon: IconGithub    },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#e9eef7] border-t border-black/[0.06] pt-16 sm:pt-20 overflow-hidden relative"
      aria-label="MAZTAA footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">

        {/* Multi-Column Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16">

          {/* Logo & Intro */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="inline-block" aria-label="MAZTAA Home">
              <Logo className="text-2xl" />
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
              {FOOTER_CONTENT.description}
            </p>
          </div>

          {/* Studio Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-heading font-semibold text-neutral-900 uppercase tracking-wider mb-1">
              Studio
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/') && !link.href.includes('#') ? (
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Terms & Conditions Column with PDF Placeholders */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-heading font-semibold text-neutral-900 uppercase tracking-wider mb-1">
              Legal & Terms
            </p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_DOCS.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-black transition-colors inline-flex items-center gap-1.5"
                    title={`Open ${doc.label} PDF`}
                  >
                    <span>{doc.label}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">PDF</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-heading font-semibold text-neutral-900 uppercase tracking-wider mb-1">
              Contact
            </p>
            <a
              href={`mailto:${SITE_LINKS.email}`}
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              {SITE_LINKS.email}
            </a>
          </div>
        </div>

        {/* Bottom Bar with Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-black/[0.06]">
          <p className="text-xs text-neutral-500 font-medium">
            {FOOTER_CONTENT.copyright}
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href, key, Icon }) => {
              const isPlaceholder = href === key;
              return isPlaceholder ? null : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`MAZTAA on ${label}`}
                  className="text-neutral-500 hover:text-black transition-colors"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Massive Watermark Logo */}
        <div className="w-full overflow-hidden select-none pointer-events-none -mb-6 sm:-mb-10 text-center" aria-hidden="true">
          <span
            className="font-heading font-bold text-[20vw] leading-none tracking-tighter inline-block text-black/[0.035]"
            style={{ letterSpacing: '-0.03em' }}
          >
            maztaa
          </span>
        </div>
      </div>
    </footer>
  );
}