import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface TimelineEvent {
  year: string;
  period: string;
  role: string;
  description: string;
  highlights?: string[];
  status: "current" | "previous";
}

const timelineEvents: readonly TimelineEvent[] = [
  {
    year: "2025",
    period: "2025 - Present",
    role: "Project Manager - Implementations",
    description:
      "Leading implementation projects that integrate new technologies into existing workflows. Working with cross-functional teams to build custom solutions based on client requirements, modernize legacy systems, and deliver innovative features that enhance product capabilities.",
    status: "current",
  },
  {
    year: "2024",
    period: "2023 - 2024",
    role: "Deputy Project Manager (Implementations)",
    description:
      "Managing multiple projects across the lending vertical — ensuring timely delivery, smooth client UATs, and cross-functional alignment. Involved in both technical modernization and delivery execution, helping the organization implement new technology stacks and better project management practices.",
    status: "previous",
  },
  {
    year: "2023",
    period: "2021 - 2023",
    role: "Assistant / Associate Team Lead",
    description:
      "Led teams, managed releases, and worked closely with clients. Focus expanded beyond code — into planning, delivery, and helping team perform better.",
    highlights: [
      "Led 7+ developers",
      "Maintained 98% SLA adherence",
      "Drove 30% faster performance in key apps",
    ],
    status: "previous",
  },
  {
    year: "2021",
    period: "2021",
    role: "Senior Software Engineer",
    description:
      "Started owning modules end-to-end — from architecture to release. Learned how to optimize systems and lead discussions that shaped better performance and user experience.",
    status: "previous",
  },
  {
    year: "2020",
    period: "2020",
    role: "Software Engineer",
    description:
      "Took on more complex projects, contributing to core modules in enterprise applications. These years taught the importance of clean code, business understanding, and teamwork.",
    status: "previous",
  },
  {
    year: "2019",
    period: "2019",
    role: "Software Engineer Trainee",
    description:
      "Started the journey learning the ropes of coding, debugging, and understanding real-world systems. Worked on internal tools and automation — small steps that built a strong foundation in problem-solving and system design.",
    status: "previous",
  },
] as const;

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    timelineEvents.forEach((_, index) => {
      const element = document.getElementById(`timeline-${index}`);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
           PROFESSIONAL CAREER
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="gradient-text">Journey</span> in Tech
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Build reliable products, lead efficient teams, and deliver with
            excellence
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line with gradient animation */}
          <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {timelineEvents.map((event, index) => {
            const isVisible = visibleItems.includes(index);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.year}
                id={`timeline-${index}`}
                className={`relative flex items-start mb-12 lg:mb-20 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
              >
                {/* Content Card */}
                <div
                  className={`w-full pl-20 lg:pl-0 lg:w-[calc(50%-3rem)] ${
                    isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                  }`}
                >
                  <div
                    className={`glass-card p-6 lg:p-8 hover-lift transition-all duration-500 border-l-4 lg:border-l-0 ${
                      event.status === "current"
                        ? "border-primary lg:border-t-4"
                        : "border-primary/30 lg:border-t-2"
                    }`}
                    style={{
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="space-y-3">
                      <Badge
                        variant={
                          event.status === "current" ? "default" : "secondary"
                        }
                        className={`${
                          isLeft
                            ? "lg:float-right lg:ml-2"
                            : "lg:float-left lg:mr-2"
                        }`}
                      >
                        {event.period}
                      </Badge>

                      <h3
                        className={`text-xl lg:text-2xl font-bold ${
                          event.status === "current" ? "text-primary" : ""
                        }`}
                      >
                        {event.role}
                      </h3>

                      <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                        {event.description}
                      </p>

                      {event.highlights && (
                        <div
                          className={`pt-4 mt-4 border-t border-primary/20 space-y-2 ${
                            isLeft ? "lg:text-right" : "lg:text-left"
                          }`}
                        >
                          {event.highlights.map((highlight, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                              style={{
                                justifyContent: isLeft
                                  ? "flex-end"
                                  : "flex-start",
                              }}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full bg-primary ${
                                  isLeft ? "order-2" : "order-1"
                                }`}
                              />
                              <span className={isLeft ? "order-1" : "order-2"}>
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Year Circle with pulse animation */}
                <div className="absolute left-2 lg:left-1/2 transform lg:-translate-x-1/2 flex items-center justify-center z-10">
                  <div
                    className={`w-16 h-16 lg:w-20 lg:h-20 bg-background border-4 rounded-full flex items-center justify-center transition-all duration-500 ${
                      event.status === "current"
                        ? "border-primary shadow-lg shadow-primary/50"
                        : "border-primary/50"
                    } ${isVisible ? "scale-100" : "scale-75"}`}
                  >
                    <span
                      className={`text-base lg:text-xl font-bold ${
                        event.status === "current"
                          ? "text-primary"
                          : "text-primary/70"
                      }`}
                    >
                      {event.year}
                    </span>
                  </div>

                  {/* Pulse ring for current position */}
                  {event.status === "current" && isVisible && (
                    <div className="absolute w-16 h-16 lg:w-20 lg:h-20 border-2 border-primary rounded-full animate-ping opacity-75" />
                  )}
                </div>

                {/* Empty space for the other side - only on desktop */}
                <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16 pt-8 border-t border-primary/20">
          <p className="text-muted-foreground italic">
            Focused on building reliable products, leading efficient teams, and
            delivering with excellence
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
