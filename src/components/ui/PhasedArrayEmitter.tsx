// src/components/ui/PhasedArrayEmitter.tsx
import React, { useEffect, useRef } from "react";

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const MONOCHROME_FILL = (opacity: number): string =>
  `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;

interface Point {
  x: number;
  y: number;
  z: number;
}

const PhasedArrayEmitter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const centerX = 180 / 2;
    const centerY = 180 / 2;
    const fov = 300;
    const points: Point[] = [];
    const ringRadii = [20, 40, 60, 80];
    const pointsPerRing = [12, 18, 24, 30];
    const maxRadius = ringRadii[ringRadii.length - 1];

    ringRadii.forEach((radius, i) => {
      for (let j = 0; j < pointsPerRing[i]; j++) {
        const angle = (j / pointsPerRing[i]) * Math.PI * 2;
        points.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: 0,
        });
      }
    });

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001 * 0.5;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const scale = Math.min(width, height) / 180;
      const scaledCenterX = width / 2;
      const scaledCenterY = height / 2;

      const rotX = 1.0;
      const rotY = time * 0.2;
      const waveRadius = (time * 120) % (maxRadius * 1.8);
      const waveWidth = 50;
      const waveHeight = 18;
      const pointsToDraw: Array<{
        x: number;
        y: number;
        z: number;
        size: number;
        opacity: number;
      }> = [];

      points.forEach((p_orig) => {
        let { x, y, z } = p_orig;
        const distFromCenter = Math.hypot(x, y);
        const distToWave = Math.abs(distFromCenter - waveRadius);
        let waveInfluence = 0;

        if (distToWave < waveWidth / 2) {
          const wavePhase = (1 - distToWave / (waveWidth / 2)) * Math.PI;
          z = easeInOutCubic(Math.sin(wavePhase)) * waveHeight;
          waveInfluence = z / waveHeight;
        }

        const cY = Math.cos(rotY);
        const sY = Math.sin(rotY);
        let tX = x * cY - z * sY;
        let tZ = x * sY + z * cY;
        x = tX;
        z = tZ;

        const cX = Math.cos(rotX);
        const sX = Math.sin(rotX);
        let tY = y * cX - z * sX;
        tZ = y * sX + z * cX;
        y = tY;
        z = tZ;

        const perspectiveScale = fov / (fov + z + 100);
        const pX = scaledCenterX + x * perspectiveScale * scale;
        const pY = scaledCenterY + y * perspectiveScale * scale;
        const size = (1.5 + waveInfluence * 2.5) * perspectiveScale * scale;
        const opacity = 0.4 + waveInfluence * 0.6;

        pointsToDraw.push({ x: pX, y: pY, z, size, opacity });
      });

      pointsToDraw
        .sort((a, b) => a.z - b.z)
        .forEach((p) => {
          if (p.size < 0.1) return;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = MONOCHROME_FILL(p.opacity);
          ctx.fill();
        });

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

export default PhasedArrayEmitter;
