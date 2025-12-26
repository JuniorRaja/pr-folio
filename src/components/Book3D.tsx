interface Book3DProps {
  coverImage: string;
  title: string;
  spineColor?: string;
  textColor?: string;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

const Book3D = ({
  coverImage,
  title,
  spineColor = '#2b2326',
  textColor = '#d5d5d5',
  isHovered = false,
  onHover,
}: Book3DProps) => {
  const filterId = `paper-${title.replace(/\s/g, '-')}`;

  // Responsive dimensions
  const width = 140; // Smaller for better fit
  const height = 190;
  const spineWidth = 35;

  // When hovered, spine shrinks and rotates more
  const currentSpineWidth = isHovered ? spineWidth * 0.4 : spineWidth;
  const spineRotation = isHovered ? -60 : -30;
  const coverRotation = isHovered ? 30 : 81;

  return (
    <div
      className="relative cursor-pointer select-none"
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      {/* SVG Filter for paper texture */}
      <svg className="absolute inset-0 invisible" aria-hidden="true">
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="8" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>

      <div
        className="flex flex-row"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Spine with curved effect */}
        <div
          className="flex items-start justify-center overflow-hidden relative"
          style={{
            width: currentSpineWidth,
            height,
            backgroundColor: spineColor,
            color: textColor,
            transformStyle: 'preserve-3d',
            transformOrigin: 'right center',
            transform: `rotateY(${spineRotation}deg)`,
            filter: 'brightness(0.9) contrast(1.3)',
            transition: 'all 500ms ease',
            userSelect: 'none',
            flexShrink: 0,
            borderRadius: '4px 0 0 4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {/* Curved spine highlight - left edge */}
          <span
            className="pointer-events-none absolute left-0 top-0 bottom-0 z-20"
            style={{
              width: '6px',
              background: `linear-gradient(to right, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.05) 40%,
                transparent 100%)`,
            }}
          />
          {/* Curved spine shadow - subtle depth */}
          <span
            className="pointer-events-none absolute right-0 top-0 bottom-0 z-20"
            style={{
              width: '8px',
              background: `linear-gradient(to left, 
                rgba(0,0,0,0.12) 0%, 
                rgba(0,0,0,0.05) 50%,
                transparent 100%)`,
            }}
          />
          {/* Center ridge highlight */}
          <span
            className="pointer-events-none absolute top-0 bottom-0 z-20"
            style={{
              left: '45%',
              width: '3px',
              background: `linear-gradient(to right, 
                transparent 0%,
                rgba(255,255,255,0.06) 50%,
                transparent 100%)`,
            }}
          />
          {/* Paper texture overlay */}
          <span
            className="pointer-events-none absolute z-10 opacity-40"
            style={{
              width: spineWidth,
              height,
              filter: `url(#${filterId})`,
            }}
          />
          {/* Title */}
          <h2
            className="select-none overflow-hidden text-ellipsis whitespace-nowrap relative z-30"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: '1em',
              writingMode: 'vertical-rl',
              marginTop: '10px',
              maxHeight: height - 20,
              transition: 'opacity 300ms ease',
              opacity: isHovered ? 0 : 1,
              textShadow: '0 1px 1px rgba(0,0,0,0.1)',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Cover */}
        <div
          className="relative overflow-hidden"
          style={{
            width,
            height,
            transformStyle: 'preserve-3d',
            transformOrigin: 'left',
            transform: `rotateY(${coverRotation}deg)`,
            filter: isHovered ? 'brightness(1) contrast(1)' : 'brightness(0.9) contrast(1.2)',
            transition: 'all 500ms ease',
            userSelect: 'none',
            flexShrink: 0,
            borderRadius: '0 3px 3px 0',
            boxShadow: isHovered
              ? '4px 4px 12px rgba(0,0,0,0.25)'
              : '2px 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          {/* Paper texture overlay */}
          <span
            className="pointer-events-none absolute inset-0 z-10 opacity-30"
            style={{
              filter: `url(#${filterId})`,
            }}
          />
          {/* Spine edge highlight - softer book binding effect */}
          <span
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background: `linear-gradient(to right, 
                rgba(0,0,0,0.2) 0px,
                rgba(0,0,0,0.1) 2px,
                rgba(255,255,255,0.3) 3px, 
                rgba(255,255,255,0.15) 5px, 
                transparent 8px)`,
              borderRadius: '0 3px 3px 0',
            }}
          />
          {/* Cover image */}
          <img
            src={coverImage}
            alt={`${title} Cover`}
            className="w-full h-full object-cover select-none"
            style={{
              borderRadius: '0 3px 3px 0',
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Book3D;
