// File: src/components/Hero.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Hero.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

// ====== Hero Images ======
import Banner1 from "../assets/hero/Banner1.jpg";
import Banner2 from "../assets/hero/Banner2.jpg";
import Banner3 from "../assets/hero/Banner3.jpg";
import Banner4 from "../assets/hero/Banner4.jpg";
import Banner5 from "../assets/hero/Banner5.jpg";
import Banner6 from "../assets/hero/Banner6.jpg";
import Banner7 from "../assets/hero/Banner7.jpg";

interface Slide {
  id: number;
  src: string;
  alt: string;
  headline: string;
  subheadline?: string;
  cta?: {
    label: string;
    href: string;
  };
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    src: Banner1,
    alt: "Pharmacist assisting a patient",
    headline: "Trusted Pharmacy Care",
    subheadline: "Your health, our priority.",
    cta: { label: "Shop Now", href: "/shop" },
  },
  {
    id: 2,
    src: Banner2,
    alt: "Pharmaceutical shelves",
    headline: "Quality Medicines",
    subheadline: "Certified brands for your well-being.",
    cta: { label: "Browse Medicines", href: "/products" },
  },
  {
    id: 3,
    src: Banner3,
    alt: "Online prescription service",
    headline: "Order Prescriptions Online",
    subheadline: "Secure and confidential process.",
    cta: { label: "Upload Prescription", href: "/upload" },
  },
  {
    id: 4,
    src: Banner4,
    alt: "Nutritional supplements and vitamins",
    headline: "Wellness & Supplements",
    subheadline: "Support for a healthy lifestyle.",
    cta: { label: "Explore Supplements", href: "/supplements" },
  },
  {
    id: 5,
    src: Banner5,
    alt: "Medical devices and diagnostics",
    headline: "Essential Care Devices",
    subheadline: "Accurate tools for better health.",
    cta: { label: "View Devices", href: "/devices" },
  },
  {
    id: 6,
    src: Banner6,
    alt: "Medicine delivery",
    headline: "Fast & Safe Delivery",
    subheadline: "Reliable service to your doorstep.",
    cta: { label: "Track Order", href: "/orders" },
  },
  {
    id: 7,
    src: Banner7,
    alt: "Pharmacist consultation",
    headline: "Expert Health Advice",
    subheadline: "Talk to licensed pharmacists.",
    cta: { label: "Contact Us", href: "/contact" },
  },
];

const AUTOPLAY_INTERVAL = 7000;

export default function Hero({ slides = DEFAULT_SLIDES }: { slides?: Slide[] }) {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const length = slides.length;

  const goTo = useCallback((next: number) => {
    setIndex(() => (next + length) % length);
  }, [length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // ===== Autoplay =====
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const tick = () => setIndex((prev) => (prev + 1) % length);
    autoplayRef.current = window.setInterval(tick, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [length]);

  // ===== Pause on hover / focus =====
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onEnter = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    const onLeave = () => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches || autoplayRef.current) return;
      autoplayRef.current = window.setInterval(() => setIndex((p) => (p + 1) % length), AUTOPLAY_INTERVAL);
    };

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    node.addEventListener("focusin", onEnter);
    node.addEventListener("focusout", onLeave);

    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      node.removeEventListener("focusin", onEnter);
      node.removeEventListener("focusout", onLeave);
    };
  }, [length]);

  // ===== Keyboard Navigation =====
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // ===== Swipe Support (Touch) =====
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartX.current;
      if (start === null) return;
      const end = e.changedTouches[0].clientX;
      const diff = start - end;
      const threshold = 50;
      if (diff > threshold) next();
      if (diff < -threshold) prev();
      touchStartX.current = null;
    };

    node.addEventListener("touchstart", onTouchStart as unknown as EventListener, { passive: true });
    node.addEventListener("touchend", onTouchEnd as unknown as EventListener);

    return () => {
      node.removeEventListener("touchstart", onTouchStart as unknown as EventListener);
      node.removeEventListener("touchend", onTouchEnd as unknown as EventListener);
    };
  }, [next, prev]);

  // ===== Image Preload =====
  useEffect(() => {
    const nextIdx = (index + 1) % length;
    const prevIdx = (index - 1 + length) % length;
    [slides[nextIdx]?.src, slides[prevIdx]?.src].forEach((src) => {
      if (src) new Image().src = src;
    });
  }, [index, slides, length]);

  return (
    <section ref={containerRef} className={styles.hero} aria-label="Hero Carousel">
      <div className={styles.inner}>
        <AnimatePresence initial={false} mode="wait">
          {slides.map(
            (slide, i) =>
              i === index && (
                <motion.div
                  key={slide.id}
                  className={styles.slide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${length}: ${slide.headline}`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={styles.image}
                    loading={i === index ? "eager" : "lazy"}
                  />

                  <div className={styles.overlay}>
                    <div className={styles.textWrap}>
                      <h2 className={styles.headline}>{slide.headline}</h2>
                      {slide.subheadline && (
                        <p className={styles.subheadline}>{slide.subheadline}</p>
                      )}
                      {slide.cta && (
                        <a href={slide.cta.href} className={styles.cta}>
                          {slide.cta.label}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* ===== Navigation Buttons ===== */}
        <button className={`${styles.nav} ${styles.left}`} onClick={prev} aria-label="Previous slide">
          <MdChevronLeft size={28} aria-hidden="true" />
        </button>
        <button className={`${styles.nav} ${styles.right}`} onClick={next} aria-label="Next slide">
          <MdChevronRight size={28} aria-hidden="true" />
        </button>

        {/* ===== Indicators ===== */}
        <ol className={styles.indicators} role="tablist" aria-label="Slide indicators">
          {slides.map((_, i) => (
            <li key={i} className={styles.indicatorItem}>
              <button
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-pressed={i === index}
                className={`${styles.indicator} ${i === index ? styles.active : ""}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
