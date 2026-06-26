import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono, Science_Gothic } from "next/font/google";
import SmoothScroll       from "@/components/global/SmoothScroll";
import AnimatedBackground from "@/components/global/AnimatedBackground";
import Nav                from "@/components/global/Nav";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Savaget INFO — Notebooks, PCs Gamer, Manutenção e Periféricos",
  description:
    "Savaget INFO: soluções completas de informática. Manutenção, formatação, redes, suporte técnico, upgrade de hardware e recuperação de dados.",
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
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.style.setProperty('--initial-vh',window.innerHeight+'px')` }} />
        <SmoothScroll />
        <AnimatedBackground />
        <Nav />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
