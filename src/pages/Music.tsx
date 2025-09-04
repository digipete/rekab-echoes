import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Search, Filter, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Track {
  id: string;
  title: string;
  artist: string;
  year: number;
  duration: string;
  genre: string;
  description: string;
  file_path: string;
  file_size: number;
}

const Music = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const { data, error } = await supabase
        .from('music_tracks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTracks(data || []);
      
      // Extract unique genres
      const uniqueGenres = [...new Set(data?.map(track => track.genre).filter(Boolean))];
      setGenres(['All', ...uniqueGenres]);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      toast({
        title: "Error",
        description: "Failed to load music tracks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an audio file
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an audio file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to storage
      const fileName = `music/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('ReKaB')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get basic metadata from filename (you can enhance this)
      const title = file.name.replace(/\.[^/.]+$/, "");
      
      // Insert track metadata into database
      const { error: dbError } = await supabase
        .from('music_tracks')
        .insert({
          title,
          artist: "James Baker",
          file_path: fileName,
          file_size: file.size,
          duration: "0:00", // You can implement audio duration detection
          genre: "Uploaded",
          description: "Uploaded track",
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Music track uploaded successfully",
      });

      // Refresh tracks
      fetchTracks();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload music track",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const getAudioUrl = (filePath: string) => {
    const { data } = supabase.storage.from('ReKaB').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlayPause = (trackId: string) => {
    setIsPlaying(isPlaying === trackId ? null : trackId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
              Music Library
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore James Baker's musical journey through his diverse collection of compositions,
              spanning multiple genres and years of creative expression.
            </p>
          </div>

          {/* Bandcamp Albums Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary mb-6 text-center">
              Albums on Bandcamp
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Controlling Science */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  style={{border: 0, width: '100%', height: '152px'}} 
                  src="https://bandcamp.com/EmbeddedPlayer/album=3046928857/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=false/" 
                  seamless
                >
                  <a href="https://rekab.bandcamp.com/album/controlling-science">Controlling Science by ReKaB</a>
                </iframe>
              </div>
              
              {/* Lost In Wires */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  style={{border: 0, width: '100%', height: '152px'}} 
                  src="https://bandcamp.com/EmbeddedPlayer/album=2913723955/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=false/" 
                  seamless
                >
                  <a href="https://rekab.bandcamp.com/album/lost-in-wires">Lost In Wires by ReKaB</a>
                </iframe>
              </div>

              {/* My Reflections */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  style={{border: 0, width: '100%', height: '152px'}} 
                  src="https://bandcamp.com/EmbeddedPlayer/album=649044446/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=false/" 
                  seamless
                >
                  <a href="https://rekab.bandcamp.com/album/my-reflections">My Reflections by ReKaB</a>
                </iframe>
              </div>

              {/* Subtle Beginnings */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  style={{border: 0, width: '100%', height: '152px'}} 
                  src="https://bandcamp.com/EmbeddedPlayer/album=1644218658/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=false/" 
                  seamless
                >
                  <a href="https://rekab.bandcamp.com/album/subtle-beginnings">Subtle Beginnings by ReKaB</a>
                </iframe>
              </div>

              {/* Arimat - Blank Spaces (Single) */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  style={{border: 0, width: '100%', height: '152px'}} 
                  src="https://bandcamp.com/EmbeddedPlayer/track=2699833906/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=false/" 
                  seamless
                >
                  <a href="https://rekab.bandcamp.com/track/arimat-blank-spaces">Arimat - Blank Spaces by Arimat</a>
                </iframe>
              </div>
            </div>
          </motion.div>

          {/* Search, Filters, and Upload */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tracks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGenre(genre)}
                    className="transition-gentle"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
              
              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <Button variant="outline" size="sm" disabled={uploading}>
                  <Upload className="w-4 h-4 mr-1" />
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading music tracks...</p>
            </div>
          ) : (
            <>
              {/* Tracks Grid */}
              <div className="grid gap-6">
                {filteredTracks.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="card-gradient shadow-soft hover:shadow-green transition-smooth">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4">
                          {/* Header Row */}
                          <div className="flex items-center gap-6">
                            {/* Track Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-display text-xl font-semibold text-primary mb-1 truncate">
                                    {track.title}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                                    {track.description}
                                  </p>
                                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span>{track.artist}</span>
                                    {track.year && (
                                      <>
                                        <span>•</span>
                                        <span>{track.year}</span>
                                      </>
                                    )}
                                    <span>•</span>
                                    <span>{track.duration}</span>
                                  </div>
                                </div>
                                
                                <div className="flex-shrink-0">
                                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                                    {track.genre}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Audio Player */}
                          {track.file_path && (
                            <audio 
                              controls 
                              className="w-full"
                              src={getAudioUrl(track.file_path)}
                              preload="metadata"
                            >
                              Your browser does not support the audio element.
                            </audio>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredTracks.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground text-lg">
                    {tracks.length === 0 
                      ? "No music tracks uploaded yet. Use the upload button to add tracks."
                      : "No tracks found matching your search criteria."
                    }
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Music;