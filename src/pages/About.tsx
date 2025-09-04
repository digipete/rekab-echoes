import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Music, Heart, Award } from "lucide-react";
const jamesBakerPortrait = "/lovable-uploads/7d4eee25-01e9-44a4-8c4b-89d42abf6449.png";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const timeline = [
    {
      year: "1975",
      event: "Born in Portland, Oregon",
      description: "James enters the world during a vibrant era of musical innovation"
    },
    {
      year: "1993",
      event: "First Album Release",
      description: "Released his debut album 'Emerging Sounds' at age 18"
    },
    {
      year: "2000",
      event: "Adopted ReKaB Moniker",
      description: "Began performing and recording under the artistic name ReKaB"
    },
    {
      year: "2010",
      event: "Grammy Nomination",
      description: "Nominated for Best New Age Album for 'Temporal Landscapes'"
    },
    {
      year: "2018",
      event: "Major Retrospective",
      description: "Released '25 Years of Sound' career-spanning collection"
    },
    {
      year: "2023",
      event: "Final Recording",
      description: "Completed his last studio album 'Eternal Echoes' shortly before passing"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Grammy Nominated",
      description: "Best New Age Album (2010)"
    },
    {
      icon: Music,
      title: "15 Studio Albums",
      description: "Spanning over 30 years"
    },
    {
      icon: Heart,
      title: "Charitable Work",
      description: "Music therapy programs"
    }
  ];

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
              About James Baker
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A life dedicated to musical expression and the exploration of sound as a 
              medium for emotional connection and healing.
            </p>
          </div>

          {/* Biography Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="relative">
                <img 
                  src={jamesBakerPortrait}
                  alt="James Baker (ReKaB)"
                  className="w-full rounded-2xl shadow-soft"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            <motion.div 
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                  The Artist Behind ReKaB
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  James Baker, known professionally as ReKaB, was a pioneering composer and sound artist 
                  whose work transcended traditional genre boundaries. Born in Portland, Oregon in 1975, 
                  James discovered his passion for music at an early age, finding solace and expression 
                  through sound during challenging times.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-muted-foreground leading-relaxed">
                  His artistic journey was marked by continuous experimentation with electronic and 
                  acoustic elements, creating atmospheric soundscapes that spoke to the human condition. 
                  The name "ReKaB" - his surname spelled backwards - represented his philosophy of 
                  looking at familiar things from new perspectives.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond his recording career, James was deeply committed to music therapy and worked 
                  with hospitals and care facilities, using his gift to bring comfort to those in need. 
                  His legacy lives on through his extensive catalog and the countless lives he touched 
                  through his compassionate approach to music.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-display text-3xl font-semibold text-primary text-center mb-8">
              Achievements & Recognition
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="card-gradient shadow-soft text-center">
                    <CardContent className="p-6">
                      <achievement.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                      <h3 className="font-display text-lg font-semibold text-primary mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {achievement.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-semibold text-primary text-center mb-12">
              Life Timeline
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-px" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full border-4 border-background md:transform md:-translate-x-1/2 z-10" />
                    
                    {/* Content */}
                    <div className={`flex-1 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}>
                      <Card className="card-gradient shadow-soft">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Calendar className="w-5 h-5 text-accent" />
                            <span className="font-display text-lg font-semibold text-accent">
                              {item.year}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-semibold text-primary mb-2">
                            {item.event}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;