import React from "react";
import { Leaf } from "lucide-react";

const CinematicAtmosphere = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes cinematic-fall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
          10% { opacity: var(--max-op); }
          90% { opacity: var(--max-op); }
          100% { transform: translate3d(var(--drift), 110vh, 0) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes cinematic-rise {
          0% { transform: translate3d(0, 110vh, 0) scale(var(--scale)); opacity: 0; }
          20% { opacity: var(--max-op); }
          80% { opacity: var(--max-op); }
          100% { transform: translate3d(var(--drift), -10vh, 0) scale(var(--scale)); opacity: 0; }
        }
        @keyframes flight-path {
          0% { transform: translate3d(0, 110vh, 0) rotate(var(--angle)); opacity: 0; }
          15% { opacity: var(--max-op); }
          85% { opacity: var(--max-op); }
          100% { transform: translate3d(var(--drift), -20vh, 0) rotate(var(--angle-end)); opacity: 0; }
        }
        @keyframes wing-flap {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.15); }
        }
        @keyframes god-rays {
          0% { transform: translateX(-150%) translateY(-50%) rotate(35deg); opacity: 0; }
          30% { opacity: var(--max-op); }
          70% { opacity: var(--max-op); }
          100% { transform: translateX(250%) translateY(50%) rotate(35deg); opacity: 0; }
        }
      `}</style>

      {/* 1. Volumetric God Rays */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`ray-${i}`}
          className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-white to-transparent blur-[40px] mix-blend-overlay"
          style={{
            width: `${20 + i * 15}%`,
            animation: `god-rays ${25 + i * 10}s linear infinite`,
            animationDelay: `-${i * 7}s`,
            "--max-op": 0.15 + i * 0.05,
          }}
        />
      ))}

      {/* 2. Ambient Pollen */}
      {[...Array(45)].map((_, i) => {
        const left = (i * 13) % 100;
        const delay = (i * 3) % 20;
        const duration = 15 + (i % 15);
        return (
          <div
            key={`pollen-${i}`}
            className="absolute top-0 rounded-full bg-white blur-[1px]"
            style={{
              left: `${left}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              animation: `cinematic-rise ${duration}s ease-in-out infinite`,
              animationDelay: `-${delay}s`,
              "--drift": `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 50))}px`,
              "--max-op": 0.15 + (i % 5) * 0.1,
              "--scale": 0.5 + (i % 3) * 0.5,
            }}
          />
        );
      })}

      {/* 3. Parallax Leaves */}
      {[...Array(40)].map((_, i) => {
        const left = (i * 17) % 100;
        const delay = (i * 2) % 25;
        const duration = 20 + (i % 20);
        const isForeground = i % 4 === 0;
        const isBackground = i % 3 === 0;

        return (
          <div
            key={`leaf-${i}`}
            className={`absolute top-0 text-[#122b1c] ${isForeground ? "blur-[3px] z-20" : isBackground ? "blur-[1px] z-0" : "z-10"}`}
            style={{
              left: `${left}%`,
              animation: `cinematic-fall ${duration}s linear infinite`,
              animationDelay: `-${delay}s`,
              "--drift": `${(i % 2 === 0 ? 1 : -1) * (50 + (i % 100))}px`,
              "--rot": `${(i % 2 === 0 ? 1 : -1) * (180 + (i % 360))}deg`,
              "--max-op": isForeground ? 0.08 : 0.04,
            }}
          >
            <Leaf
              size={isForeground ? 48 + (i % 20) : 16 + (i % 16)}
              strokeWidth={1.5}
            />
          </div>
        );
      })}

      {/* 4. Butterflies */}
      {[...Array(15)].map((_, i) => {
        const left = (i * 29) % 100;
        const delay = (i * 4) % 30;
        const duration = 25 + (i % 15);
        const scale = 0.6 + (i % 4) * 0.15;

        return (
          <div
            key={`butterfly-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${left}%`,
              animation: `flight-path ${duration}s ease-in-out infinite`,
              animationDelay: `-${delay}s`,
              "--drift": `${(i % 2 === 0 ? 1 : -1) * (100 + (i % 150))}px`,
              "--angle": `${-15 + (i % 30)}deg`,
              "--angle-end": `${15 - (i % 30)}deg`,
              "--max-op": 0.1 + (i % 3) * 0.03,
              transform: `scale(${scale})`,
            }}
          >
            <div
              style={{
                animation: `wing-flap ${1.5 + (i % 2)}s ease-in-out infinite`,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#0b1a11"
                className="w-6 h-6 drop-shadow-sm"
              >
                <path d="M11.996 21.033c-1.373-3.692-4.58-6.195-7.794-8.083-2.012-1.182-3.203-2.834-3.203-4.545 0-2.88 2.272-4.568 4.708-4.14 1.83.32 3.864 2.112 5.568 4.675.29.435.538.895.72 1.378.183-.483.43-.943.72-1.378 1.704-2.563 3.738-4.355 5.568-4.675 2.436-.428 4.708 1.26 4.708 4.14 0 1.71-1.19 3.363-3.202 4.545-3.214 1.888-6.421 4.39-7.793 8.083z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CinematicAtmosphere;
