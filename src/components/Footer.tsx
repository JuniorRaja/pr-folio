import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleCVClick = () => {
    toast({
      title: "Feature Coming Soon...",
      description: "You can still view my digital resume",
    });
  };

  return (
    <footer className="text-black dark:text-white relative overflow-hidden">
      {/* Glowing Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-500/20 dark:bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-40 w-72 h-72 bg-blue-900/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Top Section: Line with Logo */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="mx-8 w-16 h-16 flex items-center justify-center">
            <img
              src="/logo/PRLogoB.png"
              alt="PR Logo"
              loading="lazy"
              className="w-full h-full object-contain inline dark:hidden"
            />
            <img
              src="/logo/PRLogoW.png"
              alt="PR Logo"
              loading="lazy"
              className="w-full h-full object-contain inline hidden dark:block"
            />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        {/* Main Content: Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Section: Profile & Social */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/30 flex-shrink-0">
                <img
                  src="/characters/pr.jpg"
                  loading="lazy"
                  alt="PR"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Prasanna Rajendran</h3>
                <p className="text-sm text-muted-foreground">
                  Full Stack Developer & Creative Technologist
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Designing and building digital experiences with a focus on
              reliable, scalable web systems and design lead engineering.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://github.com/JuniorRaja"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/prasanna.it.seems/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rajendranprasanna/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@prasannar.com"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Middle Section: Sitemap */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-4">Navigation</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  About
                </Link>
                <Link
                  to="/works"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Projects
                </Link>
                <Link
                  to="/gallery"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Gallery
                </Link>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">More</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <Link
                  to="/works#skills"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Skills
                </Link>
                <Link
                  to="/about#interests"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Interests
                </Link>
                <button
                  onClick={handleCVClick}
                  className="text-muted-foreground hover:text-primary transition-all text-left"
                >
                  Download CV
                </button>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Terms
                </Link>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Privacy
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Explore</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <Link
                  to="/about#travel"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Travel
                </Link>
                <Link
                  to="/about#bookshelf-3d"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Books
                </Link>
                <Link
                  to="/gallery"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Photography
                </Link>
                <Link
                  to="/works#timeline"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Timeline
                </Link>
                <Link
                  to="/about#interests"
                  className="text-muted-foreground hover:text-primary transition-all"
                >
                  Hobbies
                </Link>
              </nav>
            </div>
          </div>

          {/* Right Section: Character Image */}
          <div className="flex items-end justify-center md:justify-end -mb-12">
            <img
              src="/characters/character-chilling.webp"
              alt="Character"
              loading="lazy"
              className="w-full max-w-[280px] h-auto object-contain object-bottom opacity-40"
            />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm opacity-60">
          <p className="mb-2">A personal space for work, learning, and life.</p>
          <p>
            © {new Date().getFullYear()} Made by Prasanna Rajendran. No rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
