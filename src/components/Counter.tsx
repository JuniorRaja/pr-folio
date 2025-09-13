import { useState, useEffect, useRef } from "react";

interface CounterProps {
  startDate: string;
  interval?: number;
  fontSize?: string;
}

const Counter = ({ startDate, interval = 100, fontSize = "text-3xl" }: CounterProps) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const updateValue = () => {
      const start = new Date(startDate);
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      const newValue = diff / (1000 * 60 * 60 * 24 * 365.25);
      setValue(newValue);
      console.log(newValue);
    };

    updateValue();
    const timer = setInterval(updateValue, interval);
    return () => clearInterval(timer);
  }, [isVisible, startDate, interval]);

  return (
    <div ref={counterRef} className={`${fontSize} font-bold gradient-text`}>
      {value.toFixed(8)}
    </div>
  );
};

export default Counter;