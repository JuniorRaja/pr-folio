import { useEffect, useState, useRef, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const BentoGrid = lazy(() => import("@/components/BentoGrid"));

const Landing = () => {
  const [showBentoGrid, setShowBentoGrid] = useState(false);
  const bentoGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll<HTMLElement>("section");
    sections.forEach((section) => animationObserver.observe(section));

    return () => {
      sections.forEach((section) => animationObserver.unobserve(section));
      animationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!bentoGridRef.current) return; //won't load bento if the ref is not there in dom

    const bentoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !showBentoGrid) {
            setShowBentoGrid(true);
          }
        });
      },
      {
        rootMargin: "0px 0px -20% 0px",
        threshold: 0.1,
      }
    );

    bentoObserver.observe(bentoGridRef.current);

    return () => {
      bentoObserver.disconnect();
    };
  }, [showBentoGrid]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main className="sm:pt-20 md:pt-0">
        <Hero />

        {/* note: having this so that bento is below the hero to give a threshold for bento to lazy load */}
        <div className="h-[10vh]" />

        <section
          id="bento-section"
          ref={bentoGridRef}
          className="max-w-6xl mx-auto min-h-[400px]"
        >
          {showBentoGrid ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
              }
            >
              <BentoGrid />
            </Suspense>
          ) : (
            <div className="py-20" />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
