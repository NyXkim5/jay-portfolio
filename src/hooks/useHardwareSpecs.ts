// src/hooks/useHardwareSpecs.ts
import { useState, useEffect } from "react";

interface HardwareSpecs {
  processor: string;
  memory: string;
  graphics: string;
}

export const useHardwareSpecs = (): HardwareSpecs => {
  const [specs, setSpecs] = useState<HardwareSpecs>({
    processor: "--- GHz",
    memory: "-- GB",
    graphics: "------",
  });

  useEffect(() => {
    const getSpecs = async () => {
      // Get logi cal processor count
      const cores = navigator.hardwareConcurrency || 4;

      // Estimate processor speed (approximate based on cores)
      const processorSpeed =
        cores >= 8 ? "3.2 GHz" : cores >= 4 ? "2.8 GHz" : "2.4 GHz";

      // Get device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory;
      const memory = deviceMemory ? `${deviceMemory} GB` : "16 GB";

      // Try to detect GPU
      let graphics = "GPU";
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = (gl as any).getExtension(
            "WEBGL_debug_renderer_info"
          );
          if (debugInfo) {
            const renderer = (gl as any).getParameter(
              debugInfo.UNMASKED_RENDERER_WEBGL
            );

            // Parse common GPU names
            if (renderer.includes("NVIDIA") || renderer.includes("GeForce")) {
              if (renderer.includes("RTX 40")) graphics = "RTX 40";
              else if (renderer.includes("RTX 30")) graphics = "RTX 30";
              else if (renderer.includes("RTX")) graphics = "RTX";
              else if (renderer.includes("GTX")) graphics = "GTX";
              else graphics = "NVIDIA";
            } else if (
              renderer.includes("AMD") ||
              renderer.includes("Radeon")
            ) {
              if (renderer.includes("RX 7")) graphics = "RX 7000";
              else if (renderer.includes("RX 6")) graphics = "RX 6000";
              else graphics = "AMD";
            } else if (renderer.includes("Intel")) {
              if (renderer.includes("Arc")) graphics = "ARC";
              else if (renderer.includes("Iris")) graphics = "IRIS";
              else graphics = "INTEL";
            } else if (renderer.includes("Apple")) {
              if (renderer.includes("M3")) graphics = "M3";
              else if (renderer.includes("M2")) graphics = "M2";
              else if (renderer.includes("M1")) graphics = "M1";
              else graphics = "APPLE";
            } else {
              // Fallback: take first word of renderer
              graphics = renderer.split(" ")[0].toUpperCase().slice(0, 6);
            }
          }
        }
      } catch (e) {
        graphics = "GPU";
      }

      setSpecs({
        processor: processorSpeed,
        memory: memory,
        graphics: graphics,
      });
    };

    getSpecs();
  }, []);

  return specs;
};
