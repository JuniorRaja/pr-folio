import { Badge } from "@/components/ui/badge";
import Counter from "./Counter";

interface TimelineEvent {
  year: string;
  period: string;
  role: string;
  description: string;
  status: "current" | "previous";
}

const timelineEvents: readonly TimelineEvent[] = [
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
] as const;

const Timeline = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Years Counter */}
        <div className="text-center mb-16">
          <Counter startDate="2019-06-03" interval={200} fontSize="text-6xl lg:text-8xl" />
          <p className="text-xl text-muted-foreground">
            Years of Professional Experience
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-px bg-gradient-to-b from-primary/50 to-primary/10" />
          
          {timelineEvents.map((event, index) => (
            <div 
              key={event.year}
              className={`relative flex items-center mb-16 animate-fade-in-up ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content Card */}
              <div className={`w-full pl-20 text-left lg:w-5/12 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
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
              <div className="absolute left-2 lg:left-1/2 transform lg:-translate-x-1/2 w-16 h-16 lg:w-20 lg:h-20 bg-background border-4 border-primary rounded-full flex items-center justify-center z-10">
                <span className="text-lg lg:text-2xl font-bold text-primary">
                  {event.year}
                </span>
              </div>

              {/* Empty space for the other side - only on desktop */}
              <div className="hidden lg:block lg:w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;