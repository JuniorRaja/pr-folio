import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Globe, Github, Linkedin, Instagram } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "prasanna@prverse.dev",
      link: "mailto:prasanna@prverse.dev"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, India",
      link: "#"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 xxx xxx xxxx",
      link: "tel:+91xxxxxxxxxx"
    },
    {
      icon: Globe,
      label: "Website",
      value: "prverse.dev",
      link: "https://prverse.dev"
    }
  ];

  const socialLinks = [
    { icon: Github, name: "GitHub", url: "https://github.com", color: "hover:text-gray-400" },
    { icon: Linkedin, name: "LinkedIn", url: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: Instagram, name: "Instagram", url: "https://instagram.com", color: "hover:text-pink-400" },
    { icon: Globe, name: "Portfolio", url: "#", color: "hover:text-primary" }
  ];

  const travelDestinations = [
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
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Travel Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Places I have <span className="gradient-text">travelled to</span>
            </h2>
            <p className="text-muted-foreground">My travel diaries and photography adventures</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelDestinations.map((destination, index) => (
              <Card 
                key={destination.country}
                className={`group overflow-hidden hover-lift animate-fade-in-up cursor-pointer`}
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
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Get in <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Have a project in mind? Want to collaborate? Or just want to say hi? 
                I'd love to hear from you. Let's create something amazing together.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={info.label}
                  className="p-4 glass-card hover-lift cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    className={`hover-lift hover:bg-primary/10 ${social.color} transition-colors`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Button className="w-full hover-lift justify-start" size="lg">
                <Mail className="h-5 w-5 mr-3" />
                Copy Email Address
              </Button>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="hover-lift">
                  Download CV
                </Button>
                <Button variant="outline" className="hover-lift">
                  View Resume
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-8 glass-card">
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input 
                      placeholder="John" 
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input 
                      placeholder="Doe" 
                      className="bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input 
                    type="email"
                    placeholder="john.doe@example.com" 
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input 
                    placeholder="Project Collaboration" 
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button className="w-full hover-lift" size="lg">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 border-t border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About PR</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Gallery</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Interests</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2024 Prasanna Rajendran. Made with 💜 by PR
              </p>
              <div className="flex justify-center md:justify-end space-x-4 mt-2">
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</a>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Get my CV</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Background Elements */}
      <div className="absolute top-40 left-5 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl floating-animation" />
      <div className="absolute bottom-60 right-5 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl floating-animation" style={{ animationDelay: "3s" }} />
    </section>
  );
};

export default Contact;