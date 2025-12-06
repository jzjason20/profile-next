"use client";

import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    })
      .then(() => setReady(true))
      .catch((error) => {
        console.error("Particles failed to initialize", error);
      });
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="pointer-events-none absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        detectRetina: true,
        fpsLimit: 60,
        background: { color: "#000000" },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.4 } },
            push: { quantity: 2 },
          },
        },
        particles: {
          number: { value: 140, density: { enable: true } },
          color: { value: "#f5f5f5" },
          opacity: { value: 0.7 },
          size: { value: { min: 0.5, max: 2 } },
          links: {
            enable: true,
            color: "#dedede",
            distance: 140,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: { default: "out" },
          },
        },
      }}
    />
  );
}
