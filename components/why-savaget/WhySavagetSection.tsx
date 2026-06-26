'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionBadge from "@/components/global/SectionBadge";

const STATS = [
  { value: "+5", suffix: "k", label: "Clientes atendidos" },
  { value: "6",  suffix: "+", label: "Anos de mercado"    },
  { value: "98", suffix: "%", label: "Satisfação"         },
  { value: "24", suffix: "h", label: "Prazo médio reparo" },
];

const DIFERENCIAIS = [
  {
    title: "Garantia em todos os serviços",
    desc:  "Todos os reparos saem com garantia de 90 dias. Segurança pra você, compromisso pra nós.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Entrega e coleta rápida",
    desc:  "Buscamos e entregamos seu equipamento. Manutenção sem você sair de casa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Atendimento humanizado",
    desc:  "Explicamos tudo com clareza, sem termos técnicos desnecessários. Você sempre sabe o que está sendo feito.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Preço justo e transparente",
    desc:  "Orçamento gratuito e sem surpresas. O preço combinado é o preço cobrado, sempre.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function WhySavagetSection() {

  useGSAP(() => {
    gsap.set('#sobre > *', { y: 50, opacity: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: "#sobre",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
      },
    })
      .fromTo('#sobre > *',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power1.inOut" },
        0
      )
      .fromTo('#sobre #subtitle, #sobre #title, #sobre #statslist, #sobre #differentialslist > div',
        { y: 0, opacity: 1, filter: "blur(0px)" },
        { y: -50, scale: 0.8, opacity: 0, filter: "blur(4px)", stagger: 0.08 },
        0.7
      )
  }, [])

  return ( 
    <section id="sobre" className="relative -mt-[200vh] z-10 min-h-screen flex flex-col items-center justify-center py-[110px] px-[clamp(20px,6vw,80px)]">
      <div id="subtitle"><SectionBadge>Por que a Savaget?</SectionBadge></div>

      <h2
        id="title"
        className="m-0 mb-[clamp(52px,8vh,96px)] font-display font-semibold text-white text-center text-balance tracking-[-0.022em] max-w-[560px]"
        style={{ fontSize: "clamp(1.7rem,3.6vw,2.9rem)", lineHeight: 1.08 }}
      >
        Tecnologia de confiança,<br />atendimento de verdade
      </h2>

      <div
        id="statslist"
        className="grid gap-px w-full max-w-[860px] rounded-[20px] overflow-hidden mb-[clamp(48px,7vh,84px)] bg-[rgba(125,176,255,0.1)]"
        style={{ gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))" }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2 text-center px-7 py-9 bg-page">
            <span
              className="font-display font-bold text-white leading-none"
              style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: "-0.03em", textShadow: "0 0 28px rgba(46,123,255,0.4)" }}
            >
              {s.value}<span className="text-brand-light">{s.suffix}</span>
            </span>
            <span className="font-body text-[12.5px] uppercase tracking-[0.04em] text-[rgba(255,255,255,0.5)]">{s.label}</span>
          </div>
        ))}
      </div>

      <div id="differentialslist" className="grid gap-[14px] w-full max-w-[860px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))" }}>
        {DIFERENCIAIS.map((d) => (
          <div
            key={d.title}
            className="flex items-start gap-4 p-[26px_24px] rounded-[18px] bg-[rgba(255,255,255,0.025)] border border-[rgba(125,176,255,0.1)] transition-[border-color] duration-300 hover:border-[rgba(125,176,255,0.28)]"
          >
            <div className="shrink-0 w-10 h-10 mt-[2px] rounded-[11px] bg-[rgba(46,123,255,0.1)] border border-[rgba(125,176,255,0.18)] flex items-center justify-center text-[rgba(125,176,255,0.9)]">
              {d.icon}
            </div>
            <div className="flex flex-col gap-[6px]">
              <h4 className="m-0 font-display font-semibold text-[15px] text-white">{d.title}</h4>
              <p className="m-0 font-body text-[13px] leading-[1.6] text-[rgba(255,255,255,0.5)]">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
