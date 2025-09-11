import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useUserRole } from "@/hooks/useUserRole";
import { MusicUploadForm } from "@/components/MusicUploadForm";

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

interface MixcloudTrack {
  key: string;
  url: string;
  name: string;
  tags: Array<{ name: string }>;
  created_time: string;
  play_count: number;
  pictures: {
    medium: string;
  };
  user: {
    name: string;
  };
}

const Music = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mixcloudTracks, setMixcloudTracks] = useState<MixcloudTrack[]>([]);
  const [mixcloudLoading, setMixcloudLoading] = useState(true);
  const { toast } = useToast();
  const { isAdmin } = useUserRole();

  useEffect(() => {
    fetchTracks();
    fetchMixcloudTracks();
  }, []);

  const fetchMixcloudTracks = async () => {
    try {
      const response = await fetch('https://api.mixcloud.com/jazzybaker/cloudcasts/?limit=50');
      const data = await response.json();
      setMixcloudTracks(data.data || []);
    } catch (error) {
      console.error('Error fetching Mixcloud tracks:', error);
      toast({
        title: "Warning",
        description: "Could not load Mixcloud tracks",
        variant: "destructive",
      });
    } finally {
      setMixcloudLoading(false);
    }
  };

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
            <div className="grid sm:grid-cols-2 gap-6">
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

               {/* Darren NYE - Tribute */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  style={{border: 0, width: '100%', height: '120px'}} 
                  src="https://bandcamp.com/EmbeddedPlayer/track=3359675634/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" 
                  seamless
                >
                  <a href="https://spacetime.bandcamp.com/track/a-tribute-to-james-baker">A Tribute To James Baker by Darren Nye</a>
                </iframe>
              </div>
              
            </div>
          </motion.div>

          {/* More from Bandcamp Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary mb-8 text-center">
              More from Bandcamp
            </h2>
            
            {/* Diverse Pathways */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                Diverse Pathways by ReKaB (Plus Remixers)
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2812808196/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=3347684951/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=1048715701/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2459647598/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=150080308/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=861887262/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2697467178/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=1620873354/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2055736489/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=833577520/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=3182348747/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=1674856349/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=1442762289/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=198207606/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2661446757/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2970564903/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=177863259/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=1985220638/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2789871082/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=1025150245/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2438356727/size=small/bgcol=ffffff/linkcol=0687f5/track=2477031130/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* M.R.E. / ReKaB - Ace High EP */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                M.R.E. / ReKaB - Ace High EP
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=627872773/size=small/bgcol=ffffff/linkcol=0687f5/track=1306216530/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=627872773/size=small/bgcol=ffffff/linkcol=0687f5/track=2800572508/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=627872773/size=small/bgcol=ffffff/linkcol=0687f5/track=437747276/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=627872773/size=small/bgcol=ffffff/linkcol=0687f5/track=4227862223/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* ReKaB - Total Control EP + Sound Synthesis */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                ReKaB - Total Control EP + Sound Synthesis
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2236861982/size=small/bgcol=ffffff/linkcol=0687f5/track=3531695183/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2236861982/size=small/bgcol=ffffff/linkcol=0687f5/track=3592206257/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2236861982/size=small/bgcol=ffffff/linkcol=0687f5/track=2290062082/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2236861982/size=small/bgcol=ffffff/linkcol=0687f5/track=2545565275/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2236861982/size=small/bgcol=ffffff/linkcol=0687f5/track=1772525092/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* ReKaB, Convextion - Concept */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                ReKaB, Convextion - Concept
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1873700697/size=small/bgcol=ffffff/linkcol=0687f5/track=3644212815/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1873700697/size=small/bgcol=ffffff/linkcol=0687f5/track=1345109113/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1873700697/size=small/bgcol=ffffff/linkcol=0687f5/track=1862874527/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1873700697/size=small/bgcol=ffffff/linkcol=0687f5/track=3109683055/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* Brexit Jazz (ReKaB Remix) */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                Brexit Jazz (ReKaB Remix)
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1323583013/size=small/bgcol=ffffff/linkcol=0687f5/track=1993226675/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* CYBORG ROMANCE */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                CYBORG ROMANCE
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=3787515070/size=small/bgcol=ffffff/linkcol=0687f5/track=3737465680/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=3787515070/size=small/bgcol=ffffff/linkcol=0687f5/track=1016274559/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=3787515070/size=small/bgcol=ffffff/linkcol=0687f5/track=2687912041/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=3787515070/size=small/bgcol=ffffff/linkcol=0687f5/track=850265248/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* ReKaB - Random Fragments EP */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                ReKaB - Random Fragments EP
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=509740485/size=small/bgcol=ffffff/linkcol=0687f5/track=167876617/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=509740485/size=small/bgcol=ffffff/linkcol=0687f5/track=1742410753/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=509740485/size=small/bgcol=ffffff/linkcol=0687f5/track=238656552/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=509740485/size=small/bgcol=ffffff/linkcol=0687f5/track=3036306421/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* My Future and my Past EP */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                My Future and my Past EP
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1201856121/size=small/bgcol=ffffff/linkcol=0687f5/track=929904011/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1201856121/size=small/bgcol=ffffff/linkcol=0687f5/track=2710473711/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1201856121/size=small/bgcol=ffffff/linkcol=0687f5/track=1950718977/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=1201856121/size=small/bgcol=ffffff/linkcol=0687f5/track=87434811/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>

            {/* What Is Our Future? */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-semibold text-primary mb-4">
                What Is Our Future?
              </h3>
              <div className="grid gap-2">
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2032005253/size=small/bgcol=ffffff/linkcol=0687f5/track=251719471/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2032005253/size=small/bgcol=ffffff/linkcol=0687f5/track=626698028/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2032005253/size=small/bgcol=ffffff/linkcol=0687f5/track=3876729723/transparent=true/" seamless></iframe>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-soft p-2">
                  <iframe style={{border: 0, width: '100%', height: '42px'}} src="https://bandcamp.com/EmbeddedPlayer/album=2032005253/size=small/bgcol=ffffff/linkcol=0687f5/track=4189014033/transparent=true/" seamless></iframe>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mixcloud Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary mb-6 text-center">
              Music on Mixcloud
            </h2>
            
            {mixcloudLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading Mixcloud tracks...</p>
              </div>
            ) : mixcloudTracks.length > 0 ? (
              <div className="grid gap-6">
                {mixcloudTracks.map((track, index) => (
                  <motion.div
                    key={track.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card rounded-lg overflow-hidden shadow-soft"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg font-semibold text-primary mb-2 truncate">
                            {track.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                            <span>{new Date(track.created_time).getFullYear()}</span>
                            <span>•</span>
                            <span>{track.play_count} plays</span>
                            {track.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <span>{track.tags[0].name}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <iframe
                        width="100%"
                        height="120"
                        src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=${encodeURIComponent(track.key)}`}
                        frameBorder="0"
                        title={track.name}
                        className="rounded"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No Mixcloud tracks found</p>
              </div>
            )}
            
            <div className="text-center mt-6">
              <a 
                href="https://www.mixcloud.com/jazzybaker/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors"
              >
                View Full Profile on Mixcloud
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* SoundCloud Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary mb-6 text-center">
              Music from SoundCloud
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/184161115&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/183728492&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/178550101&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/139246587&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/135318876&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/135314900&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/135314091&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/135313157&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/135311880&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/119975970&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/112646259&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/83115079&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/82189086&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/81617935&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/78287134&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/78279101&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>

              <div className="bg-card rounded-lg overflow-hidden shadow-soft">
                <iframe 
                  width="100%" 
                  height="300" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay" 
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/74004832&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <a 
                href="https://soundcloud.com/rekab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-foreground transition-colors"
              >
                View Full Profile on SoundCloud
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
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
              
              {/* Upload Button - Only for admin users */}
              {isAdmin && (
                <MusicUploadForm 
                  genres={genres} 
                  onUploadSuccess={fetchTracks}
                />
              )}
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
                               controlsList="nodownload"
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

        {/* Discogs Collection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary mb-8 text-center">
            Discogs Collection
          </h2>
          
          <div className="bg-card rounded-xl overflow-hidden shadow-soft border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">
                    ReKaB on Discogs
                  </h3>
                  <p className="text-muted-foreground">
                    Explore vinyl releases and collector items
                  </p>
                </div>
                <div className="text-4xl">
                  🎵
                </div>
              </div>
              
              
              <div className="flex justify-center">
                <a
                  href="https://www.discogs.com/search/?q=rekab+2&layout=med"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <span>View Full Collection</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Music;
