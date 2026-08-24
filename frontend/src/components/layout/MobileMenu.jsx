import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_LINKS } from '../../data/siteContent';

export default function MobileMenu({ onClose, user }) {
  // Lock body scroll while menu is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ height: '100dvh' }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        aria-hidden="true"
      />

      {/* Top-to-Bottom Full Sheet Modal (Matching Reference Screenshot) */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full bg-[#edf1f8] shadow-2xl flex flex-col justify-between p-6 sm:p-8"
        style={{ height: '100dvh' }}
      >
        {/* Top Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-neutral-800 hover:text-black transition-colors cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Large Bold Navigation Links (Matching Image 3) */}
        <nav className="flex flex-col gap-6 pl-2 py-4" aria-label="Mobile navigation links">
          {NAV_LINKS.map((link) => {
            const isOpportunity = link.href === '/opportunities' || link.href === '/refer';

            if (isOpportunity) {
              return (
                <Link
                  key={link.href}
                  to="/opportunities"
                  onClick={onClose}
                  className="text-2xl sm:text-3xl font-heading font-medium text-[#111317] hover:text-neutral-600 transition-colors tracking-tight"
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
                className="text-2xl sm:text-3xl font-heading font-normal text-[#111317] hover:text-neutral-600 transition-colors tracking-tight"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Bottom Actions (Matching Image 3) */}
        <div className="flex flex-col items-center gap-4 pb-4">
          {/* Centered Login / Account text */}
          <Link
            to="/login"
            onClick={onClose}
            className="text-sm font-heading font-semibold text-neutral-800 hover:text-black transition-colors"
          >
            {user ? 'My Account' : 'Login'}
          </Link>

          {/* White Bottom Card CTA: Start a project / Apply now */}
          <a
            href="/#pricing"
            onClick={onClose}
            className="w-full bg-white text-[#111317] font-heading font-semibold text-sm sm:text-base py-3.5 sm:py-1 rounded-xl border border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:bg-[#f5f8fc] hover:border-black/20 text-center transition-all duration-200"
          >
            Start a project
          </a>
        </div>
      </motion.div>
    </div>
  );
}
