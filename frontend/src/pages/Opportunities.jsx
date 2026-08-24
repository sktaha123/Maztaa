import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, submitReferralApplication, getOpportunities } from '../services/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

export function Opportunities() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpps, setLoadingOpps] = useState(true);

  // Application Modal state
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [skills, setSkills] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.full_name) {
        setFullName(session.user.user_metadata.full_name);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user?.user_metadata?.full_name) {
        setFullName(session.user.user_metadata.full_name);
      }
    });

    // Fetch live opportunities
    getOpportunities()
      .then((data) => setOpportunities(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingOpps(false));

    return () => subscription.unsubscribe();
  }, []);

  const handleCardClick = (opp) => {
    if (!user) {
      navigate('/login?redirect=/opportunities');
      return;
    }
    setSelectedOpportunity(opp);
    setSkills(Array.isArray(opp.skills) ? opp.skills.slice(0, 3).join(', ') : '');
    setModalOpen(true);
    setSubmitSuccess(false);
    setErrorMsg('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      await submitReferralApplication({
        fullName,
        email: user.email,
        role: selectedOpportunity.title,
        skills,
        portfolioUrl,
        notes,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitSuccess(false);
        setSkills('');
        setPortfolioUrl('');
        setNotes('');
      }, 2500);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between relative">
      {/* Visual Ambiance & Grain matching Main Page */}
      <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Main Page Navbar */}
      <Navbar />

      {/* Main Opportunities Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-36 pb-24">
        
        {/* Header (Matching Reference Screenshot) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-[#111317] mb-3.5">
            Opportunities
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            We offer remote opportunities across many domains, including engineering, design, sales, and client management.
          </p>
        </div>

        {/* Opportunities Cards Grid */}
        {loadingOpps ? (
          <div className="py-24 flex items-center justify-center">
            <Loader2 className="animate-spin text-neutral-500" size={32} />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center shadow-sm">
              <ArrowRight size={22} className="text-neutral-400" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-neutral-700 mb-1">No openings right now</h3>
              <p className="text-sm text-neutral-500 max-w-xs">
                We're not actively hiring at the moment. Check back soon or reach out directly.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => handleCardClick(opp)}
                className="bg-white border border-black/[0.08] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-6 transition-all duration-200 hover:border-black/25 hover:shadow-[0_10px_28px_rgba(0,0,0,0.06)] cursor-pointer group"
              >
                <div className="flex flex-col gap-3.5">
                  {/* Date */}
                  <span className="text-xs text-neutral-400 font-medium">
                    {opp.date}
                  </span>

                  {/* Role Title */}
                  <h2 className="text-lg font-heading font-semibold tracking-tight text-[#111317] group-hover:text-black">
                    {opp.title}
                  </h2>

                  {/* Required skills */}
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium block mb-2">
                      Required skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(opp.skills) ? opp.skills : []).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium text-neutral-700 bg-[#f4f7fc] border border-black/[0.04] px-2.5 py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Pay Rate + Arrow Button */}
                <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                  <span className="text-xs font-semibold text-neutral-600">
                    {opp.pay}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#f8fafc] border border-black/[0.08] flex items-center justify-center text-neutral-700 group-hover:bg-[#111317] group-hover:text-white group-hover:border-black transition-colors">
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="flex justify-center mt-14">
          <Button href="/#pricing" id="opportunities-bottom-cta">
            Start a Project with MAZTAA
          </Button>
        </div>

      </main>

      {/* Main Page Footer */}
      <Footer />

      {/* Application Modal */}
      <AnimatePresence>
        {modalOpen && selectedOpportunity && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-black/[0.09] rounded-3xl p-6 sm:p-9 max-w-lg w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {submitSuccess ? (
                <div className="py-8 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 size={48} className="text-emerald-600" />
                  <h3 className="text-2xl font-heading font-semibold text-[#111317]">
                    Application Submitted!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-xs leading-relaxed">
                    Thank you, {fullName || 'Applicant'}! We have received your application for <strong>{selectedOpportunity.title}</strong> and will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs font-heading font-semibold text-neutral-400 uppercase tracking-wider">
                      Applying For
                    </span>
                    <h2 className="text-2xl font-heading font-semibold text-[#111317] mt-0.5">
                      {selectedOpportunity.title}
                    </h2>
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Email (Logged in)
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full bg-[#f4f7fc] border border-black/[0.08] rounded-xl px-4 py-2.5 text-sm text-neutral-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name *
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

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Relevant Skills *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. React, Next.js, Figma, Client Outreach..."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Portfolio / LinkedIn URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your background, recent work, or availability..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-black text-white font-heading font-semibold text-sm py-3 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    {submitting && <Loader2 size={15} className="animate-spin" />}
                    <span>Submit Application</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
