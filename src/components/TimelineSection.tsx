"use client";

import DotGrid from "@/components/DotGrid";
import { FadeIn } from "@/components/FadeIn";
import { timeline } from "@/data/content";
import { useState } from "react";

const INITIAL_COUNT = 6;

export function TimelineSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? timeline : timeline.slice(0, INITIAL_COUNT);
  const lastIndex = timeline.length - 1;

  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      <DotGrid
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        gap={38}
        dotSize={6}
        baseColor="#1a1a1a"
        activeColor="#f5f5f5"
        proximity={160}
      />
      <FadeIn className="relative z-10 mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Timeline
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Moments that shaped my curiosity
          </h2>
        </div>
        <div className="mt-16 space-y-12 border-l border-white/10 pl-8">
          {visible.map((item, index) => {
            const isLast =
              index === (showAll ? lastIndex : Math.min(INITIAL_COUNT - 1, lastIndex));
            const isActualLast = timeline.indexOf(item) === lastIndex;

            return (
              <div key={`${item.date}-${item.detail}`} className="relative">
                {/* Timeline dot */}
                {isActualLast ? (
                  <span className="absolute -left-10 top-2 flex h-4 w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-black shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  </span>
                ) : (
                  <span className="absolute -left-10 top-2 h-4 w-4 rounded-full border-2 border-white/40 bg-black" />
                )}
                <p className="text-sm uppercase tracking-wide text-white/70">
                  {item.date}
                </p>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-lg text-white/80 transition-colors hover:text-white"
                  >
                    {item.detail} ↗
                  </a>
                ) : (
                  <p className="mt-2 text-lg text-white/80">{item.detail}</p>
                )}
              </div>
            );
          })}
        </div>

        {timeline.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-white/20 px-6 py-2 text-sm text-white/60 transition hover:border-white/40 hover:text-white"
            >
              {showAll
                ? "Show less"
                : `Show ${timeline.length - INITIAL_COUNT} more`}
            </button>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
