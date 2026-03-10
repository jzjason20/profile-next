"use client";

import DotGrid from "@/components/DotGrid";
import { FadeIn } from "@/components/FadeIn";
import MagicBento, { type BentoCardProps } from "@/components/MagicBento";
import { projects } from "@/data/content";
import { motion } from "motion/react";
import { useState } from "react";

const tagContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const tagItem = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const STATUS_COLORS: Record<string, string> = {
  Live: "#22c55e",
  Work: "#3b82f6",
  Research: "#a855f7",
  Clinical: "#f97316",
};

const ALL_TAGS = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];

export function ProjectsSection() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  const bentoItems: BentoCardProps[] = filtered.map((project) => ({
    title: project.title,
    description: project.description,
    label: project.status,
    labelColor: STATUS_COLORS[project.status],
    active: project.active,
    href: project.href,
    color: "#050505",
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
      <FadeIn className="relative z-10 mx-auto max-w-6xl space-y-12 xl:max-w-7xl">
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

        {/* Filter tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2"
          variants={tagContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {ALL_TAGS.map((tag) => (
            <motion.button
              key={tag}
              variants={tagItem}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-200 ${
                activeTag === tag
                  ? "border-white bg-white text-black"
                  : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

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
      </FadeIn>
    </section>
  );
}
