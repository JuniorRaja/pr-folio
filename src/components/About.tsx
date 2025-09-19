import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Counter from "@/components/Counter";
import RotatingText from "@/components/ui/rotating-text";
import { Globe, Instagram, Linkedin, Mail } from "lucide-react";
import { useCallback, useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const About = () => {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);
  const autoRotateRef = useRef(null);
  const elementRef = useRef(null);
  const isMobile = useIsMobile();

  // Auto floating effect
  useEffect(() => {
    if (isMobile) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
      return;
    }

    if (isHovered) return;

    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rotateX = Math.sin(elapsed / 2000) * 8; // Simulate cursor Y movement
      const rotateY = Math.cos(elapsed / 2500) * 10; // Simulate cursor X movement
      
      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1)`
      );
      
      if (!isHovered) {
        autoRotateRef.current = requestAnimationFrame(animate);
      }
    };
    
    autoRotateRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [isHovered, isMobile]);

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = requestAnimationFrame(() => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      const maxTilt = 15;
      const rotateY = Math.max(-maxTilt, Math.min(maxTilt, x * maxTilt));
      const rotateX = Math.max(-maxTilt, Math.min(maxTilt, -y * maxTilt));

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.05)`
      );
    });
  }, [isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    setIsHovered(true);
    if (autoRotateRef.current) {
      cancelAnimationFrame(autoRotateRef.current);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setIsHovered(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isMobile]);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Image Card */}
          <div className="sm:p-2 md:p-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="relative h-full flex items-center justify-center">
              <div
                ref={elementRef}
                className={`w-full h-full mx-auto rounded-full overflow-hidden border-4 border-primary/20 transition-transform duration-200 ease-out ${!isMobile ? 'cursor-pointer' : ''} ${isMobile ? 'animate-bounce' : ''}`}
                style={{
                  transform,
                  willChange: 'transform',
                  animationDuration: isMobile ? '3s' : undefined
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src="/characters/character_welcome.png"
                  alt="Prasanna Rajendran"
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse-glow" />
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg opacity-30 floating-animation" />
            </div>
          </div>

          {/* Description Card */}
          <div className="sm:p-2 md:p-8 animate-fade-in-up space-y-8 text-center">
            <div>
              <h3 className="text-4xl font-bold">
                <span className="gradient-text">Prasanna</span>  Rajendran
              </h3>
              <div className="flex items-center justify-center space-x-3 mt-3">
                <p className="text-muted-foreground text-lg mb-2">I'm a </p>

                <RotatingText
                  texts={['Developer', 'Photographer', 'Avid Reader', 'Manager']}
                  mainClassName="px-2 bg-primary overflow-hidden py-0.5 justify-center rounded-lg text-white text-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 align-center justify-center">
              <Button variant="ghost" size="icon" className="hover-lift bg-muted/20" asChild>
                <a href="https://instagram.com/prasanna_rajendran" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover-lift bg-muted/20" asChild>
                <a href="https://linkedin.com/in/prasanna-rajendran" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover-lift bg-muted/20" asChild>
                <a href="mailto:hello@prasannarajendran.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 align-center justify-center">
              <Button className="hover-lift px-8">Work with me</Button>
              <Button variant="outline" className="hover-lift px-8">Say Hi</Button>
            </div>

            {/* Description */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hi, I'm <span className="gradient-text font-semibold">Prasanna</span>, versatile & dynamic CS enthusiast based in Chennai, India.
              </p>
              <p>
                With expertise in leading teams, web development, design, and photography, I blend technology and creativity to craft engaging and industry standard digital experiences.
              </p>
              <p>
                As a full-stack developer and passionate traveler, I bring a unique perspective to every project.
              </p>
            </div>
          </div>

          {/* Age Card */}
          <Card className="p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-center h-full flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-4 gradient-text">My Age</h4>
              <Counter startDate="1998-06-11" interval={100} fontSize="text-4xl" />
              <p className="text-muted-foreground mt-4">Years of curiosity and growth</p>
            </div>
          </Card>

          {/* Interests Card */}
          <div className="p-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
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