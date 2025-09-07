import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 left-8 w-32 h-32 rounded-full border border-white/20"></div>
        <div className="absolute top-4 left-4 w-24 h-24 rounded-full border border-white/10"></div>
        <div className="absolute bottom-8 left-16 text-6xl font-light opacity-20">PR</div>
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Logo */}
          <div className="text-4xl font-bold tracking-wider">
            <span className="border-2 border-white px-4 py-2 rounded">PR</span>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex flex-wrap justify-center gap-8 text-lg">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About PR</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/works" className="hover:text-primary transition-colors">Projects</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Interests</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Skills</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          
          {/* Secondary Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-base opacity-80">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <a href="#" className="hover:text-primary transition-colors">Get my CV</a>
          </nav>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:prasanna@prverse.dev"
              className="w-12 h-12 border border-white/30 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;