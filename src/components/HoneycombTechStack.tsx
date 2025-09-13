import React, { useState } from 'react';

interface TechItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const HoneyComb: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const techStack: TechItem[] = [
    { id: 1, name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500', description: 'UI Library' },
    { id: 2, name: 'TypeScript', icon: '📘', color: 'from-blue-500 to-blue-700', description: 'Type Safety' },
    { id: 3, name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-700', description: 'Backend Runtime' },
    { id: 4, name: 'Tailwind', icon: '🎨', color: 'from-teal-400 to-cyan-600', description: 'CSS Framework' },
    { id: 5, name: 'Next.js', icon: '▲', color: 'from-gray-700 to-black', description: 'React Framework' },
    { id: 6, name: 'GraphQL', icon: '◈', color: 'from-pink-500 to-purple-600', description: 'Query Language' },
    { id: 7, name: 'Docker', icon: '🐳', color: 'from-blue-400 to-blue-600', description: 'Containerization' },
    { id: 8, name: 'MongoDB', icon: '🍃', color: 'from-green-400 to-green-600', description: 'NoSQL Database' },
    { id: 9, name: 'Redis', icon: '♦️', color: 'from-red-500 to-red-700', description: 'Cache & Queue' },
    { id: 10, name: 'AWS', icon: '☁️', color: 'from-orange-400 to-orange-600', description: 'Cloud Platform' },
    { id: 11, name: 'Python', icon: '🐍', color: 'from-yellow-400 to-blue-600', description: 'ML & Scripts' },
    { id: 12, name: 'Kubernetes', icon: '☸️', color: 'from-blue-600 to-indigo-700', description: 'Orchestration' },
    { id: 13, name: 'Jest', icon: '🃏', color: 'from-red-600 to-orange-500', description: 'Testing' },
    { id: 14, name: 'Webpack', icon: '📦', color: 'from-sky-400 to-blue-600', description: 'Bundler' },
    { id: 15, name: 'Git', icon: '🔀', color: 'from-orange-600 to-red-600', description: 'Version Control' },
    { id: 16, name: 'Nginx', icon: '🌐', color: 'from-green-600 to-green-800', description: 'Web Server' },
    { id: 17, name: 'Postgres', icon: '🐘', color: 'from-blue-400 to-indigo-600', description: 'SQL Database' },
    { id: 18, name: 'Vite', icon: '⚡', color: 'from-purple-500 to-yellow-500', description: 'Build Tool' },
    { id: 19, name: 'Prisma', icon: '◇', color: 'from-teal-500 to-indigo-600', description: 'ORM' },
  ];

  // Calculate positions for honeycomb layout
  const getHexPosition = (index: number) => {
    const positions = [
      // Row 1 (3 hexes)
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      // Row 2 (4 hexes)
      { row: 1, col: 0.5 },
      { row: 1, col: 1.5 },
      { row: 1, col: 2.5 },
      { row: 1, col: 3.5 },
      // Row 3 (5 hexes)
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      // Row 4 (4 hexes)
      { row: 3, col: 0.5 },
      { row: 3, col: 1.5 },
      { row: 3, col: 2.5 },
      { row: 3, col: 3.5 },
      // Row 5 (3 hexes)
      { row: 4, col: 1 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
    ];
    
    return positions[index] || { row: 0, col: 0 };
  };

  return (
    <div className="min-h-screen items-center justify-center p-8">
      <div className="relative">
        
        <div className="relative w-[800px] h-[600px] mx-auto">
          {techStack.map((tech, index) => {
            const pos = getHexPosition(index);
            const hexSize = 100;
            const hexWidth = hexSize * 2;
            const hexHeight = hexSize * 1.732;
            
            // Calculate pixel positions
            const left = pos.col * (hexWidth * 0.55) + 50;
            const top = pos.row * (hexHeight * 0.5) + 50;
            
            return (
              <div
                key={tech.id}
                className="absolute group"
                style={{
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${hexSize}px`,
                  height: `${hexSize}px`,
                }}
                onMouseEnter={() => setHoveredId(tech.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hexagon Container */}
                <div className="relative w-full h-full">
                  {/* Hexagon Shape */}
                  <div className="absolute inset-0">
                    <div className="hexagon-outer">
                      <div className={`hexagon-inner bg-gradient-to-br ${tech.color} ${hoveredId === tech.id ? 'scale-110' : ''} transition-all duration-300 ease-in-out`}>
                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <span className="text-3xl mb-1">{tech.icon}</span>
                          <span className="text-xs font-bold">{tech.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Tooltip */}
                  {hoveredId === tech.id && (
                    <div className="absolute z-20 -top-15 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white px-3 py-2 rounded-lg whitespace-nowrap animate-fadeIn">
                      <div className="text-sm font-semibold">{tech.name}</div>
                      <div className="text-xs text-gray-300">{tech.description}</div>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black opacity-90"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Floating particles for ambiance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .hexagon-outer {
          width: 100%;
          height: 100%;
          position: relative;
          transform: rotate(30deg);
        }
        
        .hexagon-inner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          transform: rotate(-30deg);
          clip-path: polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          );
          box-shadow: 
            0 0 15px rgba(139, 92, 246, 0.1),
            inset 0 0 15px rgba(139, 92, 246, 0.05);
        }
        
        .hexagon-inner:hover {
          box-shadow: 
            0 0 25px rgba(168, 85, 247, 0.3),
            0 0 40px rgba(168, 85, 247, 0.15),
            inset 0 0 15px rgba(168, 85, 247, 0.1);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HoneyComb;