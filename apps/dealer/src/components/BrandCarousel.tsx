import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Jaguar Parts",
    description: "Precision-matched components for premium Jaguar performance.",
  },
  {
    title: "Range Rover Parts",
    description: "Luxury SUV essentials with OEM-grade reliability.",
  },
  {
    title: "Brakes • Engine • Suspension",
    description: "High-impact categories for fast-moving workshop needs.",
  },
  {
    title: "OEM vs Aftermarket",
    description: "Verified sourcing, transparent choices, trusted supply.",
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

const BrandCarousel = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = slides.length;
  const intervalMs = 5000;

  const goTo = (index: number) => {
    const nextIndex = (index + slideCount) % slideCount;
    setActiveIndex(nextIndex);
    if (trackRef.current) {
      const slideWidth = trackRef.current.clientWidth;
      trackRef.current.scrollTo({
        left: slideWidth * nextIndex,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = window.setInterval(() => {
      goTo(activeIndex + 1);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [activeIndex, prefersReducedMotion, isPaused]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  const dots = useMemo(() => new Array(slideCount).fill(null), [slideCount]);

  return (
    <section
      className="brand-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="brand-carousel__inner">
        <div className="brand-carousel__intro">
          <p className="brand-carousel__eyebrow">HOTBRAY Dealer Supply</p>
          <h2 className="brand-carousel__title">Jaguar & Range Rover Spare Parts</h2>
          <p className="brand-carousel__subtitle">
            OEM Quality • Genuine Parts • Premium Aftermarket • Fast Delivery
          </p>
          <div className="brand-carousel__actions">
            <Link to="/search" className="brand-carousel__btn brand-carousel__btn--primary">
              Search Parts
            </Link>
            <Link to="/exclusive" className="brand-carousel__btn brand-carousel__btn--ghost">
              Exclusive Parts
            </Link>
          </div>
        </div>
        <div
          className="brand-carousel__track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Jaguar and Range Rover parts highlights"
          onKeyDown={handleKeyDown}
        >
          {slides.map((slide) => (
            <div className="brand-carousel__slide" key={slide.title}>
              <div className="brand-carousel__slide-content">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
              <div className="brand-carousel__accent" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="brand-carousel__dots" role="tablist" aria-label="Carousel slides">
          {dots.map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              className={`brand-carousel__dot ${activeIndex === index ? "is-active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={activeIndex === index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
