import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TechStack = () => {
  // Top skills with logos
  const heroSkills = [
    { 
      name: "JavaScript", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      proficiency: "Expert"
    },
    { 
      name: "React", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      proficiency: "Expert"
    },
    { 
      name: "TypeScript", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      proficiency: "Advanced"
    },
    { 
      name: "Node.js", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      proficiency: "Advanced"
    },
    { 
      name: "Python", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      proficiency: "Intermediate"
    },
    { 
      name: "AWS", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      proficiency: "Intermediate"
    }
  ];

  // All technologies organized by category
  const techCategories = [
    {
      title: "Frontend Development",
      techs: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
      ]
    },
    {
      title: "Backend Development",
      techs: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      title: "Cloud & DevOps",
      techs: [
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" }
      ]
    },
    {
      title: "Tools & Design",
      techs: [
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
        { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
        { name: "Webpack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
        { name: "Vite", logo: "https://vitejs.dev/logo.svg" },
        { name: "npm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" }
      ]
    }
  ];

  return (
    <section id="tech" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
            Tech enthusiast with a passion for development
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everyday is a learning day. Here are the technologies I work with and constantly explore.
          </p>
        </div>

        {/* Hero Skills Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Core Expertise</h3>
            <p className="text-muted-foreground">My primary technology stack</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {heroSkills.map((skill, index) => (
              <Card 
                key={skill.name}
                className="p-6 glass-card hover-lift text-center group border-primary/10 hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-card/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={skill.logo} 
                    alt={skill.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💻</span>
                  </div>
                </div>
                <h4 className="font-semibold text-sm mb-2">{skill.name}</h4>
                <Badge 
                  variant="outline" 
                  className="text-xs border-primary/20 text-primary"
                >
                  {skill.proficiency}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* All Technologies by Category */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Complete Technology Arsenal</h3>
            <p className="text-muted-foreground">All technologies I work with across different domains</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {techCategories.map((category, categoryIndex) => (
              <Card 
                key={category.title}
                className="p-8 glass-card hover-lift border-primary/10 hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <h4 className="text-xl font-bold mb-6 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-500 mr-3" />
                  {category.title}
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.techs.map((tech, techIndex) => (
                    <div 
                      key={tech.name}
                      className="flex items-center p-3 rounded-lg bg-card/30 hover:bg-card/50 transition-all duration-300 group cursor-pointer"
                      style={{ animationDelay: `${categoryIndex * 0.2 + techIndex * 0.05}s` }}
                    >
                      <div className="w-8 h-8 mr-3 flex items-center justify-center">
                        <img 
                          src={tech.logo} 
                          alt={tech.name}
                          className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                          <span className="text-xs">🔧</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 glass-card hover-lift max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Let's Build Something Amazing
            </h3>
            <p className="text-muted-foreground mb-6">
              Ready to bring your ideas to life? Let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start a Project
              </Button>
              <Button variant="outline" className="border-primary/20 hover:border-primary/50">
                View My Work
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-5 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl floating-animation" />
      <div className="absolute bottom-1/4 right-5 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl floating-animation" style={{ animationDelay: "3s" }} />
    </section>
  );
};

export default TechStack;