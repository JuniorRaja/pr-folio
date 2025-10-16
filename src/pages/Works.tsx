import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import Counter from "@/components/Counter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Skills from "@/components/Skills";

const Works = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
              Showcase & experience
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              My <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              A collection of projects I've worked on and my professional
              journey in software development and project management.
            </p>
          </div>
          <section>
            <Projects />
          </section>
          <div className="text-center">
            <Counter
              startDate="2019-06-03"
              interval={200}
              fontSize="text-6xl lg:text-8xl"
            />
            <p className="text-xl text-muted-foreground">
              Years of Professional Experience
            </p>
          </div>
          <section>
            <Skills />
          </section>
          <Timeline />
          {/* Learning Journey */}
          <div className="mt-20 text-center mb-24">
            <Card className="inline-block p-8 glass-card max-w-2xl">
              <h3 className="text-2xl font-bold mb-4">Photography</h3>
              <h4 className="text-xl gradient-text font-bold mb-4">
                See the world through my eyes. Go through the gallery
              </h4>
              <p className="text-muted-foreground mb-6">
                Beyond code and development, I capture the beauty of landscapes
                and moments. Explore my photography journey and the places I've
                been to.
              </p>
              <Button
                className="hover-lift"
                onClick={() => {
                  navigate("/gallery");
                }}
              >
                View Gallery
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl floating-animation" />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
};

export default Works;
