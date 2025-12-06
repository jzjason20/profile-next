"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-full border px-6 py-3 text-sm transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-black/70 shadow-2xl shadow-purple-500/10 backdrop-blur"
            : "border-transparent bg-white/0"
        }`}
      >
        <Link
          href="#home"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Jacy
        </Link>
        <div className="flex items-center gap-5 text-neutral-300">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
