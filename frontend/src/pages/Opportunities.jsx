import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Search } from 'lucide-react';
import { supabase, getOpportunities } from '../services/supabase';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PAGE_SIZE = 6;

export function Opportunities() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loadingOpps, setLoadingOpps] = useState(true);

  // Search query & pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    document.title = 'Opportunities & Careers — maztaa Studio';
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch live opportunities
    getOpportunities()
      .then((data) => setOpportunities(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingOpps(false));

    return () => subscription.unsubscribe();
  }, []);

  // Filter opportunities by search query
  const filteredOpportunities = useMemo(() => {
    if (!searchQuery.trim()) return opportunities;
    const q = searchQuery.toLowerCase().trim();
    return opportunities.filter((opp) => {
      const matchTitle = opp.title?.toLowerCase().includes(q);
      const matchSkills = Array.isArray(opp.skills) && opp.skills.some((s) => s.toLowerCase().includes(q));
      const matchPay = opp.pay?.toLowerCase().includes(q);
      const matchDesc = opp.description?.toLowerCase().includes(q);
      return matchTitle || matchSkills || matchPay || matchDesc;
    });
  }, [opportunities, searchQuery]);

  // Reset pagination when search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + PAGE_SIZE);
      setLoadingMore(false);
    }, 450);
  };

  const hasMore = visibleCount < filteredOpportunities.length;

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between relative selection:bg-neutral-900 selection:text-white">
      {/* Background Atmosphere & Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Top Navigation */}
      <Navbar />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-32 pb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold tracking-tight text-[#111317] mb-4">
Opportunities          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg mx-auto">
            We offer remote opportunities across many domains, including engineering, design, sales, and client management.
          </p>
        </div>

        {/* Iridescent spectrum search bar */}
        <div className="max-w-xl mx-auto mb-3">
          <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-[#ff80b2] via-[#a855f7] via-[#3b82f6] to-[#06b6d4] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="bg-white/95 backdrop-blur-sm rounded-[15px] flex items-center justify-between p-2 pl-5 transition-all">
              <input
                type="text"
                placeholder="Search by role or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-neutral-800 placeholder-neutral-400 focus:outline-none font-medium"
              />
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#111317] flex items-center justify-center text-white flex-shrink-0 shadow-sm cursor-default"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Roles count below search bar */}
        {!loadingOpps && (
          <p className="text-center text-xs sm:text-sm font-heading font-medium text-neutral-500 mb-10 tracking-tight">
            {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'role' : 'roles'} found
          </p>
        )}

        {/* Opportunities Cards Grid */}
        {loadingOpps ? (
          <div className="py-24 flex items-center justify-center">
            <Loader2 className="animate-spin text-neutral-500" size={32} />
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
            <div>
              <h3 className="text-lg font-heading font-semibold text-neutral-700 mb-1">
                {searchQuery ? `No roles matching "${searchQuery}"` : 'No openings right now'}
              </h3>
              <p className="text-sm text-neutral-500 max-w-xs">
                {searchQuery
                  ? 'Try searching with a different keyword or skill.'
                  : "We're not actively hiring at the moment. Check back soon or reach out directly."}
              </p>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-semibold text-black underline underline-offset-2 cursor-pointer"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filteredOpportunities.slice(0, visibleCount).map((opp) => (
                <Link
                  key={opp.id}
                  to={`/apply?id=${opp.id}`}
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
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center">
              {hasMore ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white border border-black/[0.08] text-[#111317] font-heading font-semibold text-sm shadow-xs hover:bg-[#f8fafc] hover:border-black/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-neutral-500" />
                      <span>Loading more...</span>
                    </>
                  ) : (
                    <span>Load more</span>
                  )}
                </button>
              ) : filteredOpportunities.length > PAGE_SIZE ? (
                <span className="text-xs font-heading font-medium text-neutral-400 bg-black/[0.03] px-4 py-2 rounded-full">
                  That's all for now
                </span>
              ) : null}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
