"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { brand } from "@/lib/brand";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Progress dentro do pin onde a animação de entrada já terminou
// hero não tem pin; sobre tem pin +=500% com phase 1 terminando em ~0.25
const PIN_PROGRESS: Record<string, number> = {
  servicos:    0.45,
  produtos:    0.45,
  depoimentos: 0.45,
  sobre:       0.25,
  contato:     0.60,
};

const NAV_LINKS = [
  { label: "Início",   href: "#"        },
  { label: "Produtos", href: "#produtos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre",    href: "#sobre"    },
  { label: "Contato",  href: "#contato"  },
];

export default function Nav() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navRef     = useRef<HTMLElement>(null);
  const logoRef    = useRef<HTMLAnchorElement>(null);
  const deskRef    = useRef<HTMLDivElement>(null);
  const mobileRef  = useRef<HTMLDivElement>(null);

  const navigate = (href: string) => {
    const id = href === "#" ? "hero" : href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const smoother = ScrollSmoother.get();
    if (!smoother) { el.scrollIntoView({ behavior: "smooth" }); return; }

    // Procura o pin trigger da seção para calcular posição pós-entrada
    const pinTrigger = ScrollTrigger.getAll().find(
      t => t.trigger === el && t.vars.pin === true
    );

    if (pinTrigger) {
      const progress = PIN_PROGRESS[id] ?? 0.45;
      smoother.scrollTo(
        pinTrigger.start + (pinTrigger.end - pinTrigger.start) * progress,
        true
      );
    } else {
      smoother.scrollTo(el, true, "top top");
    }
  };

  // ≥1920 → nav aberto; notebook + mobile → fechado por default
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsDesktop(w >= 1920);
      if (w >= 1920) setMenuOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: PointerEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [menuOpen]);

  // Intro animation
  useGSAP(() => {
    const targets = [logoRef.current, deskRef.current, mobileRef.current].filter(Boolean);
    if (!targets.length) return;
    gsap.from(targets, { y: -18, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 });
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed top-3.5 2xl:top-6 left-0 right-0 z-50 flex items-start justify-between px-[clamp(16px,3vw,34px)] pointer-events-none">

      {/* Logo */}
      <a
        ref={logoRef}
        href="#"
        aria-label={`${brand.name} ${brand.complement}`}
        className="pointer-events-auto inline-flex items-center justify-center no-underline"
      >
        <span className="relative inline-block leading-none animate-led-flicker" aria-label={brand.initials}>
          {/* glow — outer halo */}
          <span
            className="absolute inset-0 font-brand font-light text-[52px] tracking-[0.1em] select-none"
            style={{ color: "transparent", WebkitTextStroke: "2px rgba(50,140,255,0.5)", filter: "blur(10px)" }}
            aria-hidden
          >{brand.initials}</span>
          {/* glow — mid */}
          <span
            className="absolute inset-0 font-brand font-light text-[52px] tracking-[0.1em] select-none"
            style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(100,185,255,0.85)", filter: "blur(4px)" }}
            aria-hidden
          >{brand.initials}</span>
          {/* front — crisp neon stroke */}
          <span
            className="relative font-brand font-light text-[52px] tracking-[0.1em]"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(180,220,255,1)",
              textShadow: "0 0 6px rgba(100,185,255,0.9)",
            }}
          >{brand.initials}</span>
        </span>
      </a>

      {/* Desktop nav — visível apenas em ≥1920px */}
      {isDesktop && (
        <div ref={deskRef} className="pointer-events-auto flex items-center gap-2">
          <div
            className="flex items-center gap-1 p-[7px] rounded-full border border-[rgba(255,255,255,0.1)]"
            style={{
              background: "rgba(20,21,28,0.5)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                className="font-body font-medium text-[13.5px] text-[rgba(255,255,255,0.72)] px-[14px] py-2 rounded-full transition-[background,color] duration-[180ms] ease-in-out hover:bg-[rgba(46,123,255,0.14)] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); navigate("#contato"); }}
            className="font-body font-bold text-[13.5px] text-white px-[18px] py-[13px] rounded-full transition-[filter,transform] duration-200 ease-in-out hover:brightness-110 hover:-translate-y-px"
            style={{
              background: "linear-gradient(180deg, #3D87FF, #2E7BFF)",
              boxShadow: "0 0 20px rgba(46,123,255,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            Orçamento
          </a>
        </div>
      )}

      {/* Collapsed nav — notebook (760-1919px) e mobile (<760px) */}
      {!isDesktop && (
        <div ref={mobileRef} className="pointer-events-auto relative flex flex-col items-end gap-[10px]">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            className="inline-flex items-center gap-[10px] px-4 py-[11px] rounded-full cursor-pointer border border-[rgba(255,255,255,0.1)]"
            style={{
              background: "rgba(20,21,28,0.5)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <span className="flex flex-col gap-1">
              <span className="w-4 h-[1.5px] rounded-sm bg-brand-light" />
              <span className="w-4 h-[1.5px] rounded-sm bg-[rgba(255,255,255,0.85)]" />
            </span>
            <span className="font-body font-semibold text-[13px] text-[rgba(255,255,255,0.9)]">Menu</span>
          </button>

          {menuOpen && (
            <div
              className="w-[min(240px,72vw)] p-[10px] rounded-[20px] flex flex-col gap-[2px] border border-[rgba(255,255,255,0.1)]"
              style={{
                background: "rgba(16,17,22,0.7)",
                backdropFilter: "blur(26px) saturate(165%)",
                WebkitBackdropFilter: "blur(26px) saturate(165%)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 18px 48px rgba(0,0,0,0.55)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); navigate(link.href); setMenuOpen(false); }}
                  className="font-body font-medium text-[14.5px] text-[rgba(255,255,255,0.82)] px-[14px] py-3 rounded-[13px] transition-colors duration-[180ms] hover:bg-[rgba(46,123,255,0.12)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={(e) => { e.preventDefault(); navigate("#contato"); setMenuOpen(false); }}
                className="mt-[6px] text-center font-body font-bold text-[13.5px] text-white p-3 rounded-[13px]"
                style={{ background: "linear-gradient(180deg,#3D87FF,#2E7BFF)", boxShadow: "0 0 22px rgba(46,123,255,0.4)" }}
              >
                Solicitar orçamento
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
