-- Drop the conflicting admin policy that blocks inserts
DROP POLICY "Only admins can manage tributes" ON public.tributes;

-- Create separate policies for UPDATE and DELETE that only admins can do
CREATE POLICY "Only admins can update tributes" 
ON public.tributes 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete tributes" 
ON public.tributes 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));