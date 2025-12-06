import SpotlightCard from "@/components/SpotlightCard";
import { projects } from "@/data/content";

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#050018] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
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
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <SpotlightCard key={project.title} className="bg-neutral-900/70">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase text-white/60">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 text-white/70">{project.description}</p>
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center text-sm text-sky-300 transition hover:text-white"
                >
                  View project ↗
                </a>
              ) : (
                <span className="mt-6 inline-block text-sm text-white/50">
                  WIP — details coming soon
                </span>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
