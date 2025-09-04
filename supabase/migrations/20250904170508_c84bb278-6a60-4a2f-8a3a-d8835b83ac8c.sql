-- Re-enable RLS
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can submit unapproved tributes" ON public.tributes;
DROP POLICY IF EXISTS "Approved tributes are publicly viewable" ON public.tributes;
DROP POLICY IF EXISTS "Only admins can update tributes" ON public.tributes;
DROP POLICY IF EXISTS "Only admins can delete tributes" ON public.tributes;

-- Create new simplified policies
CREATE POLICY "Allow anonymous tribute submission" 
ON public.tributes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view approved tributes" 
ON public.tributes 
FOR SELECT 
USING (approved = true);

CREATE POLICY "Admins can update tributes" 
ON public.tributes 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tributes" 
ON public.tributes 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));