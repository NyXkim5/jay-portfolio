// src/sections/Engineering.tsx
import React, { useEffect, useState } from "react";
import Section from "../components/layout/Section";
import PhasedArrayEmitter from "../components/ui/PhasedArrayEmitter";
import { useHardwareSpecs } from "../hooks/useHardwareSpecs";

// Scrambling ticker component
const ScrambleTicker: React.FC<{ phrases: string[] }> = ({ phrases }) => {
  const [display, setDisplay] = useState(phrases[0]);

  useEffect(() => {
    let rafId: number;
    let frame = 0;
    let index = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·- ";

    const loop = () => {
      frame += 1;

      if (frame % 180 === 0) {
        index = (index + 1) % phrases.length;
      }

      const base = phrases[index];
      const progress = (frame % 60) / 60;
      const scrambleCount = Math.floor(base.length * (1 - progress * progress));

      let next = "";
      for (let i = 0; i < base.length; i += 1) {
        if (i < scrambleCount) {
          next += chars[Math.floor(Math.random() * chars.length)];
        } else {
          next += base[i];
        }
      }

      setDisplay(next);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [phrases]);

  return (
    <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-zinc-500">
      <span className="w-1.5 h-1.5 bg-white" />
      <span className="whitespace-nowrap overflow-hidden text-ellipsis font-mono">
        {display}
      </span>
    </div>
  );
};

// Signature ticker component for Jay Kim
const SignatureTicker: React.FC = () => {
  const [display, setDisplay] = useState("JAY KIM");
  const signatures = [
    "JAY KIM",
    "김재이", // Korean
    "ジェイ・キム", // Japanese
    "01001010 01001011", // Binary JK
    "JAY KIM",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % signatures.length;
      setDisplay(signatures[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-[8px] tracking-[0.25em] text-zinc-600 font-mono">
      <div className="w-1.5 h-1.5 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
      <span>{display}</span>
    </div>
  );
};

const EngineeringSection: React.FC = () => {
  const { processor, memory, graphics } = useHardwareSpecs();

  return (
    <Section id="engineering" kicker="NOTES FROM THE LAB" title="ENGINEERING">
      <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-stretch">
        {/* Left: text card */}
        <div className="relative flex min-h-[520px] flex-col justify-between border border-neutral-800 bg-black/80 px-10 py-10">
          <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
            <p>
              I got really into drones during my first two years at UCI, where I
              was president of the Unmanned Aerial Vehicles club. We spent most
              of our time building racing quads and working on autonomous
              systems.
            </p>

            <p>
              The best projects were the ones where we had to figure stuff out
              ourselves. Building custom flight stacks, tweaking control loops
              until the flight felt right, testing different configurations. It
              was less about following tutorials and more about trial and error
              until something worked.
            </p>

            <p>
              What really interests me is how drones are being used in the
              military. operations. ISR missions, autonomous delivery systems,
              coordinated swarms. I want to work on platforms that do real jobs
              in the field, not just hobby projects.
            </p>

            <p>
              Long term, I want to get into defense contracting or work at a
              company building UAV systems for actual use cases. Hands-on
              experience with production hardware, autopilot systems, mission
              software. That's where I see myself going and what I'm working on.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-6">
            <SignatureTicker />
          </div>

          {/* tags row */}
          <div className="mt-8 flex flex-wrap gap-6 text-xs font-medium tracking-[0.28em] uppercase">
            <div className="flex items-center gap-3">
              <span className="h-[7px] w-[7px] bg-white" />
              <span className="text-zinc-400">HARDWARE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-[7px] w-[7px] bg-white" />
              <span className="text-zinc-400">FULL STACK</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-[7px] w-[7px] bg-white" />
              <span className="text-zinc-400">UI/UX</span>
            </div>
          </div>

          {/* three-column footer */}
          <div className="mt-10 grid gap-10 border-t border-neutral-800 pt-8 text-[11px] uppercase tracking-[0.25em] text-zinc-400 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-xs text-zinc-500">PLAN</div>
              <div className="space-y-[2px] normal-case tracking-normal text-[11px] text-zinc-400">
                <p>X</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-zinc-500">TEST</div>
              <div className="space-y-[2px] normal-case tracking-normal text-[11px] text-zinc-400">
                <p>Y</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-zinc-500">LAUNCH</div>
              <div className="space-y-[2px] normal-case tracking-normal text-[11px] text-zinc-400">
                <p>Z</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: visualization cards */}
        <div className="flex flex-col gap-4">
          {/* Phased Array Card */}
          <div className="relative border border-neutral-800 bg-black/90 p-5">
            {/* Top header bar */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-white font-mono">
                  PHASED ARRAY LAB
                </div>
                <div className="text-[8px] text-zinc-600">·</div>
                <div className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 font-mono">
                  BEAM STEERING
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="text-[8px] tracking-[0.2em] text-zinc-500 font-mono">
                  LIVE
                </div>
              </div>
            </div>

            {/* Main Canvas Frame */}
            <div className="relative border border-neutral-800 bg-black h-64 mb-3">
              {/* Corner brackets - sharp 90 degree */}
              <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-white/60" />
              <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-white/60" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-white/60" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-white/60" />

              <PhasedArrayEmitter />
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
              <ScrambleTicker
                phrases={[
                  "DIAGNOSTIC · 診断 · 32-CH · SAFE LOOP",
                  "实时 · APERTURE · 32通道 · 合成",
                  "EN VIVO · 診断 · SYSTEME · 32-CH",
                ]}
              />
              <div className="text-[8px] tracking-[0.25em] text-zinc-600 font-mono">
                SYS-A4
              </div>
            </div>
          </div>

          {/* Drone Image Card */}
          <div className="relative border border-neutral-800 bg-black/90 p-5">
            {/* Top header bar */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-4">
                <div className="text-[9px] tracking-[0.3em] uppercase text-white font-mono">
                  UAV PLATFORM
                </div>
                <div className="text-[8px] text-zinc-600">·</div>
                <div className="text-[8px] tracking-[0.25em] uppercase text-zinc-600 font-mono">
                  QUADCOPTER
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white" />
                <div className="text-[8px] tracking-[0.2em] text-zinc-500 font-mono">
                  SCHEMATIC
                </div>
              </div>
            </div>

            {/* Main Canvas Frame with Drone Image */}
            <div className="relative border border-neutral-800 bg-black h-64 mb-3 flex items-center justify-center p-4 overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-white/60" />
              <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-white/60" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-white/60" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-white/60" />

              {/* Animated orange glow that moves up and down */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(249, 115, 22, 0.4) 50%, transparent 100%)",
                  animation: "droneGlow 3s ease-in-out infinite",
                }}
              />

              {/* Drone Image - inverted for black background */}
              <img
                src={`${import.meta.env.BASE_URL}Media/Drone.png`}
                alt="Quadcopter Drone Technical Diagram"
                className="max-w-full max-h-full object-contain relative z-10"
                style={{ filter: "invert(1) brightness(0.9)" }}
              />

              <style>{`
                @keyframes droneGlow {
                  0%, 100% {
                    transform: translateY(-100%);
                    opacity: 0.2;
                  }
                  50% {
                    transform: translateY(100%);
                    opacity: 0.4;
                  }
                }
              `}</style>
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
              <ScrambleTicker
                phrases={[
                  "BRUSHLESS · 无刷 · MOTORS · 4S LIPO",
                  "FLIGHT CTRL · 飞控 · PID · TUNING",
                  "AUTONOMOUS · 自主 · MISSION · READY",
                ]}
              />
              <div className="text-[8px] tracking-[0.25em] text-zinc-600 font-mono">
                UAV-01
              </div>
            </div>
          </div>

          {/* Status bar - Lab online indicator */}
          <div className="border border-neutral-800 bg-black/60 p-3 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <div className="text-[9px] tracking-[0.3em] uppercase text-white font-mono">
                  IN THE LAB
                </div>
              </div>
              <div className="text-[8px] tracking-[0.25em] text-zinc-600 font-mono">
                ONLINE
              </div>
            </div>
          </div>

          {/* Bottom data grid - Real hardware specs */}
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-neutral-800 bg-black/60 p-4 relative">
              <div className="absolute top-2 right-2 w-8 h-8 border border-white/20" />
              <div className="text-[8px] tracking-[0.3em] text-zinc-600 mb-2 font-mono">
                PROCESSOR
              </div>
              <div className="text-sm text-white font-mono">{processor}</div>
            </div>
            <div className="border border-neutral-800 bg-black/60 p-4 relative">
              <div className="absolute top-2 right-2 w-8 h-8 border border-white/20" />
              <div className="text-[8px] tracking-[0.3em] text-zinc-600 mb-2 font-mono">
                MEMORY
              </div>
              <div className="text-sm text-white font-mono">{memory}</div>
            </div>
            <div className="border border-neutral-800 bg-black/60 p-4 relative">
              <div className="absolute top-2 right-2 w-8 h-8 border border-white/20" />
              <div className="text-[8px] tracking-[0.3em] text-zinc-600 mb-2 font-mono">
                GRAPHICS
              </div>
              <div className="text-sm text-white font-mono">{graphics}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EngineeringSection;
