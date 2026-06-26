"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AnimatedBackground() {
  const bgRef   = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);

  // Scroll parallax wrappers (one per blob)
  const s0Ref = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);

  // Pointer parallax wrappers
  const b0oRef = useRef<HTMLDivElement>(null);
  const b1oRef = useRef<HTMLDivElement>(null);
  const b2oRef = useRef<HTMLDivElement>(null);

  // Drift inner blobs
  const b0iRef = useRef<HTMLDivElement>(null);
  const b1iRef = useRef<HTMLDivElement>(null);
  const b2iRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, { opacity: 1, duration: 1.3, ease: "power2.out" });

    const blobs = [
      { inner: b0iRef.current, outer: b0oRef.current, x: 9,  y: -7, s: 1.16, d: 11,  o: 0.58, depth: 40  },
      { inner: b1iRef.current, outer: b1oRef.current, x: -8, y:  9, s: 1.22, d: 15,  o: 0.42, depth: -30 },
      { inner: b2iRef.current, outer: b2oRef.current, x: 7,  y:  8, s: 1.12, d: 9.5, o: 0.40, depth: 22  },
    ];

    blobs.forEach(({ inner, x, y, s, d, o }) => {
      if (!inner) return;
      gsap.to(inner, { xPercent: x, yPercent: y, scale: s, duration: d, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(inner, { opacity: o, duration: d * 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });

    // ── Scroll parallax — cada blob se desloca em velocidade diferente ──
    const scrollLayers = [
      { el: s0Ref.current, travel: -200 },
      { el: s1Ref.current, travel: -100 },
      { el: s2Ref.current, travel: -280 },
    ];

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        scrollLayers.forEach(({ el, travel }) => {
          if (el) gsap.set(el, { y: self.progress * travel });
        });
      },
    });

    // ── Color wash — muda de tom a cada seção ──
    const sections = [
      { trigger: "#hero",        color: "rgba(46,123,255,0.05)"  },
      { trigger: "#servicos",    color: "rgba(80,40,200,0.08)"   },
      { trigger: "#produtos",    color: "rgba(20,70,210,0.07)"   },
      { trigger: "#depoimentos", color: "rgba(60,150,255,0.07)"  },
      { trigger: "#sobre",       color: "rgba(50,30,190,0.09)"   },
      { trigger: "#contato",     color: "rgba(46,123,255,0.11)"  },
    ];

    sections.forEach(({ trigger, color }) => {
      ScrollTrigger.create({
        trigger,
        start: "top 60%",
        onEnter:     () => gsap.to(washRef.current, { backgroundColor: color, duration: 1.2, ease: "power2.out" }),
        onEnterBack: () => gsap.to(washRef.current, { backgroundColor: color, duration: 1.2, ease: "power2.out" }),
      });
    });

    // ── Pointer parallax ──
    const onMove = (e: PointerEvent) => {
      if (window.innerWidth < 760) return;
      const dx = e.clientX / window.innerWidth  - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      blobs.forEach(({ outer, depth }) => {
        if (outer) gsap.to(outer, { x: dx * depth, y: dy * depth, duration: 1.4, ease: "power2.out" });
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, { scope: bgRef });

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-0"
      style={{ background: "radial-gradient(ellipse 72% 60% at 50% 40%, #20222b 0%, #16171d 45%, #0d0e12 100%)" }}
    >
      {/* Color wash — interpolado entre seções */}
      <div
        ref={washRef}
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(46,123,255,0.05)" }}
      />

      {/* Dark vignette top */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 52%, rgba(0,0,0,0.34) 100%)" }} />

      {/* Blob 0 — top-left */}
      <div ref={s0Ref} className="absolute will-change-transform" style={{ top: "-14%", left: "-8%", width: "56vw", height: "56vw" }}>
        <div ref={b0oRef} className="w-full h-full">
          <div ref={b0iRef} className="w-full h-full rounded-full" style={{ opacity: 0.48, background: "radial-gradient(circle at 50% 50%, rgba(46,123,255,0.5), rgba(46,123,255,0) 68%)", filter: "blur(78px)" }} />
        </div>
      </div>

      {/* Blob 1 — bottom-right */}
      <div ref={s1Ref} className="absolute will-change-transform" style={{ bottom: "-20%", right: "-12%", width: "62vw", height: "62vw" }}>
        <div ref={b1oRef} className="w-full h-full">
          <div ref={b1iRef} className="w-full h-full rounded-full" style={{ opacity: 0.34, background: "radial-gradient(circle at 50% 50%, rgba(150,180,230,0.16), rgba(150,180,230,0) 70%)", filter: "blur(92px)" }} />
        </div>
      </div>

      {/* Blob 2 — bottom-center */}
      <div ref={s2Ref} className="absolute will-change-transform" style={{ bottom: "-24%", left: "34%", width: "50vw", height: "50vw" }}>
        <div ref={b2oRef} className="w-full h-full">
          <div ref={b2iRef} className="w-full h-full rounded-full" style={{ opacity: 0.32, background: "radial-gradient(circle at 50% 50%, rgba(70,150,255,0.3), rgba(70,150,255,0) 70%)", filter: "blur(94px)" }} />
        </div>
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 95% 86% at 50% 46%, transparent 52%, rgba(0,0,0,0.45) 100%)" }} />

      <Accent side="left" label="Est. 2020" rotate className="hidden md:flex" />
      <Accent side="right" label="Savaget INFO" className="hidden md:flex" />
    </div>
  );
}

function Accent({ side, label, rotate, className }: { side: "left" | "right"; label: string; rotate?: boolean; className?: string }) {
  const isLeft = side === "left";
  const borderCorner = isLeft
    ? { borderTop: "1px solid rgba(125,176,255,0.32)", borderLeft: "1px solid rgba(125,176,255,0.32)" }
    : { borderTop: "1px solid rgba(125,176,255,0.32)", borderRight: "1px solid rgba(125,176,255,0.32)" };
  const borderCornerBottom = isLeft
    ? { borderBottom: "1px solid rgba(125,176,255,0.32)", borderLeft: "1px solid rgba(125,176,255,0.32)" }
    : { borderBottom: "1px solid rgba(125,176,255,0.32)", borderRight: "1px solid rgba(125,176,255,0.32)" };

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none ${className ?? "flex"}`}
      style={{ [isLeft ? "left" : "right"]: "clamp(16px,3vw,44px)" }}
    >
      <div className="w-[18px] h-[18px]" style={borderCorner} />
      <div className="w-px" style={{ height: "clamp(60px,10vh,110px)", background: "linear-gradient(180deg,rgba(125,176,255,0.28),rgba(46,123,255,0.06))" }} />
      <div className="w-[5px] h-[5px] rounded-[1px] rotate-45 my-[6px]" style={{ background: "rgba(125,176,255,0.5)", boxShadow: "0 0 10px rgba(46,123,255,0.65)" }} />
      <div className="w-px" style={{ height: "clamp(60px,10vh,110px)", background: "linear-gradient(180deg,rgba(46,123,255,0.06),rgba(125,176,255,0.28))" }} />
      <div className="w-[18px] h-[18px]" style={borderCornerBottom} />
      <span
        className="mt-[14px] font-code text-[9px] tracking-[0.22em] uppercase"
        style={{ color: "rgba(125,176,255,0.32)", writingMode: "vertical-lr", transform: rotate ? "rotate(180deg)" : undefined }}
      >
        {label}
      </span>
    </div>
  );
}
