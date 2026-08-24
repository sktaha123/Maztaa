import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '../../data/siteContent';
import { supabase } from '../../services/supabase';
import Logo from '../ui/Logo';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          1. MOBILE VIEW (Full Width Header: Left Menu | Middle Logo | Right Login)
          ──────────────────────────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#edf1f8]/95 backdrop-blur-md border-b border-black/[0.06] px-4 py-3 flex items-center justify-between shadow-sm">
        {/* Left: Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-black/[0.08] text-neutral-800 hover:bg-neutral-50 shadow-sm transition-colors cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={18} />
        </button>

        {/* Middle: Centered maztaa. Logo */}
        <Link
          to="/"
          className="flex items-center select-none"
          aria-label={`${SITE_CONFIG.name} — Home`}
        >
          <Logo className="text-xl" />
        </Link>

        {/* Right: Login / Account Button */}
        <Link
          to="/login"
          className="flex items-center gap-1.5 bg-white border border-black/[0.08] px-3 py-1.5 rounded-xl text-xs font-heading font-semibold text-neutral-800 hover:bg-neutral-50 shadow-sm transition-colors"
          aria-label="Account Login"
        >
          {user ? (
            avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Account"
                className="w-4 h-4 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <User size={13} />
            )
          ) : null}
          <span>{user ? 'Account' : 'Login'}</span>
        </Link>
      </header>

      {/* ────────────────────────────────────────────────────────────
          2. DESKTOP VIEW (Floating Centered Pill Navbar)
          ──────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none justify-center"
      >
        <div
          className={[
            'pointer-events-auto inline-flex items-center gap-3 sm:gap-5 pl-4 sm:pl-5 pr-2 py-1.5 rounded-2xl transition-all duration-300',
            'bg-[#edf1f8]/94 backdrop-blur-md border border-[#d8e0ee]',
            scrolled
              ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-[#edf1f8]/98'
              : 'shadow-[0_2px_12px_rgb(0,0,0,0.03)]',
          ].join(' ')}
        >
          {/* maztaa. Wordmark Logo */}
          <Link
            to="/"
            className="flex items-center select-none hover:opacity-85 transition-opacity"
            aria-label={`${SITE_CONFIG.name} — Home`}
          >
            <Logo className="text-lg sm:text-[19px]" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isOpportunity = link.href === '/opportunities' || link.href === '/refer';
              const isCurrentPage = location.pathname === link.href;
              const sectionId = link.href.replace('/#', '').replace('#', '');
              const isSectionActive = location.pathname === '/' && activeSection === sectionId;

              if (isOpportunity) {
                return (
                  <Link
                    key={link.href}
                    to="/opportunities"
                    className={[
                      'px-3 py-1.5 text-[13.5px] font-medium transition-colors duration-200 rounded-lg',
                      isCurrentPage ? 'text-black font-semibold bg-black/[0.04]' : 'text-neutral-600 hover:text-black hover:bg-black/[0.03]',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={[
                    'px-3 py-1.5 text-[13.5px] font-medium transition-colors duration-200 rounded-lg',
                    isSectionActive ? 'text-black font-semibold bg-black/[0.04]' : 'text-neutral-600 hover:text-black hover:bg-black/[0.03]',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Login / Profile Link */}
            <Link
              to="/login"
              className="px-3 py-1.5 text-[13.5px] font-medium text-neutral-600 hover:text-black hover:bg-black/[0.03] rounded-lg transition-colors duration-200"
              aria-label="Client login"
            >
              {user ? 'Account' : 'Login'}
            </Link>
          </nav>

          {/* Right CTA Button */}
          <div className="flex items-center gap-2">
            <a
              href="/#pricing"
              className="bg-white text-black font-heading font-semibold text-xs sm:text-[13px] px-4 py-1.5 sm:px-4.5 sm:py-2 rounded-xl border border-black/[0.08] shadow-sm hover:bg-[#e9eef6] hover:border-black/20 transition-colors whitespace-nowrap"
            >
              Start a project
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer (Left-to-Right Slide-in) */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            user={user}
          />
        )}
      </AnimatePresence>
    </>
  );
}