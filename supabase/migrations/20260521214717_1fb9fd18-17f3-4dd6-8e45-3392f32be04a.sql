
-- Plan enum
CREATE TYPE public.plan_type AS ENUM ('free', 'one_time', 'monthly');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  plan public.plan_type NOT NULL DEFAULT 'free',
  consults_this_month INT NOT NULL DEFAULT 0,
  consult_period_start TIMESTAMPTZ NOT NULL DEFAULT date_trunc('month', now()),
  biometric_enabled BOOLEAN NOT NULL DEFAULT false,
  one_time_used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Consultations
CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_type TEXT NOT NULL DEFAULT 'other',
  symptoms TEXT,
  ai_response TEXT,
  has_image BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "consultations_select_own" ON public.consultations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "consultations_insert_own" ON public.consultations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "consultations_delete_own" ON public.consultations FOR DELETE USING (auth.uid() = user_id);

-- Game scores
CREATE TABLE public.game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  mode TEXT NOT NULL DEFAULT 'match',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "scores_select_own" ON public.game_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "scores_insert_own" ON public.game_scores FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Helper to reset & increment monthly consult counter
CREATE OR REPLACE FUNCTION public.consume_consult(p_user UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  prof public.profiles%ROWTYPE;
  cap INT;
BEGIN
  SELECT * INTO prof FROM public.profiles WHERE id = p_user FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('allowed', false, 'reason', 'no_profile');
  END IF;

  -- reset window if we crossed into a new month
  IF date_trunc('month', now()) > prof.consult_period_start THEN
    UPDATE public.profiles
      SET consults_this_month = 0,
          consult_period_start = date_trunc('month', now())
      WHERE id = p_user;
    prof.consults_this_month := 0;
  END IF;

  IF prof.plan = 'monthly' THEN
    cap := 5;
    IF prof.consults_this_month >= cap THEN
      RETURN jsonb_build_object('allowed', false, 'reason', 'cap_reached', 'cap', cap);
    END IF;
    UPDATE public.profiles SET consults_this_month = consults_this_month + 1 WHERE id = p_user;
    RETURN jsonb_build_object('allowed', true, 'remaining', cap - (prof.consults_this_month + 1));
  ELSIF prof.plan = 'one_time' THEN
    IF prof.one_time_used THEN
      RETURN jsonb_build_object('allowed', false, 'reason', 'one_time_used');
    END IF;
    UPDATE public.profiles SET one_time_used = true WHERE id = p_user;
    RETURN jsonb_build_object('allowed', true, 'remaining', 0);
  ELSE
    -- free plan: 1 trial consult per month
    cap := 1;
    IF prof.consults_this_month >= cap THEN
      RETURN jsonb_build_object('allowed', false, 'reason', 'free_limit', 'cap', cap);
    END IF;
    UPDATE public.profiles SET consults_this_month = consults_this_month + 1 WHERE id = p_user;
    RETURN jsonb_build_object('allowed', true, 'remaining', cap - (prof.consults_this_month + 1));
  END IF;
END;
$$;
