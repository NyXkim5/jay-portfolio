// src/components/ui/SonarSweep.tsx
import React, { useEffect, useRef } from "react";

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const MONOCHROME_FILL = (opacity: number): string =>
  `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
const MONOCHROME_STROKE = (opacity: number): string =>
  `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;

interface Ring {
  r: number;
  angle: number;
  lastSeen: number;
}

const SonarSweep: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ringsRef = useRef<Ring[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let lastTime = 0;
    let rafId: number;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const CANVAS_WIDTH = 180;
    const CANVAS_HEIGHT = 180;
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    const fadeTime = 2500;

    // Initialize rings once
    if (ringsRef.current.length === 0) {
      for (let r = 20; r <= 80; r += 15) {
        for (let i = 0; i < r / 2; i++) {
          ringsRef.current.push({
            r,
            angle: (i / (r / 2)) * Math.PI * 2,
            lastSeen: -fadeTime,
          });
        }
      }
    }

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      lastTime = timestamp;
      time = timestamp;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const scale = Math.min(width, height) / CANVAS_WIDTH;

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(scale, scale);
      ctx.translate(-centerX, -centerY);

      const scanAngle = (time * 0.001 * (Math.PI / 2) * 0.5) % (Math.PI * 2);

      // Draw scan line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + 85 * Math.cos(scanAngle),
        centerY + 85 * Math.sin(scanAngle)
      );
      ctx.strokeStyle = MONOCHROME_STROKE(0.5);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw dots
      ringsRef.current.forEach((dot) => {
        let angleDiff = Math.abs(dot.angle - scanAngle);
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        if (angleDiff < 0.05) dot.lastSeen = time;

        const timeSinceSeen = time - dot.lastSeen;
        if (timeSinceSeen < fadeTime) {
          const t = timeSinceSeen / fadeTime;
          const opacity = 1 - easeInOutCubic(t);
          const size = 1 + opacity * 1.5;
          const x = centerX + dot.r * Math.cos(dot.angle);
          const y = centerY + dot.r * Math.sin(dot.angle);

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = MONOCHROME_FILL(opacity);
          ctx.fill();
        }
      });

      ctx.restore();
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SonarSweep;
