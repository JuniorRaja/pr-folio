import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

// Lazy load the heavy GridScan component
const GridScan = lazy(() =>
  import("./GridScan").then((module) => ({ default: module.GridScan }))
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [showGridScan, setShowGridScan] = useState(false);

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

  // Delay GridScan loading to prioritize hero content
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGridScan(true);
    }, 100); // Small delay to ensure hero content renders first

    return () => clearTimeout(timer);
  }, []);

  console.log(isDark);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background -mb-20"
      ref={containerRef}
    >
      {/* GridScan Background - Lazy loaded for better initial page load */}
      {showGridScan && (
        <div className="absolute inset-0 z-0 mt-[-15rem]">
          <Suspense fallback={<div className="w-full h-full bg-background" />}>
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
              chromaticAberration={0.0}
              noiseIntensity={0.01}
            />
          </Suspense>
        </div>
      )}

      {/* Light Mode Blur Overlay */}
      {!isDark && (
        <div className="absolute inset-0 z-0 bg-white/50 backdrop-blur-[10px]" />
      )}

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up mt-2 pointer-events-none">
        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto pointer-events-auto">
          {/* Eyebrow Text */}
          <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase animate-fade-in">
            Welcome to PR Verse — my digital playground
          </p>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight tracking-tight">
            <span className="gradient-text">I build.</span>{" "}
            <span className="text-foreground">I learn.</span>{" "}
            <br className="hidden md:block" />
            <span className="gradient-text">I explore.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground/80 font-light leading-relaxed">
            Engineer by profession. Developer by passion.{" "}
            <span className="text-primary font-medium">
              Curious by default.
            </span>
          </p>

          {/* Description */}
          <div className="space-y-4 max-w-2xl mx-auto pt-2">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Hi, I’m{" "}
              <span className="text-foreground font-medium">Prasanna</span> — a
              Chennai-based software engineer who loves turning ideas into
              systems, side projects into experiments, and curiosity into code.
              This site is a collection of things I build, lessons I learn,
              tools I use, and ideas I’m exploring. Take a moment. Wander
              around.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 pt-4">
            <a
              href="https://github.com/JuniorRaja"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Github Profile"
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
                className="hover-lift hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Contact Me"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 justify-center pt-2">
            <Link to="/about">
              <Button className="hover-lift bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-5 md:px-8 md:py-6 text-base font-medium rounded-full">
                Know more
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="hover-lift px-6 py-5 md:px-8 md:py-6 text-base font-medium border-primary/20 hover:border-primary hover:bg-primary/5 rounded-full"
              >
                Say Hi
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-pulse">
            <p className="text-xs text-muted-foreground tracking-widest uppercase opacity-70">
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
