-- Create RLS policies for gallery_images table to secure uploads
CREATE POLICY "Authenticated users can insert gallery images" 
ON public.gallery_images 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update their gallery images" 
ON public.gallery_images 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete gallery images" 
ON public.gallery_images 
FOR DELETE 
TO authenticated
USING (true);

-- Create storage policies for ReKaB bucket to secure file uploads
CREATE POLICY "Authenticated users can upload images to gallery folder" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'ReKaB' AND (storage.foldername(name))[1] = 'gallery');

CREATE POLICY "Authenticated users can view gallery images" 
ON storage.objects 
FOR SELECT 
TO authenticated
USING (bucket_id = 'ReKaB' AND (storage.foldername(name))[1] = 'gallery');

CREATE POLICY "Public can view gallery images" 
ON storage.objects 
FOR SELECT 
TO anon
USING (bucket_id = 'ReKaB' AND (storage.foldername(name))[1] = 'gallery');

CREATE POLICY "Authenticated users can update gallery images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'ReKaB' AND (storage.foldername(name))[1] = 'gallery');

CREATE POLICY "Authenticated users can delete gallery images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'ReKaB' AND (storage.foldername(name))[1] = 'gallery');