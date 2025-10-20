import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.column} aria-label="Shop by Category">
          <h3 className={styles.heading}>Shop by Category</h3>
          <ul className={styles.linkList}>
            <li><a href="/medical-conditions">Medical Conditions</a></li>
            <li><a href="/vitamins-supplements">Vitamins and Supplements</a></li>
            <li><a href="/personal-care">Personal Care</a></li>
            <li><a href="/beauty-skin-care">Beauty and Skin Care</a></li>
            <li><a href="/medical-devices">Medical Devices</a></li>
            <li><a href="/snacks-drinks">Snacks and Drinks</a></li>
            <li><a href="/offers">Offers</a></li>
            <li><a href="/new">New on your Jubilee-care </a></li>
          </ul>
        </nav>

        <nav className={styles.column} aria-label="About Us">
          <h3 className={styles.heading}>About Us</h3>
          <ul className={styles.linkList}>
            <li><a href="/who-we-are">Who we are</a></li>
            <li><a href="/quality-statement">Our Quality Statement</a></li>
            <li><a href="/blog">Our Blog</a></li>
            <li><a href="/newsroom">Newsroom</a></li>
          </ul>
        </nav>

        <nav className={styles.column} aria-label="Help Centre">
          <h3 className={styles.heading}>Help Centre</h3>
          <ul className={styles.linkList}>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/terms-conditions">Terms & Conditions</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/shipping-policy">Shipping Policy</a></li>
            <li><a href="/return-policy">Return Policy</a></li>
          </ul>
        </nav>

        <nav className={styles.column} aria-label="Telehealth Partners">
          <h3 className={styles.heading}>Telehealth Partners</h3>
          <ul className={styles.linkList}>
            <li><a href="https://healthxafrica.com" target="_blank" rel="noopener noreferrer">HealthX Africa</a></li>
          </ul>
        </nav>

        <div className={styles.column}>
          <h3 className={styles.heading}>Authorized Pharmacy</h3>
          <p className={styles.authorizedText}>
            Jubilee-care is a registered pharmacy governed by the Pharmacy and Poisons Board of Kenya; PPB (K) Health Safety code P0940
          </p>
          <div className={styles.certificationBadge}>
            <img 
              src="/logo.jpg" 
              alt="Pharmacy and Poisons Board of Kenya Authorized Pharmacy - Health Safety Code P0940"
              className={styles.badgeImage}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;