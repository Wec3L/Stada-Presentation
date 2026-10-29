# Stada Kazakhstan — AI Adoption Strategy Presentation

An interactive, web-based presentation outlining an AI adoption strategy for **Stada Kazakhstan**: the current state of the digital experience, a before/after look at the stada.kz website, and a roadmap toward an AI-assisted future experience.

**Live demo:** https://stada-presentation.vercel.app

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 3
- [GSAP](https://gsap.com/) and [Framer Motion](https://www.framer.com/motion/) for animations
- [Spline](https://spline.design/) and [Three.js](https://threejs.org/) for 3D scenes
- [Lucide](https://lucide.dev/) icons
- Deployed on [Vercel](https://vercel.com/)

## Run locally

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/Wec3L/Stada-Presentation.git
cd Stada-Presentation
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint app and components
```

## Project structure

```
app/          # Next.js App Router pages, layout and global styles
components/   # Animated UI components (shader background, sparkles, Spline scene)
public/images # Slides imagery and before/after website screenshots
```

## Author

**Oleksandr Melai** — AI Automation & Web Developer, founder of [Melay Studio](https://melaystudio.com).
