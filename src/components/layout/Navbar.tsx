// src/components/layout/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import NavButton from "../ui/NavButton";

const NAME_VARIANTS = [
  "JAY KIM",
  "제이 김",
  "ジェイ・キム",
  "Джей Ким",
  "جاي كيم",
];

const META_VARIANTS = [
  "33.6454° N 117.8426° W",
  "UC IRVINE · CALIFORNIA",
  "COMPUTER ENGINEERING",
  "MIL-TECH · SYSTEMS · PRODUCT",
];

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Selected Projects" },
  { id: "engineering", label: "Engineering" },
  { id: "contact", label: "Contact" },
];

const NAME_INTERVAL_MS = 2400;
const META_INTERVAL_MS = 3200;

const Navbar = () => {
  const [displayName, setDisplayName] = useState(NAME_VARIANTS[0]);
  const [displayMeta, setDisplayMeta] = useState(META_VARIANTS[0]);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const nameIndexRef = useRef(0);
  const metaIndexRef = useRef(0);

  useEffect(() => {
    const nameTimer = window.setInterval(() => {
      nameIndexRef.current = (nameIndexRef.current + 1) % NAME_VARIANTS.length;
      setDisplayName(NAME_VARIANTS[nameIndexRef.current]);
    }, NAME_INTERVAL_MS);

    const metaTimer = window.setInterval(() => {
      metaIndexRef.current = (metaIndexRef.current + 1) % META_VARIANTS.length;
      setDisplayMeta(META_VARIANTS[metaIndexRef.current]);
    }, META_INTERVAL_MS);

    return () => {
      window.clearInterval(nameTimer);
      window.clearInterval(metaTimer);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        threshold: 0.35,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => () => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const absoluteY = window.scrollY + rect.top;
    const offset = 32;

    window.scrollTo({
      top: absoluteY - offset,
      behavior: "smooth",
    });
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <NavButton onClick={toggleNav} isOpen={isNavOpen} />

      <aside
        className={`
          fixed left-0 top-0 z-30
          flex h-screen w-[200px] flex-col
          border-r border-zinc-800
          bg-black/95
          px-5 py-6
          text-xs uppercase tracking-[0.28em] text-zinc-400
          transition-transform duration-300 ease-in-out
          ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-10 space-y-2">
          <p className="text-[0.65rem] text-zinc-500">Portfolio</p>

          <div className="relative">
            <span className="block text-[0.8rem] font-semibold text-zinc-100">
              {displayName}
            </span>
            <div className="mt-2 h-px w-10 bg-zinc-700" />
          </div>

          <p className="text-[0.6rem] text-zinc-500">
            Compe × Product × Full-stack
          </p>
        </div>

        <nav className="flex-1 space-y-4 text-[0.62rem]">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={handleScrollTo(section.id)}
                className={`
                  group flex w-full items-center gap-2
                  text-left transition-colors
                  ${isActive ? "text-orange-400" : "text-zinc-500"}
                  hover:text-orange-400
                `}
                style={{
                  textShadow: isActive
                    ? "0 0 12px rgba(251, 146, 60, 0.8), 0 0 24px rgba(251, 146, 60, 0.4)"
                    : "none",
                }}
              >
                <span
                  className={`
                    h-px bg-zinc-700
                    transition-[width,background-color,box-shadow]
                    duration-200
                    group-hover:w-8 group-hover:bg-orange-400
                    ${isActive ? "w-8 bg-orange-400" : "w-5"}
                  `}
                  style={{
                    boxShadow: isActive
                      ? "0 0 8px rgba(251, 146, 60, 0.8), 0 0 16px rgba(251, 146, 60, 0.4)"
                      : "none",
                  }}
                />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-10 space-y-2 text-[0.6rem] text-zinc-500">
          <p className="font-mono text-[0.6rem] text-zinc-400">{displayMeta}</p>
          <p className="font-mono text-[0.6rem] text-zinc-500">
            UCI · Jay Kim · 2025
          </p>
        </div>

        <button
          onClick={toggleNav}
          className="mt-6 flex w-full items-center gap-2 text-left transition-colors hover:text-orange-400"
        >
          <span className="h-px w-8 bg-orange-500 transition-all duration-200 hover:w-12 hover:shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
          <span className="text-[0.62rem] text-orange-500">CLOSE</span>
        </button>
      </aside>
    </>
  );
};

export default Navbar;
