ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exercises_public_data"
ON public.exercises
FOR SELECT USING (
  true
);