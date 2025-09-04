import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Heart, Image as ImageIcon, Calendar, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const jamesBakerPortrait = "/lovable-uploads/7d4eee25-01e9-44a4-8c4b-89d42abf6449.png";

const Home = () => {
  const { user } = useAuth();
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featuredTracks = [
    { title: "Lost In Wires", year: "2021", duration: "5:47" },
    { title: "Subtle Beginnings", year: "2020", duration: "7:23" },
    { title: "My Reflections", year: "2019", duration: "6:18" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden beatport-gradient text-primary-foreground py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Portrait */}
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <img 
                    src={jamesBakerPortrait}
                    alt="ReKaB - Electronic Music Artist"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-green"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>

              {/* Hero Content */}
              <motion.div 
                className="order-1 lg:order-2 text-center lg:text-left"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                <motion.h1 
                  className="font-display text-4xl lg:text-6xl font-bold mb-4"
                  variants={fadeInUp}
                >
                  <span className="block text-accent">ReKaB</span>
                  <span className="block text-2xl lg:text-3xl mt-2 opacity-90">Electronic Music Artist</span>
                </motion.h1>
                
                <motion.div 
                  className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-lg opacity-90"
                  variants={fadeInUp}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Bridport, UK</span>
                </motion.div>

                <motion.p 
                  className="text-lg lg:text-xl mb-8 leading-relaxed opacity-90 max-w-lg"
                  variants={fadeInUp}
                >
                  Creating ambient techno, soulful electro, and experimental electronic music through 
                  labels like Móatún 7, Yore Records, and Acquit Records.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  variants={fadeInUp}
                >
                  <Link to="/music">
                    <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Music className="w-5 h-5 mr-2" />
                      Listen to the Music
                    </Button>
                  </Link>
                  <a href="https://rekab.bandcamp.com/" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="border-foreground/20 text-foreground bg-background/10 hover:bg-foreground hover:text-background backdrop-blur-sm">
                      <Heart className="w-5 h-5 mr-2" />
                      Visit Bandcamp
                    </Button>
                  </a>
                  {!user && (
                    <Link to="/auth">
                      <Button size="lg" variant="outline" className="border-foreground/20 text-foreground bg-background/10 hover:bg-foreground hover:text-background backdrop-blur-sm">
                        <LogIn className="w-5 h-5 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
                Featured Works
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore ReKaB's electronic music catalog and creative journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Featured Tracks */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="card-gradient shadow-soft">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Music className="w-6 h-6 text-accent" />
                      <h3 className="font-display text-2xl font-semibold text-primary">
                        Featured Tracks
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {featuredTracks.map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                          <div>
                            <h4 className="font-medium text-foreground">{track.title}</h4>
                            <p className="text-sm text-muted-foreground">{track.year}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{track.duration}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/music" className="mt-6 block">
                      <Button variant="outline" className="w-full">
                        View All Music
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Featured Gallery */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="card-gradient shadow-soft">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-accent" />
                      <h3 className="font-display text-2xl font-semibold text-primary">
                        Memory Gallery
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i} 
                          className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                        >
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>

                    <Link to="/gallery" className="block">
                      <Button variant="outline" className="w-full">
                        View All Images
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;