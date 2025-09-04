-- Drop the current insert policy and recreate with explicit role targeting
DROP POLICY "Allow anonymous tribute submission" ON public.tributes;

-- Create policy that explicitly targets anon and authenticated roles
CREATE POLICY "Anyone can insert tributes" 
ON public.tributes 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);