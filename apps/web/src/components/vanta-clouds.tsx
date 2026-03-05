"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: {
      CLOUDS2: (config: Record<string, unknown>) => { destroy: () => void };
    };
  }
}

export function VantaClouds() {
  const ref = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const loadScripts = async () => {
      if (typeof window === "undefined") return;

      if (!document.querySelector('script[src*="three"]')) {
        const threeScript = document.createElement("script");
        threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        threeScript.async = true;
        document.head.appendChild(threeScript);
        await new Promise((r) => { threeScript.onload = r; });
      }

      if (!document.querySelector('script[src*="vanta"]')) {
        const vantaScript = document.createElement("script");
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds2.min.js";
        vantaScript.async = true;
        document.head.appendChild(vantaScript);
        await new Promise((r) => { vantaScript.onload = r; });
      }

      if (ref.current && window.VANTA) {
        vantaRef.current = window.VANTA.CLOUDS2({
          el: ref.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          speed: 0.6,
          texturePath: "https://raw.githubusercontent.com/tengbao/vanta/master/gallery/noise.png",
          skyColor: 0xd4dff7,
          cloudColor: 0xc8d6f0,
          cloudShadowColor: 0x8a9cc5,
          sunColor: 0xefc88a,
          sunGlareColor: 0xefc88a,
          sunlightColor: 0xefc88a,
          backgroundColor: 0xe8edf8,
        });
      }
    };

    loadScripts();

    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  return <div ref={ref} className="vanta-bg" />;
}
