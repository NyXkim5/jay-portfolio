import { useState } from "react";
import Section from "../components/layout/Section";
import { projects } from "../data/projects";

const ProjectsSection = () => {
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const total = projects.length;
  const current = projects[index];
  const isArchv = current.id === "archv";

  const setGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 220);
  };

  const goTo = (nextIndex: number) => {
    setGlitch();
    const normalized = ((nextIndex % total) + total) % total;
    setTimeout(() => {
      setIndex(normalized);
    }, 140); // sync with glitch animation
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  return (
    <Section id="projects" kicker="What I build" title="Selected Projects">
      <p className="mb-8 max-w-3xl text-sm text-zinc-400">
        A mix of startup work, hardware-adjacent projects, and systems
        assignments that shaped how I think about building tools. Archv is the
        main one—it&apos;s the closest thing I&apos;ve built to something that
        could ship into a real firm.
      </p>

      {/* CAROUSEL SHELL */}
      <div
        className={`relative border border-neutral-800 bg-black/80
                    px-4 py-4 md:px-6 md:py-5 glitch-shell ${
                      isGlitching ? "glitch-shell--active" : ""
                    }`}
      >
        <div className="glitch-overlay pointer-events-none" />

        {/* Orange accent corners */}
        <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-orange-500/40" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-orange-500/40" />

        {/* top status row – retro HUD */}
        <div className="mb-3 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.26em] text-zinc-600">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-[1px] w-6 bg-orange-500" />
            <span className="text-orange-400/60">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-zinc-700">/</span>
            <span className="text-orange-400/60">
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="hidden items-center gap-2 text-[0.6rem] md:flex">
            <span className="h-[1px] w-10 bg-orange-500/40" />
            <span className="text-orange-400/60">
              ARCHV · PORTFOLIO TERMINAL
            </span>
          </div>
        </div>

        {/* arrows – outside the card */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-[-2.75rem] top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center
                     border border-neutral-800 bg-black/80 text-xs font-semibold tracking-[0.18em]
                     text-zinc-300 hover:bg-zinc-900/90 hover:border-orange-500/40 hover:text-orange-400 transition-colors md:flex"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-[-2.75rem] top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center
                     border border-neutral-800 bg-black/80 text-xs font-semibold tracking-[0.18em]
                     text-zinc-300 hover:bg-zinc-900/90 hover:border-orange-500/40 hover:text-orange-400 transition-colors md:flex"
        >
          ›
        </button>

        {/* main grid: left text, right visual panel */}
        <div className="grid items-stretch gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* LEFT – project details */}
          <div className="flex flex-col justify-between border border-neutral-800 bg-black/70 px-4 py-4 md:px-5 md:py-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[0.65rem] uppercase tracking-[0.26em] text-orange-400/80">
                    {current.title}
                  </div>
                  {current.role && (
                    <div className="text-sm font-semibold text-zinc-50">
                      {current.role}
                    </div>
                  )}
                </div>
                <div className="text-[0.7rem] text-zinc-500">
                  {current.years}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300">
                {current.summary}
              </p>

              {current.impact && (
                <p className="text-[0.7rem] leading-relaxed text-zinc-400">
                  <span className="font-semibold text-orange-400">
                    Impact.{" "}
                  </span>
                  {current.impact}
                </p>
              )}

              {/* CRT-style stats row */}
              <div className="mt-3 grid gap-2 text-[0.65rem] font-mono text-zinc-500 md:grid-cols-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                    Status
                  </span>
                  <span className="text-orange-400">
                    {isArchv ? "ACTIVE DEPLOYMENT" : "COMPLETED"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                    Mode
                  </span>
                  <span className="text-zinc-300">
                    {isArchv ? "CLIENT · TOOLING" : "MVP · DESIGN"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                    Signal
                  </span>
                  <span className="text-zinc-300">
                    {isArchv ? "HIGH BANDWIDTH" : "SHIPPED"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 text-[0.65rem] text-zinc-200">
              {current.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700/80 bg-zinc-900/50 px-2 py-0.5 hover:border-orange-500/40 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT – retro visual panel */}
          <div className="flex flex-col border border-neutral-800 bg-black/80">
            {/* visual zone */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
              {isArchv ? (
                <video
                  className="h-full w-full object-contain"
                  style={{ objectPosition: "50% 50%" }}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/Media/ArchvLogo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src="/Media/medvanta.png"
                  alt="MedVanta iOS App"
                  className="h-full w-full object-contain p-4"
                />
              )}

              {/* HUD target */}
              <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border border-orange-500/60">
                <div className="absolute inset-1 border border-orange-500/40" />
                <div className="absolute left-1/2 top-0 h-2 -translate-x-1/2 border-l border-orange-500/40" />
                <div className="absolute left-1/2 bottom-0 h-2 -translate-x-1/2 border-l border-orange-500/40" />
                <div className="absolute top-1/2 left-0 w-2 -translate-y-1/2 border-t border-orange-500/40" />
                <div className="absolute top-1/2 right-0 w-2 -translate-y-1/2 border-t border-orange-500/40" />
              </div>

              {/* Pulsing indicator */}
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)] animate-pulse" />
                <span className="text-[8px] text-orange-400 font-mono uppercase tracking-wider">
                  LIVE
                </span>
              </div>
            </div>

            {/* caption / philosophy */}
            <div className="flex flex-col gap-1 border-t border-neutral-800 px-4 py-3">
              <div className="text-[0.65rem] uppercase tracking-[0.26em] text-orange-400/80">
                {isArchv
                  ? "Archv · Workspace Flow · Visual System"
                  : "MedVanta · iOS Design · MVP Development"}
              </div>

              {isArchv ? (
                <p className="max-w-sm text-[0.7rem] leading-snug text-zinc-500">
                  Brutalist, security-first palette: deep charcoal ground, muted
                  neutrals, and a single Archv orange accent. Inspired by
                  control panels and radar UI — the workspace should feel like
                  an instrument you operate, not a toy you poke.
                </p>
              ) : (
                <p className="max-w-sm text-[0.7rem] leading-snug text-zinc-500">
                  iOS health reporting app designed for patient check-ins over
                  SMS. Built MVP with clean flows that clinicians actually use.
                  Focused on HIPAA compliance, simple UX, and rapid iteration
                  cycles to ship production-ready features.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectsSection;
