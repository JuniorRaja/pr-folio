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
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card className="glass-card p-8">
            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  When you visit this portfolio website, we may collect certain information about your visit, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring website</li>
                  <li>Pages visited and time spent on each page</li>
                  <li>IP address</li>
                  <li>Date and time of visit</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  The information we collect is used to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                  <li>Improve the website and user experience</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Ensure website security and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">3. Contact Forms</h2>
                <p className="text-muted-foreground mb-4">
                  When you use our contact form, we collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Message content</li>
                  <li>Any other information you voluntarily provide</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  This information is used solely to respond to your inquiry and is not shared with third parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">4. Cookies and Analytics</h2>
                <p className="text-muted-foreground mb-4">
                  This website may use cookies and similar technologies to enhance your browsing experience. We may also use analytics services to better understand how visitors interact with our site.
                </p>
                <p className="text-muted-foreground mb-4">
                  You can choose to disable cookies through your browser settings, though this may affect some functionality of the website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">6. Third-Party Links</h2>
                <p className="text-muted-foreground mb-4">
                  This website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">7. Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce agreements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">8. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-primary">9. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">10. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy or our data practices, please contact us through the contact form on this website.
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