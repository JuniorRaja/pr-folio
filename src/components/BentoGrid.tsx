import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Code, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import GridGlobe from "@/components/ui/GridGlobe";
import { useResponsive } from "@/hooks/use-responsive";

const BentoGrid = () => {
  const { toast } = useToast();
  const { isMobile, isTablet, isDesktop } = useResponsive();

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
        <div className={`grid gap-6 ${
          isMobile ? 'grid-cols-1' : 
          isTablet ? 'grid-cols-2' : 
          'grid-cols-4'
        }`}>
          {/* Tech Enthusiast Card - Large */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-2' : 
              'col-span-2'
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className={isMobile ? 'p-4' : 'p-8'}>
              <h3 className="text-2xl font-bold mb-4">
                Tech enthusiast with a passion for development.
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 bg-muted rounded h-3"></div>
              </div>
            </div>
          </Card>

          {/* Tech Stack Card */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-1' : 
              'col-span-1'
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className={`h-full flex flex-col ${isMobile ? 'p-4' : 'p-6'}`}>
              <p className="text-sm text-muted-foreground mb-2">
                Everyday is a learning day
              </p>
              <h3 className="text-xl font-bold mb-4">My Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-4 flex-1">
                {[
                  "Express",
                  ".NET",
                  "MS SQL",
                  "Typescript",
                  "Web API",
                  "AWS",
                ].map((tech, index) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Link
                to="/about#skills"
                className="text-primary text-sm hover:underline"
              >
                View All →
              </Link>
            </div>
          </Card>

          {/* Currently Building Card */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-1' : 
              'col-span-1'
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className={isMobile ? 'p-4' : 'p-6'}>
              <p className="text-sm text-primary font-medium mb-2">PR Verse</p>
              <h3 className="text-lg font-bold mb-4">
                Currently building this website. Stay tuned for more updates.
              </h3>
            </div>
          </Card>

          {/* Code Snippet Card */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-2' : 
              'col-span-2'
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg ${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex items-center justify-between mb-4">
                <Code className="h-5 w-5 text-green-400" />
                <Badge variant="outline" className="text-xs">
                  JavaScript
                </Badge>
              </div>
              <pre className="text-sm text-green-400 font-mono">
                {codeSnippet}
              </pre>
            </div>
          </Card>

          {/* Collaboration Card - Large */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up bg-gradient-to-br from-purple-500/10 to-pink-500/10 ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-2' : 
              'col-span-2'
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className={isMobile ? 'p-4' : 'p-8'}>
              <p className="text-sm text-muted-foreground mb-4">
                Let's Collaborate
              </p>
              <h3 className="text-2xl font-bold mb-6">
                Do you want to start a project together?
              </h3>
              <Button onClick={handleCopyEmail} className="hover-lift">
                <Copy className="h-4 w-4 mr-2" />
                Copy my email address
              </Button>
            </div>
          </Card>

          {/* Photography Card */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up overflow-hidden ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-2' : 
              'col-span-2'
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className={isMobile ? 'p-4' : 'p-6'}>
              <p className="text-sm text-muted-foreground mb-2">Photography</p>
              <h3 className="text-xl font-bold mb-4">
                See the world through my eyes. Go through the gallery
              </h3>

              {/* Image Grid Preview */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded opacity-80"></div>
                <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded opacity-80"></div>
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 rounded opacity-80"></div>
                <div className="aspect-square bg-gradient-to-br from-orange-400 to-orange-600 rounded opacity-80"></div>
                <div className="aspect-square bg-gradient-to-br from-pink-400 to-pink-600 rounded opacity-80"></div>
                <div className="aspect-square bg-gradient-to-br from-yellow-400 to-yellow-600 rounded opacity-80 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                    +15
                  </div>
                </div>
              </div>

              <Link
                to="/gallery"
                className="text-primary text-sm hover:underline inline-flex items-center"
              >
                View Gallery →
              </Link>
            </div>
          </Card>

          {/* Travel Card */}
          <Card
            className={`glass-card hover-lift animate-fade-in-up ${
              isMobile ? 'col-span-1' : 
              isTablet ? 'col-span-2' : 
              'col-span-2'
            }`}
            style={{ animationDelay: "0.7s" }}
          >
            <div className={`h-full flex flex-col justify-between ${isMobile ? 'p-4' : 'p-6'}`}>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Travel & Explore
                </p>
                {/* Around the world in 80 clicks */}
                {/* Nice pun but cliche */}
                <h3 className="text-lg font-bold mb-4">
                  Places I have been to. 
                </h3>
              </div>

              {/* Map Pin Graphic */}
              <div className="flex items-center justify-center py-6">
                <div className="relative w-full">
                  <GridGlobe UsedAt="Grid" />
                </div>
              </div>

              <Link
                to="/about#travel"
                className="text-primary text-sm hover:underline inline-flex items-center"
              >
                My travel diaries →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
