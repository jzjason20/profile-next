"use client";

import { FadeIn } from "@/components/FadeIn";
import { awards } from "@/data/content";
import { Trophy } from "lucide-react";

const placeColor: Record<string, string> = {
  "1st": "border-yellow-400/40 text-yellow-300",
  "2nd": "border-zinc-300/40 text-zinc-200",
  "3rd": "border-amber-600/40 text-amber-500",
  "Top 5": "border-white/20 text-white/70",
};

export function AwardsSection() {
  return (
    <section className="relative bg-black px-6 pb-4 pt-0">
      <FadeIn>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {awards.map((award) => (
              <div
                key={award.event}
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm ${
                  placeColor[award.place] ?? "border-white/20 text-white/60"
                }`}
              >
                <Trophy size={13} className="shrink-0" />
                <span className="font-semibold">{award.place}</span>
                <span className="text-white/50">·</span>
                <span className="text-white/70">{award.event}</span>
                {award.note && (
                  <span className="text-white/40 text-xs">{award.note}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
