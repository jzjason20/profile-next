"use client";

import { motion, useInView } from "motion/react";
import { Fragment, type ReactNode, useMemo, useRef } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const line = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const TOKEN_REGEX =
  /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|#.*$|\b(?:class|def|return|self|from|import|as|if|else|for|in|True|False|None)\b|\b\d+\b)/g;

function getTokenClass(token: string): string {
  if (token.startsWith("#")) return "text-white/40";
  if (token.startsWith('"') || token.startsWith("'")) return "text-emerald-300";
  if (/^\d+$/.test(token)) return "text-amber-300";
  if (
    [
      "class",
      "def",
      "return",
      "from",
      "import",
      "as",
      "if",
      "else",
      "for",
      "in",
      "True",
      "False",
      "None",
    ].includes(token)
  ) {
    return "text-cyan-300";
  }
  if (token === "self") return "text-fuchsia-300";
  return "text-white/80";
}

function highlightLine(lineText: string): ReactNode[] {
  const chunks: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_REGEX.lastIndex = 0;
  while ((match = TOKEN_REGEX.exec(lineText))) {
    const [token] = match;
    const start = match.index;
    if (start > lastIndex) {
      chunks.push(
        <Fragment key={`plain-${lastIndex}`}>
          {lineText.slice(lastIndex, start)}
        </Fragment>,
      );
    }
    chunks.push(
      <span key={`token-${start}`} className={getTokenClass(token)}>
        {token}
      </span>,
    );
    lastIndex = start + token.length;
  }

  if (lastIndex < lineText.length) {
    chunks.push(
      <Fragment key={`tail-${lastIndex}`}>
        {lineText.slice(lastIndex)}
      </Fragment>,
    );
  }

  return chunks;
}

export function AnimatedCodeLines({
  lines,
  showCursor = true,
}: {
  lines: string[];
  showCursor?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const highlighted = useMemo(
    () => lines.map((lineText) => highlightLine(lineText)),
    [lines],
  );

  return (
    <motion.pre
      ref={ref}
      className="w-max min-w-full space-y-1 whitespace-pre font-mono text-sm leading-relaxed text-white/80"
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {highlighted.map((tokens, i) => (
        <motion.div
          key={`${lines[i]}-${i}`}
          variants={line}
          className="grid grid-cols-[2.1rem_1fr] gap-3"
        >
          <span className="select-none pt-0.5 text-right text-[11px] text-white/25">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            {tokens}
            {showCursor && i === highlighted.length - 1 ? (
              <span className="terminal-cursor ml-1 inline-block h-[1.1em] w-2 translate-y-0.5 rounded-[2px] bg-(--signal-cyan) align-middle" />
            ) : null}
          </span>
        </motion.div>
      ))}
    </motion.pre>
  );
}
