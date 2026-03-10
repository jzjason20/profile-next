import { NowDiscord } from "@/components/NowDiscord";
import { NowSpotify } from "@/components/NowSpotify";
import { nowContent } from "@/data/content";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

const { building, reading, obsessed, lastUpdated } = nowContent;

export default function NowPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-6 py-20 space-y-16">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          back to home
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Now
          </p>
          <h1 className="text-4xl font-bold">What I&apos;m up to</h1>
          <p className="text-white/40 text-sm">Last updated {lastUpdated}</p>
        </div>

        {/* Currently building */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
            Currently building
          </h2>
          <div className="space-y-3">
            {building.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold group-hover:text-white/90">
                    {project.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-400">
                      {project.status}
                    </span>
                    <ExternalLink
                      size={13}
                      className="text-white/30 group-hover:text-white/60 transition"
                    />
                  </div>
                </div>
                <p className="text-sm text-white/50">{project.description}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Spotify */}
        <NowSpotify />

        {/* Discord activity */}
        <NowDiscord />

        {/* GitHub graph */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
            GitHub activity
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/10 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ghchart.rshah.org/jzjason20"
              alt="jzjason20 GitHub contribution graph"
              className="w-full"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
            />
            <p className="mt-2 text-center text-xs text-white/30">
              Coding since 2017 · github.com/jzjason20
            </p>
          </div>
        </div>

        {/* Reading */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
            Reading
          </h2>
          <ul className="space-y-2">
            {reading.map((book) => (
              <li
                key={book}
                className="flex items-start gap-3 text-sm text-white/60"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                {book}
              </li>
            ))}
          </ul>
        </div>

        {/* Obsessed with */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-[0.25em] text-white/50">
            Obsessed with
          </h2>
          <ul className="space-y-2">
            {obsessed.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-white/60"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer note */}
        <p className="border-t border-white/10 pt-8 text-xs text-white/30">
          Inspired by{" "}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/60 transition"
          >
            nownownow.com
          </a>
          . A snapshot of what matters right now.
        </p>
      </div>
    </main>
  );
}
