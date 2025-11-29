// src/components/layout/Shell.tsx
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import RightRail from "./RightRail";
import CustomCursor from "../ui/CustomCursor";
import FingerprintToggle from "../ui/Fingerprinttoggle";
type ShellProps = {
  children: ReactNode;
  onOpenStudio?: () => void;
};

const ORANGE = "var(--archv-orange, #ff7a1a)";

const INDUSTRY_LABELS = [
  "INDUSTRY OVERVIEW",
  "산업 개요",
  "業界 概要",
  "VISIÓN GENERAL",
  "INDUSTRIE · OVERVIEW",
];

const Shell = ({ children, onOpenStudio }: ShellProps) => {
  const [showHud, setShowHud] = useState(false);
  const [modeLabelIndex, setModeLabelIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setModeLabelIndex((prev) => (prev + 1) % INDUSTRY_LABELS.length),
      2600
    );
    return () => window.clearInterval(timer);
  }, []);

  const currentModeLabel = INDUSTRY_LABELS[modeLabelIndex];

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <CustomCursor />
      <Navbar />
      <RightRail isOpen={showHud} />

      <button
        type="button"
        onClick={() => onOpenStudio?.()}
        className="
          fixed left-1/2 top-6 z-40 -translate-x-1/2
          flex flex-col items-center
          bg-transparent
          text-[0.58rem] font-mono uppercase tracking-[0.26em]
          text-zinc-400
          hover:text-zinc-100
          transition-colors
        "
      >
        <span
          className="h-[2px] w-20 rounded-full"
          style={{ backgroundColor: ORANGE }}
        />
        <span className="mt-2 whitespace-nowrap text-center">
          {currentModeLabel}
        </span>
      </button>

      <div className="fixed right-4 top-6 z-50 hidden lg:flex">
        <FingerprintToggle
          isActive={showHud}
          onClick={() => setShowHud((v) => !v)}
        />
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Shell;
