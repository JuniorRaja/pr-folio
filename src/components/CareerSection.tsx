import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CareerSection = () => {
  const [yearsExperience, setYearsExperience] = useState(0);

  useEffect(() => {
    // Calculate years of experience from April 2019 to current date
    const startDate = new Date('2019-04-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    
    // Animate the counter
    let currentCount = 0;
    const targetCount = diffYears;
    const increment = targetCount / 100;
    
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        setYearsExperience(targetCount);
        clearInterval(timer);
      } else {
        setYearsExperience(currentCount);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const careerData = [
    {
      period: "Apr 2024",
      status: "Currently",
      role: "Deputy Project Manager - Development",
      description: "Engaged in Software Development Lifecycle (SDLC) from requirement analysis, documentation (functional specifications, technical design, coding & Unit testing to maintenance of proposed applications."
    },
    {
      period: "Oct 2022 - Mar 2024",
      status: "Previously",
      role: "Assistant Project Manager - Development", 
      description: "Train & monitor Junior Associates and provide Knowledge Training about Business process, Coding standards, assign tasks and requirements and track their performance"
    },
    {
      period: "Jun 2019 - Apr 2022",
      status: "Previously",
      role: "Software Engineer Trainee",
      description: "Computer Science · Communication · Test-Driven Development · .NET Core"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Career</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Since my graduation I have been working in a FinTech Company involved in a core Non-Banking Financial Solution product. Here, I began from zero and now I am leading one of the product development team and learning new things everyday.
          </p>
        </div>

        {/* Years Counter */}
        <div className="text-center mb-16">
          <div className="text-6xl lg:text-8xl font-bold gradient-text mb-4">
            {yearsExperience.toFixed(8)}
          </div>
          <p className="text-xl text-muted-foreground">
            Years of Professional Experience
          </p>
        </div>

        {/* Career Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerData.map((career, index) => (
            <Card 
              key={career.role}
              className="glass-card hover-lift p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {career.period}
                  </Badge>
                  <Badge 
                    variant={career.status === 'Currently' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {career.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold mb-3">
                  {career.role}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {career.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;