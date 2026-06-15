"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ShaderAnimation({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: THREE.Camera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    uniforms: {
      time: { value: number };
      resolution: { value: THREE.Vector2 };
    };
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        uv.x *= 1.12;
        float t = time * 0.026;
        float lineWidth = 0.00175;

        float field = 0.0;
        for(int j = 0; j < 3; j++) {
          for(int i = 0; i < 5; i++) {
            float weight = float(i * i) * lineWidth;
            float wave = fract(t - 0.012 * float(j) + float(i) * 0.012) * 4.4;
            field += weight / abs(wave - length(uv) + mod(uv.x * 0.82 + uv.y * 1.18, 0.24));
          }
        }

        float vignette = smoothstep(1.45, 0.10, length(uv * vec2(0.92, 1.08)));
        float glow = smoothstep(0.02, 0.58, field) * vignette;
        vec3 base = vec3(0.006, 0.010, 0.018);
        vec3 blue = vec3(0.10, 0.30, 0.58);
        vec3 white = vec3(0.86, 0.93, 1.0);
        vec3 color = base + blue * glow * 0.54 + white * pow(glow, 2.05) * 0.34;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Initialize Three.js scene
    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));

    container.appendChild(renderer.domElement);

    const renderFrame = () => {
      renderer.render(scene, camera);
    };

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
      renderFrame();
    };

    // Initial resize
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = true;
    let animationId = 0;

    const stopAnimation = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }

      if (sceneRef.current) {
        sceneRef.current.animationId = 0;
      }
    };

    const animate = () => {
      if (document.hidden || !isVisible || reducedMotionQuery.matches) {
        stopAnimation();
        renderFrame();
        return;
      }

      uniforms.time.value += 0.042;
      renderFrame();
      animationId = requestAnimationFrame(animate);

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    const startAnimation = () => {
      if (!animationId && !document.hidden && isVisible && !reducedMotionQuery.matches) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        stopAnimation();
        renderFrame();
      } else {
        startAnimation();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.01 }
    );

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    renderFrame();
    observer.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    startAnimation();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      observer.disconnect();
      stopAnimation();

      if (sceneRef.current) {
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }

        sceneRef.current.renderer.dispose();
        geometry.dispose();
        material.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className || "h-screen w-full"}
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  );
}
