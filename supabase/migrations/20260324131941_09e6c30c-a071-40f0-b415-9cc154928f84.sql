
CREATE TABLE public.profile_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profile_data ENABLE ROW LEVEL SECURITY;

-- Anyone can read profile data (public portfolio)
CREATE POLICY "Anyone can read profile data"
  ON public.profile_data FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can update profile data
CREATE POLICY "Authenticated users can update profile data"
  ON public.profile_data FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can insert profile data
CREATE POLICY "Authenticated users can insert profile data"
  ON public.profile_data FOR INSERT
  TO authenticated
  WITH CHECK (true);
