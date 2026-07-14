import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono, Science_Gothic } from "next/font/google";
import SmoothScroll       from "@/components/global/SmoothScroll";
import AnimatedBackground from "@/components/global/AnimatedBackground";
import Nav                from "@/components/global/Nav";
import SectionNav         from "@/components/global/SectionNav";
import "./globals.css";
import { brand, colorometriaFilter } from "@/lib/brand";

const scienceGothic = Science_Gothic({
  subsets: ["latin"],
  variable: "--font-science-gothic",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const brandFull  = `${brand.name} ${brand.complement}`;
const brandTitle = `${brandFull} — Loja de Informática | Notebooks, PCs Gamer e Manutenção`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),

  title: {
    default:  brandTitle,
    template: `%s | ${brandFull}`,
  },
  description: `A ${brandFull} é sua loja de informática completa: notebooks, PCs Gamer, periféricos e serviços de manutenção, formatação, redes, suporte técnico, upgrade de hardware e recuperação de dados.`,

  icons: {
    icon:     "/assets/icon.webp",
    shortcut: "/assets/icon.webp",
    apple:    "/assets/icon.webp",
  },

  openGraph: {
    type:        "website",
    locale:      "pt_BR",
    siteName:    brandFull,
    title:       brandTitle,
    description: `A ${brandFull} é sua loja de informática completa: notebooks, PCs Gamer, periféricos e serviços de manutenção, formatação, redes, suporte técnico, upgrade de hardware e recuperação de dados.`,
    images: [
      {
        url:    "/assets/icon.webp",
        width:  862,
        height: 600,
        alt:    `${brandFull} — Logo`,
      },
    ],
  },

  twitter: {
    card:        "summary",
    title:       brandTitle,
    description: `A ${brandFull} é sua loja de informática completa: notebooks, PCs Gamer, periféricos e serviços de manutenção, formatação, redes, suporte técnico, upgrade de hardware e recuperação de dados.`,
    images:      ["/assets/icon.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${scienceGothic.variable} ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-page">
      <div
        id="colorometria"
        className="fixed top-0 left-0 w-screen h-screen z-[9999] pointer-events-none"
        style={{ backdropFilter: colorometriaFilter, WebkitBackdropFilter: colorometriaFilter }}
      />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.style.setProperty('--initial-vh',window.innerHeight+'px')` }} />
        <SmoothScroll />
        <AnimatedBackground />
        <span className="fixed top-0 w-full h-36 lg:h-16 2xl:h-44 backdrop-blur-2xl  mask-t-to-black mask-t-from-transparent z-50">
        </span>
        <Nav />
        <SectionNav />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
