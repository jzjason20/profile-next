import { timeline } from "@/data/content";

export function TimelineSection() {
  return (
    <section id="timeline" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Timeline
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Moments that shaped my curiosity
          </h2>
        </div>
        <div className="mt-16 space-y-12 border-l border-white/10 pl-8">
          {timeline.map((item) => (
            <div key={`${item.date}-${item.detail}`} className="relative">
              <span className="absolute -left-10 top-2 h-4 w-4 rounded-full border-2 border-sky-200 bg-black" />
              <p className="text-sm uppercase tracking-wide text-sky-200">
                {item.date}
              </p>
              <p className="mt-2 text-lg text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
