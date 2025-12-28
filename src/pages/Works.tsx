import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import Counter from "@/components/Counter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Skills from "@/components/Skills";

const Works = () => {
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
              Showcase & experience
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              My <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              A collection of projects I've worked on and my professional
              journey in software development and project management.
            </p>
          </div>
          <section>
            <Projects />
          </section>
          <div className="text-center">
            <Counter
              startDate="2019-06-03"
              interval={200}
              fontSize="text-6xl lg:text-8xl"
            />
            <p className="text-xl text-muted-foreground">
              Years of Professional Experience
            </p>
          </div>
          <section id="skills">
            <Skills />
          </section>
          <Timeline />
          {/* Photography Section */}
          <div className="mt-20 mb-24">
            <Card 
              className="glass-card max-w-4xl mx-auto overflow-hidden group hover-lift relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Glowing orb following cursor */}
              {isHovering && (
                <div
                  className="absolute w-64 h-64 rounded-full pointer-events-none transition-opacity duration-300 z-10"
                  style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
              )}
              
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Left side - Image with overlay effect */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img
                    src="/characters/character_photographer.webp"
                    alt="Photography"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 md:to-background/60 opacity-0 md:opacity-100" />
                  
                  {/* Animated border accent */}
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
                </div>
                
                {/* Right side - Content with stagger animations */}
                <div className="relative w-full md:w-3/5 p-8 md:p-10 text-center md:text-left flex flex-col justify-center">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 transform transition-all duration-500 group-hover:translate-x-2">
                    Photography
                  </h3>
                  <h4 className="text-lg md:text-xl gradient-text font-bold mb-4 transform transition-all duration-500 delay-75 group-hover:translate-x-2">
                    See the world through my eyes. Go through the gallery
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed transform transition-all duration-500 delay-100 group-hover:translate-x-2">
                    Beyond code and development, I capture the beauty of landscapes
                    and moments. Explore my photography journey and the places I've
                    been to.
                  </p>
                  
                  {/* Button with enhanced hover effect */}
                  <div className="transform transition-all duration-500 delay-150 group-hover:translate-x-2">
                    <Button
                      className="relative overflow-hidden group/btn"
                      onClick={() => {
                        navigate("/gallery");
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Gallery
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                    </Button>
                  </div>
                  
                  {/* Decorative bottom accent */}
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                </div>
              </div>
              
              {/* Animated glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl floating-animation" />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
};

export default Works;
