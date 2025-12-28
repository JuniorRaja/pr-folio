
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight, Filter, Code } from "lucide-react";
import { projectsData, getAllProjectTypes, getAllLanguages } from "@/data/projectsData";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [languageInput, setLanguageInput] = useState<string>("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const projectTypes = ["All", ...getAllProjectTypes()];
  const availableLanguages = getAllLanguages();

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const typeMatch = selectedType === "All" || project.type === selectedType;
      const languageMatch = !selectedLanguage || project.languages.includes(selectedLanguage);
      return typeMatch && languageMatch;
    });
  }, [selectedType, selectedLanguage]);

  const filteredLanguageSuggestions = useMemo(() => {
    if (!languageInput) return [];
    return availableLanguages.filter(lang =>
      lang.toLowerCase().includes(languageInput.toLowerCase())
    );
  }, [languageInput]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="projects" className="pb-20 lg:pb-32 relative">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end gap-4">
          {/* Type Filter */}
          <div className="flex-1">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Filter className="h-4 w-4" />
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  className="px-3 py-1 cursor-pointer text-xs"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div className="flex-1 relative">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Code className="h-4 w-4" />
              Language
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-primary/20 bg-background focus:outline-none focus:border-primary/50 transition-colors"
              />
              {languageInput && filteredLanguageSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-primary/20 rounded-lg shadow-lg z-10">
                  {filteredLanguageSuggestions.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setLanguageInput("");
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedLanguage && (
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{selectedLanguage}</Badge>
                <button
                  onClick={() => setSelectedLanguage("")}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden glass-card hover-lift border-primary/10 animate-fade-in-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glowing orb following cursor */}
              {hoveredCard === project.id && (
                <div
                  className="absolute w-64 h-64 rounded-full pointer-events-none transition-opacity duration-300 z-20"
                  style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
              )}
              
              <div className="relative h-full">
                {/* Image Section with Overlay */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  {/* Main Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
                  />
                  
                  {/* Secondary Image (if available) - Shows on hover with blur */}
                  {project.snapshots && project.snapshots[0] && (
                    <img
                      src={project.snapshots[0]}
                      alt={`${project.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                  
                  {/* Type Badge - Top Right */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-primary/20 text-xs font-semibold px-3 py-1">
                      {project.type}
                    </Badge>
                  </div>
                  
                  {/* Action Buttons - Centered, appear on hover */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <Button
                      size="sm"
                      className="shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 px-3"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      View Live
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-background/90 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 px-3"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                  
                  {/* Languages */}
                  <div className="flex flex-wrap gap-2">
                    {project.languages.map((lang) => (
                      <Badge 
                        key={lang} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Card>
          ))}

          {filteredProjects.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-2 text-center py-12">
              <p className="text-muted-foreground">No projects found matching your filters.</p>
            </div>
          )}
        </div>

      </div>

      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl floating-animation" />
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl floating-animation" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Projects;