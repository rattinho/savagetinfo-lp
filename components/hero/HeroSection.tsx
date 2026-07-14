'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { brand } from "@/lib/brand";

const KEYWORDS = ["Notebooks", "PCs Gamer", "Manutenção", "Periféricos"];

export default function HeroSection() {

  useGSAP(()=>{
    gsap.timeline().fromTo('#hero > div', {y:-50, opacity: 0}, {y: 0, opacity: 1, delay: 0.5, stagger: 0.2})

    if (window.innerWidth >= 768) {
      gsap.timeline({scrollTrigger:{
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
      }}).to('#hero', {scale: .9, opacity: 0, filter: "blur(4px)"})
    }
  }, [])

  return (
    <section id="hero" className="relative z-10 h-screen-initial md:min-h-screen flex flex-col items-center justify-center px-5 md:px-20 md:pt-26 md:pb-24 3xl:px-40 3xl:pt-32 3xl:pb-28">

      {/* Device image */}
      <div id="image" className="relative z-3">
        <div
          style={{ filter: "drop-shadow(0 34px 52px rgba(0,0,0,0.55)) drop-shadow(0 0 56px rgba(46,123,255,0.26))" }}
        >
          <Image
            src="/assets/devices.png"
            alt={`Dispositivos ${brand.name} ${brand.complement}`}
            width={560}
            height={420}
            priority
            className="block h-auto w-[clamp(160px,80vw,280px)] w-[260px] lg:w-[400px] 2xl:w-[600px] "
          />
        </div>
      </div>

      {/* Wordmark */}
      <div className="mt-[clamp(6px,1.4vh,22px)] text-center pointer-events-none">
        <span
          className="inline-block font-brand font-bold animate-led-flicker"
          style={{
            fontSize: "clamp(2rem,5vw,6.5rem)",
            letterSpacing: "-0.01em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(125,176,255,0.42)",
            textShadow: "0 0 60px rgba(46,123,255,0.25)",
          }}
        >
          {brand.name.toUpperCase()}
        </span>
        <span
          className="inline-block font-brand font-bold ml-[0.16em]"
          style={{
            fontSize: "clamp(2rem,5vw,6.5rem)",
            letterSpacing: "0.01em",
            background: "linear-gradient(180deg,rgba(160,195,255,0.98),rgba(46,123,255,0.6))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "0 0 80px rgba(46,123,255,0.5)",
          }}
        >
          {brand.complement.toUpperCase()}
        </span>
      </div>

      {/* Keywords */}
      <div className="mt-[clamp(12px,2.5vh,32px)] md:mb-0 mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 3xl:gap-5">
        {KEYWORDS.map((kw, i) => (
          <span key={kw} className="contents">
            <span className="font-code text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[rgba(255,255,255,0.62)]">
              {kw}
            </span>
            {i < KEYWORDS.length - 1 && (
              <span className="w-px h-3 bg-[rgba(125,176,255,0.3)]" />
            )}
          </span>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-16 sm:bottom-8 3xl:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.75 pointer-events-none">
        <span className="font-code text-[16px] text-nowrap md:text-[9px] tracking-[0.3em] uppercase text-[rgba(255,255,255,0.36)]">
          Role para explorar
        </span>
        <div className="relative w-px h-9 bg-[rgba(255,255,255,0.12)] overflow-hidden">
          <span
            className="absolute top-0 -left-px w-0.75 h-2.5 rounded-sm bg-brand animate-scroll-dot"
            style={{ boxShadow: "0 0 8px rgba(46,123,255,0.95)" }}
          />
        </div>
      </div>
    </section>
  );
}
