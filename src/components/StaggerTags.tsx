"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const tag = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

interface Props {
  tags: string[];
  variant?: "bordered" | "filled";
}

export function StaggerTags({ tags, variant = "bordered" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="mt-4 flex flex-wrap gap-2"
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {tags.map((t) => (
        <motion.span
          key={t}
          variants={tag}
          className={
            variant === "bordered"
              ? "rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
              : "rounded-full bg-white/5 px-3 py-1 text-xs text-white/70"
          }
        >
          {t}
        </motion.span>
      ))}
    </motion.div>
  );
}
