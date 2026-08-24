import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowRight, User } from 'lucide-react';
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

  const isHome = location.pathname === '/';

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
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const showFloatingNav = !isHome || scrolled;

  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          1. MOBILE HEADER (Clean transparent header: Left logo, Right hamburger)
          ──────────────────────────────────────────────────────────── */}
      <header
        className={[
          'md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-5 py-4 flex items-center justify-between',
          scrolled ? 'bg-[#edf1f8]/90 backdrop-blur-md border-b border-black/[0.06] shadow-xs' : 'bg-transparent',
        ].join(' ')}
      >
        {/* Left: maztaa. logo */}
        <Link
          to="/"
          className="flex items-center select-none"
          aria-label={`${SITE_CONFIG.name} — Home`}
        >
          <Logo className="text-2xl font-bold tracking-tight text-[#111317]" />
        </Link>

        {/* Right: Clean Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className="w-10 h-10 flex items-center justify-center text-[#111317] hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={24} strokeWidth={2.2} />
        </button>
      </header>

      {/* ────────────────────────────────────────────────────────────
          2. DESKTOP FLOATING PILL NAVBAR (Always visible)
          ──────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-50 pt-4 px-4 justify-center"
      >
        <div
          className={[
            'inline-flex items-center gap-3 sm:gap-5 pl-4 sm:pl-5 pr-2 py-1.5 rounded-2xl transition-all duration-300',
            'bg-[#edf1f8]/95 backdrop-blur-md border border-[#d8e0ee]',
            scrolled
              ? 'shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-[#edf1f8]/98'
              : 'shadow-[0_4px_20px_rgb(0,0,0,0.04)]',
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

            {/* Login / Account Link */}
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

      {/* Mobile Top-to-Bottom Drawer */}
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