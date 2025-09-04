import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, ZoomIn, Filter } from "lucide-react";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ["All", "Portraits", "Studio", "Live", "Nature", "Abstract"];
  
  const images = [
    {
      id: 1,
      title: "Studio Session 2020",
      category: "Studio",
      year: 2020,
      description: "James working on his album 'Echoes of Time'"
    },
    {
      id: 2,
      title: "Concert at Sunset",
      category: "Live",
      year: 2019,
      description: "Live performance at the Summer Music Festival"
    },
    {
      id: 3,
      title: "Reflective Moment",
      category: "Portraits",
      year: 2021,
      description: "A quiet moment of contemplation"
    },
    {
      id: 4,
      title: "Morning Light",
      category: "Nature",
      year: 2018,
      description: "Inspired by the natural world around his studio"
    },
    {
      id: 5,
      title: "Creative Process",
      category: "Studio",
      year: 2022,
      description: "Behind the scenes of music creation"
    },
    {
      id: 6,
      title: "Sound Waves",
      category: "Abstract",
      year: 2021,
      description: "Visual representation of music"
    },
    {
      id: 7,
      title: "Garden Path",
      category: "Nature",
      year: 2019,
      description: "The path where James often walked for inspiration"
    },
    {
      id: 8,
      title: "Final Portrait",
      category: "Portraits",
      year: 2023,
      description: "One of the last professional portraits taken"
    }
  ];

  const filteredImages = images.filter(image => 
    selectedCategory === "All" || image.category === selectedCategory
  );

  const handleImageClick = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

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

          {/* Category Filters */}
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
          </div>

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
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
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

          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No images found in this category.
              </p>
            </motion.div>
          )}

          {/* Note about Supabase integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Card className="card-gradient shadow-soft max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="font-display text-xl font-semibold text-primary mb-3">
                  Full Gallery Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  The complete image gallery with high-resolution photos will be available 
                  once connected to Supabase, with secure storage and fast loading.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
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
            className="relative bg-white rounded-lg overflow-hidden max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="p-6">
              {(() => {
                const image = images.find(img => img.id === selectedImage);
                return image ? (
                  <>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {image.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{image.year}</span>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        {image.category}
                      </Badge>
                    </div>
                  </>
                ) : null;
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;