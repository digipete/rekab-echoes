import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Search, Filter } from "lucide-react";

const Music = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  const genres = ["All", "Ambient", "Classical", "Electronic", "Folk", "Jazz"];
  
  const tracks = [
    {
      id: 1,
      title: "Morning Reflections",
      year: 2018,
      duration: "4:32",
      genre: "Ambient",
      description: "A gentle piece inspired by early morning tranquility"
    },
    {
      id: 2,
      title: "Echoes of Time",
      year: 2020,
      duration: "6:15",
      genre: "Classical",
      description: "An orchestral composition exploring themes of memory"
    },
    {
      id: 3,
      title: "Gentle Waves",
      year: 2019,
      duration: "3:48",
      genre: "Ambient",
      description: "Soothing sounds reminiscent of ocean waves"
    },
    {
      id: 4,
      title: "Digital Dreams",
      year: 2021,
      duration: "5:23",
      genre: "Electronic",
      description: "A synthesized journey through technological landscapes"
    },
    {
      id: 5,
      title: "Autumn Leaves",
      year: 2017,
      duration: "4:01",
      genre: "Folk",
      description: "Acoustic guitar piece capturing the essence of fall"
    },
    {
      id: 6,
      title: "Midnight Jazz",
      year: 2022,
      duration: "7:12",
      genre: "Jazz",
      description: "Smooth jazz improvisation recorded late at night"
    }
  ];

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlayPause = (trackId: number) => {
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

          {/* Search and Filters */}
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
            </div>
          </div>

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
                    <div className="flex items-center gap-6">
                      {/* Play Button */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex-shrink-0 w-12 h-12 rounded-full"
                        onClick={() => handlePlayPause(track.id)}
                      >
                        {isPlaying === track.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </Button>

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
                              <span>{track.year}</span>
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTracks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No tracks found matching your search criteria.
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
                  Audio Streaming Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Full audio streaming capabilities will be available once connected to Supabase, 
                  allowing you to upload, store, and stream James's complete musical collection.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Music;