import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Loader2,
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/send-email' 
        : '/api/send-email';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setErrors({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "prasanna@prverse.dev",
      link: "mailto:prasanna@prverse.dev",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, India",
      link: "#",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 xxx xxx xxxx",
      link: "tel:+91xxxxxxxxxx",
    },
  ];

  return (
    <section id="contact" className="py-10 lg:py-12 relative">
      <div className="container mx-auto px-4">
        {/* Main Contact Section - Left & Right */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Left Side - Image with Animation */}
          <div className="flex justify-center items-center animate-fade-in-up">
            <div className="w-64 h-64 md:w-96 md:h-96 p-4 glass-card border-primary/20 rounded-full hover-lift animate-fade-in-up">
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/characters/character_talking.png"
                  alt="Character talking"
                  className="w-full h-full object-cover floating-animation"
                />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Card className="p-4 md:p-8 glass-card">
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input 
                      placeholder="Enter your name" 
                      className={`bg-background/50 border-border/50 focus:border-primary ${errors.firstName ? 'border-red-500' : ''}`}
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={isSubmitting}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input 
                      placeholder="Enter your last name" 
                      className={`bg-background/50 border-border/50 focus:border-primary ${errors.lastName ? 'border-red-500' : ''}`}
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={isSubmitting}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input 
                    type="email" 
                    placeholder="So that I can respond back to you" 
                    className={`bg-background/50 border-border/50 focus:border-primary ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Hi Prasanna! I'd love to discuss a potential collaboration on a web development project. Looking forward to hearing from you!" 
                    rows={5} 
                    className={`bg-background/50 border-border/50 focus:border-primary resize-none ${errors.message ? 'border-red-500' : ''}`}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <Button 
                  type="submit" 
                  className="w-full hover-lift" 
                  size="lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Contact Information - Stretches across both sides */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((info, index) => (
              <Card key={info.label} className="p-4 glass-card hover-lift cursor-pointer animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="hover-lift justify-start" size="lg">
            <Mail className="h-5 w-5 mr-3" />
            Copy Email Address
          </Button>
          <Button variant="outline" className="hover-lift">Download CV</Button>
          <Button variant="outline" className="hover-lift">View Resume</Button>
        </div>
      </div>

      {/* Background Elements */ }
      <div className="absolute top-40 left-5 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl floating-animation" />
      <div
        className="absolute bottom-60 right-5 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl floating-animation"
        style={{ animationDelay: "3s" }}
      />
    </section >
  );
};

export default Contact;
