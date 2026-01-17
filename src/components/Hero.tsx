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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center animate-fade-in-up mt-2 pointer-events-none pt-0 md:pt-[5rem]">
        <div className="space-y-4 sm:space-y-4 md:space-y-6 lg:space-y-8 max-w-4xl mx-auto pointer-events-auto">
          {/* Eyebrow Text */}
          <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase animate-fade-in">
            Welcome to PR Verse — my digital playground
          </p>

          {/* Main Title - Single line for medium+ screens, compact for mobile */}
          <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
            <span className="gradient-text whitespace-nowrap">I build.</span>{" "}
            <span className="text-foreground whitespace-nowrap">I learn.</span>{" "}
            <span className="gradient-text whitespace-nowrap">I explore.</span>
          </h1>

          {/* Subtitle - Single line for medium+ screens */}
          <p className="text-md sm:text-md md:text-xl lg:text-2xl text-muted-foreground/80 font-light leading-relaxed px-2 sm:px-0">
            <span className="inline-block">Engineer by profession.</span>{" "}
            <span className="inline-block">Developer by passion.</span>{" "}
            <span className="text-primary font-medium inline-block">
              Curious by default.
            </span>
          </p>

          {/* Description */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 max-w-2xl mx-auto pt-1 sm:pt-2">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed px-2 sm:px-4 md:px-0">
              Hi, I'm{" "}
              <span className="text-foreground font-medium">Prasanna</span> — a
              Chennai-based software engineer who loves turning ideas into
              systems, side projects into experiments, and curiosity into code.
              This site is a collection of things I build, lessons I learn,
              tools I use, and ideas I'm exploring. Take a moment. Wander
              around.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-6 pt-2 sm:pt-3 md:pt-4">
            <a
              href="https://github.com/JuniorRaja"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                aria-label="Github Profile"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
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
                className="hover-lift hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="ghost"
                size="icon"
                className="hover-lift hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                aria-label="Contact Me"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center pt-1 sm:pt-2">
            <Link to="/about">
              <Button className="hover-lift bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-6 text-xs sm:text-sm md:text-base font-medium rounded-full">
                Know more
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="hover-lift px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-6 text-xs sm:text-sm md:text-base font-medium border-primary/20 hover:border-primary hover:bg-primary/5 rounded-full"
              >
                Say Hi
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-6 sm:pt-8 md:pt-12 animate-pulse">
            <p className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase opacity-70">
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
