// src/sections/Hero.tsx
import { useEffect, useState } from "react";
import Section from "../components/layout/Section";

// Component that cycles through name translations
const NameCycler = () => {
  const names = [
    "Jay Kim",
    "김준혁", // Korean
    "ジェイ・キム", // Japanese
    "金俊赫", // Chinese
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block transition-opacity duration-300"
      style={{ minWidth: "220px", textAlign: "left" }}
    >
      {names[index]}
    </span>
  );
};

const Hero = () => {
  return (
    <Section id="hero" title="">
      <div className="-mt-16 relative min-h-[80vh] bg-black">
        {/* Background video – pushed low so it's not behind hero text */}
        <video
          className="
            pointer-events-none
            absolute inset-x-0 top-40 bottom-0
            h-full w-full object-contain opacity-70
          "
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Media/unicorn-1763271003836.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay with orange tint - lighter for better video visibility */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 top-40 bottom-0
            bg-gradient-to-br from-black/30 via-orange-950/3 to-black/40
          "
        />

        {/* Foreground hero content */}
        <div className="relative z-10 max-w-5xl pt-12 pb-24 pr-6">
          {/* Orange accent bar before text */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-0.5 bg-orange-500" />
            <p className="text-[0.65rem] tracking-[0.35em] uppercase text-orange-400 font-semibold">
              Computer Engineering <span className="text-orange-500/60">•</span>{" "}
              Product <span className="text-orange-500/60">•</span> Full-stack
            </p>
          </div>

          <h1
            className="
              mt-3
              text-[3.3rem] sm:text-[3.8rem] lg:text-[4.2rem]
              font-extrabold leading-[1.02] text-zinc-50
            "
          >
            <NameCycler />
            {", third-year Computer Engineering at UC Irvine."}
          </h1>

          {/* Orange glow indicator */}
          <div className="mt-8 flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.7)] animate-pulse" />
            <div className="text-xs tracking-[0.3em] uppercase text-orange-400/80 font-mono">
              ONLINE
            </div>
          </div>

          <p
            className="mt-6 max-w-2xl text-sm sm:text-base text-orange-400 font-bold"
            style={{
              textShadow:
                "0 0 30px rgba(251, 146, 60, 0.8), 0 0 15px rgba(251, 146, 60, 0.6)",
            }}
          >
            Was president of UCI's Unmanned Aerial Vehicles club, logistics for
            Hack at UCI, and interned as a Design Intern at Cyber@UCI and Office
            Outreach Intern at ASUCI.
          </p>

          <p
            className="mt-3 max-w-2xl text-sm sm:text-base text-orange-400 font-bold"
            style={{
              textShadow:
                "0 0 30px rgba(251, 146, 60, 0.8), 0 0 15px rgba(251, 146, 60, 0.6)",
            }}
          >
            I build full-stack apps at Archv and work on the Marketing Team for
            Artificial Intelligence at UCI.
          </p>

          <p
            className="mt-3 max-w-2xl text-sm sm:text-base text-orange-400 font-bold"
            style={{
              textShadow:
                "0 0 30px rgba(251, 146, 60, 0.8), 0 0 15px rgba(251, 146, 60, 0.6)",
            }}
          >
            Now I focus on autonomy systems, defense tech, and full-stack
            products.
          </p>

          {/* Bottom accent line */}
          <div className="mt-8 flex items-center gap-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-orange-500 to-transparent" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-mono"></span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
