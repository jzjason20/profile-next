"use client";

import BlurText from "@/components/BlurText";
import { FadeIn } from "@/components/FadeIn";
import { DiscordIcon, SpotifyIcon } from "@/components/icons";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { awards, contactContent, heroContent } from "@/data/content";
import {
  useLanyard,
  type Activity,
  type DiscordStatus,
} from "@/hooks/useLanyard";
import { useSpotify } from "@/hooks/useSpotify";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Instagram,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CODING_APPS = new Set([
  "visual studio code",
  "code",
  "intellij idea",
  "webstorm",
  "pycharm",
  "goland",
  "rider",
  "clion",
  "vim",
  "neovim",
  "nvim",
  "xcode",
  "android studio",
  "sublime text",
  "atom",
  "emacs",
]);

function getActivityLabel(activity: Activity): string {
  if (CODING_APPS.has(activity.name.toLowerCase())) return "coding";
  if (activity.type === 1) return "streaming";
  if (activity.type === 3) return "watching";
  return "playing";
}

function getActivityImageUrl(activity: Activity): string | null {
  const img = activity.assets?.large_image;
  if (!img) return null;
  if (img.startsWith("mp:external/")) {
    const encoded = img.slice("mp:external/".length);
    const parts = encoded.split("/");
    if (parts.length > 1) return decodeURIComponent(parts.slice(1).join("/"));
    return null;
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
  }
  return null;
}

// Map labels to Lucide icons (or custom components)
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  GitHub: Github,
  Instagram: Instagram,
  Email: Mail,
  Discord: DiscordIcon,
};

const statusColor: Record<DiscordStatus, string> = {
  online: "bg-emerald-400",
  idle: "bg-yellow-400",
  dnd: "bg-red-500",
  offline: "bg-zinc-500",
};

const awardTone: Record<string, string> = {
  "1st": "border-yellow-300/40 bg-yellow-300/12 text-yellow-100",
  "2nd": "border-sky-300/40 bg-sky-300/12 text-sky-100",
  "3rd": "border-orange-300/40 bg-orange-300/12 text-orange-100",
  "Top 5": "border-emerald-300/40 bg-emerald-300/12 text-emerald-100",
};

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const lanyard = useLanyard();
  const spotify = useSpotify();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32"
    >
      <ParticlesBackground />
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-black via-black/70 to-black" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center text-white">
        <FadeIn delay={0}>
          <div className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
            Coding since 2017 · Shipping since 2019
          </div>
        </FadeIn>
        <BlurText
          text={heroContent.name}
          className="text-5xl font-black tracking-tight sm:text-7xl"
        />
        <BlurText
          text={heroContent.title}
          className="text-2xl text-white/80 sm:text-4xl"
          delay={300}
        />
        <FadeIn delay={600}>
          <p className="max-w-3xl text-lg text-white/70">
            {heroContent.description}
          </p>
        </FadeIn>
        <FadeIn delay={800}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={heroContent.primaryCta.href}
              className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white/75 transition hover:border-white/50 hover:text-white"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={900}>
          <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/3 p-3 backdrop-blur-sm sm:p-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:mb-3">
              Battle-tested in hackathons and minor sleep deprivation
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {awards.map((award) => (
                <span
                  key={`${award.place}-${award.event}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${awardTone[award.place] ?? "border-white/20 bg-white/5 text-white/80"}`}
                >
                  <span className="font-semibold tracking-wide">
                    {award.place}
                  </span>
                  <span className="text-white/70">{award.event}</span>
                  {award.note ? (
                    <span className="text-[11px] text-white/55">
                      {award.note}
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Activity carousel */}
        {(lanyard ?? spotify) &&
          (() => {
            type Card =
              | { kind: "spotify" }
              | { kind: "discord"; activity: Activity };

            const cards: Card[] = [];
            if (spotify?.isPlaying) cards.push({ kind: "spotify" });
            const discordActivity = lanyard?.activities.find(
              (a) => a.type === 0 || a.type === 1 || a.type === 3,
            );
            if (discordActivity)
              cards.push({ kind: "discord", activity: discordActivity });

            if (cards.length === 0) return null;

            const idx = Math.min(activeCard, cards.length - 1);
            const card = cards[idx];
            const multi = cards.length > 1;

            return (
              <div
                className="flex items-center gap-2"
                role="region"
                aria-label="Current activity"
                aria-live="polite"
                style={{ animation: "fadeIn 0.4s ease" }}
              >
                {multi && (
                  <button
                    onClick={() =>
                      setActiveCard((idx - 1 + cards.length) % cards.length)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40 transition hover:text-white/80"
                    aria-label="Previous activity"
                  >
                    <ChevronLeft size={14} />
                  </button>
                )}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                  {card.kind === "spotify" && spotify?.isPlaying ? (
                    <>
                      {spotify.albumArtUrl ? (
                        <Image
                          src={spotify.albumArtUrl}
                          alt={`Album art for ${spotify.title} by ${spotify.artist}`}
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 rounded"
                        />
                      ) : (
                        <SpotifyIcon className="h-8 w-8 shrink-0 text-green-400" />
                      )}
                      <div className="min-w-0 text-left">
                        <p className="mb-0.5 flex items-center gap-1.5 text-xs text-white/40">
                          <SpotifyIcon />
                          listening now
                        </p>
                        <p className="max-w-[180px] truncate text-sm font-medium text-white/90">
                          {spotify.title}
                        </p>
                        <p className="max-w-[180px] truncate text-xs text-white/50">
                          {spotify.artist}
                        </p>
                      </div>
                    </>
                  ) : card.kind === "discord" ? (
                    <>
                      {(() => {
                        const imgUrl = getActivityImageUrl(card.activity);
                        if (!imgUrl)
                          return (
                            <DiscordIcon
                              size={16}
                              className="shrink-0 text-white/40"
                            />
                          );
                        const isCdn = imgUrl.includes("cdn.discordapp.com");
                        return isCdn ? (
                          <Image
                            src={imgUrl}
                            alt={
                              card.activity.assets?.large_text ??
                              card.activity.name
                            }
                            width={32}
                            height={32}
                            className="h-8 w-8 shrink-0 rounded object-cover"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imgUrl}
                            alt={
                              card.activity.assets?.large_text ??
                              card.activity.name
                            }
                            className="h-8 w-8 shrink-0 rounded object-cover"
                          />
                        );
                      })()}
                      <div className="min-w-0 text-left">
                        <p className="mb-0.5 flex items-center gap-1.5 text-xs text-white/40">
                          <DiscordIcon size={10} />
                          {getActivityLabel(card.activity)}
                        </p>
                        <p className="max-w-[180px] truncate text-sm font-medium text-white/90">
                          {card.activity.name}
                        </p>
                        {card.activity.details && (
                          <p className="max-w-[180px] truncate text-xs text-white/50">
                            {card.activity.details}
                          </p>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
                {multi && (
                  <button
                    onClick={() => setActiveCard((idx + 1) % cards.length)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/40 transition hover:text-white/80"
                    aria-label="Next activity"
                  >
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            );
          })()}

        <FadeIn delay={1000}>
          <div className="flex items-center gap-6 text-white/70">
            {contactContent.socials.map(({ href, label }) => {
              const Icon = iconMap[label];
              const isDiscord = label === "Discord";

              if (isDiscord) {
                return (
                  <button
                    key={label}
                    onClick={() => handleCopy(href)}
                    className="group relative flex items-center justify-center transition hover:text-white"
                    aria-label="Copy Discord ID"
                  >
                    <Icon size={22} />
                    {lanyard && (
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-black ${statusColor[lanyard.discord_status]}`}
                      />
                    )}
                    {copied && (
                      <span
                        className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-xs font-bold text-black opacity-100 transition-opacity"
                        role="status"
                        aria-live="assertive"
                      >
                        Copied!
                      </span>
                    )}
                  </button>
                );
              }

              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                  aria-label={label}
                >
                  {Icon && <Icon size={22} />}
                </a>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
