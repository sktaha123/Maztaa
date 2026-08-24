import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Initiate Google OAuth Sign In
 */
export const signInWithGoogle = async (redirectTo = window.location.origin) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    throw error;
  }

  return data;
};

/**
 * Sign in with Email & Password
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
 * Sign up with Email & Password
 */
export const signUpWithEmail = async (email, password, fullName = '') => {
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
    console.error('Error signing up:', error.message);
    throw error;
  }

  return data;
};

/**
 * Sign out current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    throw error;
  }
};

/**
 * Submit Opportunity / Referral Application
 */
export const submitReferralApplication = async (application) => {
  const { data, error } = await supabase
    .from('referral_applications')
    .insert([
      {
        full_name: application.fullName,
        email: application.email,
        role_selected: application.role,
        skills: application.skills,
        portfolio_url: application.portfolioUrl || '',
        notes: application.notes || '',
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
 * Fetch Opportunities (From database with fallback to default siteContent)
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
      skills: Array.isArray(item.skills) ? item.skills : (item.skills || '').split(',').map((s) => s.trim()),
      pay: item.pay,
      description: item.description,
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

  const { data, error } = await supabase
    .from('opportunities')
    .insert([
      {
        title: opp.title,
        skills: skillsArray,
        pay: opp.pay,
        description: opp.description,
        date_posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        is_active: true,
      },
    ])
    .select();

  if (error) {
    console.error('Error creating opportunity:', error.message);
    throw error;
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
