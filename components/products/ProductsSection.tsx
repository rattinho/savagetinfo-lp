'use client'
import { useGSAP } from "@gsap/react";
import { Fragment } from "react";
import gsap from "gsap";

const PRODUCTS = [
  {
    title: "Notebooks",
    desc: "Ultrabooks, modelos gamer e corporativos das principais marcas do mercado.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="rgba(125,176,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-14 md:h-14 relative">
        <rect x="8" y="12" width="48" height="32" rx="4" />
        <line x1="4" y1="44" x2="60" y2="44" />
        <path d="M24 44 L22 52 L42 52 L40 44" />
        <rect x="20" y="18" width="24" height="14" rx="2" fill="rgba(46,123,255,0.12)" stroke="rgba(125,176,255,0.6)" />
        <circle cx="32" cy="14" r="1" fill="rgba(125,176,255,0.6)" stroke="none" />
      </svg>
    ),
    glowClass: "top-[-30%] right-[-10%]",
  },
  {
    title: "PCs & Workstations",
    desc: "Desktops pré-montados, setups gamer e workstations para produção profissional.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="rgba(125,176,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-14 md:h-14 relative">
        <rect x="10" y="8" width="22" height="34" rx="3" />
        <line x1="21" y1="42" x2="21" y2="48" />
        <line x1="14" y1="48" x2="28" y2="48" />
        <rect x="14" y="13" width="14" height="10" rx="1.5" fill="rgba(46,123,255,0.12)" stroke="rgba(125,176,255,0.6)" />
        <line x1="14" y1="28" x2="28" y2="28" />
        <line x1="14" y1="31" x2="24" y2="31" />
        <rect x="36" y="22" width="18" height="28" rx="2" />
        <line x1="40" y1="26" x2="50" y2="26" />
        <line x1="40" y1="30" x2="50" y2="30" />
        <circle cx="45" cy="46" r="2" fill="rgba(46,123,255,0.4)" stroke="rgba(125,176,255,0.8)" />
      </svg>
    ),
    glowClass: "bottom-[-30%] left-[-10%]",
  },
  {
    title: "Periféricos",
    desc: "Teclados, mouses, headsets, monitores e webcams para todos os perfis.",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="rgba(125,176,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-14 md:h-14 relative">
        <rect x="6" y="22" width="38" height="22" rx="4" />
        {[11,17,23,29,35].map((x) => (
          <Fragment key={x}>
            <line x1={x} y1="28" x2={x} y2="28" strokeWidth="3" strokeLinecap="round" />
            <line x1={x} y1="34" x2={x} y2="34" strokeWidth="3" strokeLinecap="round" />
          </Fragment>
        ))}
        <line x1="20" y1="40" x2="30" y2="40" strokeWidth="3" />
        <ellipse cx="51" cy="30" rx="7" ry="9" stroke="rgba(125,176,255,0.7)" />
        <circle cx="51" cy="28" r="1.5" fill="rgba(46,123,255,0.6)" stroke="none" />
      </svg>
    ),
    glowClass: "top-[-20%] right-[-20%]",
  },
];

function ProductCard({ title, desc, icon, glowClass }: { title: string; desc: string; icon: React.ReactNode; glowClass: string }) {
  return (
    <div className="h-full rounded-2xl md:rounded-[20px] overflow-hidden bg-[rgba(255,255,255,0.03)] border border-[rgba(125,176,255,0.12)] flex flex-col">
      <div
        className="h-24 2xl:h-37 flex items-center justify-center relative overflow-hidden border-b border-[rgba(125,176,255,0.1)]"
        style={{ background: "linear-gradient(135deg, rgba(46,123,255,0.18) 0%, rgba(46,123,255,0.04) 100%)" }}
      >
        <div
          className={`absolute ${glowClass} w-36 h-36 2xl:w-45 2xl:h-45 rounded-full`}
          style={{ background: "radial-gradient(circle, rgba(46,123,255,0.18), transparent 70%)", filter: "blur(20px)" }}
        />
        {icon}
      </div>
      <div className="flex flex-col flex-1 gap-2 md:gap-2.5 p-[14px_16px_16px] 2xl:p-[22px_22px_24px]">
        <h3 className="m-0 font-display font-semibold text-[14px] md:text-[18px] text-white tracking-[0.01em]">{title}</h3>
        <p className="m-0 font-body text-[12px] md:text-[13px] leading-normal md:leading-[1.6] text-[rgba(255,255,255,0.52)]">{desc}</p>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  useGSAP(() => {
    if (window.innerWidth >= 768) {
      gsap.set('#produtos > *', { y: -50, opacity: 0 })
      gsap.timeline({
        scrollTrigger: {
          trigger: "#produtos",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
        }
      })
      .fromTo('#produtos > *',
        { x: -500, opacity: 0, scale: .8 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: "power1.inOut" },
        0
      )
      .fromTo('#produtos #subtitle, #produtos #title, #produtos #productslist > div',
        { y: 0, opacity: 1, filter: "blur(0px)" },
        { y: -100, opacity: 0, filter: "blur(4px)", duration: 0.5, ease: "power1.inOut", stagger: .08 },
        0.7
      )
    } else {
      gsap.set('#produtos #subtitle, #produtos #title, #produtos #productslist > div', { y: 40, opacity: 0 })
      gsap.timeline({
        scrollTrigger: {
          trigger: "#produtos",
          start: "top 82%",
          toggleActions: "play none none none",
        }
      })
      .to('#produtos #subtitle, #produtos #title, #produtos #productslist > div', { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power2.out" })
    }
  }, [])

  return (
    <section id="produtos" className="relative z-10 md:-mt-[200vh] md:min-h-screen flex flex-col items-center justify-center py-20 md:py-25 px-[clamp(20px,5vw,60px)]">

      <h2
        id="title"
        className="m-0 mb-[clamp(24px,4vh,52px)] font-display font-semibold text-white text-center text-balance tracking-[-0.022em] max-w-140"
        style={{ fontSize: "clamp(1.7rem,3.6vw,2.9rem)", lineHeight: 1.08 }}
      >
        Encontre o equipamento<br />ideal para você
      </h2>

      <div
        id="productslist"
        className="grid grid-cols-1 md:grid-cols-3 mt-16 gap-3 md:gap-4 w-full max-w-225"
      >
        {PRODUCTS.map((p) => (
          <div key={p.title}>
            <ProductCard title={p.title} desc={p.desc} icon={p.icon} glowClass={p.glowClass} />
          </div>
        ))}
      </div>
    </section>
  );
}
