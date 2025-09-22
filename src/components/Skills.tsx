import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  label: string;
  img: { src: string };
  level: "Beginner" | "Intermediate" | "Expert";
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & Mobile",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { label: "React", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, level: "Expert" },
      { label: "TypeScript", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }, level: "Expert" },
      { label: "JavaScript", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }, level: "Expert" },
      { label: "HTML5", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" }, level: "Expert" },
      { label: "CSS3", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }, level: "Expert" },
      { label: "Tailwind CSS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" }, level: "Expert" },
      { label: "React Native", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }, level: "Beginner" },
      { label: "Next.js", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }, level: "Intermediate" },
      { label: "jQuery", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" }, level: "Intermediate" },
      { label: "Vue.js", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" }, level: "Beginner" },
      { label: "Redux", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" }, level: "Beginner" },
      { label: "Zustand", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zustand/zustand-original.svg" }, level: "Beginner" },
      { label: "Axios", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" }, level: "Beginner" },
      { label: "Zod", img: { src: "https://zod.dev/_next/image?url=%2Flogo%2Flogo-glow.png&w=256&q=100" }, level: "Beginner" },
    ]
  },
  {
    title: "Backend & APIs",
    color: "from-green-500 to-emerald-500",
    skills: [
      { label: "C#", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" }, level: "Expert" },
      { label: ".NET Core", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" }, level: "Expert" },
      { label: "ASP.NET", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" }, level: "Expert" },
      { label: "Node.js", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" }, level: "Intermediate" },
      { label: "Express JS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" }, level: "Beginner" },
      { label: "Python", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }, level: "Intermediate" },
      { label: "GraphQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" }, level: "Intermediate" },
      { label: "OAuth2", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg" }, level: "Expert" },
      { label: "YARP", img: { src: "https://dotnet.github.io/yarp/logo.svg" }, level: "Intermediate" },
      { label: "signalR", img: { src: "https://dotnet.microsoft.com/blob-assets/images/illustrations/swimlane-azure-signalr-logo.svg" }, level: "Beginner" },
      { label: "Ocelot", img: { src: "https://raw.githubusercontent.com/ThreeMammals/Ocelot/refs/heads/assets/images/ocelot_logo.png" }, level: "Beginner" },
      { label: "IIS", img: { src: "https://images.seeklogo.com/logo-png/48/1/microsoft-iis-logo-png_seeklogo-484624.png" }, level: "Beginner" },
    ]
  },
  {
    title: "Database & Storage",
    color: "from-purple-500 to-pink-500",
    skills: [
      { label: "MSSQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" }, level: "Expert" },
      { label: "PostgreSQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" }, level: "Intermediate" },
      { label: "MySQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }, level: "Intermediate" },
      { label: "MongoDB", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }, level: "Intermediate" },
      { label: "Redis", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }, level: "Intermediate" },
      { label: "Blob Storage", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" }, level: "Expert" },
      { label: "AmazonS3", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" }, level: "Intermediate" },
      { label: "CosmosDB", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cosmosdb/cosmosdb-original.svg" }, level: "Beginner" }
    ]
  },
  {
    title: "DevOps & Cloud",
    color: "from-orange-500 to-red-500",
    skills: [
      { label: "Azure", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" }, level: "Expert" },
      { label: "AWS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/blob/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }, level: "Intermediate" },
      { label: "GCP", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" }, level: "Beginner" },
      { label: "Docker", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }, level: "Intermediate" },
      { label: "Jenkins", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" }, level: "Intermediate" },
      { label: "Github", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }, level: "Expert" },
      { label: "SonarQube", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg" }, level: "Intermediate" }
    ]
  },
  {
    title: "Testing & Tools",
    color: "from-indigo-500 to-purple-500", 
    skills: [
      { label: "Vite", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" }, level: "Intermediate" },
      { label: "xUnit", img: { src: "https://avatars.githubusercontent.com/u/2092016?s=200&v=4" }, level: "Expert" },
      { label: "NUnit", img: { src: "https://nunit.org/img/nunit_logo_128.png" }, level: "Expert" },
      { label: "Jest", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" }, level: "Intermediate" },
      { label: "Figma", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }, level: "Intermediate" },
      { label: "Photoshop", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" }, level: "Intermediate" },
      { label: "NPM", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" }, level: "Expert" }
    ]
  }
];

const learningSkills = [
  "Kubernetes", "Ruby on Rails", "Go", "Rust", "Machine Learning", "AI Integration", "Kafka", "Self Hosted LLMs"
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Beginner": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-20" id="skills">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
            Technical Expertise
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and expertise across different domains
          </p>
        </div>

        {/* Frontend & Backend - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {skillCategories.slice(0, 2).map((category, categoryIndex) => (
            <Card
              key={category.title}
              className="glass-card hover-lift group"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.label}
                      className="relative group/skill cursor-pointer"
                      // TODO: Show a modal on click with more details about the skill
                      // onMouseEnter={() => setHoveredSkill(skill.label)}
                      // onMouseLeave={() => setHoveredSkill(null)}
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      <div className="glass-card p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/5">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={skill.img.src}
                            alt={skill.label}
                            className="w-8 h-8 object-contain transition-transform duration-300 group-hover/skill:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                            }}
                          />
                          <span className="text-xs font-medium text-center leading-tight">
                            {skill.label}
                          </span>
                        </div>

                        {hoveredSkill === skill.label && (
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                            <Badge
                              variant="outline"
                              className={`${getLevelColor(skill.level)} text-xs whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of categories - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {skillCategories.slice(2).map((category, categoryIndex) => (
            <Card
              key={category.title}
              className="glass-card hover-lift group"
              style={{ animationDelay: `${(categoryIndex + 2) * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.label}
                      className="relative group/skill cursor-pointer"
                      onMouseEnter={() => setHoveredSkill(skill.label)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ animationDelay: `${((categoryIndex + 2) * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      <div className="glass-card p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/5">
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={skill.img.src}
                            alt={skill.label}
                            className="w-8 h-8 object-contain transition-transform duration-300 group-hover/skill:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                            }}
                          />
                          <span className="text-xs font-medium text-center leading-tight">
                            {skill.label}
                          </span>
                        </div>

                        {hoveredSkill === skill.label && (
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                            <Badge
                              variant="outline"
                              className={`${getLevelColor(skill.level)} text-xs whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse" />
              Learning & Will Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {learningSkills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="bg-dashed border-dashed border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                + Add More
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
