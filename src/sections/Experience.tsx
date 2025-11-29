import Section from "../components/layout/Section";
import { experience } from "../data/experience";

const ExperienceSection = () => {
  return (
    <Section id="experience" kicker="Where I've been" title="Experience">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        {/* Left: Experience cards */}
        <div className="space-y-4">
          {experience.map((item, index) => {
            const isCurrent = item.years?.includes("Present");
            const statusLabel = isCurrent ? "In Progress" : "Completed";
            const seatLabel = `E${index + 1}`;

            return (
              <article
                key={item.id}
                className="relative overflow-hidden border border-neutral-800 bg-black/80"
              >
                {/* Orange accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-orange-500/40" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-orange-500/40" />

                {/* left vertical ticket strip */}
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-9 border-r border-neutral-800 bg-black/70 sm:flex flex-col items-center justify-between py-3">
                  <div className="text-[0.55rem] font-mono uppercase tracking-[0.26em] text-zinc-500 rotate-90 whitespace-nowrap">
                    Exp {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="h-[1px] w-5 bg-orange-500/60" />
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-1 w-4 bg-orange-500/60" />
                    <div className="h-1 w-4 bg-zinc-700/80" />
                  </div>
                </div>

                {/* inner content with left strip offset */}
                <div className="pl-3 sm:pl-10 pr-4 md:pr-6 py-4 md:py-5">
                  {/* top HUD row */}
                  <div className="mb-3 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.26em] text-zinc-600">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-[1px] w-6 bg-orange-500" />
                      <span className="text-orange-400/60">
                        Experience Ticket
                      </span>
                    </div>
                    <div className="hidden items-center gap-2 text-[0.6rem] md:flex">
                      <span className="h-[1px] w-10 bg-orange-500/40" />
                      <span className="text-orange-400/60">
                        Portfolio · J. Kim
                      </span>
                    </div>
                  </div>

                  {/* main ticket grid */}
                  <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                    {/* LEFT: org + role + description */}
                    <div className="flex flex-col justify-between border border-neutral-800 bg-black/70 px-4 py-3 md:px-5 md:py-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="text-[0.7rem] uppercase tracking-[0.26em] text-orange-400/80">
                              {item.company}
                            </div>
                            <div className="text-sm font-semibold text-zinc-50">
                              {item.role}
                            </div>
                          </div>
                          <div className="hidden text-right text-[0.7rem] text-zinc-500 sm:block">
                            {item.years}
                            {item.location && (
                              <>
                                <span className="text-zinc-700"> · </span>
                                <span>{item.location}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <p className="text-xs leading-relaxed text-zinc-300">
                          {item.summary}
                        </p>

                        {/* Key achievements - bullets */}
                        {item.achievements && item.achievements.length > 0 && (
                          <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-orange-500 mt-1">▸</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5 text-[0.65rem] text-zinc-200">
                        {item.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full border border-zinc-700/80 bg-zinc-900/50 px-2 py-0.5 hover:border-orange-500/40 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT: boarding-pass style meta */}
                    <div className="flex flex-col border border-neutral-800 bg-black/80">
                      {/* Status section */}
                      <div className="border-b border-neutral-800 px-4 py-3 md:py-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-2 h-2 ${
                              isCurrent
                                ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"
                                : "bg-zinc-600"
                            }`}
                          />
                          <div className="text-[0.6rem] font-mono uppercase tracking-[0.22em] text-zinc-500">
                            Status
                          </div>
                        </div>
                        <div className="text-xs font-mono text-orange-400">
                          {statusLabel}
                        </div>

                        <div className="mt-4 space-y-2 text-[0.6rem] font-mono uppercase tracking-[0.18em] text-zinc-500">
                          <div className="flex justify-between">
                            <span>Years</span>
                            <span className="text-zinc-200">{item.years}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location</span>
                            <span className="text-zinc-200">
                              {item.location || "Remote"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Seat</span>
                            <span className="text-orange-400">{seatLabel}</span>
                          </div>
                        </div>
                      </div>

                      {/* bottom barcode strip */}
                      <div className="flex items-center justify-center gap-3 px-4 py-3">
                        <div className="flex-1 flex flex-col gap-1">
                          <span className="text-[0.6rem] font-mono uppercase tracking-[0.18em] text-zinc-600">
                            ID
                          </span>
                          <div className="h-[12px] w-full bg-gradient-to-r from-orange-500/60 via-orange-400/90 to-orange-500/60 [mask-image:repeating-linear-gradient(to_right,#000_0,#000_3px,transparent_3px,transparent_5px)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right: Video display with Anduril-inspired frame */}
        <div className="sticky top-24">
          <div className="relative border border-neutral-800 bg-black/90 p-4">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-orange-500/60" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-orange-500/60" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-orange-500/60" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/60" />

            {/* Header */}
            <div className="mb-3 pb-3 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)] animate-pulse" />
                  <div className="text-[9px] tracking-[0.3em] uppercase text-orange-400 font-mono">
                    Touch Designer Blob Effect
                  </div>
                </div>
                <div className="text-[8px] tracking-[0.25em] text-zinc-600 font-mono">
                  RENDER
                </div>
              </div>
            </div>

            {/* Video container */}
            <div className="relative border border-neutral-800 bg-black aspect-video">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onLoadedMetadata={(e) => {
                  const video = e.currentTarget;
                  video.currentTime = 0;
                }}
                onTimeUpdate={(e) => {
                  const video = e.currentTarget;
                  if (video.currentTime >= 12) {
                    video.currentTime = 0;
                  }
                }}
              >
                <source
                  src={`${import.meta.env.BASE_URL}Media/blobvid1.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* HUD overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top left info */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-orange-400 space-y-0.5">
                  <div>REC</div>
                  <div className="text-zinc-500">00:00:00</div>
                </div>

                {/* Top right crosshair */}
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 border border-orange-500/40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-[1px] bg-orange-500/60" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[1px] h-4 bg-orange-500/60" />
                    </div>
                  </div>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-zinc-600">
                  <span>LAT: 33.6°N</span>
                  <span>LONG: 117.8°W</span>
                  <span>ALT: 400FT</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-3 pt-3 border-t border-neutral-800">
              <div className="flex items-center justify-between text-[8px] font-mono">
                <span className="text-zinc-600 uppercase tracking-[0.3em]">
                  Systems Demo
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-gradient-to-r from-orange-500 to-transparent" />
                  <span className="text-orange-500/60">LIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* System status panel below video */}
          <div className="mt-4 border border-neutral-800 bg-black/60 p-4">
            <div className="text-[9px] tracking-[0.3em] uppercase text-zinc-600 font-mono mb-3">
              System Status
            </div>
            <div className="space-y-2 text-[8px] font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">PROPULSION</span>
                <span className="text-orange-400">NOMINAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">NAVIGATION</span>
                <span className="text-orange-400">LOCKED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">TELEMETRY</span>
                <span className="text-orange-400">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
