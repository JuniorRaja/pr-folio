import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "@/data/projectsData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 sm:py-4 lg:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/projects")}
          className="mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <Badge variant="outline" className="text-xs sm:text-sm">{project.type}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4">{project.title}</h1>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={() => window.open(project.liveUrl, "_blank")}
              className="text-sm sm:text-base"
              size="sm"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Site
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(project.githubUrl, "_blank")}
              className="text-sm sm:text-base"
              size="sm"
            >
              <Github className="h-4 w-4 mr-2" />
              Repository
            </Button>
          </div>
        </div>

        {/* Project Image */}
        <Card className="overflow-hidden mb-8 sm:mb-12 glass-card border-primary/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </Card>

        {/* Technical Information */}
        <Card className="p-4 sm:p-8 mb-8 sm:mb-12 glass-card border-primary/10">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Technical Information</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Languages */}
            <div>
              <h3 className="font-semibold mb-2 sm:mb-3 text-primary text-sm sm:text-base">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {project.languages.map((lang) => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div>
              <h3 className="font-semibold mb-2 sm:mb-3 text-primary text-sm sm:text-base">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.toolsUsed.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Topics Covered */}
            <div className="sm:col-span-2">
              <h3 className="font-semibold mb-2 sm:mb-3 text-primary text-sm sm:text-base">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {project.topicsCovered.map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-primary/10">
            <h3 className="font-semibold mb-2 sm:mb-3 text-primary text-sm sm:text-base">Links</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="text-muted-foreground">Live Site: </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {project.liveUrl}
                </a>
              </p>
              <p>
                <span className="text-muted-foreground">Repository: </span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {project.githubUrl}
                </a>
              </p>
            </div>
          </div>
        </Card>

        {/* Project Summary */}
        <Card className="p-4 sm:p-8 mb-8 sm:mb-12 glass-card border-primary/10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Project Summary</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
            {project.summary}
          </p>
        </Card>

        {/* Approach */}
        <Card className="p-4 sm:p-8 mb-8 sm:mb-12 glass-card border-primary/10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Approach</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
            {project.approach}
          </p>
        </Card>

        {/* Skills Demonstrated */}
        <Card className="p-4 sm:p-8 mb-8 sm:mb-12 glass-card border-primary/10">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Skills Demonstrated</h2>
          <ul className="space-y-2 text-sm sm:text-base">
            {project.skillsDemonstrated.map((skill, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary font-bold mt-1 flex-shrink-0">•</span>
                <span className="text-muted-foreground">{skill}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Project Snapshots */}
        {project.snapshots.length > 0 && (
          <Card className="p-4 sm:p-8 glass-card border-primary/10">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Project Snapshots</h2>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-6">
              {project.snapshots.map((snapshot, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-primary/10"
                >
                  <img
                    src={snapshot}
                    alt={`${project.title} snapshot ${index + 1}`}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
