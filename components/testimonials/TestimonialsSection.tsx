'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { brand } from "@/lib/brand";

const TESTIMONIALS = [
  {
    quote: "Levei meu notebook que não ligava mais. Em menos de 24h me entregaram tudo funcionando e ainda formatado. Atendimento impecável!",
    name: "Rafael M.",
    initial: "R",
    since: "Cliente desde 2022",
  },
  {
    quote: `Comprei meu setup gamer completo na ${brand.name}. Preço justo, entrega rápida e ainda me ajudaram a montar. Recomendo demais!`,
    name: "João P.",
    initial: "J",
    since: "Cliente desde 2023",
  },
  {
    quote: `Precisa de informática, vai na ${brand.name} de olhos fechados. Já uso os serviços deles há anos, tanto pra empresa quanto em casa.`,
    name: "Carla S.",
    initial: "C",
    since: "Cliente desde 2021",
  },
];

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.25 h-3.25 md:w-3.5 md:h-3.5" fill="rgba(125,176,255,0.9)">
      <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 1.95L5 8.42 2 5.5l4.15-.75z" />
    </svg>
  );
}

export default function TestimonialsSection() {

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      gsap.set('#depoimentos > *', { x: 500, opacity: 0 })
      gsap.timeline({
        scrollTrigger: {
          trigger: "#depoimentos",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
        },
      })
        .fromTo('#depoimentos > *',
          { x: 500, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power1.inOut" },
          0
        )
        .fromTo('#depoimentos #title, #depoimentos #testimonialslist > div',
          { y: 0, opacity: 1, filter: "blur(0px)" },
          { y: 100, scale: 0.8, opacity: 0, filter: "blur(4px)", stagger: 0.08 },
          0.7
        )
    } else {
      gsap.set('#depoimentos #title, #depoimentos #testimonialslist > div', { y: 40, opacity: 0 })
      gsap.timeline({
        scrollTrigger: {
          trigger: "#depoimentos",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      })
        .to('#depoimentos #title, #depoimentos #testimonialslist > div', { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power2.out" })
    }
  }, [])

  return (
    <section id="depoimentos" className="relative md:mt-[-200vh] z-10 md:min-h-screen flex flex-col items-center justify-center py-20 md:py-27.5 px-[clamp(20px,6vw,80px)]">
      <h2
        id="title"
        className="m-0 mb-[clamp(28px,5.5vh,64px)] font-display font-semibold text-white text-center text-balance tracking-[-0.022em] max-w-[560px]"
        style={{ fontSize: "clamp(1.7rem,3.6vw,2.9rem)", lineHeight: 1.08 }}
      >
        Clientes que confiam<br />na {brand.name} {brand.complement}
      </h2>

      <div id="testimonialslist" className="grid gap-3 md:gap-3.5 w-full max-w-225" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="flex flex-col gap-4 md:gap-5 p-[18px_16px] md:p-[28px_26px] rounded-2xl md:rounded-[20px] bg-[rgba(255,255,255,0.03)] border border-[rgba(125,176,255,0.12)] transition-[border-color] duration-300 hover:border-[rgba(125,176,255,0.28)]"
          >
            <div className="flex gap-[3px]">
              {[1,2,3,4,5].map((i) => <StarIcon key={i} />)}
            </div>

            <p className="m-0 font-body text-[13px] md:text-[14px] leading-[1.65] md:leading-[1.7] text-[rgba(255,255,255,0.72)] italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 mt-auto pt-3 md:pt-4 border-t border-[rgba(125,176,255,0.1)]">
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-[13px] md:text-[14px] text-[rgba(125,176,255,0.9)] border border-[rgba(125,176,255,0.2)]"
                style={{ background: "linear-gradient(135deg, rgba(46,123,255,0.4), rgba(46,123,255,0.12))" }}
              >
                {t.initial}
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-body font-semibold text-[13px] md:text-[13.5px] text-white">{t.name}</span>
                <span className="font-code text-[9.5px] md:text-[10px] tracking-widest text-[rgba(125,176,255,0.55)]">{t.since}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
