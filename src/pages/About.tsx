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

          {/* Travel Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <Spotlight className="mb-12">
                <div className="text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Places I have <span className="gradient-text">travelled to</span>
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    My travel diaries and photography adventures around the world
                  </p>
                </div>
              </Spotlight>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    country: "Singapore",
                    date: "JAN 2023", 
                    image: "🇸🇬",
                    gradient: "from-blue-400 to-blue-600"
                  },
                  {
                    country: "Sri Lanka",
                    date: "JUN 2023",
                    image: "🇱🇰", 
                    gradient: "from-orange-400 to-red-600"
                  },
                  {
                    country: "Poland",
                    date: "SEP 2023",
                    image: "🇵🇱",
                    gradient: "from-red-400 to-white"
                  },
                  {
                    country: "Switzerland", 
                    date: "SEP 2023",
                    image: "🇨🇭",
                    gradient: "from-red-500 to-white"
                  }
                ].map((destination, index) => (
                  <div 
                    key={destination.country}
                    className={`group overflow-hidden hover-lift animate-fade-in-up cursor-pointer glass-card rounded-lg`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`aspect-[4/3] bg-gradient-to-br ${destination.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        {destination.image}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-xs font-medium opacity-90">{destination.date}</p>
                        <h3 className="text-xl font-bold">{destination.country}</h3>
                      </div>
                    </div>
                  </div>
                ))}
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