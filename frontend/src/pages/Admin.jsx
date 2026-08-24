import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  RefreshCw,
  Loader2,
  ExternalLink,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Download,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  LogIn,
  Plus,
  Briefcase,
  Users,
  X,
} from 'lucide-react';
import {
  supabase,
  signInWithGoogle,
  signOut,
  getReferralApplications,
  updateApplicationStatus,
  deleteApplication,
  getOpportunities,
  createOpportunity,
  deleteOpportunity,
} from '../services/supabase';
import Logo from '../components/ui/Logo';

// Authorized Administrator Email
const ADMIN_EMAIL = 'shaikhtaha10102006@gmail.com';

export function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Tabs: 'applications' or 'opportunities'
  const [activeTab, setActiveTab] = useState('applications');

  // Applications State
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Opportunities State
  const [opportunities, setOpportunities] = useState([]);
  const [oppsLoading, setOppsLoading] = useState(false);
  const [showAddOppModal, setShowAddOppModal] = useState(false);
  const [newOppTitle, setNewOppTitle] = useState('');
  const [newOppSkills, setNewOppSkills] = useState('');
  const [newOppPay, setNewOppPay] = useState('');
  const [newOppJobType, setNewOppJobType] = useState('Contractor (~15 hrs a week)');
  const [newOppLocation, setNewOppLocation] = useState('Remote');
  const [newOppSchedule, setNewOppSchedule] = useState('Flexible, you pick the hours and days (including weekends if desired)');
  const [newOppAbout, setNewOppAbout] = useState('maztaa is a modern design & web development studio crafting high-converting digital products, brand identities, and high-performance applications for leading brands and frontier startups worldwide.');
  const [newOppDesc, setNewOppDesc] = useState('');
  const [creatingOpp, setCreatingOpp] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  // Check auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthorized = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const fetchApps = async () => {
    if (!isAuthorized) return;
    setAppsLoading(true);
    setErrorMsg('');
    try {
      const data = await getReferralApplications();
      setApplications(data);
    } catch (err) {
      setErrorMsg('Failed to load applications from database.');
    } finally {
      setAppsLoading(false);
    }
  };

  const fetchOpps = async () => {
    if (!isAuthorized) return;
    setOppsLoading(true);
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setOppsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchApps();
      fetchOpps();
    }
  }, [isAuthorized]);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoadingId(id);
    try {
      await updateApplicationStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      alert('Error updating status: ' + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteApp = async (id, name) => {
    if (!window.confirm(`Delete application from ${name || 'this candidate'}?`)) return;
    setActionLoadingId(id);
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      alert('Error deleting application: ' + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCreateOpp = async (e) => {
    e.preventDefault();
    setCreatingOpp(true);
    try {
      await createOpportunity({
        title: newOppTitle,
        skills: newOppSkills,
        pay: newOppPay,
        jobType: newOppJobType,
        location: newOppLocation,
        schedule: newOppSchedule,
        about: newOppAbout,
        description: newOppDesc,
      });
      setShowAddOppModal(false);
      setNewOppTitle('');
      setNewOppSkills('');
      setNewOppPay('');
      setNewOppDesc('');
      await fetchOpps();
    } catch (err) {
      alert('Failed to create opportunity: ' + err.message);
    } finally {
      setCreatingOpp(false);
    }
  };

  const handleDeleteOpp = async (id, title) => {
    if (!window.confirm(`Delete opportunity "${title}"?`)) return;
    try {
      await deleteOpportunity(id);
      setOpportunities((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const exportCSV = () => {
    if (!applications.length) return;
    const headers = ['Full Name', 'Email', 'Role Selected', 'Skills', 'Portfolio URL', 'Status', 'Date', 'Notes'];
    const rows = applications.map((app) => [
      `"${(app.full_name || '').replace(/"/g, '""')}"`,
      `"${(app.email || '').replace(/"/g, '""')}"`,
      `"${(app.role_selected || '').replace(/"/g, '""')}"`,
      `"${(app.skills || '').replace(/"/g, '""')}"`,
      `"${(app.portfolio_url || '').replace(/"/g, '""')}"`,
      `"${app.status || 'pending'}"`,
      `"${new Date(app.created_at).toLocaleString()}"`,
      `"${(app.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `maztaa_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdminGoogleLogin = async () => {
    try {
      await signInWithGoogle(window.location.origin + '/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  // 1. Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#edf1f8] flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-600" size={32} />
      </div>
    );
  }

  // 2. Unauthenticated Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between p-6 sm:p-10 relative">
        <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black">
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <Logo className="text-xl" />
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full my-auto py-12">
          <div className="bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-10 text-center shadow-[0_16px_40px_rgba(0,0,0,0.06)] flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#edf1f8] border border-black/[0.08] flex items-center justify-center text-neutral-800">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-semibold text-[#111317]">
                Admin Authentication Required
              </h1>
              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                This portal is strictly restricted to administrator access.
              </p>
            </div>

            <button
              onClick={handleAdminGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-black text-white font-heading font-semibold text-sm py-3.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer mt-2"
            >
              <LogIn size={16} />
              <span>Sign In with Admin Account</span>
            </button>

            <Link to="/login?redirect=/admin" className="text-xs text-neutral-500 hover:text-black hover:underline">
              Sign in with email & password
            </Link>
          </div>
        </div>

        <div className="relative z-10 text-center text-xs text-neutral-400">
          maztaa studio — restricted administrative access
        </div>
      </div>
    );
  }

  // 3. Unauthorized Screen (Signed in with non-admin email)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#edf1f8] text-[#111317] flex flex-col justify-between p-6 sm:p-10 relative">
        <div className="absolute inset-0 z-0 pointer-events-none ambient-glow-mesh" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black">
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <Logo className="text-xl" />
        </div>

        <div className="relative z-10 max-w-md mx-auto w-full my-auto py-12">
          <div className="bg-white border border-red-200 rounded-3xl p-8 sm:p-10 text-center shadow-[0_16px_40px_rgba(0,0,0,0.06)] flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
              <ShieldAlert size={30} />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-semibold text-[#111317]">
                Access Denied (403)
              </h1>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                You are signed in as <strong className="text-black font-semibold">{user.email}</strong>, which does not have administrative permissions.
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Authorized for <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-700">{ADMIN_EMAIL}</code> only.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 w-full pt-2">
              <button
                onClick={handleSignOut}
                className="w-full bg-black text-white font-heading font-semibold text-sm py-3 rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Sign Out & Switch Account
              </button>
              <Link
                to="/"
                className="text-xs text-neutral-500 hover:text-black hover:underline py-1"
              >
                Return to maztaa Studio
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center text-xs text-neutral-400">
          maztaa studio — restricted administrative access
        </div>
      </div>
    );
  }

  // 4. Authorized Admin View
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      (app.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (app.role_selected || '').toLowerCase().includes(search.toLowerCase()) ||
      (app.skills || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (app.status || 'pending') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = applications.filter((a) => (a.status || 'pending') === 'pending').length;
  const reviewingCount = applications.filter((a) => a.status === 'reviewing').length;
  const acceptedCount = applications.filter((a) => a.status === 'accepted').length;

  return (
    <div className="min-h-screen bg-[#edf1f8] text-[#111317] relative flex flex-col justify-between">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Top Admin Navbar */}
      <header className="relative z-20 border-b border-black/[0.06] bg-white/95 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Studio</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <ShieldCheck size={12} className="text-emerald-600" />
              <span className="truncate max-w-[180px] sm:max-w-none">{ADMIN_EMAIL}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSignOut}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
            >
              Sign Out
            </button>
            <Logo className="text-lg" />
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-10">
        
        {/* Navigation Tabs & Primary Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Tab Switcher */}
          <div className="inline-flex bg-white border border-black/[0.08] p-1.5 rounded-2xl shadow-sm self-start">
            <button
              onClick={() => setActiveTab('applications')}
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer',
                activeTab === 'applications'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black',
              ].join(' ')}
            >
              <Users size={15} />
              <span>Applications ({applications.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={[
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all cursor-pointer',
                activeTab === 'opportunities'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-neutral-600 hover:text-black',
              ].join(' ')}
            >
              <Briefcase size={15} />
              <span>Manage Opportunities ({opportunities.length})</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {activeTab === 'applications' ? (
              <>
                <button
                  onClick={exportCSV}
                  disabled={!applications.length}
                  className="inline-flex items-center gap-1.5 bg-white border border-black/[0.1] px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-50 shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={fetchApps}
                  className="inline-flex items-center gap-1.5 bg-black text-white px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-neutral-800 shadow-sm cursor-pointer"
                >
                  <RefreshCw size={13} className={appsLoading ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAddOppModal(true)}
                className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold hover:bg-neutral-800 shadow-sm cursor-pointer"
              >
                <Plus size={15} strokeWidth={2.5} />
                <span>Post New Opportunity</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="flex flex-col gap-6">
            {/* Metric Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
              <div className="bg-white border border-black/[0.08] rounded-2xl p-4 sm:p-5 shadow-sm">
                <span className="text-xs text-neutral-500 font-medium block mb-1">Total Submissions</span>
                <span className="text-2xl sm:text-3xl font-heading font-semibold text-[#111317]">{applications.length}</span>
              </div>
              <div className="bg-white border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-sm bg-amber-50/20">
                <span className="text-xs text-amber-700 font-medium block mb-1">Pending</span>
                <span className="text-2xl sm:text-3xl font-heading font-semibold text-amber-900">{pendingCount}</span>
              </div>
              <div className="bg-white border border-blue-200/80 rounded-2xl p-4 sm:p-5 shadow-sm bg-blue-50/20">
                <span className="text-xs text-blue-700 font-medium block mb-1">In Review</span>
                <span className="text-2xl sm:text-3xl font-heading font-semibold text-blue-900">{reviewingCount}</span>
              </div>
              <div className="bg-white border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-sm bg-emerald-50/20">
                <span className="text-xs text-emerald-700 font-medium block mb-1">Accepted</span>
                <span className="text-2xl sm:text-3xl font-heading font-semibold text-emerald-900">{acceptedCount}</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 bg-white border border-black/[0.08] p-3.5 rounded-2xl shadow-sm">
              <div className="relative w-full sm:max-w-md">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search name, email, role, skills..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-black/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <span className="text-xs text-neutral-500 font-medium">Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#f8fafc] border border-black/[0.08] rounded-xl px-3 py-2 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="all">All Statuses ({applications.length})</option>
                  <option value="pending">Pending ({pendingCount})</option>
                  <option value="reviewing">Reviewing ({reviewingCount})</option>
                  <option value="accepted">Accepted ({acceptedCount})</option>
                  <option value="rejected">Declined</option>
                </select>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* Applications List */}
            {appsLoading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-neutral-500" size={28} />
                <span className="text-xs text-neutral-400">Loading submissions...</span>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="bg-white border border-black/[0.08] rounded-3xl p-12 text-center text-neutral-500">
                <p className="text-base font-semibold text-neutral-800">No applications match your criteria.</p>
                <p className="text-xs text-neutral-400 mt-1">
                  New submissions from the Opportunities page will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredApps.map((app) => {
                  const isActionRunning = actionLoadingId === app.id;
                  const status = app.status || 'pending';

                  return (
                    <div
                      key={app.id}
                      className="bg-white border border-black/[0.08] rounded-2xl p-5 sm:p-6 shadow-sm hover:border-black/20 transition-all flex flex-col gap-4"
                    >
                      {/* Card Header Row */}
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-3 border-b border-black/[0.04]">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#111317]">
                              {app.full_name || 'Anonymous Candidate'}
                            </h3>
                            <span className="text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 px-3 py-0.5 rounded-full">
                              {app.role_selected}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                            <a
                              href={`mailto:${app.email}?subject=maztaa Opportunity — ${encodeURIComponent(app.role_selected)} Application`}
                              className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-black font-medium hover:underline"
                            >
                              <Mail size={13} />
                              <span>{app.email}</span>
                            </a>

                            <span>
                              {new Date(app.created_at).toLocaleDateString()} at {new Date(app.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>

                            {app.portfolio_url && (
                              <a
                                href={app.portfolio_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                              >
                                <ExternalLink size={12} />
                                <span>Portfolio / Profile</span>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Status Badge + Quick Actions */}
                        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                          {status === 'accepted' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full">
                              <CheckCircle size={12} />
                              <span>Accepted</span>
                            </span>
                          )}
                          {status === 'reviewing' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
                              <Clock size={12} />
                              <span>In Review</span>
                            </span>
                          )}
                          {status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full">
                              <Clock size={12} />
                              <span>Pending</span>
                            </span>
                          )}
                          {status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full">
                              <XCircle size={12} />
                              <span>Declined</span>
                            </span>
                          )}

                          {/* Quick Status Buttons */}
                          <div className="flex items-center gap-1 border-l border-black/[0.08] pl-2">
                            {status !== 'reviewing' && (
                              <button
                                disabled={isActionRunning}
                                onClick={() => handleStatusChange(app.id, 'reviewing')}
                                className="text-[11px] font-medium bg-[#f0f4fa] hover:bg-[#e2eaf7] px-2 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                Review
                              </button>
                            )}
                            {status !== 'accepted' && (
                              <button
                                disabled={isActionRunning}
                                onClick={() => handleStatusChange(app.id, 'accepted')}
                                className="text-[11px] font-medium bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                Accept
                              </button>
                            )}
                            {status !== 'rejected' && (
                              <button
                                disabled={isActionRunning}
                                onClick={() => handleStatusChange(app.id, 'rejected')}
                                className="text-[11px] font-medium bg-red-50 text-red-700 hover:bg-red-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                              >
                                Decline
                              </button>
                            )}
                            <button
                              disabled={isActionRunning}
                              onClick={() => handleDeleteApp(app.id, app.full_name)}
                              className="text-neutral-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
                              title="Delete application"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Skills & Notes Details */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#f8fafc] border border-black/[0.04] p-3.5 rounded-xl">
                          <span className="text-[11px] font-heading font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                            Skills & Qualifications
                          </span>
                          <p className="text-xs sm:text-sm text-neutral-800 font-medium">
                            {app.skills || 'Not specified'}
                          </p>
                        </div>

                        {app.notes && (
                          <div className="bg-[#f8fafc] border border-black/[0.04] p-3.5 rounded-xl">
                            <span className="text-[11px] font-heading font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                              Applicant Pitch / Notes
                            </span>
                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                              {app.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MANAGE OPPORTUNITIES */}
        {activeTab === 'opportunities' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-semibold text-[#111317]">
                  Active Opportunity Listings
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                  These items are displayed publicly on the /opportunities page for candidates to apply.
                </p>
              </div>
            </div>

            {oppsLoading ? (
              <div className="py-20 flex items-center justify-center">
                <Loader2 className="animate-spin text-neutral-500" size={28} />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-white border border-black/[0.08] rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5 relative group"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400 font-medium">{opp.date}</span>
                        <button
                          onClick={() => handleDeleteOpp(opp.id, opp.title)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          title="Delete opportunity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <h3 className="text-lg font-heading font-semibold text-[#111317]">
                        {opp.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                        {opp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {opp.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[11px] font-medium text-neutral-700 bg-[#f4f7fc] border border-black/[0.04] px-2 py-0.5 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-neutral-700">
                      <span>{opp.pay}</span>
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                        Live on Site
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL: POST NEW OPPORTUNITY */}
      {showAddOppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-black/[0.09] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddOppModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
            >
              <X size={18} />
            </button>

            <h2 className="text-2xl font-heading font-semibold text-[#111317] mb-1">
              Post New Opportunity
            </h2>
            <p className="text-xs text-neutral-500 mb-6">
              Fill in the role details, required skills, and specifications to publish live on the Opportunities page.
            </p>

            <form onSubmit={handleCreateOpp} className="flex flex-col gap-4">
              {/* Title & Pay */}
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AI Engineer, UI/UX Designer..."
                    value={newOppTitle}
                    onChange={(e) => setNewOppTitle(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Pay Rate / Compensation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $60 - $120/hour pay or 20% / deal"
                    value={newOppPay}
                    onChange={(e) => setNewOppPay(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Required Skills (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python3, JAVA, Rust, TypeScript, Next.js, Bug fixing, Performance optimization"
                  value={newOppSkills}
                  onChange={(e) => setNewOppSkills(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Job Type, Location & Schedule */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Job Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Contractor (~15 hrs a week)"
                    value={newOppJobType}
                    onChange={(e) => setNewOppJobType(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Remote (Global)"
                    value={newOppLocation}
                    onChange={(e) => setNewOppLocation(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Schedule
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Flexible, you pick hours"
                    value={newOppSchedule}
                    onChange={(e) => setNewOppSchedule(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* About maztaa Box Text */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  About Section Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="maztaa is a modern design & web development studio..."
                  value={newOppAbout}
                  onChange={(e) => setNewOppAbout(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl p-3 text-xs sm:text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Job Summary & Responsibilities *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="In this role, you will apply your expertise to... (responsibilities, deliverables, expectations)"
                  value={newOppDesc}
                  onChange={(e) => setNewOppDesc(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-black/[0.1] rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:border-black resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={creatingOpp}
                className="w-full bg-black text-white font-heading font-semibold text-sm py-3.5 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {creatingOpp && <Loader2 size={15} className="animate-spin" />}
                <span>Publish Opportunity Live</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t border-black/[0.05] py-5 text-center text-xs text-neutral-400">
        maztaa studio — administrative management portal
      </footer>
    </div>
  );
}
