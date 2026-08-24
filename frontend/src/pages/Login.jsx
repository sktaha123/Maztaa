import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, ShieldCheck, User } from 'lucide-react';
import { supabase, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut } from '../services/supabase';
import Logo from '../components/ui/Logo';

const ADMIN_EMAIL = 'shaikhtaha10102006@gmail.com';

export function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg('');
      // Use current origin so it works on both localhost and the live deployed domain
      const origin = window.location.origin;
      const callbackPath = redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
      await signInWithGoogle(`${origin}${callbackPath}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in with Google');
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      if (authMode === 'signin') {
        await signInWithEmail(email, password);
        navigate(redirectTo);
      } else {
        await signUpWithEmail(email, password, fullName);
        setSuccessMsg('Account created successfully! You can now sign in.');
        setAuthMode('signin');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edf1f8] flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-600" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between p-5 sm:p-8 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Top Header */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
        <Link to="/" aria-label="MAZTAA Home">
          <Logo className="text-xl" />
        </Link>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-md mx-auto w-full my-auto py-8">
        <div className="bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-10 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
          
          {user ? (
            /* Logged In State */
            <div className="flex flex-col gap-6 text-center items-center">
              
              {/* User Profile Image */}
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName || 'User Profile'}
                    className="w-16 h-16 rounded-full object-cover border-2 border-black/[0.08] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#f0f4fa] border border-black/[0.08] flex items-center justify-center text-neutral-700 text-xl font-bold font-heading">
                    {user.email?.[0]?.toUpperCase() || <User size={24} />}
                  </div>
                )}

                {isAdmin && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-sm" title="Verified Admin">
                    <ShieldCheck size={12} strokeWidth={3} />
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-heading font-semibold text-[#111317]">
                  Welcome back, {displayName}
                </h1>
                <p className="text-sm text-neutral-500 mt-1">{user.email}</p>
                {isAdmin && (
                  <span className="inline-block mt-2 text-[11px] font-heading font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Studio Administrator
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full pt-2">
                {isAdmin ? (
                  /* Admin only button */
                  <Link
                    to="/admin"
                    className="w-full bg-black text-white font-heading font-semibold text-sm py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-center shadow-sm"
                  >
                    Go to Admin Portal
                  </Link>
                ) : (
                  /* Regular users button */
                  <Link
                    to="/opportunities"
                    className="w-full bg-black text-white font-heading font-semibold text-sm py-3.5 rounded-xl hover:bg-neutral-800 transition-colors text-center shadow-sm"
                  >
                    Explore Opportunities
                  </Link>
                )}

                <Link
                  to="/"
                  className="w-full bg-[#f4f7fc] text-neutral-800 font-heading font-semibold text-sm py-3 rounded-xl hover:bg-[#e4ebf7] transition-colors text-center"
                >
                  Return to Studio
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-xs font-medium text-red-600 hover:underline pt-2 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Login Form */
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-[#111317]">
                  {authMode === 'signin' ? 'Sign In' : 'Create an Account'}
                </h1>
                <p className="text-sm text-neutral-500 mt-1.5">
                  {authMode === 'signin'
                    ? 'Access your account & explore studio opportunities'
                    : 'Sign up to apply for opportunities & project updates'}
                </p>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-[#f8fafc] border border-black/[0.1] hover:bg-[#f0f4fa] hover:border-black/20 text-neutral-800 font-heading font-semibold text-sm py-3 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="w-full h-px bg-black/[0.08]" />
                <span className="absolute bg-white px-3 text-xs text-neutral-400 font-medium uppercase">
                  or email
                </span>
              </div>

              {/* Status alerts */}
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              {successMsg && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl">
                  <CheckCircle2 size={14} className="flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black text-white font-heading font-semibold text-sm py-3 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1 cursor-pointer"
                >
                  {submitting && <Loader2 size={14} className="animate-spin" />}
                  <span>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                </button>
              </form>

              {/* Mode switch */}
              <p className="text-xs text-center text-neutral-500">
                {authMode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="font-semibold text-black hover:underline"
                >
                  {authMode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} MAZTAA. Secure Authentication.
      </div>
    </div>
  );
}
