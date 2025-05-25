import React from 'react';

const FloatingDoodles: React.FC = () => {
  // Doodle Lines และ Shapes แทนรูป NFT
  const doodleLines = [
    {
      id: 1,
      path: "M10 30 Q 30 10 50 30 Q 70 50 90 30 Q 110 10 130 30",
      position: 'top-20 left-16',
      color: 'stroke-purple-300',
      opacity: 'opacity-40',
      animation: 'animate-float',
      delay: '0s',
      strokeWidth: '2'
    },
    {
      id: 2,
      path: "M20 20 C 40 5, 60 35, 80 20 C 100 5, 120 35, 140 20",
      position: 'top-1/3 right-20',
      color: 'stroke-pink-300',
      opacity: 'opacity-35',
      animation: 'animate-bounce-slow',
      delay: '2s',
      strokeWidth: '2.5'
    },
    {
      id: 3,
      path: "M15 25 Q 25 5 35 25 T 55 25 T 75 25",
      position: 'bottom-1/3 left-20',
      color: 'stroke-blue-300',
      opacity: 'opacity-30',
      animation: 'animate-wiggle',
      delay: '4s',
      strokeWidth: '2'
    },
    {
      id: 4,
      path: "M10 40 C 30 20, 50 60, 70 40 C 90 20, 110 60, 130 40",
      position: 'bottom-20 right-16',
      color: 'stroke-green-300',
      opacity: 'opacity-25',
      animation: 'animate-pulse-soft',
      delay: '6s',
      strokeWidth: '2'
    },
    {
      id: 5,
      path: "M20 15 Q 40 30 60 15 Q 80 0 100 15 Q 120 30 140 15",
      position: 'top-1/2 left-10',
      color: 'stroke-yellow-300',
      opacity: 'opacity-20',
      animation: 'animate-float',
      delay: '1s',
      strokeWidth: '1.5'
    },
    {
      id: 6,
      path: "M25 35 C 35 15, 45 55, 55 35 C 65 15, 75 55, 85 35",
      position: 'top-40 right-1/4 hidden lg:block',
      color: 'stroke-orange-300',
      opacity: 'opacity-30',
      animation: 'animate-bounce-slow',
      delay: '3s',
      strokeWidth: '2'
    }
  ];

  // Abstract flowing patterns
  const abstractPatterns = [
    {
      id: 1,
      type: 'blob',
      size: 'w-32 h-32 md:w-40 md:h-40',
      position: 'top-10 left-10',
      color: 'bg-gradient-to-br from-purple-100 to-pink-100',
      animation: 'animate-float',
      delay: '1s',
      opacity: 'opacity-20',
      blur: 'blur-sm'
    },
    {
      id: 2,
      type: 'blob',
      size: 'w-24 h-24 md:w-32 md:h-32',
      position: 'top-1/3 right-12',
      color: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      animation: 'animate-bounce-slow',
      delay: '3s',
      opacity: 'opacity-15',
      blur: 'blur-sm'
    },
    {
      id: 3,
      type: 'blob',
      size: 'w-28 h-28 md:w-36 md:h-36',
      position: 'bottom-1/4 left-16',
      color: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      animation: 'animate-pulse-soft',
      delay: '5s',
      opacity: 'opacity-10',
      blur: 'blur-sm'
    }
  ];

  // Hand-drawn style decorative elements
  const doodleShapes = [
    {
      id: 1,
      type: 'star',
      path: "M50 10 L55 35 L80 35 L60 55 L65 80 L50 65 L35 80 L40 55 L20 35 L45 35 Z",
      position: 'top-32 left-1/3',
      color: 'fill-purple-200 stroke-purple-400',
      opacity: 'opacity-25',
      animation: 'animate-wiggle',
      delay: '2s',
      size: 'w-16 h-16 md:w-20 md:h-20'
    },
    {
      id: 2,
      type: 'heart',
      path: "M50 80 C30 65, 10 45, 10 25 C10 15, 20 5, 30 5 C40 5, 50 15, 50 15 C50 15, 60 5, 70 5 C80 5, 90 15, 90 25 C90 45, 70 65, 50 80 Z",
      position: 'bottom-40 right-1/3 hidden md:block',
      color: 'fill-pink-200 stroke-pink-400',
      opacity: 'opacity-20',
      animation: 'animate-float',
      delay: '4s',
      size: 'w-12 h-12 md:w-16 md:h-16'
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Abstract Blob Patterns */}
      {abstractPatterns.map((pattern) => (
        <div
          key={`pattern-${pattern.id}`}
          className={`absolute ${pattern.size} ${pattern.position} ${pattern.animation} ${pattern.opacity} ${pattern.blur} transition-opacity duration-300`}
          style={{ 
            animationDelay: pattern.delay,
            animationDuration: '8s'
          }}
        >
          <div 
            className={`w-full h-full ${pattern.color} rounded-full`}
            style={{
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
            }}
          ></div>
        </div>
      ))}

      {/* Doodle Lines */}
      {doodleLines.map((line) => (
        <div
          key={`line-${line.id}`}
          className={`absolute ${line.position} w-40 h-20 md:w-48 md:h-24 ${line.opacity} ${line.animation}`}
          style={{ 
            animationDelay: line.delay,
            animationDuration: '10s'
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 150 50">
            <path
              d={line.path}
              className={line.color}
              strokeWidth={line.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}

      {/* Hand-drawn Shapes */}
      {doodleShapes.map((shape) => (
        <div
          key={`shape-${shape.id}`}
          className={`absolute ${shape.position} ${shape.size} ${shape.opacity} ${shape.animation}`}
          style={{ 
            animationDelay: shape.delay,
            animationDuration: '6s'
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d={shape.path}
              className={shape.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}

      {/* Floating Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingDoodles; 