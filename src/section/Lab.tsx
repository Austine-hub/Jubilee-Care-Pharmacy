import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import styles from "./Lab.module.css";

// Import images (ensure correct paths)
import banner1 from "../assets/hero/Banner1.jpg";
import banner2 from "../assets/hero/Banner4.jpg";
import pathologistImage from "../assets/lab/pathologist.jpg";
import technicianImage from "../assets/lab/technician african.jpg";
import testMalaria from "../assets/lab/malaria-test.png";
import testHIV from "../assets/lab/hiv-test.png";
import testTB from "../assets/lab/tb-test.png";
import testFBC from "../assets/lab/cbc test.png";

interface TestItem {
  id: string;
  title: string;
  short: string;
  banner: string;
}

const TESTS: TestItem[] = [
  {
    id: "malaria",
    title: "Malaria (RDT / Microscopy)",
    short:
      "Rapid diagnostic tests and microscopy for Plasmodium species — the cornerstone of febrile illness diagnosis in sub-Saharan Africa.",
    banner: testMalaria,
  },
  {
    id: "hiv",
    title: "HIV Antibody / Ag Testing",
    short:
      "Screening and confirmatory algorithms (rapid tests, 4th generation assays) used for diagnosis, monitoring and linkage to care.",
    banner: testHIV,
  },
  {
    id: "tb",
    title: "Tuberculosis (Sputum Smear / GeneXpert)",
    short:
      "Smear microscopy and molecular tests (e.g., GeneXpert) for active pulmonary TB; crucial where TB/HIV coinfection is common.",
    banner: testTB,
  },
  {
    id: "fbc",
    title: "Full Blood Count (FBC) & Hemoglobin",
    short:
      "Basic haematology used for anaemia screening, infection markers, platelet counts, and monitoring of chronic disease therapies.",
    banner: testFBC,
  },
];

const LaboratorySection: FC = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const carouselImages = [banner1, banner2, pathologistImage, technicianImage];

  // Auto-advance carousel every 7s
  useEffect(() => {
    const updateCarousel = () =>
      setIndex((prev) => (prev + 1) % carouselImages.length);

    intervalRef.current = window.setInterval(updateCarousel, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [carouselImages.length]);

  const goTo = (n: number) => {
    // Update image index and reset interval
    setIndex((n + carouselImages.length) % carouselImages.length);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % carouselImages.length);
      }, 7000);
    }
  };

  return (
    <section className={styles.wrapper} aria-labelledby="lab-heading">
      <header className={styles.header}>
        <h2 id="lab-heading">Laboratory Services</h2>
        <p className={styles.lead}>
          Reliable, timely laboratory testing for diagnosis, monitoring, and
          public health — staffed by certified pathologists and laboratory
          medicine specialists.
        </p>
      </header>

      {/* Carousel Section */}
      <div className={styles.carousel} aria-roledescription="carousel">
        <div className={styles.carouselViewport}>
          {carouselImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Laboratory banner ${i + 1}`}
              className={`${styles.carouselImage} ${
                i === index ? styles.active : ""
              }`}
              aria-hidden={i !== index}
              loading="lazy"
            />
          ))}
        </div>

        <div className={styles.carouselControls}>
          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => goTo(index - 1)}
            className={styles.controlButton}
          >
            ‹
          </button>

          <div className={styles.indicators} role="tablist">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                className={`${styles.indicator} ${
                  i === index ? styles.indicatorActive : ""
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next banner"
            onClick={() => goTo(index + 1)}
            className={styles.controlButton}
          >
            ›
          </button>
        </div>

        <div className={styles.carouselDescription} aria-live="polite">
          <strong>
            {index === 0 && "Comprehensive diagnostic testing"}
            {index === 1 && "Quality-controlled laboratory workflows"}
            {index === 2 && "Consultant Pathologist on-site"}
            {index === 3 && "Lab Medicine Specialist / Technician team"}
          </strong>
        </div>
      </div>

      {/* Staff Section */}
      <div className={styles.staffGrid}>
        <figure className={styles.staffCard}>
          <img
            src={pathologistImage}
            alt="Consultant Pathologist"
            className={styles.staffImage}
            loading="lazy"
          />
          <figcaption>
            <h3>Consultant Pathologist</h3>
            <p className={styles.muted}>
              Reporting, quality assurance & specialized diagnostics
            </p>
          </figcaption>
        </figure>

        <figure className={styles.staffCard}>
          <img
            src={technicianImage}
            alt="Laboratory Medicine Specialist"
            className={styles.staffImage}
            loading="lazy"
          />
          <figcaption>
            <h3>Laboratory Medicine Specialist / Technician</h3>
            <p className={styles.muted}>
              Sample processing, point-of-care testing, and instrumentation
            </p>
          </figcaption>
        </figure>
      </div>

      {/* Test List Section */}
      <div className={styles.tests}>
        {TESTS.map((t) => (
          <article
            key={t.id}
            className={styles.testCard}
            aria-labelledby={`test-${t.id}`}
          >
            <div className={styles.testBannerWrap}>
              <img
                src={t.banner}
                alt={`${t.title} banner`}
                className={styles.testBanner}
                loading="lazy"
              />
            </div>
            <div className={styles.testContent}>
              <h4 id={`test-${t.id}`}>{t.title}</h4>
              <p>{t.short}</p>
              <details>
                <summary>Why this test matters</summary>
                <p>
                  {t.id === "malaria" &&
                    "Malaria testing (RDT/microscopy) remains essential in endemic regions and helps reduce pediatric mortality."}
                  {t.id === "hiv" &&
                    "HIV testing facilitates early treatment, prevents transmission, and supports epidemiological tracking."}
                  {t.id === "tb" &&
                    "Molecular tests like GeneXpert improve detection and resistance profiling in TB/HIV co-infected patients."}
                  {t.id === "fbc" &&
                    "Full blood counts provide rapid insights into anaemia, infections, and treatment monitoring."}
                </p>
              </details>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.footerNote}>
        <p>
          The above list highlights key laboratory tests in our facility. For
          specialized panels, turnaround times, or specimen requirements, please
          contact the laboratory desk.
        </p>
      </footer>
    </section>
  );
};

export default LaboratorySection;




