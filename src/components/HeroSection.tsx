import BlurText from "@/components/BlurText";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { heroContent } from "@/data/content";
import { ArrowRight, Github, Instagram, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com/arion52", icon: Github, label: "GitHub" },
  {
    href: "https://www.instagram.com/jazjason20/",
    icon: Instagram,
    label: "Instagram",
  },
  { href: "mailto:jazjasonlee@gmail.com", icon: Mail, label: "Email" },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32"
    >
      <ParticlesBackground />
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-[#050018] via-[#050018]/80 to-black" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center text-white">
        <div className="rounded-full border border-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
          Coding since 2017 · Shipping since 2019
        </div>
        <BlurText
          text={heroContent.name}
          className="text-5xl font-black tracking-tight sm:text-7xl"
        />
        <BlurText
          text={heroContent.title}
          className="text-2xl text-white/80 sm:text-4xl"
          delay={300}
        />
        <p className="max-w-3xl text-lg text-white/70">
          {heroContent.description}
        </p>
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
        <div className="flex items-center gap-4 text-white/70">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
              aria-label={label}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
