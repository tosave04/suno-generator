"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  color: [number, number, number];
  opacity: number;
  depth: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 60;
const OPACITY_MIN = 0.2;
const OPACITY_MAX = 0.3;
const OPACITY_CENTER_BOOST = 1.5;
const SPEED = 0.35;
const PULSE_SPEED = 0.8;
const PULSE_INTENSITY = 0.25;

const COLORS: [number, number, number][] = [
  [140, 30, 30],   // dark red
  [160, 50, 25],   // dark orange-red
  [180, 80, 20],   // dark orange
  [30, 40, 120],   // dark blue
  [40, 55, 140],   // medium-dark blue
  [100, 30, 40],   // deep crimson
];

function createParticle(width: number, height: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const depth = 0.3 + Math.random() * 0.7;
  const x = Math.random() * width;
  const y = Math.random() * height;
  return {
    x,
    y,
    baseX: x,
    baseY: y,
    size: (30 + Math.random() * 80) * depth,
    speedX: (Math.random() - 0.5) * SPEED,
    speedY: (Math.random() - 0.5) * SPEED,
    color,
    opacity: (OPACITY_MIN + Math.random() * (OPACITY_MAX - OPACITY_MIN)) * depth,
    depth,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
          createParticle(canvas.width, canvas.height)
        );
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x * canvas.width;
      const mouseY = mouseRef.current.y * canvas.height;
      const time = performance.now() * 0.001;

      for (const p of particlesRef.current) {
        p.baseX += p.speedX;
        p.baseY += p.speedY;

        if (p.baseX < -p.size) p.baseX = canvas.width + p.size;
        if (p.baseX > canvas.width + p.size) p.baseX = -p.size;
        if (p.baseY < -p.size) p.baseY = canvas.height + p.size;
        if (p.baseY > canvas.height + p.size) p.baseY = -p.size;

        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = (150 * p.depth) / (1 + dist * 0.003);

        p.x = p.baseX + (dx / (dist || 1)) * pull;
        p.y = p.baseY + (dy / (dist || 1)) * pull;

        const pulse = 1 + Math.sin(time * PULSE_SPEED + p.pulseOffset) * PULSE_INTENSITY;
        const currentOpacity = p.opacity * pulse;
        const currentSize = p.size * (1 + (pulse - 1) * 0.3);

        const gradient = ctx.createRadialGradient(
          p.x - currentSize * 0.2,
          p.y - currentSize * 0.2,
          0,
          p.x,
          p.y,
          currentSize
        );
        const [r, g, b] = p.color;
        gradient.addColorStop(0, `rgba(${r + 40}, ${g + 30}, ${b + 20}, ${currentOpacity * OPACITY_CENTER_BOOST})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
