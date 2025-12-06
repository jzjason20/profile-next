import SpotlightCard from "@/components/SpotlightCard";
import { aboutContent } from "@/data/content";

const codeLines = [
  "# About Me",
  "class Jacy:",
  "    def __init__(self):",
  `        self.name = "${aboutContent.realName}"`,
  `        self.age = ${aboutContent.age}`,
  `        self.about = "${aboutContent.summary}"`,
  "    def skills(self):",
  `        return ${JSON.stringify(aboutContent.skills)}`,
  "    def hobbies(self):",
  `        blog = "${aboutContent.blogUrl}"`,
  `        return ${JSON.stringify(aboutContent.hobbies)}`,
];

export function AboutSection() {
  return (
    <section id="about" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            About
          </p>
          <h2 className="text-3xl font-bold sm:text-5xl">
            Code meets curiosity
          </h2>
          <p className="text-white/70">
            A console-styled snapshot of who I am and what I obsess over.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <SpotlightCard className="bg-neutral-950/80">
            <div className="mb-6 flex items-center gap-2 text-xs text-white/40">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <pre className="space-y-2 font-mono text-sm leading-relaxed text-white/80">
              {codeLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </pre>
          </SpotlightCard>
          <div className="space-y-6">
            <SpotlightCard>
              <h3 className="text-xl font-semibold">Stacks I juggle</h3>
              <p className="mt-2 text-white/70">
                Tools, languages, and frameworks I keep reaching for.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {aboutContent.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </SpotlightCard>
            <SpotlightCard>
              <h3 className="text-xl font-semibold">When I disconnect</h3>
              <p className="mt-2 text-white/70">
                Still finding signals in the noise.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {aboutContent.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
              <a
                href={aboutContent.blogUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center text-sm text-white transition hover:text-white/80"
              >
                Stagdata — blog + lab notebook
              </a>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
