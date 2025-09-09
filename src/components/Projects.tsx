import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "PR Verse",
      subtitle: "Personal Portfolio Website",
      description: "The site you are looking at right now. A Next.js Portfolio website with Tailwind CSS and modern animations.",
      image: "🌐",
      technologies: ["Next.js", "Tailwind", "Framer Motion", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "PR - Digital Resume",
      subtitle: "Interactive Resume Template",
      description: "Minimal and clean digital resume template built with HTML & CSS. Responsive design with print-friendly layout.",
      image: "📄",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live",
      category: "Design"
    },
    {
      title: "E-Commerce Dashboard",
      subtitle: "Admin Management System",
      description: "Full-stack admin dashboard for e-commerce management with real-time analytics, inventory tracking, and user management.",
      image: "📊",
      technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
      status: "In Progress",
      category: "Full Stack"
    },
    {
      title: "Travel Photography Gallery",
      subtitle: "Photo Showcase Platform",
      description: "A beautiful gallery showcasing travel photography with location mapping, EXIF data, and social sharing features.",
      image: "📸",
      technologies: ["Vue.js", "Firebase", "Mapbox", "PWA"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Coming Soon",
      category: "Photography"
    },
    {
      title: "Task Management App",
      subtitle: "Project Collaboration Tool",
      description: "Modern task management application with team collaboration, real-time updates, and project tracking capabilities.",
      image: "✅",
      technologies: ["React", "Express", "Socket.io", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "Weather Analytics",
      subtitle: "Climate Data Visualization",
      description: "Interactive weather data visualization dashboard with historical climate analysis and predictive modeling.",
      image: "🌤️",
      technologies: ["Python", "D3.js", "Flask", "Machine Learning"],
      liveUrl: "#",
      githubUrl: "#",
      status: "In Progress",
      category: "Data Science"
    }
  ];

  const categories = ["All", "Web Development", "Full Stack", "Design", "Photography", "Data Science"];

  return (
    <section id="projects" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Badge 
              key={category}
              variant="outline"
              className={`px-6 py-3 cursor-pointer transition-all hover-lift animate-fade-in ${
                index === 0 ? 'bg-primary text-primary-foreground border-primary' : 'hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="group overflow-hidden glass-card hover-lift border-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image/Icon */}
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-6xl relative overflow-hidden">
                {project.image}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={project.status === 'Live' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {project.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="flex-1 hover-lift"
                    disabled={project.status === 'Coming Soon'}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Check Live Site
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Learning Journey */}
        <div className="mt-20 text-center">
          <Card className="inline-block p-8 glass-card max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Photography
            </h3>
            <h4 className="text-xl gradient-text font-bold mb-4">
              See the world through my eyes. Go through the gallery
            </h4>
            <p className="text-muted-foreground mb-6">
              Beyond code and development, I capture the beauty of landscapes and moments. 
              Explore my photography journey and the places I've been to.
            </p>
            <Button className="hover-lift">
              View Gallery
            </Button>
          </Card>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl floating-animation" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl floating-animation" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Projects;