"use client";

import {
  ArrowRight,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  FileText,
  Languages,
  Layers3,
  LineChart,
  Megaphone,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  Sparkles,
  UsersRound,
  Workflow,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants
} from "framer-motion";
import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShaderAnimation } from "@/components/shader-animation";
import { SplineScene } from "@/components/ui/splite";
import { SparklesCore } from "@/components/ui/sparkles";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.08 }
  }
};

const darkFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
  }
};

const aiDepartments: Array<{
  id: string;
  label: string;
  icon: LucideIcon;
  detail: string;
}> = [
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    detail: "Faster content creation, campaign generation and localization."
  },
  {
    id: "sales",
    label: "Sales",
    icon: ChartNoAxesCombined,
    detail: "Smarter reporting, market insights and competitor monitoring."
  },
  {
    id: "hr",
    label: "HR",
    icon: UsersRound,
    detail: "Hiring workflows, onboarding and internal knowledge systems."
  },
  {
    id: "digital",
    label: "Digital",
    icon: MonitorSmartphone,
    detail: "Website management, SEO, product content and digital assets."
  },
  {
    id: "operations",
    label: "Operations",
    icon: Workflow,
    detail: "Automation of repetitive processes and workflow optimization."
  }
];

const ORBIT_TOP_ANGLE = -90;
const ORBIT_STEP_ANGLE = 360 / aiDepartments.length;
const normalizeOrbitTarget = (currentAngle: number, targetAngle: number) =>
  currentAngle + ((((targetAngle - currentAngle) % 360) + 540) % 360) - 180;

const timeline = [
  {
    period: "0-30 Days",
    title: "Foundation",
    items: ["Own the website", "Audit workflows", "Find AI opportunities"]
  },
  {
    period: "30-60 Days",
    title: "Activation",
    items: ["Launch improvements", "Automate routine work", "Enable teams"]
  },
  {
    period: "60-90 Days",
    title: "Scale",
    items: ["Scale solutions", "Build knowledge systems", "Create roadmap"]
  }
];

const visionInitiatives: Array<{
  title: string;
  short: string;
  body: string;
  icon: LucideIcon;
  x: number;
  y: number;
}> = [
  {
    title: "AI Knowledge Assistant",
    short: "Knowledge",
    body: "Approved answers, internal guidance and fast access to operational knowledge.",
    icon: BrainCircuit,
    x: 50,
    y: 15
  },
  {
    title: "AI Content Studio",
    short: "Content",
    body: "Briefs, drafts, variants and localization support for compliant content workflows.",
    icon: FileText,
    x: 76,
    y: 36
  },
  {
    title: "Digital Asset Hub",
    short: "Assets",
    body: "A single controlled system for brand, web, content and campaign assets.",
    icon: Layers3,
    x: 70,
    y: 78
  },
  {
    title: "AI Analytics",
    short: "Analytics",
    body: "Signals from web, campaign and workflow data transformed into clearer decisions.",
    icon: LineChart,
    x: 30,
    y: 78
  },
  {
    title: "Smart Internal Tools",
    short: "Tools",
    body: "Small, focused applications that remove repetitive work across departments.",
    icon: Rocket,
    x: 24,
    y: 36
  }
];

const transformationStages = [
  {
    title: "Digital Assets",
    body: "A clear foundation of websites, content, brand systems and structured digital ownership."
  },
  {
    title: "AI Systems",
    body: "Reusable intelligence layers that connect knowledge, accelerate workflows and support decisions."
  },
  {
    title: "Business Impact",
    body: "Faster execution, stronger perception and a scalable model for continuous innovation."
  }
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-xl"
    >
      <Sparkles className="h-4 w-4" />
      {children}
    </motion.div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={stagger}
      className="mx-auto max-w-5xl text-center"
    >
      <SectionLabel>{eyebrow}</SectionLabel>
      <motion.h2 variants={fadeUp} className="text-balance text-5xl font-semibold leading-[0.98] text-ink md:text-7xl">
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-graphite/76 md:text-2xl md:leading-9">
        {text}
      </motion.p>
    </motion.div>
  );
}

function HeroScene({
  cursorX,
  cursorY
}: {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) {
  const { scrollYProgress } = useScroll();
  const robotY = useTransform(scrollYProgress, [0, 0.2], [0, 90]);
  const robotScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.94]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.62]);
  const springCursorX = useSpring(cursorX, { stiffness: 70, damping: 20 });
  const springCursorY = useSpring(cursorY, { stiffness: 70, damping: 20 });
  const robotX = useTransform(springCursorX, [-1, 1], [-34, 34]);
  const cursorLift = useTransform(springCursorY, [-1, 1], [-24, 24]);
  const robotRotate = useTransform(springCursorX, [-1, 1], [-3.2, 3.2]);

  return (
    <motion.div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute right-[-18rem] top-[-10rem] h-[52rem] w-[52rem] rounded-full bg-blue-200/46 blur-3xl md:right-[-11rem] lg:right-[-7rem]"
      />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute bottom-[-18rem] right-[-9rem] h-[48rem] w-[48rem] rounded-full bg-cyan-100/52 blur-3xl"
      />
      <div className="absolute inset-y-0 right-0 w-[80vw] bg-[radial-gradient(circle_at_62%_38%,rgba(10,132,255,0.22),transparent_30%),radial-gradient(circle_at_74%_62%,rgba(220,241,255,0.62),transparent_32%)]" />
      <motion.div
        style={{ x: robotX, y: robotY, scale: robotScale, rotateY: robotRotate }}
        initial={{ opacity: 0, x: 70, filter: "blur(18px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.15, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-[-12rem] top-[35rem] h-[32rem] w-[38rem] sm:right-[-12rem] sm:top-[28rem] sm:h-[42rem] sm:w-[48rem] md:right-[-15rem] md:top-[7rem] md:h-[58rem] md:w-[66rem] lg:right-[-20vw] lg:top-[-3vh] lg:h-[118vh] lg:w-[82vw] xl:right-[-16vw] xl:w-[78vw]"
      >
        <motion.div style={{ y: cursorLift }} className="hero-robot-scene pointer-events-auto h-full w-full scale-[1.16] md:scale-[1.28] lg:scale-[1.5]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-[76vw] bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.88)_38%,rgba(255,255,255,0.34)_74%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[24rem] bg-gradient-to-b from-white via-white/74 to-transparent md:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/88 via-white/36 to-transparent" />
    </motion.div>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.58]);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-[var(--page-x)] pb-20 pt-14"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        cursorX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        cursorY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onMouseLeave={() => {
        cursorX.set(0);
        cursorY.set(0);
      }}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
      <HeroScene cursorX={cursorX} cursorY={cursorY} />
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid min-h-[calc(100vh-8.5rem)] items-center"
        >
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-[39rem] xl:max-w-[43rem] lg:text-left">
            <motion.div
              variants={darkFadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/72 px-5 py-2.5 text-sm font-semibold text-graphite shadow-sm backdrop-blur-xl lg:mb-6 lg:px-4 lg:py-2 lg:text-xs"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_24px_rgba(10,132,255,0.8)]" />
              Digital Innovation & AI Solutions Specialist
            </motion.div>
            <motion.h1
              aria-label="Building the Future of Digital Innovation"
              variants={fadeUp}
              className="text-balance text-5xl font-semibold leading-[0.96] text-ink sm:text-6xl md:text-7xl lg:text-[3.74rem] xl:text-[3.98rem]"
            >
              <span aria-hidden="true" className="block">Building the Future</span>
              <span aria-hidden="true" className="block">of Digital Innovation</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl text-xl leading-8 text-graphite/75 md:text-2xl md:leading-9 lg:mx-0 lg:mt-6 lg:max-w-[37rem] lg:text-[1.32rem] lg:leading-8"
            >
              I create modern digital solutions, AI-driven workflows and scalable innovation systems that help organizations work smarter and faster.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:mt-8 lg:items-start">
              <a
                href="#website-redesign"
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                View transformation case
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#vision"
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3 text-sm font-semibold text-graphite backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
              >
                Explore 2027 vision
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Opportunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const lineFill = lineFillRef.current;
    if (!section || !lineFill) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      onUpdate: (self) => {
        const nextStage = Math.min(
          transformationStages.length - 1,
          Math.floor(self.progress * transformationStages.length)
        );
        setActiveStage(nextStage);
        gsap.to(lineFill, {
          scaleY: self.progress,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[230vh] bg-[#03060c] text-white">
      <div className="sticky top-0 h-screen overflow-hidden px-[var(--page-x)] py-10 md:py-24">
        <ShaderAnimation className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(255,255,255,0.10),transparent_28%),linear-gradient(90deg,rgba(3,6,12,0.92)_0%,rgba(3,6,12,0.64)_42%,rgba(3,6,12,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,6,12,0.86)_0%,rgba(3,6,12,0.16)_46%,rgba(3,6,12,0.88)_100%)]" />
        <div className="relative z-10 mx-auto grid h-full max-w-7xl gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger}>
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100 shadow-sm backdrop-blur-xl"
            >
              The Opportunity
            </motion.div>
            <motion.h2 variants={darkFadeUp} className="text-balance text-4xl font-semibold leading-[1] text-white sm:text-5xl md:text-7xl">
              Transformation is becoming a competitive operating system.
            </motion.h2>
            <motion.p variants={darkFadeUp} className="mt-5 max-w-2xl text-base leading-7 text-white/72 md:mt-7 md:text-xl md:leading-8">
              AI, automation and modern digital experiences are no longer side projects. They are how high-performing teams reduce friction, make knowledge available and move faster with confidence.
            </motion.p>
          </motion.div>

          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
            <div className="absolute left-[1.15rem] top-10 h-[calc(100%-5rem)] w-px bg-white/14 md:left-1/2 md:-translate-x-1/2" />
            <div
              ref={lineFillRef}
              className="absolute left-[1.15rem] top-10 h-[calc(100%-5rem)] w-px origin-top scale-y-0 bg-gradient-to-b from-white via-blue-100 to-white/40 shadow-[0_0_24px_rgba(147,197,253,0.55)] md:left-1/2 md:-translate-x-1/2"
            />
            <div className="relative grid gap-9 py-2 md:gap-16 md:py-8">
              {transformationStages.map((stage, index) => {
                const isActive = activeStage === index;
                return (
                  <motion.div
                    key={stage.title}
                    animate={{
                      opacity: isActive ? 1 : 0.34,
                      y: isActive ? 0 : 8,
                      filter: isActive ? "blur(0px)" : "blur(0.2px)"
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative grid gap-6 pl-14 md:grid-cols-[1fr_4rem_1fr] md:items-center md:gap-8 md:pl-0"
                  >
                    <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-3"}>
                      <div className="text-2xl font-semibold leading-none text-white md:text-5xl">
                        {stage.title}
                      </div>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/62 md:mt-4 md:text-lg md:leading-7">
                        {stage.body}
                      </p>
                    </div>
                    <div className="absolute left-0 top-1 h-9 w-9 rounded-full border border-white/22 bg-white/10 backdrop-blur-xl md:static md:col-start-2 md:row-start-1 md:mx-auto">
                      <motion.div
                        animate={{ scale: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.36 }}
                        className="absolute inset-2 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.72)]"
                      />
                    </div>
                    {index < transformationStages.length - 1 && (
                      <motion.div
                        animate={{ opacity: isActive ? 0.95 : 0.32, y: isActive ? 0 : 4 }}
                        className="absolute -bottom-10 left-[0.72rem] text-3xl font-light text-white/70 md:left-1/2 md:-translate-x-1/2"
                      >
                        ↓
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const websiteComparisons = [
  {
    title: "Homepage",
    before: "/images/old-home-stada-kz.png",
    after: "/images/new-home-stada-kz.png"
  },
  {
    title: "Product Catalogue",
    before: "/images/old-products-stada-kz.png",
    after: "/images/new-products-stada-kz.png"
  },
  {
    title: "Product Detail",
    before: "/images/old-product-stada-kz.png",
    after: "/images/new-product-stada-kz.png"
  }
];

const redesignBenefits: Array<{
  title: string;
  icon: LucideIcon;
}> = [
  {
    title: "Modern Visual Identity",
    icon: Sparkles
  },
  {
    title: "Improved User Experience",
    icon: MonitorSmartphone
  },
  {
    title: "Full Localization",
    icon: Languages
  }
];

const compactFeatureReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const transformationSequence = websiteComparisons.flatMap((comparison, pairIndex) => [
  {
    id: `${pairIndex}-before`,
    pairIndex,
    title: comparison.title,
    state: "before" as const,
    stateLabel: "Current State",
    image: comparison.before
  },
  {
    id: `${pairIndex}-after`,
    pairIndex,
    title: comparison.title,
    state: "after" as const,
    stateLabel: "Future Experience",
    image: comparison.after
  }
]);

function TransformationStage({
  activeStep,
  onPrevious,
  onNext,
  onSelect
}: {
  activeStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const currentStep = transformationSequence[activeStep];
  const nextStep = transformationSequence[(activeStep + 1) % transformationSequence.length];
  const transitionDuration = shouldReduceMotion ? 0.2 : 0.68;

  return (
    <div className="relative mx-auto aspect-[1860/925] w-full max-w-[70rem] overflow-hidden rounded-2xl bg-white shadow-[0_20px_64px_rgba(15,23,42,0.13)] ring-1 ring-slate-900/[0.04] md:rounded-[1.35rem]">
      <Image
        src={nextStep.image}
        alt=""
        fill
        aria-hidden="true"
        sizes="(max-width: 767px) calc(100vw - 2rem), 70rem"
        className="pointer-events-none select-none object-cover object-left opacity-0"
      />

      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentStep.id}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.012, y: 3 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.988, y: -2 }}
          transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
          drag={shouldReduceMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -48) onNext();
            if (info.offset.x > 48) onPrevious();
          }}
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
        >
          <Image
            src={currentStep.image}
            alt={`${currentStep.title} ${currentStep.stateLabel.toLowerCase()} website screenshot`}
            fill
            priority={activeStep < 2}
            sizes="(max-width: 767px) calc(100vw - 2rem), 70rem"
            draggable={false}
            className="select-none object-cover object-left"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute left-3 top-3 z-20 md:left-4 md:top-4" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentStep.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1.5 shadow-[0_5px_18px_rgba(15,23,42,0.11)] backdrop-blur-xl"
          >
            <span className="text-[0.64rem] font-semibold text-ink/70 md:text-[0.68rem]">{currentStep.title}</span>
            <span className="h-3 w-px bg-slate-300" />
            <span className={`h-1.5 w-1.5 rounded-full ${currentStep.state === "after" ? "bg-blue-600" : "bg-slate-400"}`} />
            <span className={`text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${currentStep.state === "after" ? "text-blue-700" : "text-slate-500"}`}>
              {currentStep.stateLabel}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onPrevious}
        aria-label="Show previous transformation state"
        className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_7px_24px_rgba(15,23,42,0.14)] ring-1 ring-white/80 backdrop-blur-xl transition duration-300 hover:-translate-y-[55%] hover:text-blue-700 hover:shadow-[0_10px_30px_rgba(15,23,42,0.18)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 md:left-3"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Show next transformation state"
        className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/90 text-white shadow-[0_7px_24px_rgba(15,23,42,0.18)] ring-1 ring-white/15 backdrop-blur-xl transition duration-300 hover:-translate-y-[55%] hover:bg-blue-600 hover:shadow-[0_10px_30px_rgba(10,132,255,0.24)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 md:right-3"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div
        className="absolute bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-[0_5px_20px_rgba(15,23,42,0.13)] backdrop-blur-xl"
        role="tablist"
        aria-label="Transformation sequence"
      >
        {websiteComparisons.map((comparison, pairIndex) => (
          <div key={comparison.title} className="flex items-center gap-1">
            {(["before", "after"] as const).map((state, stateIndex) => {
              const stepIndex = pairIndex * 2 + stateIndex;
              const isActive = stepIndex === activeStep;
              const isComplete = stepIndex < activeStep;

              return (
                <button
                  key={state}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${comparison.title} ${state === "before" ? "current state" : "future experience"}`}
                  onClick={() => onSelect(stepIndex)}
                  className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 ${
                    isActive
                      ? state === "after"
                        ? "w-7 bg-blue-600"
                        : "w-7 bg-slate-600"
                      : isComplete
                        ? "w-4 bg-blue-300"
                        : "w-4 bg-slate-300"
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function WebsiteRedesign() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const showPrevious = () => {
    setActiveStep((current) => (current - 1 + transformationSequence.length) % transformationSequence.length);
  };

  const showNext = () => {
    setActiveStep((current) => (current + 1) % transformationSequence.length);
  };

  return (
    <section id="website-redesign" className="relative isolate overflow-hidden bg-white px-4 pb-2 pt-4 sm:px-6 md:px-5 lg:min-h-[100svh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(10,132,255,0.11),transparent_31rem),linear-gradient(180deg,#ffffff_0%,#f7fbff_48%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute left-[-12rem] top-[30%] h-[32rem] w-[32rem] rounded-full bg-blue-100/45 blur-3xl" />
      <div className="pointer-events-none absolute right-[-14rem] top-[63%] h-[36rem] w-[36rem] rounded-full bg-cyan-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-[118rem]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Main Case Study
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-balance text-4xl font-semibold leading-[0.92] text-ink md:text-[2.85rem] lg:text-nowrap lg:text-[2.8rem]">
            From Current State to Future Experience
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-2 max-w-4xl text-base leading-6 text-graphite/76">
            This redesign turns digital assets into scalable, interactive and business-ready experiences.
          </motion.p>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3"
        >
          <TransformationStage
            activeStep={activeStep}
            onPrevious={showPrevious}
            onNext={showNext}
            onSelect={setActiveStep}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-70px" }}
          variants={compactFeatureReveal}
          className="mx-auto mt-2 max-w-[70rem] overflow-hidden rounded-2xl border border-white/80 bg-white/58 px-3 py-2 shadow-[0_8px_28px_rgba(15,23,42,0.045)] backdrop-blur-xl md:rounded-[1.35rem]"
        >
          <div className="grid gap-1 md:grid-cols-3 md:gap-0">
            {redesignBenefits.map(({ title, icon: Icon }, index) => (
              <motion.div
                key={title}
                whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center justify-center gap-2.5 px-3 py-1.5 text-center ${
                  index > 0 ? "md:border-l md:border-slate-200/80" : ""
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="whitespace-nowrap text-xs font-semibold text-ink/84 md:text-[0.78rem] lg:text-sm">{title}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AiAcrossStory() {
  const storyRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"]
  });
  const introOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15, 1], [1, 1, 0, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.08, 0.15, 1], [0, 0, -96, -96]);
  const orbitOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15, 1], [0.06, 0.36, 1, 1]);
  const orbitY = useTransform(scrollYProgress, [0, 0.15, 1], [42, 0, 0]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.15, 1], [0.98, 1, 1]);

  return (
    <section ref={storyRef} className="relative h-[300vh] bg-black text-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(37,99,235,0.18),transparent_42%),linear-gradient(180deg,#02030a_0%,#000_48%,#02030a_100%)]" />
        <motion.div
          style={{ opacity: orbitOpacity, y: orbitY, scale: orbitScale }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="w-full">
            <AiAcrossCompany />
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center px-[var(--page-x)]"
        >
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="max-w-5xl text-balance text-6xl font-bold leading-[0.92] tracking-normal text-white md:text-8xl lg:text-[7.6rem]">
              AI is not{" "}
              <br />
              a department.
            </h2>
            <p className="mt-12 max-w-4xl text-balance text-3xl font-bold leading-tight tracking-normal text-white md:mt-16 md:text-5xl md:leading-[1.06]">
              It is a capability that can amplify every team across the organization.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AiAcrossCompany() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(ORBIT_TOP_ANGLE);
  const [autoRotate, setAutoRotate] = useState(true);
  const [orbitSize, setOrbitSize] = useState(0);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const activeDepartment = activeId ? aiDepartments.find((department) => department.id === activeId) ?? null : null;
  const orbitScaleFactor = orbitSize && orbitSize < 440 ? 0.37 : 0.415;
  const orbitRadius = orbitSize ? Math.max(118, Math.min(284, orbitSize * orbitScaleFactor)) : 252;

  useEffect(() => {
    if (!autoRotate || reduceMotion) return;

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((current) => Number(((current + 0.18) % 360).toFixed(3)));
    }, 50);

    return () => window.clearInterval(rotationTimer);
  }, [autoRotate, reduceMotion]);

  useEffect(() => {
    const updateOrbitSize = () => {
      if (!orbitRef.current) return;
      setOrbitSize(orbitRef.current.getBoundingClientRect().width);
    };

    updateOrbitSize();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateOrbitSize);
    if (orbitRef.current && observer) observer.observe(orbitRef.current);
    window.addEventListener("resize", updateOrbitSize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateOrbitSize);
    };
  }, []);

  const selectDepartment = (departmentId: string, index: number) => {
    if (activeId === departmentId) {
      setActiveId(null);
      setAutoRotate(true);
      return;
    }

    setActiveId(departmentId);
    setAutoRotate(false);
    const targetAngle = ORBIT_TOP_ANGLE - index * ORBIT_STEP_ANGLE;
    setRotationAngle((current) => normalizeOrbitTarget(current, targetAngle));
  };

  const clearSelection = () => {
    setActiveId(null);
    setAutoRotate(true);
  };

  return (
    <section
      aria-label="AI Across the Company"
      className="relative isolate overflow-hidden bg-black px-[var(--page-x)] py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.24),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.12),transparent_54%),linear-gradient(180deg,#02030a_0%,#000_55%,#02030a_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
        <div
          ref={orbitRef}
          className="relative aspect-square w-[min(92vw,43rem)]"
          style={{ "--orbit-radius": `${orbitRadius}px` } as React.CSSProperties}
        >
          <div className="absolute inset-[7%] rounded-full border border-sky-300/10 shadow-[inset_0_0_50px_rgba(59,130,246,0.06)]" />
          <div className="absolute inset-[16%] rounded-full border border-sky-300/14" />
          <div className="absolute inset-[29%] rounded-full border border-white/8" />
          <div className="absolute inset-[39%] rounded-full border border-sky-300/12" />

          <div className="absolute left-1/2 top-1/2 z-30 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-200/35 bg-black shadow-[0_0_34px_rgba(14,165,233,0.36),0_0_120px_rgba(37,99,235,0.28)] md:h-32 md:w-32">
            <span className="absolute inset-2 rounded-full border border-white/8" />
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_68%)]" />
            <span className="relative text-3xl font-semibold tracking-tight md:text-4xl">AI</span>
          </div>

          {aiDepartments.map((department, index) => {
            const Icon = department.icon;
            const angle = index * ORBIT_STEP_ANGLE + rotationAngle;
            const radians = (angle * Math.PI) / 180;
            const selected = activeId === department.id;
            const depth = (Math.sin(radians) + 1) / 2;
            const x = Math.cos(radians) * orbitRadius;
            const y = Math.sin(radians) * orbitRadius;

            return (
              <div
                key={department.id}
                className={`absolute left-1/2 top-1/2 transition-transform ${autoRotate ? "duration-75 ease-linear" : "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  zIndex: selected ? 70 : Math.round(20 + depth * 18)
                }}
              >
                <motion.button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectDepartment(department.id, index)}
                  className="group relative h-28 w-32 -translate-x-1/2 -translate-y-1/2 outline-none md:h-36 md:w-36"
                  style={{
                    opacity: selected ? 1 : 0.72 + depth * 0.26
                  }}
                >
                  <span
                    className={`absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition duration-500 md:h-24 md:w-24 ${
                      selected ? "bg-sky-400/30" : "bg-blue-500/10 group-hover:bg-sky-400/20"
                    }`}
                  />
                  <span
                    data-orbit-circle
                    className={`absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-black/88 backdrop-blur-xl transition duration-500 md:h-20 md:w-20 ${
                      selected
                        ? "border-sky-200 text-white shadow-[0_0_28px_rgba(56,189,248,0.45),inset_0_0_22px_rgba(59,130,246,0.18)]"
                        : "border-white/20 text-white/72 shadow-[0_0_22px_rgba(37,99,235,0.12)] group-hover:border-sky-200/60 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5 md:h-7 md:w-7" />
                    <span
                      className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-black transition ${
                        selected ? "bg-sky-200 shadow-[0_0_16px_rgba(125,211,252,0.95)]" : "bg-sky-400/45"
                      }`}
                    />
                  </span>
                  <span
                    data-orbit-label
                    className={`absolute left-1/2 top-[calc(50%+2.2rem)] -translate-x-1/2 rounded-full border px-2 py-0.5 text-[0.7rem] font-semibold tracking-[0.08em] transition md:top-[calc(50%+3rem)] md:px-3 md:py-1 md:text-sm ${
                      selected
                        ? "border-sky-200/50 bg-sky-300/10 text-white shadow-[0_0_24px_rgba(14,165,233,0.18)]"
                        : "border-white/10 bg-black/35 text-white/58 group-hover:border-sky-200/30 group-hover:text-white/86"
                    }`}
                  >
                    {department.label}
                  </span>
                </motion.button>
              </div>
            );
          })}

          {activeDepartment && (
            <div
              className="absolute left-1/2 z-[65] w-[min(72vw,17.5rem)] -translate-x-1/2 md:w-[18.5rem]"
              style={{ top: "calc(50% - var(--orbit-radius) + 8.85rem)" }}
            >
              <div className="absolute bottom-full left-1/2 h-11 w-px -translate-x-1/2 bg-gradient-to-b from-sky-200/80 to-sky-200/10 shadow-[0_0_14px_rgba(125,211,252,0.75)] md:h-12" />
              <motion.div
                key={activeDepartment.id}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[13.5rem] rounded-lg border border-sky-200/18 bg-black/82 px-5 py-7 text-center shadow-[0_24px_80px_rgba(2,132,199,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl md:min-h-[14.25rem] md:px-6 md:py-8"
              >
                <button
                  type="button"
                  aria-label="Close department detail"
                  onClick={clearSelection}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/54 transition hover:border-sky-200/40 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />
                <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-sky-200/76">AI Opportunity</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">{activeDepartment.label}</h3>
                <p className="mx-auto mt-6 max-w-[14.5rem] text-sm leading-6 text-white/68 md:text-[0.95rem] md:leading-7">
                  {activeDepartment.detail}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function NinetyDayPlan() {
  return (
    <section className="relative overflow-hidden bg-white px-[var(--page-x)] pb-24 pt-20 md:pb-28 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-[#02030a] to-white" />
      <div className="relative z-10">
        <SectionIntro
          eyebrow="90 Day Plan"
          title="From ownership to measurable innovation."
          text="A focused plan that starts with clarity, quickly launches improvements and then builds systems that can scale."
        />
      </div>
      <div className="relative z-10 mx-auto mt-12 max-w-6xl md:mt-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="relative grid gap-4 md:grid-cols-3 md:gap-5"
        >
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-11 hidden h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent md:block" />
          {timeline.map((step, index) => (
            <motion.div
              key={step.period}
              variants={fadeUp}
              className="relative rounded-[1.75rem] border border-slate-200/90 bg-white/92 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl md:min-h-[18rem] md:p-6"
            >
              {index < timeline.length - 1 && (
                <div className="absolute right-[-1.15rem] top-10 z-20 hidden h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-500 shadow-sm md:flex">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700">{step.period}</div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                  {index + 1}
                </div>
              </div>
              <h3 className="mt-7 text-3xl font-semibold tracking-tight text-ink">{step.title}</h3>
              <div className="mt-6 grid gap-3">
                {step.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-base leading-6 text-graphite/74">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Vision2027() {
  const [activeVisionIndex, setActiveVisionIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeFeature = visionInitiatives[activeVisionIndex];
  const ActiveVisionIcon = activeFeature.icon;

  return (
    <section id="vision" className="relative isolate overflow-hidden bg-black px-[var(--page-x)] py-24 text-white md:py-32">
      <SparklesCore
        id="vision-sparkles"
        background="transparent"
        minSize={0.45}
        maxSize={1.45}
        particleDensity={130}
        particleColor="#7dd3fc"
        speed={0.42}
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(14,165,233,0.2),transparent_30rem),radial-gradient(circle_at_75%_45%,rgba(168,85,247,0.16),transparent_28rem),linear-gradient(180deg,rgba(0,0,0,0.82),rgba(2,6,23,0.68)_45%,rgba(0,0,0,0.92))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent opacity-95" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-7 inline-flex rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_34px_rgba(56,189,248,0.16)] backdrop-blur-xl"
          >
            Vision 2027
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-balance text-5xl font-semibold leading-[0.98] tracking-normal md:text-7xl">
            The Future Is Not One Tool. It&apos;s a Connected System.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-white/70 md:text-2xl md:leading-9">
            A practical AI ecosystem where knowledge, content, assets, analytics and internal workflows work together.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_34px_120px_rgba(14,165,233,0.12)] backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(59,130,246,0.22),transparent_22rem)]" />
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={shouldReduceMotion ? undefined : { opacity: [0.18, 0.38, 0.18], scale: [0.98, 1.03, 0.98] }}
                transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full rounded-full border border-cyan-200/14"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/16" />
            <div className="absolute left-1/2 top-1/2 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/28" />

            <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
              {visionInitiatives.map((item, index) => {
                const isActive = index === activeVisionIndex;

                return (
                  <motion.line
                    key={item.title}
                    x1="50%"
                    y1="50%"
                    x2={`${item.x}%`}
                    y2={`${item.y}%`}
                    stroke={isActive ? "rgba(125,211,252,0.82)" : "rgba(255,255,255,0.1)"}
                    strokeWidth={isActive ? 1.4 : 0.7}
                    strokeDasharray={isActive ? "0" : "5 12"}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.46 }}
                    transition={{ duration: 0.28 }}
                  />
                );
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                key={activeFeature.title}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full w-full flex-col items-center justify-center rounded-full border border-white/18 bg-black/72 text-center shadow-[0_0_90px_rgba(59,130,246,0.5)] backdrop-blur-xl"
              >
                <ActiveVisionIcon className="h-9 w-9 text-cyan-100" />
                <span className="mt-3 max-w-28 text-sm font-semibold leading-tight text-white">{activeFeature.short}</span>
              </motion.div>
            </div>

            {visionInitiatives.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeVisionIndex;

              return (
                <div
                  key={item.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  <motion.div
                    className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-semibold backdrop-blur-xl transition-colors ${
                      isActive
                        ? "border-cyan-200/55 bg-cyan-300/16 text-white shadow-[0_0_38px_rgba(56,189,248,0.32)]"
                        : "border-white/10 bg-white/[0.055] text-white/52"
                    }`}
                    animate={shouldReduceMotion ? undefined : { y: isActive ? [-2, -8, -2] : [0, -5, 0] }}
                    transition={shouldReduceMotion ? undefined : { duration: isActive ? 3.8 : 5 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                        isActive ? "bg-cyan-300 text-slate-950" : "bg-white/8 text-white/62"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.short}</span>
                  </motion.div>
                </div>
              );
            })}

            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={stagger}
            className="relative grid h-[41rem] grid-rows-5 gap-3 overflow-visible"
          >
            <div className="pointer-events-none absolute bottom-7 left-6 top-7 w-px bg-gradient-to-b from-transparent via-cyan-200/28 to-transparent" />
            {visionInitiatives.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeVisionIndex;

              return (
                <motion.div key={item.title} variants={darkFadeUp} className="relative min-h-0">
                  <motion.button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveVisionIndex(index)}
                  onMouseEnter={() => setActiveVisionIndex(index)}
                  onFocus={() => setActiveVisionIndex(index)}
                  animate={shouldReduceMotion ? undefined : { scale: isActive ? 1.01 : 1 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: isActive ? 1.01 : 1.006 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative h-full w-full overflow-hidden rounded-[1.45rem] border text-left backdrop-blur-xl outline-none transition-[background-color,border-color,box-shadow,opacity] duration-300 focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${
                    isActive
                      ? "border-cyan-200/38 bg-white/[0.12] p-4 opacity-100 shadow-[0_18px_60px_rgba(56,189,248,0.18)] md:p-5"
                      : "border-white/10 bg-white/[0.045] p-4 opacity-74 hover:border-white/18 hover:bg-white/[0.07]"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.22),transparent_18rem)] transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                        isActive ? "border-cyan-200/40 bg-cyan-200 text-slate-950" : "border-white/10 bg-white/[0.06] text-white/54"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-end">
                        <span className={`h-2 w-2 rounded-full ${isActive ? "bg-cyan-200 shadow-[0_0_20px_rgba(125,211,252,0.9)]" : "bg-white/18"}`} />
                      </div>
                      <h3 className={`font-semibold tracking-normal transition-colors ${isActive ? "-mt-1 text-xl text-white md:text-2xl" : "-mt-2 text-lg text-white/72"}`}>
                        {item.title}
                      </h3>
                      <AnimatePresence initial={false} mode="wait">
                        {isActive ? (
                          <motion.p
                            key="active"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                            transition={{ duration: 0.22 }}
                            className="mt-3 max-w-xl text-sm leading-6 text-white/74 md:text-base"
                          >
                            {item.body}
                          </motion.p>
                        ) : (
                          <motion.p
                            key="inactive"
                            initial={false}
                            animate={{ opacity: 1 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                            className="mt-2 text-sm font-medium text-white/38"
                          >
                            {item.short}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutMe() {
  const principles: Array<{ title: string; body: string; icon: LucideIcon }> = [
    {
      title: "Initiative",
      body: "I look for practical opportunities before they become formal tasks.",
      icon: Search
    },
    {
      title: "Problem solving",
      body: "I connect business needs with digital tools that remove friction.",
      icon: Network
    },
    {
      title: "Continuous learning",
      body: "I keep adapting as AI, automation and modern web systems evolve.",
      icon: BrainCircuit
    },
    {
      title: "Innovation mindset",
      body: "I focus on useful systems that create measurable value for teams.",
      icon: Building2
    }
  ];

  return (
    <section className="relative overflow-hidden bg-white px-[var(--page-x)] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(10,132,255,0.08),transparent_26rem),linear-gradient(180deg,#fff_0%,#f8fbff_100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-120px" }} variants={stagger}>
          <SectionLabel>About Me</SectionLabel>
        </motion.div>
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mx-auto w-full max-w-[31rem] lg:mx-0"
        >
          <motion.div variants={fadeUp} className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-[0_34px_100px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/80">
            <Image
              src="/images/oleksandr-melai-portrait.png"
              alt="Oleksandr Melai portrait"
              width={1086}
              height={1448}
              sizes="(max-width: 1023px) min(31rem, calc(100vw - 2.5rem)), 31rem"
              className="aspect-[4/5] h-full w-full object-cover object-center"
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-7">
            <h2 className="text-4xl font-semibold tracking-normal text-ink md:text-5xl">
              <span className="shiny-text shiny-text-title">Oleksandr Melai</span>
            </h2>
            <p className="mt-3 text-xl font-medium leading-7 text-graphite/76 md:text-2xl">
              <span className="shiny-text shiny-text-subtitle">Digital Innovation &amp; AI Solutions</span>
            </p>
            <p className="mt-4 inline-flex items-center gap-2.5 text-base font-medium text-graphite/48 md:text-lg">
              <span className="ukraine-flag-icon" aria-label="Ukraine flag" />
              <span>Odessa, Ukraine</span>
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="grid gap-4 lg:gap-5"
        >
          {principles.map(({ title, body, icon: Icon }) => (
            <motion.div key={title} variants={fadeUp} className="glass rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                  {createElement(Icon, { className: "h-5 w-5" })}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-lg leading-7 text-graphite/70">{body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="noise">
      <Hero />
      <Opportunity />
      <WebsiteRedesign />
      <AiAcrossStory />
      <NinetyDayPlan />
      <Vision2027 />
      <AboutMe />
      <footer className="px-[var(--page-x)] pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-graphite/58 md:flex-row md:items-center md:justify-between">
          <span>Digital Innovation & AI Solutions presentation for STADA Kazakhstan</span>
          <span>Oleksandr Melai</span>
        </div>
      </footer>
    </main>
  );
}
