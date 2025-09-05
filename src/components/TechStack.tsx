import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TechStack = () => {
  const technologies = [
    {
      category: "Frontend",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", icon: "⚛️", level: 90 },
        { name: "TypeScript", icon: "🔷", level: 85 },
        { name: "Next.js", icon: "▲", level: 80 },
        { name: "Tailwind CSS", icon: "🎨", level: 95 },
        { name: "Vue.js", icon: "💚", level: 75 }
      ]
    },
    {
      category: "Backend",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: "🟢", level: 85 },
        { name: "Python", icon: "🐍", level: 80 },
        { name: "Express.js", icon: "🚀", level: 85 },
        { name: "PostgreSQL", icon: "🐘", level: 75 },
        { name: "MongoDB", icon: "🍃", level: 70 }
      ]
    },
    {
      category: "Tools & Cloud",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "AWS", icon: "☁️", level: 75 },
        { name: "Docker", icon: "🐳", level: 70 },
        { name: "Git", icon: "📝", level: 90 },
        { name: "Figma", icon: "🎨", level: 85 },
        { name: "Photoshop", icon: "📸", level: 80 }
      ]
    },
    {
      category: "Currently Learning",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Rust", icon: "🦀", level: 40 },
        { name: "Three.js", icon: "🎲", level: 50 },
        { name: "GraphQL", icon: "◉", level: 45 },
        { name: "K8s", icon: "☸️", level: 35 },
        { name: "Web3", icon: "⛓️", level: 30 }
      ]
    }
  ];

  const featuredTech = [
    { name: ".NET", icon: "🔷", color: "text-blue-500" },
    { name: "Express", icon: "⚡", color: "text-yellow-500" },
    { name: "TypeScript", icon: "🔷", color: "text-blue-600" },
    { name: "MS SQL", icon: "🗄️", color: "text-red-500" },
    { name: "Web API", icon: "🌐", color: "text-green-500" },
    { name: "AWS", icon: "☁️", color: "text-orange-500" }
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
            Everyday is a learning day. Here are some of the technologies I work with and constantly explore.
          </p>
        </div>

        {/* Featured Technologies */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {featuredTech.map((tech, index) => (
              <Badge 
                key={tech.name} 
                variant="outline" 
                className={`px-6 py-3 text-lg hover-lift border-primary/20 hover:border-primary/50 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={`mr-2 text-xl ${tech.color}`}>{tech.icon}</span>
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technology Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {technologies.map((category, categoryIndex) => (
            <Card 
              key={category.category} 
              className="p-8 glass-card hover-lift animate-fade-in-up border-primary/10"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color} mr-3`} />
                <h3 className="text-xl font-bold">{category.category}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-xl mr-3 group-hover:scale-110 transition-transform">
                          {skill.icon}
                        </span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill Progress Bar */}
                    <div className="w-full bg-border/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="mt-6 pt-4 border-t border-border/20">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{category.skills.length} Technologies</span>
                  <span>
                    {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}% Avg
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 glass-card hover-lift">
            <h3 className="text-xl font-bold mb-4 gradient-text">
              Let's Collaborate
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Do you want to start a project together? I'm always excited to work on innovative ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover-lift font-medium">
                📧 Copy my email address
              </button>
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