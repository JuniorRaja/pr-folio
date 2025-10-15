import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "PR verse",
      subtitle: "Personal Portfolio Website",
      description: "The site you are looking at right now. A Next.js Portfolio website with Tailwind CSS and TypeScript.",
      image: "🌐",
      technologies: ["Next.js", "Tailwind", "TypeScript", "Three.js", "Framer Motion"],
      liveUrl: "https://pr-dev-portfolio.netlify.app/",
      githubUrl: "https://github.com/JuniorRaja/pr_portfolio",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "PR - Digital Resume",
      subtitle: "Interactive Resume Template",
      description: "Minimal and clean digital resume template built with HTML & CSS",
      image: "📄",
      technologies: ["HTML5", "CSS", "JavaScript"],
      liveUrl: "https://juniorraja.github.io/pr-digital-resume/",
      githubUrl: "https://github.com/JuniorRaja/pr-digital-resume",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "Brainwave - AI Chat App",
      subtitle: "Modern AI Landing Page",
      description: "A modern landing page for a fictional AI Chat app, built with React, TypeScript, and Tailwind CSS.",
      image: "🤖",
      technologies: ["React", "Tailwind"],
      liveUrl: "https://chataibrainwave.netlify.app",
      githubUrl: "https://github.com/JuniorRaja/Brainwave-ReactJS",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "FinDashboard",
      subtitle: "Finance Data Visualization",
      description: "A finance dashboard that visualizes data and transactions.",
      image: "📊",
      technologies: ["HTML5", "CSS", "JavaScript"],
      liveUrl: "https://findashboardbypr.netlify.app/",
      githubUrl: "https://github.com/JuniorRaja/FinDashboard",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "Metaverse Landing Page",
      subtitle: "Modern Web Experience",
      description: "Modern landing page for a fictional Metaverse company, built with React, Framer Motion & Tailwind CSS.",
      image: "🌌",
      technologies: ["React", "Tailwind", "Framer Motion"],
      liveUrl: "https://prmetaversesite.netlify.app/",
      githubUrl: "https://github.com/JuniorRaja/FinDashboard",
      status: "Live",
      category: "Web Development"
    },
    {
      title: "Bank App Landing Page",
      subtitle: "Financial Services Website",
      description: "Modern landing page for a fictional Bank company, built with React and Tailwind CSS.",
      image: "🏦",
      technologies: ["React", "Tailwind", "Framer Motion"],
      liveUrl: "https://hoobank-web.netlify.app",
      githubUrl: "https://github.com/JuniorRaja/bankApp_reactJS",
      status: "Live",
      category: "Web Development"
    }
  ];

  const navigate = useNavigate()
  const categories = ["All", "Web Development"];

  return (
    <section id="projects" className="pb-20 lg:pb-32 relative">
      <div className="container mx-auto px-4">
        {/* TODO: Add Project Files - By Category */}
        {/* Category Filter */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
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
        </div> */}

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
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-150">
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
                    onClick={() => window.open(project.liveUrl, '_blank')}
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
            <Button className="hover-lift"
            onClick = {() => { navigate('/gallery') }}>
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