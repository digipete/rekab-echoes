-- Add RLS policies for music_tracks table to allow admin operations
CREATE POLICY "Only admins can insert music tracks" 
ON public.music_tracks 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update music tracks" 
ON public.music_tracks 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete music tracks" 
ON public.music_tracks 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));