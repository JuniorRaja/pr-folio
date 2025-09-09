import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  year: string;
  period: string;
  role: string;
  description: string;
  status: "current" | "previous";
}

const Timeline = () => {
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

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2024",
      period: "Apr 2024 - Present",
      role: "Deputy Project Manager - Development",
      description: "Engaged in Software Development Lifecycle (SDLC) from requirement analysis, documentation (functional specifications, technical design, coding & Unit testing to maintenance of proposed applications.",
      status: "current"
    },
    {
      year: "2022",
      period: "Oct 2022 - Mar 2024",
      role: "Assistant Project Manager - Development",
      description: "Train & monitor Junior Associates and provide Knowledge Training about Business process, Coding standards, assign tasks and requirements and track their performance",
      status: "previous"
    },
    {
      year: "2019",
      period: "Jun 2019 - Apr 2022",
      role: "Software Engineer Trainee",
      description: "Computer Science · Communication · Test-Driven Development · .NET Core",
      status: "previous"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Years Counter */}
        <div className="text-center mb-16">
          <div className="text-6xl lg:text-8xl font-bold gradient-text mb-4">
            {yearsExperience.toFixed(8)}
          </div>
          <p className="text-xl text-muted-foreground">
            Years of Professional Experience
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary/50 to-primary/10" />
          
          {timelineEvents.map((event, index) => (
            <div 
              key={event.year}
              className={`relative flex items-center mb-16 animate-fade-in-up ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="glass-card p-6 hover-lift">
                  <div className="mb-4">
                    <Badge 
                      variant={event.status === 'current' ? 'default' : 'secondary'}
                      className="mb-2"
                    >
                      {event.period}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">
                      {event.role}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Year Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-background border-4 border-primary rounded-full flex items-center justify-center z-10">
                <span className="text-2xl font-bold text-primary">
                  {event.year}
                </span>
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;