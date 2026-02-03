import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type HeroSlide = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

const defaultSlides: HeroSlide[] = [
  {
    title: "Jaguar & Range Rover Spare Parts",
    subtitle: "OEM Quality • Genuine Parts • Premium Aftermarket • Fast Delivery",
    imageUrl: "/banners/banner-1.jpg",
  },
  {
    title: "Jaguar & Range Rover Spare Parts",
    subtitle: "Trusted sourcing for premium OEM and aftermarket inventory",
    imageUrl: "/banners/banner-2.jpg",
  },
  {
    title: "Jaguar & Range Rover Spare Parts",
    subtitle: "Fast-moving categories ready for dealer fulfillment",
    imageUrl: "/banners/banner-3.jpg",
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

const HeroBanner = ({ slides = defaultSlides }: { slides?: HeroSlide[] }) => {
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

  return (
    <section className={`hero-banner ${prefersReducedMotion ? "hero-banner--reduced" : ""}`}>
      <div className="hero-banner__slides">
        {safeSlides.map((slide, index) => (
          <div
            key={`${slide.title}-${index}`}
            className={`hero-banner__slide ${activeIndex === index ? "is-active" : ""}`}
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%), url(${slide.imageUrl})`,
            }}
            aria-hidden={activeIndex !== index}
          >
            <div className="hero-banner__content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero-banner__actions">
                <Link className="hero-banner__btn hero-banner__btn--primary" to="/search">
                  Search Parts
                </Link>
                <Link className="hero-banner__btn hero-banner__btn--secondary" to="/exclusive">
                  Exclusive Parts
                </Link>
              </div>
              <div className="hero-banner__dots" role="tablist" aria-label="Hero slides">
                {dots.map((_, dotIndex) => (
                  <button
                    key={`hero-dot-${dotIndex}`}
                    type="button"
                    className={`hero-banner__dot ${activeIndex === dotIndex ? "is-active" : ""}`}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                    aria-pressed={activeIndex === dotIndex}
                    onClick={() => setActiveIndex(dotIndex)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
