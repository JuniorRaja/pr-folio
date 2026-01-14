import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Terms = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Terms of <span className="gradient-text">Use</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              By accessing this website, you agree to the following terms.
            </p>
          </div>

          <Card className="glass-card p-8">
            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">1. Use of Content</h2>
                <p className="text-muted-foreground mb-4">
                  All content on this website is provided for informational and personal use only. You may view, read, and share links to the content, but you may not reproduce, distribute, or use it for commercial purposes without permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">2. Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The content on this website is provided "as is." I make no guarantees regarding accuracy, completeness, or suitability for any purpose.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">3. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  I am not liable for any damages arising from the use or inability to use this website or its content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">4. External Links</h2>
                <p className="text-muted-foreground mb-4">
                  This website may include links to third-party websites. I am not responsible for their content or practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">5. Changes</h2>
                <p className="text-muted-foreground mb-4">
                  These terms may be updated at any time. Continued use of the website implies acceptance of the current terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">6. Contact</h2>
                <p className="text-muted-foreground">
                  For questions regarding these terms, please reach out via the contact form.
                </p>
              </section>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;