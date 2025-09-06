import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/Contact";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import Footer from "@/components/Footer";

const Contact = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Let's connect and explore opportunities to collaborate on amazing projects together.
            </p>
          </div>

          {/* Globe Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Find Me Around The World</h2>
              <p className="text-muted-foreground">
                Interactive globe showing my location and travel experiences
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden glass-card">
              <InteractiveGlobe />
            </div>
          </div>

          {/* Contact Form */}
          <ContactSection />
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

export default Contact;