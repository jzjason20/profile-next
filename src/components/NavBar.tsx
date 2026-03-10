"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Scrolled state for nav bg
      setScrolled(scrollY > 40);

      // Scroll progress bar
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? (scrollY / height) * 100 : 0);

      // Active section based on scroll position
      const offset = scrollY + 120;
      const sections = navItems.map(({ href }) => {
        const el = document.querySelector(href) as HTMLElement | null;
        return { id: href.slice(1), top: el?.offsetTop ?? 0 };
      });
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        if (offset >= section.top) current = section.id;
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed left-0 top-0 z-[60] h-[2px] bg-white/60 transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

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
            <div className="hidden items-center gap-5 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`transition ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="mt-0.5 block h-[2px] rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
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
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 text-sm transition ${
                      isActive ? "text-white" : "text-neutral-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
