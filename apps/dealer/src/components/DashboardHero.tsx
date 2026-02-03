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
    imageUrl: "/hero/hero-spareparts.png",
  },
  {
    title: "Jaguar & Range Rover Spare Parts",
    subtitle: "OEM Quality • Genuine Parts • Premium Aftermarket • Fast Delivery",
    imageUrl: "/hero/hero-spareparts.png",
  },
  {
    title: "Jaguar & Range Rover Spare Parts",
    subtitle: "OEM Quality • Genuine Parts • Premium Aftermarket • Fast Delivery",
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
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  const totalSlides = safeSlides.length;
  const intervalMs = 5000;

  useEffect(() => {
    const primary = "/hero/hero-spareparts.png";
    const img = new Image();
    img.src = primary;
    img.onload = () => setHeroImageUrl(primary);
    img.onerror = () => setHeroImageUrl(null);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, totalSlides]);

  const dots = useMemo(() => new Array(totalSlides).fill(null), [totalSlides]);

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden rounded-[24px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
        <div className="relative min-h-[300px] md:min-h-[360px]">
          {safeSlides.map((slide, index) => (
            <div
              key={`${slide.title}-${index}`}
              aria-hidden={activeIndex !== index}
              className={`absolute inset-0 bg-no-repeat bg-cover bg-right transition-opacity duration-700 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              } ${prefersReducedMotion ? "transition-none" : ""}`}
              style={{
                backgroundImage: heroImageUrl
                  ? "linear-gradient(90deg, rgba(0, 10, 35, 0.92) 0%, rgba(0, 25, 80, 0.70) 50%, rgba(0, 0, 0, 0.20) 75%, rgba(0, 0, 0, 0.05) 100%), url('/hero/hero-spareparts.png')"
                  : "linear-gradient(90deg, rgba(0, 20, 60, 0.85) 0%, rgba(0, 60, 140, 0.55) 55%, rgba(0, 0, 0, 0.1) 100%)",
              }}
            >
              <div className="relative z-10 flex h-full flex-col justify-center gap-3 px-6 py-8 text-white md:px-12">
                <h1 className="text-[1.8rem] font-bold leading-tight md:text-[2.6rem]">
                  {slide.title}
                </h1>
                <p className="text-sm text-white/85 md:text-base">
                  {slide.subtitle}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Link
                    to="/search"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#0B5ED7] px-6 text-sm font-semibold text-white transition hover:bg-[#0A52BF]"
                  >
                    Search Parts
                  </Link>
                  <Link
                    to="/exclusive"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-white/85 px-6 text-sm font-semibold text-[#0B1220] transition hover:bg-white"
                  >
                    Exclusive Parts
                  </Link>
                </div>
                <div className="mt-3 flex gap-2" role="tablist" aria-label="Hero slides">
                  {dots.map((_, dotIndex) => (
                    <button
                      key={`hero-dot-${dotIndex}`}
                      type="button"
                      className={`h-2.5 w-2.5 rounded-full border border-white/60 transition ${
                        activeIndex === dotIndex
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
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
      </div>
    </section>
  );
};

export default DashboardHero;
