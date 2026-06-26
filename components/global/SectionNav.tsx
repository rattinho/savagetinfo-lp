'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  { id: 'hero',        label: 'SAVAGETINFO'          },
  { id: 'servicos',    label: 'Nossos Serviços'       },
  { id: 'produtos',    label: 'Nossos Produtos'       },
  { id: 'depoimentos', label: 'O que dizem sobre nós' },
  { id: 'sobre',       label: 'Por que a Savaget?'    },
  { id: 'contato',     label: 'Fale com a gente'      },
]

export default function SectionNav() {
  const swiperInstance = useRef<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    const setup = () => {
      SECTIONS.forEach((section, index) => {
        const el = document.getElementById(section.id)
        if (!el) return
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 65%',
            end: 'bottom 35%',
            onEnter:     () => { setActiveIndex(index); swiperInstance.current?.slideTo(index) },
            onEnterBack: () => { setActiveIndex(index); swiperInstance.current?.slideTo(index) },
          })
        )
      })
    }

    const timer = setTimeout(setup, 300)
    return () => { clearTimeout(timer); triggers.forEach(t => t.kill()) }
  }, [])

  return (
    <div className="fixed md:flex hidden top-4 2xl:top-6 left-1/2 -translate-x-1/2 z-50 items-center pointer-events-none">
      <div
        className="overflow-hidden"
        style={{
          width: '340px',
          maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
        }}
      >
        <Swiper
          onSwiper={(s) => { swiperInstance.current = s }}
          centeredSlides
          slidesPerView="auto"
          allowTouchMove={false}
          speed={420}
        >
          {SECTIONS.map((s, i) => (
            <SwiperSlide key={s.id} className="w-72!">
              <div className="flex justify-center items-center py-1 px-2">
                {i === activeIndex ? (
                  <span className="inline-flex items-center gap-2 font-code font-medium text-[10.5px] tracking-[0.28em] uppercase text-[rgba(125,176,255,0.92)] px-4 py-2 rounded-full border border-[rgba(125,176,255,0.2)] bg-[rgba(46,123,255,0.07)] whitespace-nowrap">
                    <span className="w-1.25 h-1.25 rounded-full shrink-0 bg-[rgba(125,176,255,0.9)] shadow-[0_0_8px_rgba(46,123,255,0.8)]" />
                    {s.label}
                  </span>
                ) : (
                  <span className="font-code font-medium text-[9px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.22)] whitespace-nowrap">
                    {s.label}
                  </span>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
