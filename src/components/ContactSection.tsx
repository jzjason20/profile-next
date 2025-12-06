import DotGrid from "@/components/DotGrid";
import { contactContent } from "@/data/content";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      <DotGrid
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        gap={32}
        dotSize={6}
        baseColor="#1a1a1a"
        activeColor="#f5f5f5"
        proximity={150}
      />
      <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-white/5 bg-black/60 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">
          Contact
        </p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
          Let’s build or brainstorm
        </h2>
        <p className="mt-4 text-white/70">{contactContent.message}</p>
        <a
          href={contactContent.email}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-black transition hover:bg-white/90"
        >
          Say hi
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/60">
          {contactContent.socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
