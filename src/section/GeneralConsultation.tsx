import { useMemo } from "react";
import styles from "./GeneralConsultation.module.css";

// Local image imports
import respBanner from "../assets/banners/respiratory-banner.jpg";
import gastroBanner from "../assets/banners/gastro-banner.jpg";
import renalBanner from "../assets/banners/renal-banner.jpg";
import neuroBanner from "../assets/banners/neuro-banner.png";
import orthoBanner from "../assets/banners/ortho-banner.jpg";
import entBanner from "../assets/banners/ent-banner.jpg";
import opthoBanner from "../assets/banners/optho-banner.jpg";
import dentalBanner from "../assets/banners/dental-banner.jpg";

// Doctor images (ensure these exist locally)
import drResp1 from "../assets/specialist/pulmonologist.png";
import drResp2 from "../assets/specialist/pulmonologist.png";
import drGastro1 from "../assets/specialist/gastroenterologist.jpg";
import drGastro2 from "../assets/specialist/gastroenterologist.jpg";
import drRenal1 from "../assets/specialist/nephrologist.jpg";
import drRenal2 from "../assets/specialist/nephrologist.jpg";
import drNeuro1 from "../assets/specialist/neurologist.jpg";
import drNeuro2 from "../assets/specialist/neurologist.jpg";
import drOrtho1 from "../assets/specialist/orthopaedic.jpg";
import drOrtho2 from "../assets/specialist/orthopaedic.jpg";
import drEnt1 from "../assets/specialist/ent.jpg";
import drEnt2 from "../assets/specialist/ent.jpg";
import drOptho1 from "../assets/specialist/opthalmologist.png";
import drOptho2 from "../assets/specialist/opthalmologist.png";
import drDental1 from "../assets/specialist/dentist.jpg";
import drDental2 from "../assets/specialist/dentist.jpg";

type Doctor = {
  id: string;
  name: string;
  title?: string;
  photo: string;
  bio?: string;
};

type Specialty = {
  id: string;
  name: string;
  shortDesc: string;
  banner: string;
  doctors: Doctor[];
  cta?: { label: string; href?: string };
};

const specialtiesData = (): Specialty[] => [
  {
    id: "respiratory",
    name: "Respiratory Medicine",
    shortDesc:
      "Diagnosis and management of asthma, COPD, pneumonia, sleep-related breathing disorders, and other lung conditions.",
    banner: respBanner,
    doctors: [
      { id: "r1", name: "Dr. A. Mwangi", title: "Pulmonologist", photo: drResp1 },
      { id: "r2", name: "Dr. L. Otieno", title: "Respiratory Physician", photo: drResp2 },
    ],
    cta: { label: "Book Respiratory Clinic", href: "/appointments?dept=respiratory" },
  },
  {
    id: "gastro",
    name: "Gastroenterology",
    shortDesc:
      "Comprehensive care for liver, pancreatic, and gastrointestinal conditions, including endoscopy services.",
    banner: gastroBanner,
    doctors: [
      { id: "g1", name: "Dr. P. Njoroge", title: "Gastroenterologist", photo: drGastro1 },
      { id: "g2", name: "Dr. S. Kamau", title: "Hepatologist", photo: drGastro2 },
    ],
    cta: { label: "Book GI Clinic", href: "/appointments?dept=gastro" },
  },
  {
    id: "renal",
    name: "Renal Medicine",
    shortDesc:
      "Kidney care including hypertension-linked kidney disease, dialysis coordination, and transplantation referrals.",
    banner: renalBanner,
    doctors: [
      { id: "n1", name: "Dr. M. Kibet", title: "Nephrologist", photo: drRenal1 },
      { id: "n2", name: "Dr. E. Wanjiru", title: "Renal Consultant", photo: drRenal2 },
    ],
    cta: { label: "Book Renal Clinic", href: "/appointments?dept=renal" },
  },
  {
    id: "neuro",
    name: "Neurology",
    shortDesc:
      "Services for stroke, epilepsy, neuropathies, headaches, and neurodegenerative conditions with neurorehabilitation.",
    banner: neuroBanner,
    doctors: [
      { id: "ne1", name: "Dr. C. Ochieng", title: "Neurologist", photo: drNeuro1 },
      { id: "ne2", name: "Dr. F. Mutua", title: "Clinical Neurophysiologist", photo: drNeuro2 },
    ],
    cta: { label: "Book Neurology Clinic", href: "/appointments?dept=neuro" },
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    shortDesc:
      "Bone, joint, and soft tissue care, including trauma, elective joint surgery referrals, and physiotherapy coordination.",
    banner: orthoBanner,
    doctors: [
      { id: "o1", name: "Dr. B. Naliaka", title: "Orthopaedic Surgeon", photo: drOrtho1 },
      { id: "o2", name: "Dr. J. Otieno", title: "Spine Specialist", photo: drOrtho2 },
    ],
    cta: { label: "Book Orthopaedics", href: "/appointments?dept=orthopaedics" },
  },
  {
    id: "ent",
    name: "ENT (Ear Nose Throat)",
    shortDesc:
      "Evaluation and treatment of ear, nose, and throat conditions, minor procedures, and audiology referrals.",
    banner: entBanner,
    doctors: [
      { id: "e1", name: "Dr. R. Karanja", title: "ENT Surgeon", photo: drEnt1 },
      { id: "e2", name: "Dr. S. Wairimu", title: "ENT Physician", photo: drEnt2 },
    ],
    cta: { label: "Book ENT Clinic", href: "/appointments?dept=ent" },
  },
  {
    id: "opthalmology",
    name: "Ophthalmology",
    shortDesc:
      "Eye care, cataract services, glaucoma management, and diabetic retinopathy screening.",
    banner: opthoBanner,
    doctors: [
      { id: "op1", name: "Dr. H. Ngeno", title: "Ophthalmologist", photo: drOptho1 },
      { id: "op2", name: "Dr. A. Chege", title: "Retina Specialist", photo: drOptho2 },
    ],
    cta: { label: "Book Eye Clinic", href: "/appointments?dept=opthalmology" },
  },
  {
    id: "dental",
    name: "Dental",
    shortDesc:
      "General dentistry, oral surgery, pediatric dental care, and preventive oral health programs.",
    banner: dentalBanner,
    doctors: [
      { id: "d1", name: "Dr. L. Mburu", title: "Dentist", photo: drDental1 },
      { id: "d2", name: "Dr. K. Mutiso", title: "Oral Surgeon", photo: drDental2 },
    ],
    cta: { label: "Book Dental Clinic", href: "/appointments?dept=dental" },
  },
];

const GeneralConsultation = () => {
  const specialties = useMemo(() => specialtiesData(), []);

  return (
    <section className={styles.wrapper} aria-labelledby="general-consultation-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="general-consultation-heading" className={styles.title}>
            General Consultation
          </h2>
          <p className={styles.lead}>
            Our multidisciplinary teams provide outpatient assessment, diagnosis, and follow-up
            across multiple specialties. Click a specialty to learn more and book an appointment.
          </p>
        </header>

        <div className={styles.grid} role="list">
          {specialties.map((s) => (
            <article key={s.id} className={styles.card} role="listitem">
              <div className={styles.bannerWrap}>
                <img src={s.banner} alt={`${s.name} banner`} className={styles.banner} loading="lazy" />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.specialtyTitle}>{s.name}</h3>
                <p className={styles.desc}>{s.shortDesc}</p>

                <div className={styles.doctorRow} aria-label={`${s.name} doctors`}>
                  {s.doctors.map((d) => (
                    <figure key={d.id} className={styles.doctorCard}>
                      <img
                        src={d.photo}
                        alt={`Photo of ${d.name} — ${d.title ?? ""}`}
                        className={styles.doctorPhoto}
                        loading="lazy"
                        width={72}
                        height={72}
                      />
                      <figcaption className={styles.doctorMeta}>
                        <strong className={styles.doctorName}>{d.name}</strong>
                        {d.title && <span className={styles.doctorTitle}>{d.title}</span>}
                      </figcaption>
                    </figure>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <a
                    className={styles.cta}
                    href={s.cta?.href ?? "#"}
                    aria-label={`${s.cta?.label ?? "Book appointment"} for ${s.name}`}
                  >
                    {s.cta?.label ?? "Book Appointment"}
                  </a>

                  <button
                    className={styles.detailsBtn}
                    type="button"
                    onClick={() => (window.location.hash = `#${s.id}`)}
                    aria-label={`View more about ${s.name}`}
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneralConsultation;
