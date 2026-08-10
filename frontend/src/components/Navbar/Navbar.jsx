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

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fff', zIndex: 1000, padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <div>Navbar Section</div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginTop: '5px' }}>
        {navLinks.map((link) => (
          <button
            key={link.targetId}
            onClick={() => handleScroll(link.targetId)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {link.label}
          </button>
        ))}

        {user ? (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span>{user.email}</span>
            <button onClick={signOut}>Logout</button>
          </div>
        ) : (
          <button onClick={signInWithGoogle} style={{ marginLeft: 'auto' }}>
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}
