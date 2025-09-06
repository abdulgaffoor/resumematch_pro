-- Location: supabase/migrations/20250606171058_resumematch_pro_initial_schema.sql
-- Schema Analysis: FRESH_PROJECT - No existing schema detected
-- Integration Type: Complete new schema with authentication
-- Dependencies: None (creating base schema)

-- 1. TYPES AND ENUMS
CREATE TYPE public.user_role AS ENUM ('admin', 'premium', 'basic');
CREATE TYPE public.analysis_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE public.match_level AS ENUM ('poor', 'fair', 'good', 'excellent');

-- 2. CORE TABLES

-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'basic'::public.user_role,
    subscription_ends_at TIMESTAMPTZ,
    analyses_remaining INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Job postings for analysis
CREATE TABLE public.job_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    company TEXT,
    description TEXT NOT NULL,
    requirements TEXT,
    location TEXT,
    salary_range TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Resume analysis sessions
CREATE TABLE public.resume_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    job_posting_id UUID REFERENCES public.job_postings(id) ON DELETE SET NULL,
    resume_file_path TEXT,
    job_title TEXT NOT NULL,
    company TEXT,
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    analysis_status public.analysis_status DEFAULT 'pending'::public.analysis_status,
    analysis_results JSONB,
    suggestions JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Skills analysis breakdown
CREATE TABLE public.skills_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.resume_analyses(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    is_present BOOLEAN DEFAULT false,
    is_required BOOLEAN DEFAULT false,
    match_level public.match_level,
    suggestions TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Keywords analysis
CREATE TABLE public.keyword_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.resume_analyses(id) ON DELETE CASCADE,
    keyword TEXT NOT NULL,
    frequency_in_resume INTEGER DEFAULT 0,
    frequency_in_job INTEGER DEFAULT 0,
    importance_score INTEGER CHECK (importance_score >= 0 AND importance_score <= 10),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Formatting issues detected
CREATE TABLE public.formatting_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.resume_analyses(id) ON DELETE CASCADE,
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
    suggestion TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User feedback and ratings
CREATE TABLE public.analysis_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID REFERENCES public.resume_analyses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback_text TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. STORAGE BUCKETS FOR RESUME FILES

-- Private bucket for resume files (PRIVATE: user documents)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'resumes',
    'resumes',
    false,
    10485760, -- 10MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- 4. INDEXES
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_job_postings_user_id ON public.job_postings(user_id);
CREATE INDEX idx_job_postings_created_at ON public.job_postings(created_at DESC);
CREATE INDEX idx_resume_analyses_user_id ON public.resume_analyses(user_id);
CREATE INDEX idx_resume_analyses_status ON public.resume_analyses(analysis_status);
CREATE INDEX idx_resume_analyses_created_at ON public.resume_analyses(created_at DESC);
CREATE INDEX idx_skills_analysis_analysis_id ON public.skills_analysis(analysis_id);
CREATE INDEX idx_keyword_analysis_analysis_id ON public.keyword_analysis(analysis_id);
CREATE INDEX idx_formatting_issues_analysis_id ON public.formatting_issues(analysis_id);
CREATE INDEX idx_analysis_feedback_analysis_id ON public.analysis_feedback(analysis_id);

-- 5. FUNCTIONS (MUST BE BEFORE RLS POLICIES)

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $func$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$func$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $func$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'basic')::public.user_role
  );
  RETURN NEW;
END;
$func$;

-- Function to calculate overall analysis score
CREATE OR REPLACE FUNCTION public.calculate_analysis_score(analysis_uuid UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $func$
SELECT CASE 
    WHEN COUNT(*) = 0 THEN 0
    ELSE ROUND(
        (COUNT(*) FILTER (WHERE sa.is_present = true AND sa.is_required = true) * 100.0 / 
         NULLIF(COUNT(*) FILTER (WHERE sa.is_required = true), 0)) +
        (COUNT(*) FILTER (WHERE sa.is_present = true AND sa.is_required = false) * 10.0 / 
         NULLIF(COUNT(*), 0))
    )::INTEGER
END
FROM public.skills_analysis sa
WHERE sa.analysis_id = analysis_uuid;
$func$;

-- 6. TRIGGERS
CREATE TRIGGER handle_updated_at_user_profiles
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_resume_analyses
    BEFORE UPDATE ON public.resume_analyses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. ENABLE RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formatting_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_feedback ENABLE ROW LEVEL SECURITY;

-- 8. RLS POLICIES (Following Pattern System)

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for job_postings
CREATE POLICY "users_manage_own_job_postings"
ON public.job_postings
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 2: Simple user ownership for resume_analyses
CREATE POLICY "users_manage_own_resume_analyses"
ON public.resume_analyses
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Pattern 7: Complex relationship - Skills analysis access through analysis ownership
CREATE OR REPLACE FUNCTION public.can_access_analysis_data(analysis_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $func$
SELECT EXISTS (
    SELECT 1 FROM public.resume_analyses ra
    WHERE ra.id = analysis_uuid AND ra.user_id = auth.uid()
)
$func$;

CREATE POLICY "users_access_own_analysis_skills"
ON public.skills_analysis
FOR ALL
TO authenticated
USING (public.can_access_analysis_data(analysis_id))
WITH CHECK (public.can_access_analysis_data(analysis_id));

CREATE POLICY "users_access_own_analysis_keywords"
ON public.keyword_analysis
FOR ALL
TO authenticated
USING (public.can_access_analysis_data(analysis_id))
WITH CHECK (public.can_access_analysis_data(analysis_id));

CREATE POLICY "users_access_own_analysis_formatting"
ON public.formatting_issues
FOR ALL
TO authenticated
USING (public.can_access_analysis_data(analysis_id))
WITH CHECK (public.can_access_analysis_data(analysis_id));

CREATE POLICY "users_access_own_analysis_feedback"
ON public.analysis_feedback
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 9. STORAGE RLS POLICIES

-- Pattern 1: Private user storage for resumes
CREATE POLICY "users_view_own_resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND owner = auth.uid());

CREATE POLICY "users_upload_own_resumes" 
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'resumes' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "users_update_own_resumes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'resumes' AND owner = auth.uid())
WITH CHECK (bucket_id = 'resumes' AND owner = auth.uid());

CREATE POLICY "users_delete_own_resumes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'resumes' AND owner = auth.uid());

-- 10. COMPLETE MOCK DATA
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    job_posting_uuid UUID := gen_random_uuid();
    analysis_uuid UUID := gen_random_uuid();
BEGIN
    -- Create complete auth.users records for authentication
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@resumematch.pro', crypt('Admin123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john@example.com', crypt('User123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Smith", "role": "premium"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create job posting
    INSERT INTO public.job_postings (id, user_id, title, company, description, requirements, location, salary_range) VALUES
        (job_posting_uuid, user_uuid, 'Senior React Developer', 'TechCorp Inc', 
         'We are seeking an experienced React developer to join our dynamic team. You will be responsible for developing user interface components and implementing them following well-known React.js workflows.',
         'Bachelor''s degree in Computer Science or related field. 5+ years of experience with React.js, Redux, JavaScript ES6+, HTML5, CSS3, RESTful APIs.',
         'San Francisco, CA', '$120,000 - $160,000');

    -- Create resume analysis
    INSERT INTO public.resume_analyses (id, user_id, job_posting_id, job_title, company, overall_score, analysis_status, analysis_results, suggestions) VALUES
        (analysis_uuid, user_uuid, job_posting_uuid, 'Senior React Developer', 'TechCorp Inc', 72, 'completed'::public.analysis_status,
         '{"keywords_matched": 8, "keywords_total": 12, "ats_score": 75, "formatting_score": 80, "sections_present": ["experience", "education", "skills"], "missing_sections": ["certifications"]}'::jsonb,
         '{"improve_keywords": ["Add more React-specific terminology", "Include Redux experience"], "formatting": ["Use consistent bullet points", "Add more white space"], "content": ["Quantify achievements with numbers", "Add relevant certifications"]}'::jsonb);

    -- Create skills analysis data
    INSERT INTO public.skills_analysis (analysis_id, skill_name, is_present, is_required, match_level, suggestions) VALUES
        (analysis_uuid, 'React.js', true, true, 'excellent'::public.match_level, 'Great match - prominently featured'),
        (analysis_uuid, 'Redux', true, true, 'good'::public.match_level, 'Mentioned but could elaborate more'),
        (analysis_uuid, 'JavaScript ES6+', true, true, 'excellent'::public.match_level, 'Well demonstrated in projects'),
        (analysis_uuid, 'TypeScript', false, true, 'poor'::public.match_level, 'Consider adding TypeScript experience'),
        (analysis_uuid, 'Node.js', true, false, 'good'::public.match_level, 'Nice additional skill'),
        (analysis_uuid, 'GraphQL', false, false, 'poor'::public.match_level, 'Would be a plus to add'),
        (analysis_uuid, 'AWS', true, false, 'fair'::public.match_level, 'Good cloud experience');

    -- Create keyword analysis data
    INSERT INTO public.keyword_analysis (analysis_id, keyword, frequency_in_resume, frequency_in_job, importance_score) VALUES
        (analysis_uuid, 'React', 12, 15, 10),
        (analysis_uuid, 'JavaScript', 8, 10, 9),
        (analysis_uuid, 'Redux', 3, 5, 8),
        (analysis_uuid, 'Component', 15, 8, 7),
        (analysis_uuid, 'API', 6, 4, 6),
        (analysis_uuid, 'Frontend', 4, 6, 7),
        (analysis_uuid, 'TypeScript', 0, 3, 8),
        (analysis_uuid, 'Testing', 2, 4, 6);

    -- Create formatting issues
    INSERT INTO public.formatting_issues (analysis_id, issue_type, description, severity, suggestion) VALUES
        (analysis_uuid, 'Inconsistent Formatting', 'Mixed bullet point styles throughout resume', 'medium', 'Use consistent bullet points (• or -) throughout all sections'),
        (analysis_uuid, 'Date Format', 'Inconsistent date formats in experience section', 'low', 'Use consistent date format like "Jan 2020 - Present"'),
        (analysis_uuid, 'Section Headers', 'Some section headers are not properly formatted', 'medium', 'Make all section headers bold and consistent in size');

    -- Create sample feedback
    INSERT INTO public.analysis_feedback (analysis_id, user_id, rating, feedback_text) VALUES
        (analysis_uuid, user_uuid, 4, 'Very helpful analysis! The keyword suggestions were spot on.');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 11. CLEANUP FUNCTION FOR DEVELOPMENT
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email IN ('admin@resumematch.pro', 'john@example.com');

    -- Delete in dependency order (children first, then auth.users last)
    DELETE FROM public.analysis_feedback WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.formatting_issues WHERE analysis_id IN (SELECT id FROM public.resume_analyses WHERE user_id = ANY(auth_user_ids_to_delete));
    DELETE FROM public.keyword_analysis WHERE analysis_id IN (SELECT id FROM public.resume_analyses WHERE user_id = ANY(auth_user_ids_to_delete));
    DELETE FROM public.skills_analysis WHERE analysis_id IN (SELECT id FROM public.resume_analyses WHERE user_id = ANY(auth_user_ids_to_delete));
    DELETE FROM public.resume_analyses WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.job_postings WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last (after all references are removed)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

    RAISE NOTICE 'Test data cleanup completed successfully';
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$func$;