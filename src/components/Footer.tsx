import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-black dark:text-white relative overflow-hidden ">
      <div className="container mx-auto px-6 py-3 relative z-10">
        <div className="border-t border-[#6b26d9] mb-2 relative"></div>
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="w-20 h-20 flex items-center justify-center">
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

          {/* Main Navigation */}
          <nav className="flex flex-wrap justify-center gap-4 text-md">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About PR
            </Link>
            <Link
              to="/gallery"
              className="hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Link to="/works" className="hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              Interests
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              Skills
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Secondary Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-base opacity-80">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              Get my CV
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:prasanna@prverse.dev"
              className="w-10 h-10 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Character Image */}
        <div className="bottom-0 left-1/2 transform flex justify-end mr-[-3rem] mb-[-1rem]">
          <img
            src="/characters/character-chilling.png"
            alt="Character"
            className="w-full h-auto md:w-[35%] lg:w-[35%] sm:w-[65%] max-w-none"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
