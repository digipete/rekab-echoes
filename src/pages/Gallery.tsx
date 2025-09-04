import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, ZoomIn, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { GalleryUploadForm } from "@/components/GalleryUploadForm";

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  year: number;
  description: string;
  file_path: string;
  file_size: number;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Handle authentication errors gracefully
        if (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('authentication')) {
          console.log('Authentication required to view gallery');
          setImages([]);
          setCategories(['All']);
          return;
        }
        throw error;
      }

      setImages(data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(img => img.category).filter(Boolean))];
      setCategories(['All', ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast({
        title: "Error",
        description: user ? "Failed to load gallery images" : "Please sign in to view the gallery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    fetchImages();
  };

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage.from('ReKaB').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const filteredImages = images.filter(image => 
    selectedCategory === "All" || image.category === selectedCategory
  );

  const handleImageClick = (imageId: string) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const selectedImageData = selectedImage ? images.find(img => img.id === selectedImage) : null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
              Memory Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A visual journey through James Baker's life, capturing moments of creativity,
              performance, and the world that inspired his music.
            </p>
          </div>

          {/* Category Filters and Upload */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-gentle"
              >
                {category}
              </Button>
            ))}
            
            {/* Upload Button - Only show for admin users */}
            {user && isAdmin && (
              <div className="ml-2">
                <GalleryUploadForm 
                  categories={categories} 
                  onUploadSuccess={handleUploadSuccess}
                />
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading gallery images...</p>
            </div>
          ) : (
            <>
              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card 
                      className="card-gradient shadow-soft hover:shadow-golden transition-smooth cursor-pointer overflow-hidden group"
                      onClick={() => handleImageClick(image.id)}
                    >
                      {/* Image */}
                      <div className="aspect-square bg-muted relative overflow-hidden">
                        {image.file_path ? (
                          <img
                            src={getImageUrl(image.file_path)}
                            alt={image.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-gentle" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-gentle">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-medium text-primary text-sm line-clamp-1">
                            {image.title}
                          </h3>
                          <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                            {image.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {image.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {image.year}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredImages.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground text-lg">
                    {images.length === 0 
                      ? user 
                        ? "No images uploaded yet. Use the upload button to add images."
                        : "Please sign in to view the gallery. This content requires authentication."
                      : "No images found in this category."
                    }
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && selectedImageData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-background rounded-lg overflow-hidden max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full Size Image */}
            <div className="max-h-[60vh] bg-muted flex items-center justify-center overflow-hidden">
              {selectedImageData.file_path ? (
                <img
                  src={getImageUrl(selectedImageData.file_path)}
                  alt={selectedImageData.title}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <ImageIcon className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            
            {/* Image Details */}
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-primary mb-2">
                {selectedImageData.title}
              </h3>
              <p className="text-muted-foreground mb-3">
                {selectedImageData.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{selectedImageData.year}</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {selectedImageData.category}
                </Badge>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;