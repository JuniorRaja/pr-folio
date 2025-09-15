import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Counter from "@/components/Counter";

const About = () => {
  const skills = [
    "Web Development",
    "Project Management",
    "Books",
    "Cooking",
    "Photography",
    "Travel",
    "Music",
    "Psychology",
    "UI-UX",
    "Dark Jokes",
  ];

  return (
    <section id="about" className="pb-20 lg:pb-32 relative">
      <div className="container mx-auto px-4">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Image Card */}
          <Card className="p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative h-full flex items-center justify-center">
              <div className="w-full h-full mx-auto rounded-full overflow-hidden border-4 border-primary/20 hover-lift">
                <img
                  src="/characters/character_welcome.png"
                  alt="Prasanna Rajendran"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse-glow" />
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-30 floating-animation" />
            </div>
          </Card>
          
          {/* Description Card */}
          <Card className="p-8 animate-fade-in-up">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  <span className="gradient-text">Prasanna</span> Rajendran
                </h3>
                <p className="text-primary font-medium">Full-Stack Developer & Creative</p>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hi, I'm <span className="text-foreground font-semibold">Prasanna</span>,
                  a versatile & dynamic CS enthusiast based in Chennai, India.
                </p>
                <p>
                  With expertise in leading teams, web development, design, and
                  photography, I blend technology and creativity to craft engaging
                  and industry standard digital experiences.
                </p>
                <p>
                  As a full-stack developer and passionate traveler, I bring a
                  unique perspective to every project.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="hover-lift">
                  <span className="sr-only">Portfolio</span>
                  🌐
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <span className="sr-only">Instagram</span>
                  📷
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </Button>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <span className="sr-only">Email</span>
                  ✉️
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="hover-lift">Work with me</Button>
                <Button variant="outline" className="hover-lift">Say Hi</Button>
              </div>
            </div>
          </Card>

          {/* Age Card */}
          <Card className="p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-center h-full flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-4 gradient-text">My Age</h4>
              <Counter startDate="1998-06-11" interval={100} fontSize="text-4xl" />
              <p className="text-muted-foreground mt-4">Years of curiosity and growth</p>
            </div>
          </Card>

          {/* Interests Card */}
          <Card className="p-8 glass-card border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-center gradient-text">
                Things that excite me
              </h4>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-card/50 border border-border/50 rounded-full text-sm hover:border-primary/50 transition-colors hover-lift cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
    </section>
  );
};

export default About;