// File: RadiologySection.tsx
// Modern React + TypeScript component for the Radiology & Imaging Services section

import { useEffect, useMemo, useState } from "react";
import styles from "./Radiology.module.css";

// Local image imports (update paths as needed)
import pic1 from "../assets/lab/xray.png";
import pic2 from "../assets/lab/ultrasound.png";
import pic3 from "../assets/lab/CT.png";
import pic4 from "../assets/lab/MRI.png";
import pic5 from "../assets/lab/mammography.png";

import person1 from "../assets/lab/radiologist.png";
import person2 from "../assets/lab/radiographer.png";

export interface Service {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
}

interface Props {
  services?: Service[];
  carouselIntervalMs?: number;
}

const defaultServices: Service[] = [
  {
    id: "xray",
    title: "Plain Radiography (X-ray)",
    description:
      "Fast, widely available imaging used for chest, trauma/fractures and skeletal work-up. Low cost and usually first-line in resource-limited settings.",
    bannerImage: pic1,
  },
  {
    id: "ultrasound",
    title: "Diagnostic & Point-of-Care Ultrasound (POCUS)",
    description:
      "Portable, non-ionizing imaging used for obstetric care, abdominal pathology, trauma (FAST), pleural and vascular assessments.",
    bannerImage: pic2,
  },
  {
    id: "ct",
    title: "Computed Tomography (CT)",
    description:
      "High-resolution cross-sectional imaging essential for trauma, stroke, and disease staging. Rapid acquisition and diagnostic precision.",
    bannerImage: pic3,
  },
  {
    id: "mri",
    title: "Magnetic Resonance Imaging (MRI)",
    description:
      "Superior soft-tissue contrast ideal for neuro, musculoskeletal, and oncologic imaging. Used for advanced diagnostics.",
    bannerImage: pic4,
  },
  {
    id: "mammography",
    title: "Mammography & Breast Imaging",
    description:
      "Screening and diagnostic breast imaging. Ultrasound and clinical exam remain key adjuncts in limited-resource settings.",
    bannerImage: pic5,
  },
];

const RadiologySection: React.FC<Props> = ({
  services = defaultServices,
  carouselIntervalMs = 7000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const banners = useMemo(
    () => services.map((s) => ({ id: s.id, title: s.title, src: s.bannerImage })),
    [services]
  );

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, carouselIntervalMs);
    return () => clearInterval(interval);
  }, [banners.length, carouselIntervalMs]);

  const goTo = (index: number) =>
    setActiveIndex(((index % banners.length) + banners.length) % banners.length);

  return (
    <section className={styles.container} aria-labelledby="radiology-heading">
      {/* Banner Section */}
      <div className={styles.bannerWrap}>
        <h2 id="radiology-heading" className={styles.sectionTitle}>
          Radiology & Imaging Services
        </h2>

        <div
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label="Radiology banners"
        >
          {banners.map((b, idx) => (
            <div
              key={b.id}
              className={`${styles.slide} ${
                idx === activeIndex ? styles.active : ""
              }`}
              aria-hidden={idx === activeIndex ? "false" : "true"}
            >
              <img
                src={b.src}
                alt={`${b.title} banner`}
                className={styles.bannerImage}
                loading={idx === activeIndex ? "eager" : "lazy"}
              />
              <div className={styles.bannerCaption}>
                <h3>{b.title}</h3>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <div className={styles.carouselControls}>
            <button
              aria-label="Previous banner"
              onClick={() => goTo(activeIndex - 1)}
              className={styles.controlBtn}
            >
              ‹
            </button>

            <div className={styles.dots} role="tablist" aria-label="Banner selection">
              {banners.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${
                    i === activeIndex ? styles.dotActive : ""
                  }`}
                  aria-pressed={i === activeIndex}
                  aria-label={`Show ${services[i].title}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button
              aria-label="Next banner"
              onClick={() => goTo(activeIndex + 1)}
              className={styles.controlBtn}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div className={styles.contentGrid}>
        <div className={styles.staffCard}>
          <img
            src={person1}
            alt="Consultant Radiologist"
            className={styles.staffImage}
          />
          <div className={styles.staffInfo}>
            <h4>Consultant Radiologist</h4>
            <p>
              Expert in cross-sectional and plain film imaging, image-guided
              procedures, and multidisciplinary reporting.
            </p>
          </div>
        </div>

        <div className={styles.staffCard}>
          <img
            src={person2}
            alt="Radiographer / Technician"
            className={styles.staffImage}
          />
          <div className={styles.staffInfo}>
            <h4>Radiographer / Technician</h4>
            <p>
              Skilled in safe image acquisition, patient positioning, and
              operation of imaging equipment across modalities.
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className={styles.servicesList}>
          <h3>Key Radiology Tests & Their Diagnostic Roles</h3>
          <ul>
            {services.map((s) => (
              <li key={s.id} className={styles.serviceItem}>
                <strong>{s.title}:</strong> <span>{s.description}</span>
              </li>
            ))}
          </ul>

          <p className={styles.note}>
            Note: availability of modalities varies by region. In many African
            settings, X-ray and ultrasound are most accessible, while CT and MRI
            remain essential for trauma and complex cases.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.footerCTA}>
        <p>
          Need an urgent imaging appointment or referral? Contact our radiology
          reception — we provide coordinated reporting and teleradiology
          support.
        </p>
        <a className={styles.ctaBtn} href="#contact">
          Book Imaging
        </a>
      </div>
    </section>
  );
};

export default RadiologySection;
