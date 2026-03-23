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
import ParallaxSection from "@/components/ParallaxSection";

const Index = () => {
  return (
    <>
      <SEO
        title="Custom Interior Design Solutions in Telangana"
        description="SpaceBox Concepts delivers premium custom interior design solutions for residential and commercial spaces in Telangana. Transform your space with our expert designers."
        keywords="interior design, custom interiors, Telangana, Hyderabad, residential interior, commercial interior, SpaceBox Concepts, home design, office design"
      />

      {/* Each section sticks in place, next section slides over it */}
      <ParallaxSection zIndex={1} scaleAmount={0.06}>
        <HeroSection />
      </ParallaxSection>

      {/* <ParallaxSection zIndex={2} scaleAmount={0.04}>
        <CategoryBar />
      </ParallaxSection> */}

      <ParallaxSection zIndex={3} scaleAmount={0.05}>
        <AboutCompanySection />
      </ParallaxSection>

      <ParallaxSection zIndex={4} scaleAmount={0.05}>
        <ServicesSection />
      </ParallaxSection>

      <ParallaxSection zIndex={5} scaleAmount={0.05}>
        <PromisesSection />
      </ParallaxSection>

      <ParallaxSection zIndex={6} scaleAmount={0.06}>
        <StatsSection />
      </ParallaxSection>

      {/* These have their own scroll animations - still stack on top */}
      <div className="relative" style={{ zIndex: 7 }}>
        <OurWorkSection />
      </div>

      <div className="relative" style={{ zIndex: 8 }}>
        <WorkProcessSection />
      </div>

      <div className="relative" style={{ zIndex: 9 }}>
        <TestimonialsSection />
      </div>

      <div className="relative" style={{ zIndex: 10 }}>
        <BlogSection />
      </div>

      {/* Last section - no sticky needed */}
      <ParallaxSection zIndex={11} sticky={false}>
        <CTAStrip />
      </ParallaxSection>
    </>
  );
};

export default Index;
