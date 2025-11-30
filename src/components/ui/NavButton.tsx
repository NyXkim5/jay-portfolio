// animated nav button - proper vertical orientation with upward scribble flow
import { useState, useEffect } from "react";

interface NavButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const NAV_VARIANTS = ["NAV", "메뉴", "ナビ", "导航", "НАВ"];

const NavButton = ({ onClick, isOpen }: NavButtonProps) => {
  const [displayText, setDisplayText] = useState(NAV_VARIANTS[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayText((prev) => {
        const currentIdx = NAV_VARIANTS.indexOf(prev);
        const nextIdx = (currentIdx + 1) % NAV_VARIANTS.length;
        return NAV_VARIANTS[nextIdx];
      });
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <button
      onClick={onClick}
      className="nav-button hidden md:block"
      style={{
        position: "fixed",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 30,
        width: "56px",
        height: "240px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
        opacity: isOpen ? 0 : 1,
        visibility: isOpen ? "hidden" : "visible",
        pointerEvents: isOpen ? "none" : "auto",
      }}
    >
      <div className="button__line button__line--top"></div>
      <div className="button__line button__line--bottom"></div>

      <div className="button__text">
        <span
          style={{
            writingMode: "vertical-rl",
            textOrientation: "upright",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#f97316",
            letterSpacing: isOpen ? "6px" : "2px",
            transition: "letter-spacing 0.3s ease",
            textShadow:
              "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {displayText}
        </span>
      </div>

      <div className="button__drow1"></div>
      <div className="button__drow2"></div>

      <style>{`
        .nav-button {
          --line_color: #f97316;
          --back_color: #f97316;
        }

        .button__text {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 2;
        }

        .nav-button::before,
        .nav-button::after,
        .button__text::before,
        .button__text::after {
          content: "";
          position: absolute;
          width: 3px;
          border-radius: 2px;
          background: var(--line_color);
          box-shadow: 0 0 8px rgba(249, 115, 22, 0.4), 0 0 4px rgba(249, 115, 22, 0.3);
          transition: all 0.5s ease;
        }

        .nav-button::before {
          left: 0;
          top: 54px;
          height: calc(100% - 56px * 2 - 16px);
        }

        .nav-button::after {
          left: 0;
          bottom: 54px;
          height: 8px;
        }

        .button__text::before {
          right: 0;
          bottom: 54px;
          height: calc(100% - 56px * 2 - 16px);
        }

        .button__text::after {
          right: 0;
          top: 54px;
          height: 8px;
        }

        .button__line {
          position: absolute;
          left: 0;
          height: 56px;
          width: 100%;
          overflow: hidden;
        }

        .button__line::before {
          content: "";
          position: absolute;
          left: 0;
          height: 150%;
          width: 100%;
          box-sizing: border-box;
          border-radius: 300px;
          border: solid 3px var(--line_color);
          box-shadow: 0 0 8px rgba(249, 115, 22, 0.4), 0 0 4px rgba(249, 115, 22, 0.3);
        }

        .button__line--top {
          top: 0;
        }

        .button__line--top::before {
          top: 0;
        }

        .button__line--bottom {
          bottom: 0;
        }

        .button__line--bottom::before {
          bottom: 0;
        }

        .nav-button:hover::before,
        .nav-button:hover .button__text::before {
          height: 8px;
        }

        .nav-button:hover::after,
        .nav-button:hover .button__text::after {
          height: calc(100% - 56px * 2 - 16px);
        }

        .button__drow1,
        .button__drow2 {
          position: absolute;
          z-index: -1;
          border-radius: 16px;
          transform-origin: 16px 16px;
          background: var(--back_color);
        }

        .button__drow1 {
          bottom: 10px;
          left: 12px;
          width: 32px;
          height: 0;
          transform: rotate(0deg);
        }

        .button__drow2 {
          bottom: 90px;
          left: 12px;
          width: 32px;
          height: 0;
          transform: rotate(0deg);
        }

        .button__drow1::before,
        .button__drow1::after,
        .button__drow2::before,
        .button__drow2::after {
          content: "";
          position: absolute;
          background: var(--back_color);
          border-radius: 16px;
          transform-origin: 16px 16px;
        }

        .button__drow1::before {
          top: 0;
          left: 0;
          height: 0;
          width: 32px;
          transform: rotate(0deg);
        }

        .button__drow1::after {
          top: 0;
          left: 0;
          height: 0;
          width: 32px;
          transform: rotate(10deg);
        }

        .button__drow2::before {
          top: 0;
          left: 0;
          height: 0;
          width: 32px;
          transform: rotate(-5deg);
        }

        .button__drow2::after {
          top: 0;
          left: 0;
          height: 0;
          width: 32px;
          transform: rotate(5deg);
        }

        .nav-button:hover .button__drow1 {
          animation: drow1 ease-in 0.06s;
          animation-fill-mode: forwards;
        }

        .nav-button:hover .button__drow1::before {
          animation: drow2 linear 0.08s 0.06s;
          animation-fill-mode: forwards;
        }

        .nav-button:hover .button__drow1::after {
          animation: drow3 linear 0.03s 0.14s;
          animation-fill-mode: forwards;
        }

        .nav-button:hover .button__drow2 {
          animation: drow4 linear 0.06s 0.2s;
          animation-fill-mode: forwards;
        }

        .nav-button:hover .button__drow2::before {
          animation: drow3 linear 0.03s 0.26s;
          animation-fill-mode: forwards;
        }

        .nav-button:hover .button__drow2::after {
          animation: drow5 linear 0.06s 0.32s;
          animation-fill-mode: forwards;
        }

        @keyframes drow1 {
          0% { height: 0; }
          100% { height: 160px; }
        }

        @keyframes drow2 {
          0% { height: 0; opacity: 0; }
          10% { opacity: 0; }
          11% { opacity: 1; }
          100% { height: 180px; }
        }

        @keyframes drow3 {
          0% { height: 0; }
          100% { height: 140px; }
        }

        @keyframes drow4 {
          0% { height: 0; }
          100% { height: 180px; }
        }

        @keyframes drow5 {
          0% { height: 0; }
          100% { height: 190px; }
        }
      `}</style>
    </button>
  );
};

export default NavButton;
