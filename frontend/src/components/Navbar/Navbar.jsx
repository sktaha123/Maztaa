import { useEffect, useState } from 'react';
import { supabase, signInWithGoogle, signOut } from '../../services/supabase';

const navLinks = [
  { label: 'Services', targetId: 'services' },
  { label: 'Why Choose Us', targetId: 'why-choose-us' },
  { label: 'Our Process', targetId: 'our-process' },
  { label: 'Team', targetId: 'team' },
  { label: 'FAQs', targetId: 'faqs' },
  { label: 'Pricing', targetId: 'pricing' },
  { label: 'Project Inquiry', targetId: 'project-inquiry' },
];

export default function Navbar() {
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

  const handleScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 px-6 py-3 border-b border-gray-200 shadow-sm">
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {navLinks.map((link) => (
            <button
              key={link.targetId}
              onClick={() => handleScroll(link.targetId)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user.email || 'User Profile'}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {initial}
              </div>
            )}
            <button
              onClick={signOut}
              className="text-xs px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="text-xs px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}
