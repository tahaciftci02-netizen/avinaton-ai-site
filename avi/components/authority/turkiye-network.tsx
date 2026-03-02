"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Node = { x: number; y: number; r: number; region: string; tier: 1 | 2 | 3 };

const REGIONS = [
  "Marmara",
  "Ege",
  "Akdeniz",
  "Ic Anadolu",
  "Karadeniz",
  "Dogu Anadolu",
  "Guneydogu Anadolu",
] as const;

function rand(seed: number) {
  // deterministic-ish pseudo random
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function TurkiyeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number; label: string } | null>(null);

  const nodes = useMemo<Node[]>(() => {
    const r = rand(202503);
    // positions roughly shaped like Turkey blob in normalized space
    const pts: Node[] = [];
    const count = 34;
    for (let i = 0; i < count; i++) {
      const x = 0.08 + r() * 0.84;
      const y = 0.30 + r() * 0.40;
      const region = REGIONS[Math.floor(r() * REGIONS.length)];
      const tier = (r() < 0.18 ? 1 : r() < 0.55 ? 2 : 3) as 1 | 2 | 3;
      const rad = tier === 1 ? 4.4 : tier === 2 ? 3.4 : 2.6;
      pts.push({ x, y, r: rad, region, tier });
    }
    return pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const { width, height } = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // background glow
      const g = ctx.createRadialGradient(width * 0.2, height * 0.2, 10, width * 0.2, height * 0.2, Math.max(width, height));
      g.addColorStop(0, "rgba(198,168,94,0.18)");
      g.addColorStop(1, "rgba(198,168,94,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // subtle grid
      ctx.globalAlpha = 0.18;
      ctx.strokeStyle = "rgba(255,255,255,0.10)";
      ctx.lineWidth = 1;
      const step = 48;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // connections
      ctx.strokeStyle = "rgba(198,168,94,0.22)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.globalAlpha = Math.max(0.06, 1 - dist / 160) * 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // nodes
      for (const n of nodes) {
        const cx = n.x * width;
        const cy = n.y * height;

        // glow
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
        rg.addColorStop(0, "rgba(198,168,94,0.35)");
        rg.addColorStop(1, "rgba(198,168,94,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = n.tier === 1 ? "rgba(198,168,94,0.95)" : "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(cx, cy, n.r, 0, Math.PI * 2);
        ctx.fill();

        // ring
        ctx.strokeStyle = "rgba(198,168,94,0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, n.r + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const onMove = (e: PointerEvent) => {
      const { left, top, width, height } = wrap.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      let found: Node | null = null;
      for (const n of nodes) {
        const cx = n.x * width;
        const cy = n.y * height;
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d <= n.r + 6) {
          found = n;
          break;
        }
      }

      if (found) {
        const label = found.tier === 1 ? `Pilot/Founding odagi · ${found.region}` : `Ag noktasi · ${found.region}`;
        setHover({ x, y, label });
      } else {
        setHover(null);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", () => setHover(null));

    return () => {
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [nodes]);

  return (
    <div ref={wrapRef} className="trNetwork" aria-label="Turkiye ag gorsellestirmesi">
      <canvas ref={canvasRef} />
      <div className="trNetwork__overlay">
        <div className="trNetwork__label">
          <div className="badge">Pilot Donem</div>
          <div className="muted">Davet sureci devam ediyor. Kulup isimleri yayinlanmaz.</div>
        </div>
      </div>
      {hover ? (
        <div className="trNetwork__tooltip" style={{ left: hover.x + 14, top: hover.y + 14 }}>
          {hover.label}
        </div>
      ) : null}
    </div>
  );
}
