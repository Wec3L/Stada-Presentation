"use client";

import { useEffect, useRef } from "react";

type SparklesCoreProps = {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  drift: number;
  speed: number;
  color: string;
  pulse: number;
};

const sparklePalette = ["#7dd3fc", "#60a5fa", "#a78bfa", "#f472b6", "#22d3ee", "#ffffff"];

export function SparklesCore({
  id,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 0.5,
  particleColor = "#7dd3fc",
  particleDensity = 100,
  className = ""
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const colors = [particleColor, ...sparklePalette];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const createParticles = () => {
      const total = Math.max(42, Math.min(260, Math.floor(((width * height) / 9200) * (particleDensity / 100))));

      particles = Array.from({ length: total }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: minSize + Math.random() * Math.max(0.1, maxSize - minSize),
        alpha: 0.22 + Math.random() * 0.62,
        drift: (Math.random() - 0.5) * 0.18,
        speed: (0.06 + Math.random() * 0.22) * speed,
        color: colors[index % colors.length],
        pulse: Math.random() * Math.PI * 2
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      if (background !== "transparent") {
        context.fillStyle = background;
        context.fillRect(0, 0, width, height);
      }

      context.globalCompositeOperation = "lighter";
      particles.forEach((particle) => {
        if (!reducedMotion.matches) {
          particle.y -= particle.speed;
          particle.x += particle.drift;
          particle.pulse += 0.018;

          if (particle.y < -8) {
            particle.y = height + 8;
            particle.x = Math.random() * width;
          }

          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
        }

        const glow = 0.45 + Math.sin(particle.pulse) * 0.22;
        const radius = particle.radius * (1 + glow * 0.28);
        const gradient = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 5.8);

        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.24, particle.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        context.globalAlpha = particle.alpha * glow;
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 5.8, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = Math.min(1, particle.alpha + 0.18);
        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(particle.x, particle.y, Math.max(0.45, particle.radius * 0.48), 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";

      if (!reducedMotion.matches) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
      cancelAnimationFrame(animationFrame);
      draw();
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [background, maxSize, minSize, particleColor, particleDensity, speed]);

  return (
    <div id={id} className={`pointer-events-none overflow-hidden ${className}`} style={{ background }} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
