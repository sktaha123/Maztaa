import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign In with Google OAuth
 */
export const signInWithGoogle = async (redirectTo) => {
  const finalRedirect = redirectTo || (typeof window !== 'undefined' ? window.location.origin + '/opportunities' : undefined);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: finalRedirect,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }

  return data;
};

/**
 * Sign In with Email & Password
 */
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in with email:', error.message);
    throw error;
  }

  return data;
};

/**
 * Sign Up with Email & Password
 */
export const signUpWithEmail = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error('Error signing up with email:', error.message);
    throw error;
  }

  return data;
};

/**
 * Sign Out Current User
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

/**
 * Submit Candidate Application
 */
export const submitReferralApplication = async (application) => {
  const fullName = application.fullName || `${application.firstName || ''} ${application.lastName || ''}`.trim();

  const { data, error } = await supabase
    .from('referral_applications')
    .insert([
      {
        full_name: fullName,
        email: application.email,
        role_selected: application.role,
        skills: application.skills,
        portfolio_url: application.portfolioUrl || application.linkedInUrl || '',
        notes: application.phone ? `Phone: ${application.phone}\n${application.notes || ''}` : application.notes || '',
        status: 'pending',
      },
    ])
    .select();

  if (error) {
    console.error('Error submitting application:', error.message);
    throw error;
  }

  return data;
};

/**
 * Fetch all Applications (Admin view)
 */
export const getReferralApplications = async () => {
  try {
    const { data, error } = await supabase
      .from('referral_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Could not fetch from database, returning local state:', err.message);
    return [];
  }
};

/**
 * Update Application Status (Admin only)
 */
export const updateApplicationStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('referral_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating application status:', error.message);
    throw error;
  }

  return data;
};

/**
 * Delete Application (Admin only)
 */
export const deleteApplication = async (id) => {
  const { error } = await supabase
    .from('referral_applications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting application:', error.message);
    throw error;
  }
};

/**
 * Fetch Opportunities
 */
export const getOpportunities = async () => {
  try {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((item) => ({
      id: item.id,
      date: item.date_posted || new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: item.title,
      skills: Array.isArray(item.skills) ? item.skills : (item.skills || '').split(',').map((s) => s.trim()).filter(Boolean),
      pay: item.pay,
      jobType: item.job_type || 'Contractor (~15 hrs a week)',
      location: item.location || 'Remote',
      schedule: item.schedule || 'Flexible, you pick the hours and days (including weekends if desired)',
      about: item.about || 'maztaa is a modern design & web development studio crafting high-converting digital products, brand identities, and high-performance applications for leading brands and frontier startups worldwide.',
      description: item.description || 'In this role, you will collaborate with our core team to design, build, and deliver high-impact digital experiences.',
    }));
  } catch (err) {
    console.warn('Could not fetch opportunities:', err.message);
    return [];
  }
};

/**
 * Create New Opportunity (Admin only)
 */
export const createOpportunity = async (opp) => {
  const skillsArray = Array.isArray(opp.skills)
    ? opp.skills
    : (opp.skills || '').split(',').map((s) => s.trim()).filter(Boolean);

  const payload = {
    title: opp.title,
    skills: skillsArray,
    pay: opp.pay,
    description: opp.description,
    job_type: opp.jobType || 'Contractor (~15 hrs a week)',
    location: opp.location || 'Remote',
    schedule: opp.schedule || 'Flexible, you pick the hours and days (including weekends if desired)',
    about: opp.about || 'maztaa is a modern design & web development studio crafting high-converting digital products, brand identities, and high-performance applications for leading brands and frontier startups worldwide.',
    date_posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    is_active: true,
  };

  const { data, error } = await supabase
    .from('opportunities')
    .insert([payload])
    .select();

  if (error) {
    // If additional columns don't exist in Supabase table yet, fallback to base columns
    const fallbackPayload = {
      title: opp.title,
      skills: skillsArray,
      pay: opp.pay,
      description: opp.description,
      date_posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      is_active: true,
    };
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('opportunities')
      .insert([fallbackPayload])
      .select();

    if (fallbackError) {
      console.error('Error creating opportunity:', fallbackError.message);
      throw fallbackError;
    }
    return fallbackData;
  }

  return data;
};

/**
 * Delete Opportunity (Admin only)
 */
export const deleteOpportunity = async (id) => {
  const { error } = await supabase
    .from('opportunities')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting opportunity:', error.message);
    throw error;
  }
};
