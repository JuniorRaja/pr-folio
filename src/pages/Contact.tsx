import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/Contact";
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
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
              I'm already excited !!
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Hello <span className="gradient-text">There</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Have a project in mind? Want to collaborate? Or just want to say
              hi? I'd love to hear from you. Let's create something amazing
              together.
            </p>
          </div>

          {/* Contact Form */}
          <ContactSection />
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

export default Contact;
