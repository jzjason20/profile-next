import DotGrid from "@/components/DotGrid";
import MagicBento, { type BentoCardProps } from "@/components/MagicBento";
import { projects } from "@/data/content";

export function ProjectsSection() {
  const bentoItems: BentoCardProps[] = projects.map((project) => ({
    title: project.title,
    description: project.description,
    label: project.status,
    href: project.href,
    color: project.status === "WIP" ? "#0a0a0a" : "#050505",
  }));

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      <DotGrid
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        gap={34}
        dotSize={6}
        baseColor="#1a1a1a"
        activeColor="#f5f5f5"
        proximity={150}
      />
      <div className="relative z-10 mx-auto max-w-6xl space-y-12 xl:max-w-7xl">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Projects
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl">
            Experiments + shipped work
          </h2>
          <p className="text-white/70">
            Product builds, research detours, and shipping practice reps.
          </p>
        </div>
        <div className="flex justify-center">
          <MagicBento
            items={bentoItems}
            glowColor="255, 255, 255"
            spotlightRadius={220}
            particleCount={10}
            enableTilt
            enableMagnetism
            textAutoHide
          />
        </div>
      </div>
    </section>
  );
}
