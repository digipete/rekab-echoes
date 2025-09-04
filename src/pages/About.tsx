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
      year: "2018",
      event: "First Release",
      description: "Debut release establishing the ReKaB sound signature"
    },
    {
      year: "2019",
      event: "My Reflections",
      description: "Sophomore release exploring introspective electronic themes"
    },
    {
      year: "2020",
      event: "Subtle Beginnings",
      description: "Ambient techno album released on independent label"
    },
    {
      year: "2021",
      event: "Lost In Wires",
      description: "Breakthrough release showcasing refined production techniques"
    },
    {
      year: "2022",
      event: "Label Partnerships",
      description: "Collaborations with Móatún 7, Yore Records, and Acquit Records"
    },
    {
      year: "2023",
      event: "Controlling Science",
      description: "Latest release pushing boundaries of experimental electronic music"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Label Releases",
      description: "Móatún 7, Yore Records, Acquit Records"
    },
    {
      icon: Music,
      title: "Genre Innovation",
      description: "Ambient Techno & Soulful Electro"
    },
    {
      icon: Heart,
      title: "UK Based",
      description: "Creating from Bridport, UK"
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
              About ReKaB
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An electronic music artist from Bridport, UK, creating ambient techno, 
              soulful electro, and experimental soundscapes.
            </p>
          </div>

          {/* Biography Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="relative">
                <img 
                  src={jamesBakerPortrait}
                  alt="ReKaB - Electronic Music Artist"
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
                  Electronic Music Pioneer
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  ReKaB is an innovative electronic music artist based in Bridport, UK, known for 
                  crafting immersive soundscapes that blend ambient techno with soulful electronica. 
                  Working with respected labels including Móatún 7, Yore Records, and Acquit Records, 
                  ReKaB has established a distinctive voice in the electronic music landscape.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-muted-foreground leading-relaxed">
                  The project explores the intersection of technological innovation and human emotion, 
                  creating atmospheric compositions that range from deep, meditative ambient pieces 
                  to driving techno rhythms. Each release showcases a meticulous attention to texture 
                  and space, building sonic environments that transport listeners to otherworldly realms.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-muted-foreground leading-relaxed">
                  With releases like "Lost In Wires," "Subtle Beginnings," and "Controlling Science," 
                  ReKaB continues to push boundaries within electronic music, combining analog warmth 
                  with digital precision to create works that are both intellectually engaging and 
                  deeply emotional.
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
              Releases & Recognition
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
              Release Timeline
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