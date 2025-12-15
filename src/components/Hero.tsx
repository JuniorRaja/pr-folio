import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { GridScan } from "./GridScan";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  console.log(isDark);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      ref={containerRef}
    >
      {/* GridScan Background */}
      <div className="absolute inset-0 z-0">
        <GridScan
          className="w-full h-full"
          sensitivity={0.55}
          lineThickness={1}
          linesColor={isDark ? "#392e4e" : "#e9ecf0"}
          gridScale={0.1}
          scanColor={isDark ? "#FF9FFC" : "#8b5cf6"}
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.000}
          noiseIntensity={0.01}
        />
      </div>

      {/* Light Mode Blur Overlay */}
      {!isDark && (
        <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-[10px]" />
      )}

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up mt-2 pointer-events-none">
        <div className="space-y-8 max-w-4xl mx-auto pointer-events-auto">
          {/* Greeting */}
          <p className="text-primary text-lg font-medium tracking-wide animate-fade-in">
            HI, WELCOME TO PR VERSE
          </p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="gradient-text">Passion</span>{" "}
            <span className="text-foreground">Beyond</span>{" "}
            <span className="gradient-text">Responsibilities</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
            MANAGER BY DAY. DEVELOPER BY HEART
          </p>

          {/* Description */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hi, I'm{" "}
              <span className="text-primary font-semibold">
                Prasanna Rajendran
              </span>
              . I am a Full Stack Developer from Chennai, India. I build robust
              web applications, make managemental decisions and take photos of
              incredible patterns & landscapes.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 pt-4 sm:pt-8">
            <a
              href="https://github.com/JuniorRaja"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10"
              >
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/rajendranprasanna/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 justify-center pt-4 sm:pt-8">
            <Link to="/about">
              <Button
                className="hover-lift bg-primary hover:bg-primary/90 px-4 sm:px-8 py-3 sm:py-6 text-base sm:text-lg"
              >
                Know more
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="hover-lift px-4 sm:px-8 py-3 sm:py-6 text-base sm:text-lg border-primary/20 hover:border-primary"
              >
                Say Hi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
