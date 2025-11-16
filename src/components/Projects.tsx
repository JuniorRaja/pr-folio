
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight, Code2, Zap, Filter, Code } from "lucide-react";
import { projectsData, getAllProjectTypes, getAllLanguages } from "@/data/projectsData";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [languageInput, setLanguageInput] = useState<string>("");

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden glass-card hover-lift border-primary/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                {/* Top: Project Image */}
                <div className="h-24 sm:h-32 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Bottom: Project Content */}
                <div className="p-3 sm:p-5 flex flex-col justify-between flex-1 relative">
                  {/* Tech Vector Background */}
                  <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Code2 className="w-24 h-24 text-primary" strokeWidth={1} />
                  </div>
                  <div className="absolute bottom-2 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="w-16 h-16 text-primary" strokeWidth={1} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.type}
                      </Badge>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-150">
                      {project.title}
                    </h3>

                    {/* Languages Tags with Background */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="text-xs bg-primary/15 text-primary hover:bg-primary/25 transition-colors px-2 py-0.5">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-primary/10 relative z-10">
                    <Button
                      size="sm"
                      className="flex-1 h-7 sm:h-8 text-xs"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      <span className="hidden sm:inline">Live</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 sm:h-8 text-xs"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <span className="hidden sm:inline">Details</span>
                      <span className="sm:hidden">Info</span>
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
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