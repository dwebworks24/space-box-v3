import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4";
import heroImg from "@/assets/hero-office.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[75vh] sm:min-h-screen flex items-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={heroImg}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-primary/70" />

      <div className="relative z-10 flex items-center min-h-[75vh] sm:min-h-screen container mx-auto px-4 sm:px-8 md:px-16">
        <div className="max-w-2xl pt-20 sm:pt-24 pb-16 sm:pb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-primary-foreground animate-fade-in-up">
            Introducing Custom Interior Solutions in Telangana
          </h1>
          <p className="mt-6 text-primary-foreground/80 max-w-md text-sm sm:text-lg leading-relaxed font-body animate-fade-in text-justify">
            Not out of the box. We think within your space. 
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-flex px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-out"
          >
            Explore Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
