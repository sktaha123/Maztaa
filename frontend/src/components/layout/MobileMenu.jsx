import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, User } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '../../data/siteContent';
import Logo from '../ui/Logo';

export default function MobileMenu({ onClose, user }) {
  // Lock body scroll while menu is open — prevents viewport jump on mobile
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    // Use style height instead of h-full to avoid mobile browser bar jump
    <div
      className="fixed inset-0 z-[100] flex"
      style={{ height: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/45"
        style={{ height: '100dvh' }}
        aria-hidden="true"
      />

      {/* Drawer — left-to-right slide */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[82vw] max-w-[320px] bg-[#edf1f8] border-r border-black/[0.06] shadow-2xl flex flex-col"
        style={{ height: '100dvh' }}
      >
        {/* Scrollable Inner Content */}
        <div className="flex flex-col justify-between flex-1 overflow-y-auto overscroll-contain p-6">

          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-black/[0.06] mb-4">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center select-none"
                aria-label={`${SITE_CONFIG.name} — Home`}
              >
                <Logo className="text-xl" />
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl  flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Navigation Links — clean, no arrows */}
            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation links">
              {NAV_LINKS.map((link) => {
                const isOpportunity = link.href === '/opportunities' || link.href === '/refer';

                if (isOpportunity) {
                  return (
                    <Link
                      key={link.href}
                      to="/opportunities"
                      onClick={onClose}
                      className="py-3 px-3 rounded-xl text-[17px] font-heading font-semibold text-neutral-800 hover:bg-black/[0.04] active:bg-black/[0.07] transition-colors"
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="py-3 px-3 rounded-xl text-[17px] font-heading font-semibold text-neutral-800 hover:bg-black/[0.04] active:bg-black/[0.07] transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-black/[0.06] flex flex-col gap-3 mt-6">
            <a
              href="/#pricing"
              onClick={onClose}
              className="w-full bg-black text-white font-heading font-semibold text-sm py-3.5 rounded-xl text-center shadow-sm hover:bg-neutral-800 active:bg-neutral-700 transition-colors"
            >
              Start a project
            </a>

            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-black/[0.08] rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm transition-colors text-center"
            >
              <User size={13} />
              <span>{user ? 'My Account' : 'Client & Partner Login'}</span>
            </Link>
          </div>

        </div>
      </motion.aside>
    </div>
  );
}
