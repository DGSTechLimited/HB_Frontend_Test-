import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroSlide = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

const defaultSlides: HeroSlide[] = [
  {
    title: "Jaguar & Range Rover Spare Parts",
    subtitle: "OEM Quality * Genuine Parts * Fast Delivery",
    imageUrl: "/hero/hero-spareparts.png",
  },
  {
    title: "Exclusive Parts",
    subtitle: "Limited inventory for high-demand, dealer-ready SKUs",
    imageUrl: "/hero/hero-spareparts.png",
  },
  {
    title: "News & Offers",
    subtitle: "Weekly drops and pricing advantages for partners",
    imageUrl: "/hero/hero-spareparts.png",
  },
];

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
};

const DashboardHero = ({ slides = defaultSlides }: { slides?: HeroSlide[] }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const safeSlides = slides.length > 0 ? slides : defaultSlides;
  const [activeIndex, setActiveIndex] = useState(0);

  const totalSlides = safeSlides.length;
  const intervalMs = 5000;

  useEffect(() => {
    if (prefersReducedMotion || totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, totalSlides]);

  const dots = useMemo(() => new Array(totalSlides).fill(null), [totalSlides]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section className="hero-shell">
      <div className="hero-shell__inner">
        {safeSlides.map((slide, index) => (
          <div
            key={`${slide.title}-${index}`}
            className={`hero-slide ${activeIndex === index ? "is-active" : ""} ${prefersReducedMotion ? "is-reduced" : ""}`}
            aria-hidden={activeIndex !== index}
          >
            <div
              className="hero-slide__media"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(8, 16, 32, 0.86) 0%, rgba(8, 16, 32, 0.56) 55%, rgba(8, 16, 32, 0.15) 100%), url(${slide.imageUrl})`,
              }}
            />
            <div className="hero-slide__content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero-slide__actions">
                <Link className="hero-cta hero-cta--primary" to="/search">
                  Search Parts
                </Link>
                <Link className="hero-cta hero-cta--secondary" to="/exclusive">
                  Explore Exclusive
                </Link>
              </div>
              <div className="hero-slide__dots" role="tablist" aria-label="Hero slides">
                {dots.map((_, dotIndex) => (
                  <button
                    key={`hero-dot-${dotIndex}`}
                    type="button"
                    className={`hero-dot ${activeIndex === dotIndex ? "is-active" : ""}`}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                    aria-pressed={activeIndex === dotIndex}
                    onClick={() => setActiveIndex(dotIndex)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="hero-arrow hero-arrow--left" onClick={handlePrev}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" className="hero-arrow hero-arrow--right" onClick={handleNext}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default DashboardHero;
