// src/components/shared/ScrambledText.tsx

import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import "./ScrambledText.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  children: ReactNode;
}

// Component
const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  children,
}) => {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Split into characters
    const split = new SplitText(root, {
      type: "chars",
      charsClass: "scramble-char",
    });

    const chars = (split.chars as Element[]).map((el) => el as HTMLElement);
    charsRef.current = chars;

    // Store original content for each char
    charsRef.current.forEach((c) => {
      const original = c.innerHTML;
      gsap.set(c, {
        display: "inline-block",
        attr: { "data-content": original },
      });
    });

    const handleMove = (e: PointerEvent) => {
      const mx = e.clientX;
      const my = e.clientY;

      charsRef.current.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const original = c.getAttribute("data-content") ?? c.innerHTML;

          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: original,
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <span ref={rootRef} className={className}>
      {children}
    </span>
  );
};

export default ScrambledText;
