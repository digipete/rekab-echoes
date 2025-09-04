-- Drop the current insert policy that requires authentication
DROP POLICY "Anyone can submit tributes" ON public.tributes;

-- Create a new policy that allows anonymous users to insert unapproved tributes
CREATE POLICY "Anyone can submit unapproved tributes" 
ON public.tributes 
FOR INSERT 
TO anon, authenticated
WITH CHECK (approved = false);