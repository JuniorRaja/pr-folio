import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useFavicon } from "@/hooks/use-favicon";

const Navigation = () => {
  const [isDark, setIsDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useFavicon(isDark);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About PR", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Works", href: "/works" },
    { name: "Contact", href: "/contact" },
  ];
  
  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ",
        scrolled && !isOpen
          ? "backdrop-blur-xl bg-background/80 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="w-12 h-12 flex items-center justify-start">
              <img
                src={isDark ? "/logo/PRLogoW.png" : "/logo/PRLogoB.png"}
                alt="PR Logo"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-foreground/80 hover:text-foreground transition-colors hover:scale-105",
                  location.pathname === item.href && "text-primary font-medium"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle - Right */}
          <div className="hidden md:flex justify-end flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="hover:bg-primary/10"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="hover:bg-primary/10"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsOpen(!isOpen)
              }}
              className="hover:bg-primary/10"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Full screen background */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-lg"
            style={{
              backgroundImage: 'url("/navmenu-grid.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay",
            }}
          />

          {/* Header with logo, theme toggle, and close button */}
          <div className="relative z-[70] backdrop-blur-xl bg-background/80">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="w-12 h-12 flex items-center justify-center" onClick={() => setIsOpen(false)}>
                  <img
                    src={isDark ? "/logo/PRLogoW.png" : "/logo/PRLogoB.png"}
                    alt="PR Logo"
                    className="w-full h-full object-contain"
                  />
                </Link>

                {/* Theme toggle and close button */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDark(!isDark)}
                    className="hover:bg-primary/10"
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-primary/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation menu */}
          <div className="relative z-[65] flex items-center justify-center mt-[50%]">
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-foreground/80 hover:text-foreground transition-colors text-center py-3 text-2xl font-medium",
                    location.pathname === item.href &&
                    "text-primary font-bold scale-110"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
