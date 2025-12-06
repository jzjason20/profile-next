## Jacy — Personal Website

This project rebuilds my previous static profile into a modern Next.js site. It keeps the same content (hero, about code block, projects grid, and timeline) while adding:

- Particles.js-inspired hero powered by `@tsparticles/react` with the `links` preset.
- ReactBits components (BlurText + SpotlightCard) via `shadcn/ui` for interactive headings and hover cards.
- Tailwind CSS v4 styling with a bold noir palette, rounded glass panels, and scroll-snapping offsets.

### Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS v4, shadcn/ui, and ReactBits registry
- tsParticles for the hero background
- Lucide icons + framer-motion accents

### Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to preview. Content lives in `src/data/content.ts`, so updating copy or links does not require editing the layout components.
