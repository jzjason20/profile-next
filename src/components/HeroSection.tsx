"use client";

import BlurText from "@/components/BlurText";
import { FadeIn } from "@/components/FadeIn";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { contactContent, heroContent } from "@/data/content";
import { useLanyard, type DiscordStatus } from "@/hooks/useLanyard";
import { ArrowRight, Github, Instagram, Mail } from "lucide-react";
import { useState } from "react";

// Spotify Icon
const SpotifyIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

// Discord Icon (Custom SVG)
const DiscordIcon = ({ size = 22, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
  </svg>
);

// Map labels to Lucide icons (or custom components)
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const lanyard = useLanyard();

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
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={heroContent.primaryCta.href}
              className="group inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-black transition hover:bg-white/90"
            >
              {heroContent.primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="rounded-full border border-white/20 px-8 py-3 text-white transition hover:border-white/60"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>
        </FadeIn>
        {/* Spotify now playing */}
        {lanyard?.listening_to_spotify && lanyard.spotify && (
          <div
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
            style={{ animation: "fadeIn 0.4s ease" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lanyard.spotify.album_art_url}
              alt="album art"
              className="h-8 w-8 shrink-0 rounded-sm"
            />
            <div className="min-w-0 text-left">
              <p className="mb-0.5 flex items-center gap-1.5 text-xs text-white/40">
                <SpotifyIcon />
                listening now
              </p>
              <p className="max-w-[180px] truncate text-sm font-medium text-white/90">
                {lanyard.spotify.song}
              </p>
              <p className="max-w-[180px] truncate text-xs text-white/50">
                {lanyard.spotify.artist}
              </p>
            </div>
          </div>
        )}

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
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-xs font-bold text-black opacity-100 transition-opacity">
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
