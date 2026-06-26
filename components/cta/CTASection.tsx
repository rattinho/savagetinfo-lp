'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionBadge from "@/components/global/SectionBadge";

const INFO_ITEMS = [
  {
    label: "Localização",
    content: <>Rua Exemplo, 123<br />Sua Cidade — UF</>,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Horário",
    content: <>Seg–Sex: 9h às 18h<br />Sáb: 9h às 13h</>,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Telefone",
    content: <>(00) 90000-0000<br />WhatsApp disponível</>,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.4 19.79 19.79 0 0 1 1.61 4.84 2 2 0 0 1 3.58 2.68h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.5a16 16 0 0 0 5.59 5.59l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function CTASection() {

  useGSAP(() => {
    gsap.set('#contato > *:not(.glow)', { scale: 0.9, opacity: 0 })

    gsap.timeline({
      scrollTrigger: {
        trigger: "#contato",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
      },
    })
      .fromTo('#contato > *:not(.glow)',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power1.inOut" },
        0
      )
  }, [])

  return (
    <section id="contato" className="relative -mt-[200vh] z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[110px] pb-0 px-[clamp(20px,6vw,80px)]">

      <div
        className="glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(46,123,255,0.1), transparent 65%)", filter: "blur(60px)" }}
      />

      <div
        id="ctacard"
        className="relative w-full max-w-[760px] rounded-[24px] text-center flex flex-col items-center gap-6 mb-[clamp(52px,8vh,80px)] border border-[rgba(125,176,255,0.18)]"
        style={{
          padding: "clamp(36px,6vw,64px) clamp(28px,5vw,56px)",
          background: "rgba(255,255,255,0.03)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px rgba(46,123,255,0.08)",
        }}
      >
        <SectionBadge>Fale com a gente</SectionBadge>

        <h2
          className="m-0 font-display font-semibold text-white text-balance tracking-[-0.025em] max-w-[480px]"
          style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", lineHeight: 1.06 }}
        >
          Pronto para resolver o seu problema?
        </h2>

        <p
          className="m-0 font-body text-[rgba(255,255,255,0.55)] leading-[1.65] max-w-[440px]"
          style={{ fontSize: "clamp(0.95rem,1.5vw,1.08rem)" }}
        >
          Orçamento gratuito e sem compromisso. Fale agora com nossa equipe pelo WhatsApp e resolva hoje.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-[6px]">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[10px] font-body font-bold text-[15px] text-white px-[26px] py-[15px] rounded-full transition-[filter,transform] duration-200 hover:brightness-110 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(180deg,#3D87FF,#2E7BFF)", boxShadow: "0 0 32px rgba(46,123,255,0.42), inset 0 1px 0 rgba(255,255,255,0.3)" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.186-1.619A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.376l-.36-.214-3.723.976.994-3.638-.235-.374A9.817 9.817 0 0 1 2.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="mailto:contato@savaget.info"
            className="inline-flex items-center gap-[10px] font-body font-semibold text-[15px] text-[rgba(255,255,255,0.82)] px-[26px] py-[15px] rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.14)] transition-[background,border-color] duration-200 hover:bg-[rgba(255,255,255,0.09)] hover:border-[rgba(125,176,255,0.4)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            E-mail
          </a>
        </div>
      </div>

      <div id="infolist" className="grid gap-[14px] w-full max-w-[760px] mb-[clamp(48px,6vh,72px)]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
        {INFO_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-[14px] p-[22px_20px] rounded-[16px] bg-[rgba(255,255,255,0.025)] border border-[rgba(125,176,255,0.1)]"
          >
            <div className="shrink-0 w-9 h-9 rounded-[10px] bg-[rgba(46,123,255,0.1)] border border-[rgba(125,176,255,0.18)] flex items-center justify-center text-[rgba(125,176,255,0.85)]">
              {item.icon}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-display font-semibold text-[13px] text-white">{item.label}</span>
              <span className="font-body text-[12.5px] leading-[1.5] text-[rgba(255,255,255,0.48)]">{item.content}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
