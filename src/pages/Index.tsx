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

      {/* Hero scales down & fades as CategoryBar scrolls over */}
      <ParallaxSection scaleAmount={0.08} translateAmount={-80} roundedReveal>
        <HeroSection />
      </ParallaxSection>

      {/* CategoryBar scales down as About covers it */}
      <ParallaxSection scaleAmount={0.04} translateAmount={-40}>
        <CategoryBar />
      </ParallaxSection>

      {/* About section with depth */}
      <ParallaxSection scaleAmount={0.06} translateAmount={-50} roundedReveal>
        <AboutCompanySection />
      </ParallaxSection>

      {/* Services - darker section covers about */}
      <ParallaxSection scaleAmount={0.05} translateAmount={-40}>
        <ServicesSection />
      </ParallaxSection>

      {/* Promises - stacks over services */}
      <ParallaxSection scaleAmount={0.06} translateAmount={-60}>
        <PromisesSection />
      </ParallaxSection>

      {/* Stats with parallax bg */}
      <ParallaxSection scaleAmount={0.07} translateAmount={-50} roundedReveal>
        <StatsSection />
      </ParallaxSection>

      {/* Our Work */}
      <ParallaxSection scaleAmount={0.05} translateAmount={-40}>
        <OurWorkSection />
      </ParallaxSection>

      {/* Work Process */}
      <ParallaxSection scaleAmount={0.06} translateAmount={-50}>
        <WorkProcessSection />
      </ParallaxSection>

      {/* Testimonials */}
      <ParallaxSection scaleAmount={0.05} translateAmount={-40} roundedReveal>
        <TestimonialsSection />
      </ParallaxSection>

      {/* Blog */}
      <ParallaxSection scaleAmount={0.04} translateAmount={-30}>
        <BlogSection />
      </ParallaxSection>

      {/* CTA - no parallax on last section */}
      <ParallaxSection sticky={false}>
        <CTAStrip />
      </ParallaxSection>
    </>
  );
};

export default Index;
