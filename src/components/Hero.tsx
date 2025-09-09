import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for 3D floating objects
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: `hsl(263, 70%, ${50 + Math.random() * 30}%)`,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Update position
        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 0.5;
        particle.angle += 0.01;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }

        // Draw particle with glow effect
        const alpha = (100 - particle.z) / 100;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up mt-2">
        <div className="space-y-8 max-w-4xl mx-auto">
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
          <div className="flex items-center justify-center space-x-6 pt-8">
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
              href="https://www.linkedin.com/in/prasanna-rajendran"
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/about">
              <Button
                size="lg"
                className="hover-lift bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
              >
                Know more
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="hover-lift px-8 py-6 text-lg border-primary/20 hover:border-primary"
              >
                Say Hi
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 floating-animation" />
        <div
          className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-30 floating-animation"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-25 floating-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </section>
  );
};

export default Hero;
