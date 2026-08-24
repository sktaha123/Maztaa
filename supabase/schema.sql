-- ====================================================================
-- MAZTAA — Comprehensive Supabase Database Schema
-- Safe Execution: Run this in Supabase Dashboard → SQL Editor
-- ====================================================================

-- ── 0. CLEANUP OLD TABLES & OBJECTS (CASCADE handles triggers) ──────
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

DROP TABLE IF EXISTS public.project_milestones CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.inquiries CASCADE;
DROP TABLE IF EXISTS public.opportunities CASCADE;
DROP TABLE IF EXISTS public.referral_applications CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;


-- ── 1. PROFILES TABLE ───────────────────────────────────────────────
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT UNIQUE,
  full_name   TEXT,
  avatar_url  TEXT,
  provider    TEXT DEFAULT 'google',
  role        TEXT NOT NULL DEFAULT 'client', -- 'admin', 'client', 'partner'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT ALL ON TABLE public.profiles TO postgres, service_role, authenticated, anon;


-- ── 2. OPPORTUNITIES TABLE (Managed by Admin, Viewed by Public) ─────
CREATE TABLE public.opportunities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  category        TEXT DEFAULT 'Engineering',
  skills          TEXT[] NOT NULL DEFAULT '{}',
  pay             TEXT NOT NULL,
  description     TEXT NOT NULL,
  job_type        TEXT DEFAULT 'Contractor (~15 hrs a week)',
  location        TEXT DEFAULT 'Remote',
  schedule        TEXT DEFAULT 'Flexible, you pick the hours and days (including weekends if desired)',
  about           TEXT DEFAULT 'MAZTAA is a modern design & web development studio crafting high-converting digital products, brand identities, and high-performance applications for leading brands and frontier startups worldwide.',
  date_posted     TEXT DEFAULT TO_CHAR(NOW(), 'Mon DD, YYYY'),
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT ALL ON TABLE public.opportunities TO postgres, service_role, authenticated, anon;


-- ── 3. REFERRAL APPLICATIONS TABLE (Submissions) ────────────────────
CREATE TABLE public.referral_applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  role_selected   TEXT NOT NULL,
  skills          TEXT NOT NULL,
  portfolio_url   TEXT,
  resume_link     TEXT,
  notes           TEXT,
  status          TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'reviewing', 'accepted', 'rejected'
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_referral_apps_email ON public.referral_applications(email);
CREATE INDEX idx_referral_apps_status ON public.referral_applications(status);

GRANT ALL ON TABLE public.referral_applications TO postgres, service_role, authenticated, anon;


-- ── 4. INQUIRIES TABLE ──────────────────────────────────────────────
CREATE TABLE public.inquiries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  business_name   TEXT,
  project_type    TEXT,
  budget_tier     TEXT,
  message         TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'new',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT ALL ON TABLE public.inquiries TO postgres, service_role, authenticated, anon;


-- ── 5. PROJECTS TABLE ───────────────────────────────────────────────
CREATE TABLE public.projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  status          TEXT NOT NULL DEFAULT 'discovery',
  plan            TEXT,
  total_amount    NUMERIC(10, 2),
  start_date      DATE,
  target_launch   DATE,
  launched_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_client_id ON public.projects(client_id);
GRANT ALL ON TABLE public.projects TO postgres, service_role, authenticated, anon;


-- ── 6. UPDATED_AT TRIGGER FUNCTION ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_opportunities_updated_at
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_referral_applications_updated_at
  BEFORE UPDATE ON public.referral_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ── 7. AUTH USER ONBOARDING TRIGGER ─────────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    COALESCE(NEW.raw_app_meta_data->>'provider', 'email')
  )
  ON CONFLICT (id) DO UPDATE SET
    email      = EXCLUDED.email,
    full_name  = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ── 8. ROW LEVEL SECURITY (RLS) POLICIES ────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Public profiles are viewable by owner"
  ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Opportunities: Anyone can view active, authenticated/service_role can insert/update/delete
CREATE POLICY "Anyone can view active opportunities"
  ON public.opportunities FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated can manage opportunities"
  ON public.opportunities FOR ALL USING (true) WITH CHECK (true);

-- Applications: Anyone can submit, anyone can view/manage
CREATE POLICY "Anyone can submit referral application"
  ON public.referral_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read and update referral applications"
  ON public.referral_applications FOR ALL USING (true) WITH CHECK (true);

-- Inquiries: Anyone can submit
CREATE POLICY "Anyone can submit inquiry"
  ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view inquiries"
  ON public.inquiries FOR SELECT USING (true);

-- Projects: Clients view own projects
CREATE POLICY "Clients can view own projects"
  ON public.projects FOR SELECT USING (auth.uid() = client_id);


-- ── 9. INITIAL OPPORTUNITIES SEED (Default Listings) ────────────────
INSERT INTO public.opportunities (title, skills, pay, description, date_posted) VALUES
('Sales & Client Referral Partner', ARRAY['Client Outreach', 'B2B Sales', 'Negotiation', '2+'], 'Pay: 15% - 20% / deal', 'Refer business owners and startups in need of modern custom websites and digital platforms. High direct commission on closed deals.', 'Aug 24, 2026'),
('Frontend React / Next.js Engineer', ARRAY['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', '3+'], 'Pay: $45-$85/h', 'Build fast, responsive web applications and high-fidelity micro-interactions with clean component architecture.', 'Aug 24, 2026'),
('UI/UX & Product Designer', ARRAY['Figma', 'Typography', 'Design Systems', 'Prototyping', '2+'], 'Pay: $50-$90/h', 'Craft bold editorial layouts, minimalist visual identities, and responsive design systems for clients worldwide.', 'Aug 24, 2026'),
('Technical Project Manager / QA', ARRAY['Project Scoping', 'Client Relations', 'QA Testing', 'Git'], 'Pay: $35-$65/h', 'Manage development milestones, coordinate structured client revision rounds, and ensure high quality delivery.', 'Aug 24, 2026')
ON CONFLICT DO NOTHING;
