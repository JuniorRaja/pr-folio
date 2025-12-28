import { useState, useEffect, useRef, useCallback } from "react";

interface CounterProps {
  startDate: string;
  interval?: number;
  fontSize?: string;
}

const Counter = ({ startDate, interval = 100, fontSize = "text-3xl" }: CounterProps) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(new Date(startDate).getTime());

  const updateValue = useCallback(() => {
    const now = Date.now();
    const diff = now - startTime.current;
    const newValue = diff / (1000 * 60 * 60 * 24 * 365.25);
    setValue(newValue);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    updateValue();
    const timer = setInterval(updateValue, interval);
    return () => clearInterval(timer);
  }, [isVisible, interval, updateValue]);

  // Split the number into individual digits for odometer effect
  const formattedValue = value.toFixed(9);
  const digits = formattedValue.split('');

  return (
    <div ref={counterRef} className={`${fontSize} font-bold gradient-text inline-flex items-center justify-center`}>
      {digits.map((digit, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-300 ease-out ${
            digit === '.' ? 'w-auto' : 'w-[0.6em] text-center'
          }`}
          style={{
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          <span className="inline-block animate-fade-in">
            {digit}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Counter;