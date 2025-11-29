import type { ReactNode } from "react";
import React from "react";

interface SectionProps {
  id: string;
  kicker?: string;
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, kicker, title, children }) => {
  return (
    <section
      id={id}
      className="scroll-mt-24 px-5 pb-20 pt-16 sm:px-10 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-baseline justify-between gap-6">
          <div>
            {kicker && (
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-zinc-500">
                {kicker}
              </p>
            )}
            <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-[0.18em] uppercase text-zinc-200">
              {title}
            </h2>
          </div>
          <div className="hidden md:block text-[0.6rem] uppercase tracking-[0.24em] text-zinc-600">
            Portfolio · J. Kim
          </div>
        </header>
        <div className="hr-soft mb-8" />
        {children}
      </div>
    </section>
  );
};

export default Section;
