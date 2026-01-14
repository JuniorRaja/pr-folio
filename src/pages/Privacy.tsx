import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Privacy = () => {
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
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 14, 2026
            </p>
            <p className="text-muted-foreground text-lg mt-2">
              This website respects your privacy. Below is a simple explanation of what data is collected and how it is used.
            </p>
          </div>

          <Card className="glass-card p-8">
            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">1. Information Collected Automatically</h2>
                <p className="text-muted-foreground mb-4">
                  When you visit this website, limited, non-personal data may be collected through analytics tools, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                  <li>Browser and device type</li>
                  <li>Pages visited and time spent</li>
                  <li>Approximate location</li>
                  <li>IP address (processed and anonymized where possible)</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  This data is collected using Google Analytics and is used solely to understand website usage and improve content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">2. Contact Form</h2>
                <p className="text-muted-foreground mb-4">
                  If you choose to contact me, I collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Message content</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  This information is used only to respond to your inquiry and is not shared with third parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">3. Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  This website may use cookies for basic analytics functionality. You can disable cookies through your browser settings if you prefer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">4. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  Reasonable measures are taken to protect collected information. However, no online system is completely secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">5. External Links</h2>
                <p className="text-muted-foreground mb-4">
                  This website may link to external sites. I am not responsible for their privacy practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">6. Updates</h2>
                <p className="text-muted-foreground mb-4">
                  This policy may be updated occasionally. Changes will be reflected on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">7. Contact</h2>
                <p className="text-muted-foreground">
                  If you have questions about this policy, please reach out via the contact form.
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

export default Privacy;