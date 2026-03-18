import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import CategoryBar from "@/components/CategoryBar";
import ServicesSection from "@/components/ServicesSection";
import AboutCompanySection from "@/components/AboutCompanySection";
import PromisesSection from "@/components/PromisesSection";
import OurWorkSection from "@/components/OurWorkSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CTAStrip from "@/components/CTAStrip";

const Index = () => {
  return (
    <>
      <SEO
        title="Custom Interior Design Solutions in Telangana"
        description="SpaceBox Concepts delivers premium custom interior design solutions for residential and commercial spaces in Telangana. Transform your space with our expert designers."
        keywords="interior design, custom interiors, Telangana, Hyderabad, residential interior, commercial interior, SpaceBox Concepts, home design, office design"
      />
      <HeroSection />
      <CategoryBar />
      <AboutCompanySection />
      <ServicesSection />
      <PromisesSection />
      <StatsSection />
      <OurWorkSection />
      {/* ========== DUPLICATE WORK PROCESS SECTION (commented out) ==========
      <WorkProcessSection />
      ========== END DUPLICATE ========== */}
      <WorkProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <CTAStrip />
    </>
  );
};

export default Index;
