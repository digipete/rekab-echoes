-- Drop all policies and start completely fresh
DROP POLICY IF EXISTS "Anyone can insert tributes" ON public.tributes;
DROP POLICY IF EXISTS "Public can view approved tributes" ON public.tributes;
DROP POLICY IF EXISTS "Admins can update tributes" ON public.tributes;
DROP POLICY IF EXISTS "Admins can delete tributes" ON public.tributes;

-- Create the most basic permissive policy for testing
CREATE POLICY "Enable all access for tributes" ON public.tributes AS PERMISSIVE FOR ALL TO public USING (true) WITH CHECK (true);