// src/components/ui/CustomCursor.tsx
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const size = isPressed ? 22 : 30;
  const offset = size / 2;

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        border: "1px solid rgba(244,244,245,0.6)",
        boxShadow: isPressed
          ? "0 0 18px rgba(244,244,245,0.55)"
          : "0 0 28px rgba(244,244,245,0.35)",
        transform: `translate3d(${position.x - offset}px, ${
          position.y - offset
        }px, 0)`,
        transition:
          "transform 80ms ease-out, box-shadow 120ms ease-out, width 80ms ease-out, height 80ms ease-out",
        backdropFilter: "blur(6px)",
      }}
    />
  );
};

export default CustomCursor;
