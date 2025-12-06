"use client";

import { loadLinksPreset } from "@tsparticles/preset-links";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { useEffect, useState } from "react";

export function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadLinksPreset(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10"
      options={{
        preset: "links",
        background: { color: "#030014" },
        particles: {
          number: { value: 160, density: { enable: true, area: 900 } },
          color: { value: "#ffffff" },
          links: { color: "#b9d6ff", opacity: 0.3, width: 1 },
          move: { speed: 1.2 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
        },
      }}
    />
  );
}
