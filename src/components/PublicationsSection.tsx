"use client";

import { FadeIn } from "@/components/FadeIn";
import { publications } from "@/data/content";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function PublicationsSection() {
  return (
    <section
      id="publications"
      className="relative bg-black px-6 py-24 text-white"
    >
      <FadeIn className="relative z-10 mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Publications
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl">Research papers</h2>
          <p className="text-white/70">
            Peer-reviewed work from my research experiments.
          </p>
        </div>
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {publications.map((pub) => (
            <motion.a
              key={pub.href}
              variants={card}
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h3 className="text-lg font-semibold leading-snug group-hover:text-white/90">
                  {pub.title}
                </h3>
                <span className="w-fit shrink-0 rounded-full border border-white/20 px-3 py-0.5 text-xs text-white/60">
                  {pub.venue} · {pub.year}
                </span>
              </div>
              <p className="text-sm text-white/60">{pub.description}</p>
              <span className="text-xs text-white/40 underline underline-offset-2 group-hover:text-white/60">
                View on IEEE Xplore →
              </span>
            </motion.a>
          ))}
        </motion.div>
      </FadeIn>
    </section>
  );
}
