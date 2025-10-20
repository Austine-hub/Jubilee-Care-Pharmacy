import React, { useState, useEffect } from 'react';
import styles from './Vct.module.css';


import person1 from "../assets/lab/virologist.png";
import person2 from "../assets/lab/veneroloy-nurse.png";

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface VCTService {
  id: number;
  title: string;
  description: string;
  icon: string;
  testingInfo: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  credentials: string;
  bio: string;
}

const VCTSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&h=600&fit=crop',
      title: 'Confidential HIV Testing & Counseling',
      subtitle: 'Early detection saves lives - Get tested today'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&h=600&fit=crop',
      title: 'Comprehensive STI Screening',
      subtitle: 'Protecting your health with professional care'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1600&h=600&fit=crop',
      title: 'Pre & Post-Exposure Prophylaxis',
      subtitle: 'Advanced prevention strategies for your wellbeing'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1600&h=600&fit=crop',
      title: 'Hepatitis Testing Services',
      subtitle: 'Complete viral hepatitis screening and management'
    }
  ];

  const vctServices: VCTService[] = [
    {
      id: 1,
      title: 'HIV Testing & Counseling',
      description: 'HIV remains the leading infectious disease burden in Sub-Saharan Africa. Our comprehensive HIV testing includes rapid antibody tests with results in 20 minutes, 4th generation combo tests detecting both antibodies and p24 antigen, and confirmatory Western Blot testing. We provide pre-test and post-test counseling, risk assessment, and linkage to treatment services.',
      icon: '🧬',
      testingInfo: 'Rapid test (20 min) | ELISA | Western Blot | Viral Load'
    },
    {
      id: 2,
      title: 'Tuberculosis Screening',
      description: 'TB remains a critical public health challenge in Sub-Saharan Africa, often co-occurring with HIV. We offer comprehensive TB screening including GeneXpert MTB/RIF for rapid molecular detection, sputum smear microscopy, chest X-rays, and tuberculin skin testing (TST). Our services include screening for latent TB infection and drug-resistant TB detection.',
      icon: '🫁',
      testingInfo: 'GeneXpert | Sputum Culture | Chest X-Ray | TST'
    },
    {
      id: 3,
      title: 'Sexually Transmitted Infections Panel',
      description: 'Complete STI screening for common infections including Chlamydia trachomatis, Neisseria gonorrhoeae, Syphilis (RPR/VDRL and TPHA), Trichomonas vaginalis, and Herpes Simplex Virus. We use modern nucleic acid amplification tests (NAAT) for high accuracy. Includes syndromic management and partner notification services.',
      icon: '🔬',
      testingInfo: 'NAAT Testing | RPR/TPHA | Culture | Serology'
    },
    {
      id: 4,
      title: 'Hepatitis B & C Testing',
      description: 'Viral hepatitis is a growing concern in Africa. We provide HBsAg screening for Hepatitis B surface antigen, Anti-HCV antibody testing for Hepatitis C, confirmatory HBV DNA and HCV RNA viral load testing, and liver function assessment. Includes vaccination counseling for Hepatitis B and linkage to treatment for chronic infections.',
      icon: '🩺',
      testingInfo: 'HBsAg | Anti-HCV | Viral Load | Liver Function Panel'
    },
    {
      id: 5,
      title: 'Pre-Exposure Prophylaxis (PrEP)',
      description: 'PrEP is a highly effective HIV prevention strategy for high-risk individuals. We provide comprehensive PrEP services including eligibility screening, baseline testing for HIV, Hepatitis B, and kidney function, daily or on-demand Truvada/Descovy prescriptions, and regular follow-up monitoring. Counseling on adherence and risk reduction included.',
      icon: '💊',
      testingInfo: 'Eligibility Assessment | Baseline Labs | Monthly Monitoring'
    },
    {
      id: 6,
      title: 'Post-Exposure Prophylaxis (PEP)',
      description: 'Emergency HIV prevention within 72 hours of potential exposure. Our 24/7 PEP services include immediate risk assessment, rapid HIV testing, 28-day antiretroviral medication regimen, baseline and follow-up testing at 6 weeks and 3 months. Available for occupational and non-occupational exposures with comprehensive counseling.',
      icon: '⚡',
      testingInfo: '72-Hour Window | 28-Day ART Course | Follow-up Testing'
    },
    {
      id: 7,
      title: 'Cervical Cancer Screening',
      description: 'Cervical cancer is the leading cancer among women in Sub-Saharan Africa, primarily caused by HPV. We offer VIA (Visual Inspection with Acetic Acid) for low-resource settings, HPV DNA testing, Pap smear cytology, and colposcopy with biopsy. Includes HPV vaccination counseling and screening-and-treat programs.',
      icon: '🎗️',
      testingInfo: 'VIA | HPV Testing | Pap Smear | Colposcopy'
    },
    {
      id: 8,
      title: 'Malaria & Tropical Disease Testing',
      description: 'Essential screening for endemic tropical diseases. Includes rapid diagnostic tests (RDT) and microscopy for malaria parasites, screening for schistosomiasis, soil-transmitted helminths, and filariasis. We also test for emerging infections and provide travel medicine consultations with prophylaxis recommendations.',
      icon: '🦟',
      testingInfo: 'RDT | Blood Film | Serology | Stool Examination'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Dr. Amara Okonkwo',
      role: 'Lead Virologist',
      image: person1,
      credentials: 'PhD Virology, MSc Medical Microbiology',
      bio: 'Dr. Okonkwo has over 15 years of experience in clinical virology with specialization in HIV, viral hepatitis, and emerging infectious diseases. She leads our molecular diagnostics laboratory and has published extensively on HIV drug resistance in Sub-Saharan Africa.'
    },
    {
      id: 2,
      name: 'Sr. Grace Mwangi',
      role: 'Senior Venereology Nurse',
      image: person2,
      credentials: 'RN, BSN, Certified STI Specialist',
      bio: 'Sister Grace brings 18 years of specialized experience in sexual health and STI management. She is certified in HIV counseling and testing, PrEP/PEP initiation, and partner notification services. Her compassionate approach ensures patient comfort and confidentiality.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  const handleDotClick = (index: number): void => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <section className={styles.vctSection}>
      {/* Banner Carousel */}
      <div className={styles.bannerContainer}>
        <div 
          className={`${styles.bannerSlide} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}
          style={{ backgroundImage: `url(${bannerSlides[currentSlide].image})` }}
        >
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>{bannerSlides[currentSlide].title}</h1>
              <p className={styles.bannerSubtitle}>{bannerSlides[currentSlide].subtitle}</p>
              <button className={styles.bannerCTA}>Book Appointment</button>
            </div>
          </div>
        </div>
        <div className={styles.carouselDots}>
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Introduction */}
      <div className={styles.introSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Voluntary Counseling & Testing Services</h2>
          <p className={styles.introText}>
            Our VCT center provides confidential, professional testing and counseling services for a comprehensive 
            range of infectious diseases. With state-of-the-art laboratory facilities and compassionate healthcare 
            professionals, we ensure accurate results and supportive care in a private, judgment-free environment.
          </p>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>50,000+</span>
              <span className={styles.statLabel}>Tests Conducted Annually</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>99.9%</span>
              <span className={styles.statLabel}>Accuracy Rate</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Emergency PEP Services</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Confidential</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className={styles.servicesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Testing Services</h2>
          <div className={styles.servicesGrid}>
            {vctServices.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.testingInfo}>
                  <strong>Available Tests:</strong> {service.testingInfo}
                </div>
                <button className={styles.serviceButton}>Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet Our Specialists</h2>
          <p className={styles.teamIntro}>
            Our dedicated team of experts combines clinical excellence with compassionate care to provide 
            you with the highest quality VCT services.
          </p>
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={styles.teamCard}>
                <div className={styles.teamImageWrapper}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={styles.teamImage}
                  />
                </div>
                <div className={styles.teamInfo}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamCredentials}>{member.credentials}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Take Control of Your Health Today</h2>
            <p className={styles.ctaText}>
              Early detection and prevention are key to maintaining good health. Our VCT services are 
              completely confidential and conducted by experienced healthcare professionals.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>Schedule a Test</button>
              <button className={styles.secondaryButton}>Call Us: +254 700 000 000</button>
            </div>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>🔒 Complete Confidentiality</h3>
              <p>All testing and counseling services are strictly confidential. Your privacy is our priority.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>⚡ Rapid Results</h3>
              <p>Most tests provide results within 20-30 minutes. Confirmatory tests available same day.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>💰 Affordable Care</h3>
              <p>We accept insurance and offer subsidized rates. Free testing available for certain services.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>🤝 Professional Support</h3>
              <p>Pre and post-test counseling included. Linkage to treatment and support services provided.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VCTSection;