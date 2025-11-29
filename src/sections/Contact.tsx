// src/sections/Contact.tsx
import { useEffect, useState } from "react";
import Section from "../components/layout/Section";

// different language versions - wanted to keep it interesting
const HEADER_NAMES = [
  "JOONHYUK NATHANAEL KIM",
  "김준혁 나다나엘 킴", // Korean
  "ジュンヒョク・ナサナエル・キム", // Japanese
  "金俊赫·纳撒内尔·金", // Chinese
  "01001010 01001011", // Binary
];

// cycles through different languages - looks cooler than static text
const GlitchTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [display, setDisplay] = useState(HEADER_NAMES[0]);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % HEADER_NAMES.length;
      const current = HEADER_NAMES[currentIndex];
      const next = HEADER_NAMES[nextIndex];
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789あアㄱ一·";

      let frame = 0;
      const scrambleFrames = 20;

      // scramble effect before switching
      const scrambleInterval = setInterval(() => {
        frame++;

        if (frame >= scrambleFrames) {
          setDisplay(next);
          setCurrentIndex(nextIndex);
          clearInterval(scrambleInterval);
        } else {
          const progress = frame / scrambleFrames;
          let scrambled = "";

          for (let i = 0; i < Math.max(current.length, next.length); i++) {
            if (i < next.length && Math.random() > 1 - progress) {
              scrambled += next[i];
            } else {
              scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          setDisplay(scrambled);
        }
      }, 50);
    }, 3000);

    return () => clearInterval(cycleInterval);
  }, [currentIndex]);

  return <span>{display}</span>;
};

// rotating status codes - figured why not
const STATUS_CODES = ["SYS-OK", "NET-ONLINE", "STATUS-200", "CONN-ACTIVE"];

const StatusTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_CODES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return <span>{STATUS_CODES[index]}</span>;
};

const ContactSection = () => {
  return (
    <Section id="contact" kicker="WHAT'S NEXT" title="CONTACT">
      <div className="mt-10">
        {/* Main contact card */}
        <div className="relative border border-neutral-800 bg-black/80 overflow-hidden">
          {/* Jellyfish video background */}
          <div className="absolute inset-0 opacity-20">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/Media/jellyfish.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Dark overlay to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

          {/* Scan line effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/60 z-10" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/60 z-10" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/60 z-10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/60 z-10" />

          {/* Header bar */}
          <div className="relative z-10 border-b border-neutral-800 px-8 py-4 flex items-center justify-between bg-gradient-to-r from-black/80 via-neutral-950/80 to-black/80">
            <div className="flex items-center gap-4">
              <div className="text-xs tracking-[0.3em] uppercase text-zinc-400 font-mono">
                <GlitchTicker />
              </div>
              <div className="text-[8px] text-orange-500/40">⬢</div>
              <div className="text-[8px] tracking-[0.25em] uppercase text-zinc-700 font-mono">
                <StatusTicker />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" />
              <div className="text-[8px] tracking-[0.25em] uppercase text-orange-400 font-mono">
                AVAILABLE
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="relative z-10 px-8 py-8 space-y-8">
            {/* Intro text */}
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-zinc-300">
              <p>
                How to reach me? Whether you're interested in collaborating on a
                project, have a question about my work, or just want to say
                hello, feel free to get in touch!
              </p>
            </div>

            {/* Contact grid - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 pt-4">
              {/* Email */}
              <div className="relative group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]" />
                  <div className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-mono">
                    EMAIL
                  </div>
                  <div className="ml-auto text-[8px] text-zinc-700 font-mono">
                    001
                  </div>
                </div>
                <a
                  href="mailto:joonhyuk.kim.101@gmail.com"
                  className="block text-sm text-zinc-100 hover:text-orange-400 transition-colors underline decoration-zinc-800 hover:decoration-orange-500 font-mono"
                >
                  joonhyuk.kim.101@gmail.com
                </a>
                <div className="absolute -left-2 top-1/2 w-0.5 h-0 bg-orange-500 group-hover:h-full transition-all duration-300" />
              </div>

              {/* GitHub */}
              <div className="relative group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]" />
                  <div className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-mono">
                    GITHUB
                  </div>
                  <div className="ml-auto text-[8px] text-zinc-700 font-mono">
                    002
                  </div>
                </div>
                <a
                  href="https://github.com/NyXkim5"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-zinc-100 hover:text-orange-400 transition-colors underline decoration-zinc-800 hover:decoration-orange-500 font-mono"
                >
                  github.com/NyXkim5
                </a>
                <div className="absolute -left-2 top-1/2 w-0.5 h-0 bg-orange-500 group-hover:h-full transition-all duration-300" />
              </div>

              {/* LinkedIn */}
              <div className="relative group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]" />
                  <div className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-mono">
                    LINKEDIN
                  </div>
                  <div className="ml-auto text-[8px] text-zinc-700 font-mono">
                    003
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/joonhyuknkim/"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-zinc-100 hover:text-orange-400 transition-colors underline decoration-zinc-800 hover:decoration-orange-500 font-mono"
                >
                  linkedin.com/in/joonhyuknkim
                </a>
                <div className="absolute -left-2 top-1/2 w-0.5 h-0 bg-orange-500 group-hover:h-full transition-all duration-300" />
              </div>

              {/* Startup */}
              <div className="relative group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]" />
                  <div className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase font-mono">
                    STARTUP
                  </div>
                  <div className="ml-auto text-[8px] text-zinc-700 font-mono">
                    004
                  </div>
                </div>
                <a
                  href="https://archvai.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-zinc-100 hover:text-orange-400 transition-colors underline decoration-zinc-800 hover:decoration-orange-500 font-mono"
                >
                  archvai.com
                </a>
                <div className="absolute -left-2 top-1/2 w-0.5 h-0 bg-orange-500 group-hover:h-full transition-all duration-300" />
              </div>
            </div>

            {/* Resume download button */}
            <div className="pt-6 border-t border-neutral-800">
              <a
                href="/Media/ResumeV4.A.pdf"
                download="Jay_Kim_Resume.pdf"
                className="group relative flex items-center justify-between p-4 border border-orange-500/30 bg-black/40 hover:bg-black/60 hover:border-orange-500/60 transition-all duration-300"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-orange-500/40 transition-colors group-hover:border-orange-500/80" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-orange-500/40 transition-colors group-hover:border-orange-500/80" />

                {/* Content */}
                <div className="relative flex items-center gap-3 z-10">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-orange-500/60" />
                    <div className="w-1 h-1 bg-orange-500/40" />
                    <div className="w-1 h-1 bg-orange-500/20" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-orange-500 text-xl">📄</div>
                    <div>
                      <div className="text-[11px] tracking-[0.28em] uppercase text-zinc-200 font-semibold">
                        Download Resume
                      </div>
                      <div className="text-[9px] tracking-[0.24em] uppercase text-zinc-500">
                        PDF · 2025 Edition
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download icon and ID */}
                <div className="relative flex items-center gap-4 z-10">
                  <div className="text-orange-500 text-sm transition-transform group-hover:translate-y-0.5">
                    ⬇
                  </div>
                  <div className="text-[8px] tracking-[0.3em] text-zinc-700 font-mono">
                    ID: NK-2024
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(249,115,22,0.15)]" />
                </div>
              </a>
            </div>

            {/* System info bar */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/50">
              <div className="flex items-center gap-6 text-[8px] text-zinc-700 font-mono">
                <span>PROTOCOL: HTTPS</span>
                <span>⬢</span>
                <span>ENC: TLS/1.3</span>
                <span>⬢</span>
                <span>LAT: 12ms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 via-orange-500/50 to-transparent" />
                <span className="text-[8px] text-orange-500/60 font-mono">
                  READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </Section>
  );
};

export default ContactSection;
