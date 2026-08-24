import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, User } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '../../data/siteContent';
import Logo from '../ui/Logo';

export default function MobileMenu({ onClose, user }) {
  return (
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      
      {/* Dim Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs"
        aria-hidden="true"
      />

      {/* Drawer Container (Sliding in from Left to Right) */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative z-10 w-[82vw] max-w-[320px] h-full bg-[#edf1f8] border-r border-black/[0.08] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/[0.06]">
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
            className="w-8 h-8 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-neutral-600 hover:text-black shadow-sm transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Minimal Clean Navigation Links (No Arrows) */}
        <nav className="flex flex-col gap-1.5 my-auto py-6" aria-label="Mobile navigation links">
          {NAV_LINKS.map((link) => {
            const isOpportunity = link.href === '/opportunities' || link.href === '/refer';

            if (isOpportunity) {
              return (
                <Link
                  key={link.href}
                  to="/opportunities"
                  onClick={onClose}
                  className="py-3 px-3 rounded-xl text-lg font-heading font-semibold text-neutral-800 hover:text-black hover:bg-black/[0.04] transition-colors"
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
                className="py-3 px-3 rounded-xl text-lg font-heading font-semibold text-neutral-800 hover:text-black hover:bg-black/[0.04] transition-colors"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer with Start a Project & Account */}
        <div className="pt-5 border-t border-black/[0.06] flex flex-col gap-3">
          {/* Start a Project Button */}
          <a
            href="/#pricing"
            onClick={onClose}
            className="w-full bg-black text-white font-heading font-semibold text-sm py-3.5 rounded-xl text-center shadow-sm hover:bg-neutral-800 transition-colors"
          >
            Start a project
          </a>

          {/* Account / Login link */}
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-black/[0.08] rounded-xl text-xs font-semibold text-neutral-700 hover:text-black shadow-sm transition-colors text-center"
          >
            <User size={13} />
            <span>{user ? 'My Account Dashboard' : 'Client & Partner Login'}</span>
          </Link>
        </div>
      </motion.aside>

    </div>
  );
}
