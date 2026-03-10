"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function AnimatedCodeLines({ lines }: { lines: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.pre
      ref={ref}
      className="min-w-full space-y-2 font-mono text-sm leading-relaxed text-white/80 whitespace-pre-wrap"
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {lines.map((l, i) => (
        <motion.p key={i} variants={line}>
          {l}
        </motion.p>
      ))}
    </motion.pre>
  );
}
