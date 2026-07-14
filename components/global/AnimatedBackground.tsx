"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/brand";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedBackground() {
  const clipRef   = useRef<HTMLDivElement>(null); // fixed overflow:hidden — clips the 3D tilt
  const bgRef     = useRef<HTMLDivElement>(null); // oversized inner plane that tilts in 3D
  const washRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll parallax wrappers (one per blob)
  const s0Ref = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);

  // Pointer parallax wrappers
  const b0oRef = useRef<HTMLDivElement>(null);
  const b1oRef = useRef<HTMLDivElement>(null);
  const b2oRef = useRef<HTMLDivElement>(null);
  const b3oRef = useRef<HTMLDivElement>(null);

  // Drift inner blobs
  const b0iRef = useRef<HTMLDivElement>(null);
  const b1iRef = useRef<HTMLDivElement>(null);
  const b2iRef = useRef<HTMLDivElement>(null);
  const b3iRef = useRef<HTMLDivElement>(null);

  // ── Canvas: múltiplas camadas de partículas com parallax 3D no eixo Z ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse suavizado por lerp — não depende do GSAP
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer);

    // 5 camadas: índice 0 = mais distante, 4 = mais próxima
    // parallax: deslocamento máximo em px quando mouse está no canto
    // color: ligeiramente mais fria nas distantes, mais clara nas próximas
    const LAYERS = [
      { count: 55, minR: 0.2, maxR: 0.7,  minA: 0.05, maxA: 0.15, speed: 0.05, parallax:  8, color: "100,140,225" },
      { count: 45, minR: 0.4, maxR: 1.1,  minA: 0.08, maxA: 0.25, speed: 0.09, parallax: 22, color: "115,162,248" },
      { count: 35, minR: 0.7, maxR: 1.5,  minA: 0.12, maxA: 0.35, speed: 0.13, parallax: 42, color: "125,176,255" },
      { count: 25, minR: 1.0, maxR: 2.0,  minA: 0.13, maxA: 0.38, speed: 0.18, parallax: 66, color: "142,196,255" },
      { count: 15, minR: 1.4, maxR: 2.8,  minA: 0.07, maxA: 0.24, speed: 0.25, parallax: 95, color: "165,215,255" },
    ];

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; da: number };
    type Layer = { particles: P[]; parallax: number; color: string };

    const layers: Layer[] = LAYERS.map(({ count, minR, maxR, minA, maxA, speed, parallax, color }) => ({
      parallax,
      color,
      particles: Array.from({ length: count }, () => ({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r:  Math.random() * (maxR - minR) + minR,
        a:  Math.random() * (maxA - minA) + minA,
        da: (Math.random() - 0.5) * 0.0020,
      })),
    }));

    const LERP = 0.04; // suavidade do tracking do mouse

    const draw = () => {
      // Interpola mouse suavemente
      mouse.x += (mouse.tx - mouse.x) * LERP;
      mouse.y += (mouse.ty - mouse.y) * LERP;
      const mdx = mouse.x - 0.5; // -0.5 → 0.5
      const mdy = mouse.y - 0.5;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const { particles, parallax, color } of layers) {
        // Offset desta camada baseado na profundidade
        const ox = mdx * parallax;
        const oy = mdy * parallax;

        for (const p of particles) {
          // Atualiza posição base (sem offset)
          p.x += p.vx; p.y += p.vy; p.a += p.da;
          if (p.a < 0.03) p.da =  Math.abs(p.da);
          if (p.a > 0.48) p.da = -Math.abs(p.da);
          if (p.x < 0)             p.x += canvas.width;
          if (p.x > canvas.width)  p.x -= canvas.width;
          if (p.y < 0)             p.y += canvas.height;
          if (p.y > canvas.height) p.y -= canvas.height;

          // Aplica parallax apenas no draw, com wrap para evitar cortes
          const dx = ((p.x + ox) % canvas.width  + canvas.width)  % canvas.width;
          const dy = ((p.y + oy) % canvas.height + canvas.height) % canvas.height;

          ctx.beginPath();
          ctx.arc(dx, dy, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${p.a.toFixed(3)})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  // ── GSAP: blobs + scroll + color wash + 3D tilt ─────────────────────────
  useGSAP(() => {
    gsap.to(bgRef.current, { opacity: 1, duration: 1.3, ease: "power2.out" });

    const blobs = [
      { inner: b0iRef.current, outer: b0oRef.current, x: 9,  y: -7, s: 1.16, d: 11,  o: 0.62, depth: 80  },
      { inner: b1iRef.current, outer: b1oRef.current, x: -8, y:  9, s: 1.22, d: 15,  o: 0.46, depth: -60 },
      { inner: b2iRef.current, outer: b2oRef.current, x: 7,  y:  8, s: 1.12, d: 9.5, o: 0.44, depth: 50  },
      { inner: b3iRef.current, outer: b3oRef.current, x: -6, y: -5, s: 1.18, d: 13,  o: 0.36, depth: -40 },
    ];

    blobs.forEach(({ inner, x, y, s, d, o }) => {
      if (!inner) return;
      gsap.to(inner, { xPercent: x, yPercent: y, scale: s, duration: d, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(inner, { opacity: o, duration: d * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    // Scroll parallax — blobs se deslocam em velocidades distintas
    ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate(self) {
        [
          { el: s0Ref.current, travel: -200 },
          { el: s1Ref.current, travel: -100 },
          { el: s2Ref.current, travel: -280 },
          { el: s3Ref.current, travel: -160 },
        ].forEach(({ el, travel }) => {
          if (el) gsap.set(el, { y: self.progress * travel });
        });
      },
    });

    // Color wash — cores bem mais presentes por seção
    const sections = [
      { trigger: "#hero",        color: "rgba(46,123,255,0.13)"  },
      { trigger: "#servicos",    color: "rgba(80,40,200,0.20)"   },
      { trigger: "#produtos",    color: "rgba(20,70,210,0.17)"   },
      { trigger: "#depoimentos", color: "rgba(60,150,255,0.17)"  },
      { trigger: "#sobre",       color: "rgba(50,30,190,0.22)"   },
      { trigger: "#contato",     color: "rgba(46,123,255,0.24)"  },
    ];
    sections.forEach(({ trigger, color }) => {
      ScrollTrigger.create({
        trigger, start: "top 60%",
        onEnter:     () => gsap.to(washRef.current, { backgroundColor: color, duration: 1.2, ease: "power2.out" }),
        onEnterBack: () => gsap.to(washRef.current, { backgroundColor: color, duration: 1.2, ease: "power2.out" }),
      });
    });

    // 3D pointer — tilt no plano de fundo + parallax profundo por blob
    const onMove = (e: PointerEvent) => {
      if (window.innerWidth < 760) return;
      const dx = e.clientX / window.innerWidth  - 0.5; // -0.5 → 0.5
      const dy = e.clientY / window.innerHeight - 0.5;

      // Plano 3D inclina em resposta ao cursor
      gsap.to(bgRef.current, {
        rotateX:             dy * -10,
        rotateY:             dx *  10,
        transformPerspective: 1000,
        duration: 2,
        ease: "power3.out",
      });

      // Cada blob com profundidade diferente dentro do plano inclinado
      blobs.forEach(({ outer, depth }) => {
        if (outer) gsap.to(outer, { x: dx * depth, y: dy * (depth * 0.55), duration: 1.4, ease: "power2.out" });
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, { scope: clipRef });

  return (
    /* Clip container — clips os cantos do plano 3D quando inclinado */
    <div ref={clipRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Plano 3D — oversized (inset:-12%) para cobrir bordas ao inclinar */}
      <div
        ref={bgRef}
        className="absolute opacity-0"
        style={{
          inset: "-12%",
          background: "radial-gradient(ellipse 72% 60% at 50% 40%, #20222b 0%, #16171d 45%, #0d0e12 100%)",
          transformOrigin: "center center",
        }}
      >
        {/* Dot grid — rotaciona junto com o plano */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(125,176,255,0.09) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Blob 0 — top-left, azul primário */}
        <div ref={s0Ref} className="absolute will-change-transform" style={{ top: "-14%", left: "-8%", width: "56vw", height: "56vw" }}>
          <div ref={b0oRef} className="w-full h-full">
            <div ref={b0iRef} className="w-full h-full rounded-full" style={{ opacity: 0.54, background: "radial-gradient(circle at 50% 50%, rgba(46,123,255,0.62), rgba(46,123,255,0) 68%)", filter: "blur(72px)" }} />
          </div>
        </div>

        {/* Blob 1 — bottom-right, azul claro */}
        <div ref={s1Ref} className="absolute will-change-transform" style={{ bottom: "-20%", right: "-12%", width: "62vw", height: "62vw" }}>
          <div ref={b1oRef} className="w-full h-full">
            <div ref={b1iRef} className="w-full h-full rounded-full" style={{ opacity: 0.40, background: "radial-gradient(circle at 50% 50%, rgba(150,180,230,0.24), rgba(150,180,230,0) 70%)", filter: "blur(88px)" }} />
          </div>
        </div>

        {/* Blob 2 — bottom-center, azul médio */}
        <div ref={s2Ref} className="absolute will-change-transform" style={{ bottom: "-24%", left: "34%", width: "50vw", height: "50vw" }}>
          <div ref={b2oRef} className="w-full h-full">
            <div ref={b2iRef} className="w-full h-full rounded-full" style={{ opacity: 0.38, background: "radial-gradient(circle at 50% 50%, rgba(70,150,255,0.38), rgba(70,150,255,0) 70%)", filter: "blur(90px)" }} />
          </div>
        </div>

        {/* Blob 3 — top-right, violeta */}
        <div ref={s3Ref} className="absolute will-change-transform" style={{ top: "-8%", right: "-10%", width: "44vw", height: "44vw" }}>
          <div ref={b3oRef} className="w-full h-full">
            <div ref={b3iRef} className="w-full h-full rounded-full" style={{ opacity: 0.30, background: "radial-gradient(circle at 50% 50%, rgba(110,60,240,0.38), rgba(110,60,240,0) 70%)", filter: "blur(80px)" }} />
          </div>
        </div>
      </div>

      {/* Camadas estáticas — não rotacionam com o plano 3D */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div ref={washRef} className="absolute inset-0" style={{ backgroundColor: "rgba(46,123,255,0.05)" }} />

      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 52%, rgba(0,0,0,0.34) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 95% 86% at 50% 46%, transparent 52%, rgba(0,0,0,0.45) 100%)" }} />

      <Accent side="left"  label={`Est. ${brand.founded}`} rotate className="hidden md:flex" />
      <Accent side="right" label={`${brand.name} ${brand.complement}`} className="hidden md:flex" />
    </div>
  );
}

function Accent({ side, label, rotate, className }: { side: "left" | "right"; label: string; rotate?: boolean; className?: string }) {
  const isLeft = side === "left";
  const borderCorner = isLeft
    ? { borderTop: "1px solid rgba(125,176,255,0.32)", borderLeft:  "1px solid rgba(125,176,255,0.32)" }
    : { borderTop: "1px solid rgba(125,176,255,0.32)", borderRight: "1px solid rgba(125,176,255,0.32)" };
  const borderCornerBottom = isLeft
    ? { borderBottom: "1px solid rgba(125,176,255,0.32)", borderLeft:  "1px solid rgba(125,176,255,0.32)" }
    : { borderBottom: "1px solid rgba(125,176,255,0.32)", borderRight: "1px solid rgba(125,176,255,0.32)" };

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none ${className ?? "flex"}`}
      style={{ [isLeft ? "left" : "right"]: "clamp(16px,3vw,44px)" }}
    >
      <div className="w-4.5 h-4.5" style={borderCorner} />
      <div className="w-px" style={{ height: "clamp(60px,10vh,110px)", background: "linear-gradient(180deg,rgba(125,176,255,0.28),rgba(46,123,255,0.06))" }} />
      <div className="w-1.25 h-1.25 rounded-[1px] rotate-45 my-1.5" style={{ background: "rgba(125,176,255,0.5)", boxShadow: "0 0 10px rgba(46,123,255,0.65)" }} />
      <div className="w-px" style={{ height: "clamp(60px,10vh,110px)", background: "linear-gradient(180deg,rgba(46,123,255,0.06),rgba(125,176,255,0.28))" }} />
      <div className="w-4.5 h-4.5" style={borderCornerBottom} />
      <span
        className="mt-3.5 font-code text-[9px] tracking-[0.22em] uppercase"
        style={{ color: "rgba(125,176,255,0.32)", writingMode: "vertical-lr", transform: rotate ? "rotate(180deg)" : undefined }}
      >
        {label}
      </span>
    </div>
  );
}
