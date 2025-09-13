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
  const interests = [
    {
      category: "Development",
      items: ["React", "Node.js", "TypeScript", "Python"],
    },
    {
      category: "Design",
      items: ["Figma", "Photoshop", "UI/UX Design"],
    },
    {
      category: "Management",
      items: ["Agile", "Scrum", "Team Leadership"],
    },
    {
      category: "Photography",
      items: ["Landscape", "Portrait", "Street Photography"],
    },
  ];
  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Profile Info */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Profile Section */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary font-medium mb-2">Deputy</p>
                <h3 className="text-3xl font-bold mb-4">
                  <span className="gradient-text">Prasanna</span> Rajendran
                </h3>
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
                <Button variant="outline" className="hover-lift">
                  Say Hi
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hi, I'm{" "}
                <span className="text-foreground font-semibold">Prasanna</span>,
                versatile & dynamic CS enthusiast based in Chennai, India.
              </p>
              <p>
                With expertise in leading teams, web development, design, and
                photography, I blend technology and creativity to craft engaging
                and industry standard digital experiences.
              </p>
              <p>
                As a full-stack developer and passionate traveler, I bring a
                unique perspective to every project. Let's build something
                extraordinary together.
              </p>
            </div>

            {/* Age Counter */}
            <Card className="p-6 glass-card border-primary/20">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">My Age</h4>
                <Counter startDate="1998-06-11" interval={100} fontSize="text-3xl" />
                <p className="text-sm text-muted-foreground mt-2">Years</p>
              </div>
            </Card>
          </div>

          {/* Right Column - Profile Image and Skills */}
          <div
            className="space-y-8 animate-fade-in-up"
            style={{
              animationDelay: "0.2s",
            }}
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/20 hover-lift">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse-glow" />
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-30 floating-animation" />
            </div>

            {/* Skills/Interests */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">
                Things that excite me
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3 justify-center">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-card/50 border border-border/50 rounded-full text-sm hover:border-primary/50 transition-colors hover-lift cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Interest Categories */}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
    </section>
  );
};
export default About;
