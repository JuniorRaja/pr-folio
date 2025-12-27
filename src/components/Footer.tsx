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
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#6b26d9] to-transparent"></div>
          <div className="mx-8 w-16 h-16 flex items-center justify-center">
            <img
              src="/logo/PRLogoB.png"
              alt="PR Logo"
              className="w-full h-full object-contain inline dark:hidden"
            />
            <img
              src="/logo/PRLogoW.png"
              alt="PR Logo"
              className="w-full h-full object-contain inline hidden dark:block"
            />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#6b26d9] to-transparent"></div>
        </div>

        {/* Main Content: Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Section: Profile & Social */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#6b26d9]/30 flex-shrink-0">
                <img
                  src="/logo/PRLogoB.png"
                  alt="PR"
                  className="w-full h-full object-cover inline dark:hidden"
                />
                <img
                  src="/logo/PRLogoW.png"
                  alt="PR"
                  className="w-full h-full object-cover inline hidden dark:block"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Prasanna Rajendran</h3>
                <p className="text-sm opacity-70">Full Stack Developer & Creative Technologist</p>
              </div>
            </div>
            
            <p className="text-sm opacity-80 leading-relaxed">
              Building digital experiences with code, design, and a touch of creativity. Passionate about web development and visual storytelling.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://github.com/JuniorRaja"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-[#6b26d9]/20 hover:border-[#6b26d9] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/prasanna.it.seems/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-[#6b26d9]/20 hover:border-[#6b26d9] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rajendranprasanna/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-[#6b26d9]/20 hover:border-[#6b26d9] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:imprasannarajendran@gmail.com"
                className="w-10 h-10 border border-white/30 dark:border-white/20 rounded-lg flex items-center justify-center hover:bg-[#6b26d9]/20 hover:border-[#6b26d9] transition-all"
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
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Home
                </Link>
                <Link to="/about" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  About
                </Link>
                <Link to="/works" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Projects
                </Link>
                <Link to="/gallery" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Gallery
                </Link>
                <Link to="/contact" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Contact
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">More</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <Link to="/about#skills" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Skills
                </Link>
                <Link to="/about" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Interests
                </Link>
                <button onClick={handleCVClick} className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all text-left">
                  Get CV
                </button>
                <Link to="/terms" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Terms
                </Link>
                <Link to="/privacy" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Privacy
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Explore</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <Link to="/about#travel" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Travel
                </Link>
                <Link to="/about#books" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Books
                </Link>
                <Link to="/gallery" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Photography
                </Link>
                <Link to="/works#timeline" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Timeline
                </Link>
                <Link to="/about#hobbies" className="opacity-80 hover:opacity-100 hover:text-[#6b26d9] transition-all">
                  Hobbies
                </Link>
              </nav>
            </div>
          </div>

          {/* Right Section: Character Image */}
          <div className="flex items-end justify-center md:justify-end -mb-12">
            <img
              src="/characters/character-chilling.png"
              alt="Character"
              className="w-full max-w-[280px] h-auto object-contain object-bottom"
            />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} Made by Prasanna Rajendran. No rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
