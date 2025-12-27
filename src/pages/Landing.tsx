import { useEffect, useState, useRef, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Lazy load the BentoGrid component
const BentoGrid = lazy(() => import("@/components/BentoGrid"));

const Landing = () => {
  const [showBentoGrid, setShowBentoGrid] = useState(false);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark");
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Add scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Intersection Observer for BentoGrid lazy loading
  useEffect(() => {
    const bentoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showBentoGrid) {
            setShowBentoGrid(true);
          }
        });
      },
      {
        rootMargin: "200px", // Start loading 200px before it comes into view
        threshold: 0
      }
    );

    if (bentoGridRef.current) {
      bentoObserver.observe(bentoGridRef.current);
    }

    return () => {
      if (bentoGridRef.current) {
        bentoObserver.unobserve(bentoGridRef.current);
      }
    };
  }, [showBentoGrid]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main className="sm:pt-20 md:pt-0">
        <Hero />
        <div ref={bentoGridRef} className="max-w-6xl mx-auto min-h-[400px]">
          {showBentoGrid ? (
            <Suspense fallback={
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }>
              <BentoGrid />
            </Suspense>
          ) : (
            <div className="py-20"></div>
          )}
        </div>
      </main>

      <Footer />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl floating-animation" style={{ animationDelay: "8s" }} />
      </div>
    </div>
  );
};

export default Landing;