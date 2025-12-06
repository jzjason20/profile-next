import { Github, Instagram, Mail } from "lucide-react";
import Link from "next/link";

const socials = [
  { href: "https://github.com/arion52", icon: Github, label: "GitHub" },
  {
    href: "https://www.instagram.com/jazjason20/",
    icon: Instagram,
    label: "Instagram",
  },
  { href: "mailto:jazjasonlee@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60 px-6 py-12 text-sm text-neutral-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
          Jacy — building playful sparks
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-white/60 transition hover:text-white"
              aria-label={label}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Jason "Jacy" Lee
      </p>
    </footer>
  );
}
