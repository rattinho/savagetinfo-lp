'use client'
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

const SERVICES = [
  {
    title: "Manutenção & Reparo",
    desc: "Diagnóstico e reparo de notebooks, desktops e periféricos com peças de qualidade.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "Formatação & Software",
    desc: "Instalação de SO, drivers, antivírus e configuração completa do ambiente.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    title: "Redes & Infraestrutura",
    desc: "Configuração de redes domésticas e corporativas, cabeamento e pontos Wi-Fi.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Suporte Técnico",
    desc: "Atendimento presencial e remoto com contratos de manutenção preventiva.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: "Upgrade de Hardware",
    desc: "Memória RAM, SSD, placa de vídeo e processador com instalação inclusa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
      </svg>
    ),
  },
  {
    title: "Recuperação de Dados",
    desc: "Recuperação de arquivos de HDs, SSDs e pendrives com danos físicos ou lógicos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

function NavArrow({ direction, onClick, disabled }: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(125,176,255,0.18)] text-[rgba(125,176,255,0.8)] transition-all duration-200 hover:border-[rgba(125,176,255,0.38)] hover:text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
      style={{
        background: "rgba(20,21,28,0.55)",
        backdropFilter: "blur(14px) saturate(160%)",
        WebkitBackdropFilter: "blur(14px) saturate(160%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
        {direction === "prev"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />
        }
      </svg>
    </button>
  );
}

function ServiceCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col gap-3.75 p-[26px_22px] rounded-[18px] bg-[rgba(255,255,255,0.03)] border border-[rgba(125,176,255,0.12)] transition-[border-color,background] duration-300 hover:border-[rgba(125,176,255,0.3)] hover:bg-[rgba(46,123,255,0.06)]">
      <div className="w-10.5 h-10.5 rounded-xl bg-[rgba(46,123,255,0.1)] border border-[rgba(125,176,255,0.18)] flex items-center justify-center text-[rgba(125,176,255,0.9)]">
        {icon}
      </div>
      <div className="flex flex-col gap-1.75">
        <h3 className="m-0 font-display font-semibold text-[15.5px] text-white">{title}</h3>
        <p className="m-0 font-body text-[13px] leading-[1.58] text-[rgba(255,255,255,0.52)]">{desc}</p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      gsap.set('#servicos > *', { y: -50, opacity: 0 })
      gsap.timeline({
        scrollTrigger: {
          trigger: "#servicos",
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true
        }
      })
      .fromTo('#servicos > *',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power1.inOut" },
        0
      )
      .fromTo('#servicos #subtitle, #servicos #title, #servicos #serviceslist > div, #servicos #servicesswiper',
        { x: 0, opacity: 1, filter: "blur(0px)" },
        { x: 500, scale: .8, opacity: 0, filter: "blur(4px)", duration: 0.5, ease: "power1.inOut", stagger: .08 },
        0.7
      )
    } else {
      gsap.set('#servicos #subtitle, #servicos #title, #servicos #serviceslist > div', { y: 40, opacity: 0 })
      gsap.timeline({
        scrollTrigger: {
          trigger: "#servicos",
          start: "top 82%",
          end: "bottom bottom",
          toggleActions: "play none none none",
          scrub: true,
        }
      })
      .to('#servicos #subtitle, #servicos #title, #servicos #serviceslist > div', { y: 0, opacity: 1, stagger: 2, duration: 1, ease: "power1.inOut" })
    }
  }, [])

  return (
    <section id="servicos" className="relative md:mt-[-200vh] z-10 md:min-h-screen flex flex-col items-center justify-center py-20 md:py-25 px-[clamp(20px,5vw,60px)]">
      <h2
        id="title"
        className="m-0 mb-[clamp(28px,4.5vh,52px)] font-display font-semibold text-white text-center text-balance tracking-[-0.022em] max-w-140"
        style={{ fontSize: "clamp(1.7rem,3.6vw,2.9rem)", lineHeight: 1.08 }}
      >
        Soluções completas<br />para sua tecnologia
      </h2>

      {/* Grid — mobile (<md) e desktop amplo (≥2xl) */}
      <div
        id="serviceslist"
        className="grid md:hidden 2xl:grid gap-3.5 w-full max-w-205"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))" }}
      >
        {SERVICES.map((s) => (
          <div key={s.title}>
            <ServiceCard title={s.title} desc={s.desc} icon={s.icon} />
          </div>
        ))}
      </div>

      {/* Swiper — notebook (md a 2xl) */}
      <div id="servicesswiper" className="hidden md:flex 2xl:hidden items-center gap-4 w-full max-w-205">
        <NavArrow direction="prev" onClick={() => swiperRef?.slidePrev()} disabled={isBeginning} />

        <div className="flex-1 min-w-0">
          <Swiper
            onSwiper={(s) => {
              setSwiperRef(s);
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            onSlideChange={(s) => {
              setIsBeginning(s.isBeginning);
              setIsEnd(s.isEnd);
            }}
            slidesPerView={3}
            spaceBetween={14}
            grabCursor
          >
            {SERVICES.map((s) => (
              <SwiperSlide key={s.title} className="h-auto!">
                <ServiceCard title={s.title} desc={s.desc} icon={s.icon} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <NavArrow direction="next" onClick={() => swiperRef?.slideNext()} disabled={isEnd} />
      </div>

    </section>
  );
}
