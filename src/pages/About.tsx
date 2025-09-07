import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/About";
import HoneycombTechStack from "@/components/HoneycombTechStack";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import Spotlight from "@/components/Spotlight";
import Footer from "@/components/Footer";

const About = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main>
        <div className="pt-20">
          <AboutSection />
          
          {/* Globe Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <Spotlight className="mb-12">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Find Me <span className="gradient-text">Around The World</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Interactive globe showing places I have travelled to and my journey around the world
                  </p>
                </div>
              </Spotlight>
              <div className="relative h-[500px] rounded-2xl overflow-hidden glass-card max-w-4xl mx-auto">
                <InteractiveGlobe />
              </div>
            </div>
          </section>
          
          <HoneycombTechStack />
        </div>
      </main>

      <Footer />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl floating-animation" style={{ animationDelay: "4s" }} />
      </div>
    </div>
  );
};

export default About;