import HeroSection          from "@/components/hero/HeroSection";
import ServicesSection      from "@/components/services/ServicesSection";
import ProductsSection      from "@/components/products/ProductsSection";
import TestimonialsSection  from "@/components/testimonials/TestimonialsSection";
import WhySavagetSection    from "@/components/why-savaget/WhySavagetSection";
import CTASection           from "@/components/cta/CTASection";
import Footer               from "@/components/global/Footer";

export default function Home() {
  return (
    <main className="relative text-white font-body overflow-x-hidden antialiased">
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <WhySavagetSection />
      <CTASection />
      <Footer />
    </main>
  );
}
