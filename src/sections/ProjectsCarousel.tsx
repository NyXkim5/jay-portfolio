import { useState } from "react";
import Section from "../components/layout/Section";
import { projects } from "../data/projects";

const ProjectsCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const total = projects.length;
  const current = projects[index];

  const goTo = (nextIndex: number) => {
    setIsGlitching(true);
    // duration should roughly match the CSS glitch animation
    setTimeout(() => {
      const normalized = ((nextIndex % total) + total) % total; // safe modulo
      setIndex(normalized);
      setIsGlitching(false);
    }, 240);
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  const isArchv = current.id === "archv";

  return (
    <Section id="projects" kicker="What I build" title="Selected Projects">
      <p className="mb-8 max-w-3xl text-sm text-zinc-400">
        A mix of startup work, hardware-adjacent projects, and systems
        assignments that shaped how I think about building tools. Archv is the
        main one—it&apos;s the closest thing I&apos;ve built to something that
        could ship into a real firm.
      </p>

      {/* Carousel shell */}
      <div
        className={`relative overflow-hidden border border-zinc-800/80 bg-zinc-950/70
                    px-5 py-4 md:px-6 md:py-5 glitch-shell ${
                      isGlitching ? "glitch-shell--active" : ""
                    }`}
      >
        {/* Glitch overlay */}
        <div className="glitch-overlay pointer-events-none" />

        {/* Arrows */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex
                     h-9 w-9 items-center justify-center border border-zinc-700/70
                     bg-black/60 text-xs font-semibold tracking-[0.18em]
                     text-zinc-300 hover:bg-zinc-900/90 transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex
                     h-9 w-9 items-center justify-center border border-zinc-700/70
                     bg-black/60 text-xs font-semibold tracking-[0.18em]
                     text-zinc-300 hover:bg-zinc-900/90 transition-colors"
        >
          ›
        </button>

        {/* Index / label row */}
        <div className="mb-3 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.26em] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-1 w-5 bg-zinc-500" />
            <span>Project {String(index + 1).padStart(2, "0")}</span>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-400">
              {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[0.6rem]">
            <span className="h-[1px] w-10 bg-zinc-600" />
            <span>ARCHV · PORTFOLIO SCAN</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-stretch">
          {/* Left: project details */}
          <div className="flex flex-col justify-between border border-zinc-800/90 bg-black/60 px-4 py-4 md:px-5 md:py-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[0.65rem] uppercase tracking-[0.26em] text-zinc-500">
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
                  <span className="font-semibold text-zinc-200">Impact. </span>
                  {current.impact}
                </p>
              )}

              {/* Retro stat row */}
              <div className="mt-2 grid gap-2 text-[0.65rem] font-mono text-zinc-500 md:grid-cols-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                    Status
                  </span>
                  <span className="text-zinc-300">
                    {isArchv ? "ACTIVE DEPLOYMENT" : "ARCHIVED BUILD"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                    Mode
                  </span>
                  <span className="text-zinc-300">
                    {isArchv ? "CLIENT · TOOLING" : "EXPERIMENT · SYSTEMS"}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                    Signal
                  </span>
                  <span className="text-zinc-300">
                    {isArchv ? "HIGH BANDWIDTH" : "MEDIUM / LOCAL"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 text-[0.65rem] text-zinc-200">
              {current.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700/80 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: visual panel varies per project */}
          <div className="flex flex-col border border-zinc-800/90 bg-black/70">
            {/* Visual area */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
              {isArchv ? (
                <video
                  className="w-full h-full object-contain"
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
                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative h-32 w-32 max-w-[75%] border border-zinc-600/80">
                    <div className="absolute inset-0 -translate-x-1 translate-y-1 border border-zinc-700/60" />
                    <div className="absolute inset-[12%] bg-zinc-900/80" />
                    <div className="absolute inset-[22%] bg-gradient-to-br from-zinc-50/80 to-zinc-400/30 mix-blend-screen" />
                    <div className="absolute bottom-2 left-2 text-[0.55rem] font-mono uppercase tracking-[0.18em] text-zinc-300">
                      {current.id}
                    </div>
                  </div>
                </div>
              )}

              {/* Small target / HUD details */}
              <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border border-zinc-600/80">
                <div className="absolute inset-1 border border-zinc-700/70" />
                <div className="absolute left-1/2 top-0 h-2 -translate-x-1/2 border-l border-zinc-700/70" />
                <div className="absolute left-1/2 bottom-0 h-2 -translate-x-1/2 border-l border-zinc-700/70" />
                <div className="absolute top-1/2 left-0 w-2 -translate-y-1/2 border-t border-zinc-700/70" />
                <div className="absolute top-1/2 right-0 w-2 -translate-y-1/2 border-t border-zinc-700/70" />
              </div>
            </div>

            {/* Caption / philosophy */}
            <div className="border-t border-zinc-800 px-4 py-3 flex flex-col gap-1">
              <div className="text-[0.65rem] uppercase tracking-[0.26em] text-zinc-300">
                {isArchv
                  ? "Archv · Workspace Flow · Visual System"
                  : `${current.title} · Signal Readout`}
              </div>

              {isArchv ? (
                <p className="text-[0.7rem] text-zinc-500 leading-snug max-w-sm">
                  Brutalist, security-first palette: deep charcoal background,
                  muted neutrals, and a single accent orange for interaction
                  states. Layout leans on grid lines and radar-like markers to
                  make the workspace feel like an instrument panel, not a toy.
                </p>
              ) : (
                <p className="text-[0.7rem] text-zinc-500 leading-snug max-w-sm">
                  Retro tech framing inspired by CRT UI: hard borders, grid
                  overlays, and monochrome contrast. Each project can get its
                  own visual motif wired into this panel later.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectsCarousel;
