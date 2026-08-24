import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { supabase, submitReferralApplication, getOpportunities } from '../services/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Logo from '../components/ui/Logo';

export function Apply() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const roleId = searchParams.get('id');
  const roleTitleParam = searchParams.get('role');

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  // Form state matching Image #2
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Apply for Opportunity — maztaa Studio';
  }, []);

  useEffect(() => {
    if (role?.title) {
      document.title = `Apply for ${role.title} — maztaa Studio`;
    }
  }, [role]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u?.email) setEmail(u.email);
      if (u?.user_metadata?.full_name) {
        const parts = u.user_metadata.full_name.split(' ');
        setFirstName(parts[0] || '');
        setLastName(parts.slice(1).join(' ') || '');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u?.email && !email) setEmail(u.email);
    });

    // Fetch opportunity details
    getOpportunities()
      .then((opps) => {
        let matched = null;
        if (roleId) matched = opps.find((o) => o.id === roleId);
        if (!matched && roleTitleParam) {
          matched = opps.find((o) => o.title?.toLowerCase() === roleTitleParam.toLowerCase());
        }
        if (!matched && opps.length > 0) matched = opps[0];
        setRole(matched);
      })
      .finally(() => setLoadingRole(false));

    return () => subscription.unsubscribe();
  }, [roleId, roleTitleParam]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      await submitReferralApplication({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        email,
        phone: `${phoneCountryCode} ${phoneNumber}`.trim(),
        linkedInUrl,
        portfolioUrl: linkedInUrl,
        role: role?.title || roleTitleParam || 'Remote Candidate',
        skills: Array.isArray(role?.skills) ? role.skills.join(', ') : (role?.skills || ''),
        notes: resumeLink ? `Resume Link: ${resumeLink}` : '',
      });

      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between relative selection:bg-neutral-900 selection:text-white">
      {/* Background Atmosphere & Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <Navbar />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-32 pb-24">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/opportunities"
            className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Opportunities</span>
          </Link>
        </div>

        {submitSuccess ? (
          /* ── SUCCESS VIEW ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md border border-black/[0.08] rounded-3xl p-10 sm:p-16 text-center max-w-2xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col items-center gap-5 my-8"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-semibold text-[#111317] mb-2">
                Application Received!
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md">
                Thank you, <strong>{firstName || 'Candidate'}</strong>! We have received your application for{' '}
                <strong>{role?.title || 'this role'}</strong>. Our recruiting team will review your profile and reach out to <strong>{email}</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Link
                to="/opportunities"
                className="bg-black text-white font-heading font-semibold text-sm px-6 py-3 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Browse more roles
              </Link>
              <Link
                to="/"
                className="bg-white text-neutral-700 border border-black/[0.08] font-heading font-semibold text-sm px-6 py-3 rounded-xl hover:bg-neutral-50 transition-colors shadow-xs"
              >
                Return to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ── 2-COLUMN LAYOUT MATCHING IMAGE #2 ── */
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 xl:gap-14 items-start">

            {/* ════════════════════════════════════════════════════════
                LEFT COLUMN: JOB DESCRIPTION & SPECIFICATIONS
                ════════════════════════════════════════════════════════ */}
            <div className="flex flex-col gap-7 text-left">
              {/* Wordmark Logo */}
              <div>
                <Logo className="text-2xl font-bold tracking-tight text-[#111317]" />
              </div>

              {/* Title & Pay Badge */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold text-[#111317] tracking-tight mb-4">
                  {loadingRole ? 'Loading opportunity...' : role?.title || roleTitleParam || 'Opportunity Opening'}
                </h1>

                {role?.pay && (
                  <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-white border border-black/[0.08] shadow-xs text-xs sm:text-sm font-heading font-semibold text-[#111317]">
                    <span>{role.pay}</span>
                  </div>
                )}
              </div>

              {/* Required Skills Section */}
              {role && Array.isArray(role.skills) && role.skills.length > 0 && (
                <div>
                  <h2 className="text-sm font-heading font-semibold text-[#111317] mb-3">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs sm:text-[13px] font-medium text-neutral-800 bg-[#e8edf5] border border-black/[0.04] px-3 py-1.5 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

             
              

              {/* Job Metadata List */}
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-800 pt-2">
                <div>
                  <strong>Job Title:</strong> {role?.title || 'Remote Specialist'}
                </div>
                <div>
                  <strong>Job Type:</strong> {role?.jobType || 'Contractor (~15 hrs a week)'}
                </div>
                <div>
                  <strong>Location:</strong> {role?.location || 'Remote'}
                </div>
                <div>
                  <strong>Schedule:</strong> {role?.schedule || 'Flexible, you pick the hours and days (including weekends if desired)'}
                </div>
              </div>

              {/* Job Summary & Detailed Description */}
              <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-700 leading-relaxed pt-2">
                <p>
                  <strong>Job Summary:</strong>{' '}
                  {role?.description ||
                    "In this role, you'll apply your expertise to help design, engineer, and optimize high-grade web applications and digital interfaces."}
                </p>
                <p>
                  As a candidate, you will be collaborating directly with founders, creative directors, and senior engineers to execute clean, responsive, and performant systems. Tasks may involve building features, fixing bugs, implementing complex UI animations, or refactoring codebases with exceptional attention to craft.
                </p>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════
                RIGHT COLUMN: "INTERESTED?" APPLICATION FORM
                ════════════════════════════════════════════════════════ */}
            <div className="flex flex-col gap-4 sticky top-24">
              <div className="bg-white/95 backdrop-blur-md border border-black/[0.08] rounded-3xl p-7 sm:p-8 shadow-[0_6px_30px_rgba(0,0,0,0.04)]">
                <h2 className="text-xl font-heading font-semibold text-[#111317] mb-5">
                  Interested?
                </h2>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3.5 mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    <AlertCircle size={15} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  {/* First Name & Last Name (Side by Side) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-heading font-medium text-neutral-600 mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-black/[0.09] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-medium text-neutral-600 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-black/[0.09] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-heading font-medium text-neutral-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.09] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Phone Number with country selector */}
                  <div>
                    <label className="block text-[11px] font-heading font-medium text-neutral-600 mb-1">
                      Phone number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                        className="bg-[#f8fafc] border border-black/[0.09] rounded-xl px-2.5 py-2.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-black cursor-pointer w-24"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+81">🇯🇵 +81</option>
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 bg-[#f8fafc] border border-black/[0.09] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* LinkedIn / Portfolio URL */}
                  <div>
                    <label className="block text-[11px] font-heading font-medium text-neutral-600 mb-1">
                      LinkedIn profile URL
                    </label>
                    <input
                      type="url"
                      placeholder="Enter your LinkedIn URL"
                      value={linkedInUrl}
                      onChange={(e) => setLinkedInUrl(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.09] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Google Drive Resume Link */}
                  <div>
                    <label className="block text-[11px] font-heading font-medium text-neutral-600 mb-1">
                      Resume Link (Google Drive / Notion / PDF URL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/d/... or Notion/PDF URL"
                      value={resumeLink}
                      onChange={(e) => setResumeLink(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.09] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Submit Button (Blue Style Matching Image #2) */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2b59ff] hover:bg-[#1f48e6] text-white font-heading font-semibold text-sm transition-colors shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-60 mt-2"
                  >
                    {submitting && <Loader2 size={15} className="animate-spin" />}
                    <span>{submitting ? 'Submitting...' : 'Submit Application'}</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
