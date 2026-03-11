"use client";

import { AnimatedCodeLines } from "@/components/AnimatedCodeLines";
import DotGrid from "@/components/DotGrid";
import { FadeIn } from "@/components/FadeIn";
import SpotlightCard from "@/components/SpotlightCard";
import { aboutContent, contactContent } from "@/data/content";
import { useEffect, useRef, useState } from "react";

interface ReplEntry {
  command: string;
  output: string;
  isError?: boolean;
}

function toInlinePythonList(items: string[]): string {
  return `[${items.map((item) => `"${item}"`).join(", ")}]`;
}

function toInlinePythonDict(entries: Array<[string, string]>): string {
  return `{${entries
    .map(([key, value]) => `"${key}": "${value}"`)
    .join(", ")}}`;
}

function toPythonList(items: string[]): string {
  return `[\n${items.map((item) => `  "${item}"`).join(",\n")}\n]`;
}

function toPythonDict(entries: Array<[string, string]>): string {
  return `\{\n${entries
    .map(([key, value]) => `  "${key}": "${value}"`)
    .join(",\n")}\n\}`;
}

export function AboutSection() {
  const [command, setCommand] = useState("profile.help()");
  const [history, setHistory] = useState<ReplEntry[]>([]);
  const terminalHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = terminalHistoryRef.current;
    if (!container) return;

    const frame = requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });

    return () => cancelAnimationFrame(frame);
  }, [history]);

  const email = contactContent.email.replace(/^mailto:/, "");
  const discord =
    contactContent.socials.find((link) => link.label === "Discord")?.href ??
    "jacyjason20";

  const helpMethods = [
    "profile.contact()",
    "profile.currently_shipping()",
    "profile.stack()",
    "profile.hobbies()",
    "profile.unpopular_opinions()",
    "profile.currently_obsessing_over()",
    "profile.hire_me_if()",
    "profile.dont_hire_me_if()",
  ];

  const currentlyShipping = ["AskLexy", "LifeXP", "half-finished side quest"];
  const stackItems = Array.from(
    new Set(aboutContent.capabilityMap.flatMap((signal) => signal.tools)),
  );
  const contactEntries: Array<[string, string]> = [
    ["email", email],
    ["discord", discord],
  ];
  const unpopularOpinions = [
    "the best system design is the one you can delete later",
    "agent frameworks are solving problems most products don't have yet",
  ];
  const currentlyObsessingOver = ["F1 telemetry", "DDIA", "agent workflows"];
  const hireMeIf = [
    "your backend is on fire and needs an adult",
    "you want ML work that ends in production, not a research repo",
    "you're okay with 2am Slack messages",
  ];
  const dontHireMeIf = [
    "you need someone to wait for the ticket",
    "your stack is 100% Java Enterprise Edition",
    "you want estimates in story points",
  ];

  const codeLines = [
    "# profile.py",
    "from builder import Engineer",
    "",
    "class Jacy(Engineer):",
    "    def __init__(self):",
    `        self.name = "${aboutContent.realName}"`,
    `        self.focus = "ML systems + product execution"`,
    `        self.summary = "${aboutContent.summary}"`,
    "",
    "    def help(self):",
    "        return [",
    ...helpMethods.map((method) => `            "${method}",`),
    "        ]",
    "",
    "    def currently_shipping(self):",
    `        return ${toInlinePythonList(currentlyShipping)}`,
    "",
    "    def stack(self):",
    `        return ${toInlinePythonList(stackItems)}`,
    "",
    "    def hobbies(self):",
    `        return ${toInlinePythonList(aboutContent.hobbies)}`,
    "",
    "    def contact(self):",
    `        return ${toInlinePythonDict(contactEntries)}`,
    "",
    "    def unpopular_opinions(self):",
    `        return ${toInlinePythonList(unpopularOpinions)}`,
    "",
    "    def currently_obsessing_over(self):",
    `        return ${toInlinePythonList(currentlyObsessingOver)}`,
    "",
    "    def hire_me_if(self):",
    `        return ${toInlinePythonList(hireMeIf)}`,
    "",
    "    def dont_hire_me_if(self):",
    `        return ${toInlinePythonList(dontHireMeIf)}`,
    "",
    "profile = Jacy()",
  ];

  const runCommand = () => {
    const raw = command.trim();
    if (!raw) return;

    let output = "";
    let isError = false;

    const methodMatch = raw.match(/^profile\.([a-z_][a-z0-9_]*)\(\)$/i);

    if (!methodMatch) {
      output =
        "SyntaxError: try profile.help() or profile.<method>() with parentheses.";
      isError = true;
    } else {
      const method = methodMatch[1].toLowerCase();

      switch (method) {
        case "help":
          output = toPythonList(helpMethods);
          break;
        case "contact":
          output = toPythonDict(contactEntries);
          break;
        case "currently_shipping":
          output = toPythonList(currentlyShipping);
          break;
        case "stack":
          output = toPythonList(stackItems);
          break;
        case "hobbies":
          output = toPythonList(aboutContent.hobbies);
          break;
        case "unpopular_opinions":
          output = toPythonList(unpopularOpinions);
          break;
        case "currently_obsessing_over":
          output = toPythonList(currentlyObsessingOver);
          break;
        case "hire_me_if":
          output = toPythonList(hireMeIf);
          break;
        case "dont_hire_me_if":
          output = toPythonList(dontHireMeIf);
          break;
        case "secret":
          output =
            '"Monaco strategy > vibes. If you found this method, you are my kind of nerd."';
          break;
        default:
          output = `AttributeError: 'Jacy' object has no attribute '${method}'. Try profile.help() before summoning chaos.`;
          isError = true;
      }
    }

    setHistory((prev) =>
      [...prev, { command: raw, output, isError }].slice(-6),
    );
    setCommand("");
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      <DotGrid
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        gap={32}
        dotSize={6}
        baseColor="#1a1a1a"
        activeColor="#fafafa"
        proximity={160}
      />
      <FadeIn className="relative z-10 mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            About
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl">
            Gremlin energy, production output
          </h2>
          <p className="text-white/70">
            Fewer buzzwords, more receipts, occasional chaos.
          </p>
        </div>
        <div className="space-y-6">
          <SpotlightCard className="bg-neutral-950/85 lg:min-h-112">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 font-mono uppercase tracking-[0.2em] text-white/50">
                  profile.py
                </span>
              </div>
              <button
                type="button"
                onClick={runCommand}
                className="rounded-full border border-(--signal-cyan)/50 bg-(--signal-cyan)/10 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-(--signal-cyan) transition hover:border-(--signal-cyan) hover:bg-(--signal-cyan)/20"
              >
                run profile.py
              </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/45 p-3">
              <div className="max-h-80 overflow-auto pr-2 sm:max-h-96 lg:max-h-[480px]">
                <AnimatedCodeLines lines={codeLines} />
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-black/45 p-3 font-mono">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  Terminal Output
                </p>
                {history.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setHistory([])}
                    className="text-[10px] uppercase tracking-[0.14em] text-white/45 transition hover:text-white/70"
                  >
                    clear
                  </button>
                ) : null}
              </div>

              {history.length > 0 ? (
                <div
                  ref={terminalHistoryRef}
                  className="max-h-56 space-y-3 overflow-auto pr-1"
                >
                  {history.map((entry, idx) => (
                    <div key={`${entry.command}-${idx}`} className="space-y-1">
                      <p className="text-sm text-cyan-200">{`>>> ${entry.command}`}</p>
                      <p
                        className={`whitespace-pre-line text-sm ${
                          entry.isError
                            ? "text-rose-300/90"
                            : "text-emerald-200/85"
                        }`}
                      >
                        {entry.output}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-white/50">
                  Press run to execute{" "}
                  <span className="text-cyan-200">profile.help()</span>.
                </p>
              )}

              <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2">
                <span className="text-sm text-cyan-200">{">>>"}</span>
                <input
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      runCommand();
                    }
                  }}
                  placeholder="profile.help()"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>

              <p className="mt-2 text-[11px] text-white/40">
                Try: profile.currently_shipping(), profile.stack(),
                profile.unpopular_opinions(), profile.secret()
              </p>
            </div>
          </SpotlightCard>
          <SpotlightCard>
            <h3 className="text-xl font-semibold">Capability map</h3>
            <p className="mt-2 text-white/70">
              I rank by scars earned, not logos memorized.
            </p>
            <div className="mt-4 space-y-3">
              {aboutContent.capabilityMap.map((signal) => (
                <article
                  key={signal.area}
                  className="rounded-2xl border border-white/10 bg-white/2 p-4"
                >
                  <h4 className="text-base font-semibold text-white/90">
                    {signal.area}
                  </h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/55">
                    {signal.tools.join(" · ")}
                  </p>
                </article>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </FadeIn>
    </section>
  );
}
