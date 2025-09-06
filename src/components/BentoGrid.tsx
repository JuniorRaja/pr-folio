import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Code, MapPin, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const BentoGrid = () => {
  const { toast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@yourname.com");
    toast({
      title: "Email copied!",
      description: "Email address has been copied to clipboard",
    });
  };

  const techStack = ["Express", "TypeScript", "MS SQL", "Web API", "AWS"];
  
  const codeSnippet = `// Importing a single module
import module1 from 
'modulePath';

// Importing multiple modules
import { module1, module2 } from
'modulePath';`;

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Tech Enthusiast Card */}
          <Card className="glass-card hover-lift p-6 md:col-span-1 lg:col-span-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Tech enthusiast with a passion for development.
                </h3>
              </div>
              <div className="w-16 h-8 bg-muted rounded flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <div className="h-2 bg-primary/20 rounded mb-2"></div>
              <div className="h-2 bg-primary/10 rounded w-3/4"></div>
            </div>
          </Card>

          {/* Tech Stack Card */}
          <Card className="glass-card hover-lift p-6 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Everyday is a learning day</p>
              <h3 className="text-lg font-bold gradient-text">My Tech Stack</h3>
            </div>
            <div className="space-y-2">
              {techStack.map((tech, index) => (
                <Badge 
                  key={tech} 
                  variant="outline" 
                  className="mr-2 border-primary/20 hover:border-primary/50 text-xs"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <Link to="/about">
              <Button variant="link" className="p-0 h-auto mt-4 text-primary">
                View Full Stack →
              </Button>
            </Link>
          </Card>

          {/* Currently Building Card */}
          <Card className="glass-card hover-lift p-6 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="mb-4">
              <p className="text-sm text-primary mb-2">PR Verse</p>
              <h3 className="text-lg font-bold mb-2">
                Currently building this website. Stay tuned for more updates.
              </h3>
            </div>
          </Card>

          {/* Code Snippet Card */}
          <Card className="glass-card hover-lift p-6 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Code className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="border-primary/20">JavaScript</Badge>
            </div>
            <pre className="text-xs text-muted-foreground font-mono bg-muted/20 p-3 rounded overflow-hidden">
              <code>{codeSnippet}</code>
            </pre>
          </Card>

          {/* Collaboration Card */}
          <Card className="glass-card hover-lift p-6 md:col-span-1 lg:col-span-2 border-primary/10 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-primary/10 to-purple-500/5">
            <div className="mb-6">
              <h3 className="text-xl font-bold gradient-text mb-2">
                Let's Collaborate
              </h3>
              <p className="text-lg font-semibold mb-2">
                Do you want to start a project together?
              </p>
              <p className="text-muted-foreground text-sm">
                I'm always excited to work on innovative ideas and bring creative projects to life.
              </p>
            </div>
            <Button 
              onClick={handleCopyEmail}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy my email address
            </Button>
          </Card>

          {/* Photography Card */}
          <Card className="glass-card hover-lift p-6 md:col-span-2 lg:col-span-2 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Photography</p>
                <h3 className="text-lg font-bold mb-2">
                  See the world through my eyes. Go through the gallery
                </h3>
              </div>
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="aspect-square bg-muted/30 rounded overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" 
                  alt="Gallery preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-muted/30 rounded overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=200&h=200&fit=crop" 
                  alt="Gallery preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-muted/30 rounded overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop" 
                  alt="Gallery preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <Link to="/gallery">
              <Button variant="outline" className="w-full border-primary/20 hover:border-primary/50">
                Explore Gallery
              </Button>
            </Link>
          </Card>

          {/* Travel Card */}
          <Card className="glass-card hover-lift p-6 border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Travel & Explore</p>
                <h3 className="text-lg font-bold mb-2">
                  Places I have been to. My travel diaries
                </h3>
              </div>
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="relative h-24 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            <Link to="/contact">
              <Button variant="link" className="p-0 h-auto text-primary">
                View on Globe →
              </Button>
            </Link>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;