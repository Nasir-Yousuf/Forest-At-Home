import { motion } from "framer-motion";
import { useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

function FloatingLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-green-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            opacity: 0.5,
          }}
          animate={{
            y: window.innerHeight + 50,
            x: "+=50",
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

import { useState } from "react";
import { Howl } from "howler";

const sound = new Howl({
  src: ["/sounds/forest.mp3"],
  loop: true,
  volume: 0.5,
});

function SoundController() {
  const [playing, setPlaying] = useState(false);

  const toggleSound = () => {
    if (playing) {
      sound.pause();
    } else {
      sound.play();
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-5 right-5 bg-white/20 backdrop-blur p-3 rounded-full"
    >
      {playing ? "🔊" : "🔇"}
    </button>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Light rays */}
      <motion.div
        className="absolute w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45"
        animate={{ x: ["-50%", "50%"] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Dust particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".tree",
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 2, ease: "power3.out" },
    );
  }, []);

  return (
    <section className="h-screen flex items-center justify-center relative">
      <FloatingLeaves />

      {/* Tree */}
      <motion.img
        src="/images/hero-tree.png"
        className="tree absolute bottom-0 w-[300px] md:w-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Text */}
      <div className="z-10 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Forest At Home
        </motion.h1>

        <motion.p
          className="mt-4 text-lg opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Bring nature into your living space 🌿
        </motion.p>

        <motion.button
          onClick={() => navigate("/plants")}
          className="mt-6 px-6 py-3 bg-leaf rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          Explore Plants
        </motion.button>
      </div>
    </section>
  );
}
