import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tribute {
  id: number;
  name: string;
  message: string;
  date: string;
}

const Tributes = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: ""
  });
  
  const { toast } = useToast();

  // Sample tributes
  const existingTributes: Tribute[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      message: "James's music carried me through the darkest times in my life. His piece 'Morning Reflections' was playing when I received some of the best news of my life. His art will forever be woven into my story.",
      date: "March 15, 2024"
    },
    {
      id: 2,
      name: "Dr. Robert Chen",
      message: "As a colleague in music therapy, I witnessed firsthand James's incredible ability to connect with patients through sound. His compassion and artistry created healing moments that words cannot capture.",
      date: "March 12, 2024"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      message: "I had the privilege of attending James's last live performance. The way he poured his soul into every note was breathtaking. Thank you for sharing your gift with the world, James. You are deeply missed.",
      date: "March 10, 2024"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and message are required to share a tribute.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would submit to Supabase
    toast({
      title: "Thank you for your tribute",
      description: "Your message has been submitted and will be reviewed before being published.",
    });

    setFormData({ name: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4">
              Tributes & Memories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your memories of James Baker and read how his music and spirit 
              touched the lives of others around the world.
            </p>
          </div>

          {/* Tribute Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="card-gradient shadow-soft">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-accent" />
                  <h2 className="font-display text-2xl font-semibold text-primary">
                    Share Your Memory
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Share your memories, how James's music touched your life, or a message for his family..."
                      className="w-full min-h-[120px] resize-y"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Share Tribute
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground mt-4 text-center">
                  All tributes are reviewed before being published to ensure a respectful memorial space.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Existing Tributes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-2xl font-semibold text-primary mb-8 text-center">
              Messages from the Community
            </h2>

            <div className="space-y-6">
              {existingTributes.map((tribute, index) => (
                <motion.div
                  key={tribute.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Card className="card-gradient shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-accent" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-medium text-primary">
                              {tribute.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{tribute.date}</span>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {tribute.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Note about Supabase integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Card className="card-gradient shadow-soft max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-primary mb-3">
                    Tribute Moderation & Storage
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Full tribute submission and moderation capabilities will be available 
                    once connected to Supabase, allowing secure storage and management of all memorial messages.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tributes;
