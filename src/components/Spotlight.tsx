import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
  children: React.ReactNode;
}

const Spotlight = ({ className, fill = "rgba(255,255,255,0.3)", children }: SpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      divRef.current.style.setProperty("--mouse-x", `${ev.clientX - rect.left}px`);
      divRef.current.style.setProperty("--mouse-y", `${ev.clientY - rect.top}px`);
    };

    divRef.current?.addEventListener("mousemove", updateMousePosition);

    return () => {
      divRef.current?.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br from-background to-background/90 border border-border/20 p-8 shadow-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:content-['']",
        "before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),_var(--spotlight-color),transparent_40%)]",
        "before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className
      )}
      style={
        {
          "--spotlight-color": fill,
        } as React.CSSProperties
      }
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Spotlight;