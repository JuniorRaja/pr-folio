import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-card/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Crafting digital experiences with passion and precision. Always learning, always building.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@yourname.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <h4 className="font-semibold mb-2 text-sm">Stay Updated</h4>
              <p className="text-xs text-muted-foreground mb-3">Subscribe to get notified about new projects and blog posts.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-3 py-2 text-xs bg-background/50 border border-border/50 rounded-md focus:outline-none focus:border-primary"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground text-xs rounded-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="font-semibold mb-4">Quick Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:prasanna@prverse.dev" className="text-muted-foreground hover:text-primary transition-colors">
                  prasanna@prverse.dev
                </a>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-muted-foreground">Available for freelance</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-4 h-4 text-primary">📍</div>
                <span className="text-muted-foreground">Chennai, India</span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Web Development</li>
              <li className="text-muted-foreground">Mobile Apps</li>
              <li className="text-muted-foreground">UI/UX Design</li>
              <li className="text-muted-foreground">Consulting</li>
              <li className="text-muted-foreground">Photography</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="text-muted-foreground">Cookie Policy</li>
              <li className="text-muted-foreground">Disclaimer</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;