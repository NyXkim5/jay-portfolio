// src/sections/ProductWork.tsx

import { useState } from "react";
import Section from "../components/layout/Section";
import { productCases } from "../data/productCases";
import type { ProductCase } from "../types/productCase";

const ProductWorkSection = () => {
  const cases: ProductCase[] = productCases;
  const [index, setIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  if (!cases.length) return null;

  const current = cases[index] ?? cases[0];

  const {
    id,
    company,
    title,
    role,
    years,
    location,
    summary,
    impact,
    tags,
    fidelity,
  } = current;

  const org = company || "Independent";
  const name = title || "Product Case";
  const safeRole = role || "Product & Engineering";
  const safeSummary =
    summary || "Product work exploring interaction, systems, and constraints.";
  const safeImpact = impact || "";
  const safeTags = tags ?? [];
  const safeFidelity = fidelity || "Prototype / Shipped";

  const total = cases.length;

  // explicit MedVanta detection
  const isMedvanta =
    id === "medvanta-app" || org.toLowerCase().includes("medvanta");

  const setGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 220);
  };

  const goTo = (nextIndex: number) => {
    if (!total) return;
    setGlitch();
    const normalized = ((nextIndex % total) + total) % total;
    setTimeout(() => {
      setIndex(normalized);
    }, 140);
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  return (
    <Section id="product" kicker="Product work" title="Product & UX Systems">
      <p className="mb-8 max-w-3xl text-sm text-zinc-400">
        Product builds that sit between UX, engineering, and constraints. Think
        retro control posters: one big surface, lots of structure, and just
        enough chaos.
      </p>

      <div
        className={`relative border border-zinc-900 bg-black
                    px-4 py-4 md:px-6 md:py-6 glitch-shell ${
                      isGlitching ? "glitch-shell--active" : ""
                    }`}
      >
        <div className="glitch-overlay pointer-events-none" />

        {/* arrows outside the card */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous case"
              className="absolute left-[-2.75rem] top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center
                         border border-zinc-700 bg-black text-xs font-semibold tracking-[0.18em]
                         text-zinc-300 hover:bg-zinc-900 md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next case"
              className="absolute right-[-2.75rem] top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center
                         border border-zinc-700 bg-black text-xs font-semibold tracking-[0.18em]
                         text-zinc-300 hover:bg-zinc-900 md:flex"
            >
              ›
            </button>
          </>
        )}

        {/* HUD row */}
        <div className="mb-4 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.26em] text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-[1px] w-6 bg-zinc-300 synth-wave" />
            <span>Case {String(total ? index + 1 : 1).padStart(2, "0")}</span>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-400">
              {String(total || 1).padStart(2, "0")}
            </span>
          </div>
          <div className="hidden items-center gap-2 text-[0.6rem] md:flex">
            <span className="h-[1px] w-10 bg-zinc-700" />
            <span>Retro · Brutalist · Interface</span>
          </div>
        </div>

        {/* main layout: BIG poster left, spec panel right */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          {/* LEFT: poster */}
          <div className="relative border border-zinc-800 bg-black">
            <div className="relative w-full aspect-[5/3] md:aspect-[16/9] lg:aspect-[2/1] overflow-hidden">
              {/* top band */}
              <div className="absolute inset-x-0 top-0 h-10 border-b border-zinc-800 bg-black flex items-center justify-between px-5">
                <div className="flex items-center gap-4 text-[0.6rem] uppercase tracking-[0.3em] text-zinc-400">
                  <span>Visual · Product Sheet</span>
                  <span className="h-px w-10 bg-zinc-600" />
                  <span>{org.toUpperCase()}</span>
                </div>
                <div className="text-[0.6rem] font-mono text-zinc-500">
                  #{String(total ? index + 1 : 1).padStart(2, "0")}
                </div>
              </div>

              {isMedvanta ? (
                // MEDVANTA POSTER
                <div className="absolute inset-0 pt-10">
                  <div className="px-6 pt-4">
                    <div className="text-3xl md:text-4xl font-semibold tracking-[0.4em] text-zinc-50">
                      MEDVANTA
                    </div>
                    <div className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-zinc-500">
                      Patient Check-in · Phone + SMS
                    </div>
                  </div>

                  <div className="mt-8 flex h-[60%] w-full items-center justify-center gap-8">
                    {/* twin phone silhouettes */}
                    <div className="relative h-56 w-26 rounded-[1.2rem] border border-zinc-500 bg-black overflow-hidden">
                      <div className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-zinc-600" />
                      <div className="absolute inset-x-4 top-8 space-y-2">
                        <div className="h-3 w-20 rounded-full bg-zinc-700" />
                        <div className="h-4 w-full rounded-[0.55rem] border border-emerald-500/70 bg-emerald-500/25" />
                        <div className="h-4 w-3/4 rounded-[0.55rem] bg-zinc-700/70" />
                        <div className="h-4 w-4/5 rounded-[0.55rem] border border-emerald-500/60 bg-emerald-500/20" />
                      </div>
                    </div>
                    <div className="relative h-64 w-28 rounded-[1.2rem] border border-zinc-500 bg-black overflow-hidden">
                      <div className="absolute left-1/2 top-3 h-1 w-10 -translate-x-1/2 rounded-full bg-zinc-600" />
                      <div className="absolute inset-x-4 top-8 space-y-2">
                        <div className="h-3 w-24 rounded-full bg-zinc-700" />
                        <div className="h-4 w-full rounded-[0.55rem] bg-zinc-700/80" />
                        <div className="h-4 w-3/5 rounded-[0.55rem] border border-emerald-500/60 bg-emerald-500/25" />
                        <div className="h-4 w-2/3 rounded-[0.55rem] bg-zinc-700/70" />
                        <div className="h-4 w-1/2 rounded-[0.55rem] border border-emerald-500/50 bg-emerald-500/20" />
                      </div>
                    </div>
                  </div>

                  {/* copy block */}
                  <div className="absolute bottom-10 left-6 max-w-xs text-[0.7rem] leading-snug text-zinc-300">
                    <p className="uppercase tracking-[0.24em] text-zinc-500 text-[0.6rem] mb-2">
                      Field Notes
                    </p>
                    <p>
                      Patients talk in texts, not forms. The app wraps strict
                      data requirements inside short, repeatable messages that
                      still feel like normal conversation.
                    </p>
                  </div>
                </div>
              ) : (
                // GENERIC RETRO BRUTALIST POSTER
                <div className="absolute inset-0 pt-10">
                  <div className="px-6 pt-4">
                    <div className="text-3xl md:text-4xl font-semibold tracking-[0.4em] text-zinc-50">
                      {org.toUpperCase()}
                    </div>
                    <div className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-zinc-500">
                      {name}
                    </div>
                  </div>

                  {/* monolithic block + lines */}
                  <div className="mt-10 flex h-[60%] items-center">
                    <div className="ml-10 h-40 w-40 border border-zinc-600 bg-zinc-50/5" />
                    <div className="ml-6 space-y-3 text-[0.7rem] text-zinc-300">
                      <p>
                        Layout as a machine: one dominant block, clear axes, and
                        labels that tell you exactly what each zone is for.
                      </p>
                      <p className="uppercase tracking-[0.24em] text-zinc-500 text-[0.6rem]">
                        Interaction · Surfaces · Error States
                      </p>
                    </div>
                  </div>

                  {/* little crosses like the cosmos poster */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="pointer-events-none absolute h-4 w-4"
                      style={{
                        top: `${24 + i * 10}%`,
                        left: i % 2 === 0 ? "5%" : "90%",
                      }}
                    >
                      <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-zinc-700" />
                      <div className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-zinc-700" />
                    </div>
                  ))}
                </div>
              )}

              {/* bottom spec strip */}
              <div className="pointer-events-none absolute bottom-0 inset-x-0 h-9 border-t border-zinc-800 bg-black flex items-center justify-between px-5">
                <div className="flex items-center gap-3 text-[0.6rem] font-mono uppercase tracking-[0.22em] text-zinc-500">
                  <span>{org}</span>
                  <span className="h-px w-8 bg-zinc-700" />
                  <span>{years || "Exploration"}</span>
                </div>
                <div className="h-[10px] w-32 ticket-scan bg-gradient-to-r from-zinc-500/60 via-zinc-200/90 to-zinc-500/60 [mask-image:repeating-linear-gradient(to_right,#000_0,#000_4px,transparent_4px,transparent_6px)]" />
              </div>
            </div>
          </div>

          {/* RIGHT: spec panel */}
          <div className="flex flex-col justify-between border border-zinc-800 bg-zinc-950 px-4 py-4 md:px-5 md:py-5">
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-[0.7rem] uppercase tracking-[0.26em] text-zinc-500">
                  {org}
                </div>
                <div className="text-sm font-semibold text-zinc-50">{name}</div>
                <div className="flex flex-wrap items-center gap-2 text-[0.75rem] text-zinc-400">
                  <span>{safeRole}</span>
                  {(years || location) && (
                    <>
                      <span className="text-zinc-700">·</span>
                      <span>
                        {years}
                        {years && location && " · "}
                        {location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300">
                {safeSummary}
              </p>

              {safeImpact && (
                <p className="text-[0.7rem] leading-relaxed text-zinc-400">
                  <span className="font-semibold text-zinc-200">Impact. </span>
                  {safeImpact}
                </p>
              )}

              {/* small brutalist spec grid */}
              <div className="mt-4 grid gap-2 text-[0.65rem] font-mono text-zinc-500">
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                      Surface
                    </span>
                    <span className="text-zinc-300">
                      {isMedvanta ? "Mobile + SMS" : "Web / Desktop"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                      Focus
                    </span>
                    <span className="text-zinc-300">
                      {isMedvanta
                        ? "Check-in UX · Clinical signal"
                        : "Workflow · Systems UX"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.6rem] uppercase tracking-[0.22em] text-zinc-600">
                      Fidelity
                    </span>
                    <span className="text-zinc-300">{safeFidelity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 text-[0.65rem] text-zinc-200">
              {safeTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductWorkSection;
