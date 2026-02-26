"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl" ref={menuRef}>
        <nav
          className={`flex w-full items-center justify-between rounded-full border px-6 py-3 text-sm transition-all duration-300 ${
            scrolled
              ? "border-white/10 bg-black/70 shadow-2xl shadow-white/10 backdrop-blur"
              : "border-transparent bg-white/0"
          }`}
        >
          <Link
            href="#home"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Jacy
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-5 text-neutral-300 md:flex">
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

          {/* Hamburger button */}
          <button
            className="flex flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          className={`mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-4 py-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm text-neutral-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
