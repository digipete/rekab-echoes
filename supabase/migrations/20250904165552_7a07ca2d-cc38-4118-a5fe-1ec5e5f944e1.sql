-- Create tributes table
CREATE TABLE public.tributes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tributes ENABLE ROW LEVEL SECURITY;

-- Policy: Only approved tributes are publicly viewable
CREATE POLICY "Approved tributes are publicly viewable" 
ON public.tributes 
FOR SELECT 
USING (approved = true);

-- Policy: Anyone can submit tributes (they start unapproved)
CREATE POLICY "Anyone can submit tributes" 
ON public.tributes 
FOR INSERT 
WITH CHECK (approved = false);

-- Policy: Only admins can manage all tributes
CREATE POLICY "Only admins can manage tributes" 
ON public.tributes 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tributes_updated_at
BEFORE UPDATE ON public.tributes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();