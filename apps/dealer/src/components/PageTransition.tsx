import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useLocation } from "react-router-dom";

const TRANSITION_MS = 2400;

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

const PageTransition = () => {
  const location = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isActive, setIsActive] = useState(false);
  const transitionKey = useMemo(() => location.pathname, [location.pathname]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsActive(false);
      return;
    }

    setIsActive(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsActive(false);
      document.body.style.overflow = previousOverflow;
    }, TRANSITION_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [transitionKey, prefersReducedMotion]);

  return (
    <div
      className={`page-transition ${isActive ? "is-active" : ""}`}
      aria-hidden={!isActive}
      style={{ "--transition-duration": `${TRANSITION_MS}ms` } as CSSProperties}
    >
      <div className="page-transition__backdrop" />
      <div className="page-transition__content">
        <span className="page-transition__title">
          <span className="page-transition__title-accent">HOTBRAY</span>
        </span>
        <span className="page-transition__subline">
          Jaguar • Range Rover • OEM • Premium Aftermarket
        </span>
        <div className="page-transition__sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
