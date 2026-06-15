"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-16 w-16 rounded-full border border-blue-200/70 bg-white/70 shadow-glass backdrop-blur-xl">
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-500 motion-safe:animate-spin" />
              <div className="absolute inset-5 rounded-full bg-blue-500/20" />
            </div>
          </div>
        }
      >
        <Spline scene={scene} className="h-full w-full" />
      </Suspense>
    </div>
  );
}
