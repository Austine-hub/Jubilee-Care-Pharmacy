import React, { useState } from "react";
import styles from "./TalkToExpert.module.css";
import { FaPhoneAlt, FaVideo, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const TalkToExpert: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  // ✅ Contact details
  const phoneNumber = "0796787207";
  const whatsappNumber = "0796787207";
  const emailAddress = "ajanjaaustine@gmail.com";
  const videoCallLink = "https://meet.google.com/"; // Replace with your actual video call link

  // ✅ Handle user click
  const handleSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  // ✅ Handle "Start" button click based on selected mode
  const handleStartSession = () => {
    if (!selectedMode) return;

    switch (selectedMode) {
      case "call":
        window.location.href = `tel:${phoneNumber}`;
        break;
      case "whatsapp":
        // WhatsApp URL format (auto-detects mobile or desktop)
        window.open(`https://wa.me/254${whatsappNumber.substring(1)}`, "_blank");
        break;
      case "email":
        window.location.href = `mailto:${emailAddress}?subject=Pharmacy Consultation&body=Hello, I’d like to consult about...`;
        break;
      case "video":
        window.open(videoCallLink, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <section className={styles.talkSection} aria-labelledby="talk-heading">
      <div className={styles.container}>
        <h2 id="talk-heading" className={styles.heading}>
          Talk to Our <span>Pharmacists & Doctors</span>
        </h2>
        <p className={styles.subText}>
          Get professional medical advice, prescription refills, and consultations — right from your home.
        </p>

        <div className={styles.modes}>
          <button
            className={`${styles.modeButton} ${
              selectedMode === "call" ? styles.active : ""
            }`}
            onClick={() => handleSelect("call")}
            aria-pressed={selectedMode === "call"}
          >
            <FaPhoneAlt className={styles.icon} />
            <span>Call Consultation</span>
          </button>

          <button
            className={`${styles.modeButton} ${
              selectedMode === "video" ? styles.active : ""
            }`}
            onClick={() => handleSelect("video")}
            aria-pressed={selectedMode === "video"}
          >
            <FaVideo className={styles.icon} />
            <span>Video Call</span>
          </button>

          <button
            className={`${styles.modeButton} ${
              selectedMode === "email" ? styles.active : ""
            }`}
            onClick={() => handleSelect("email")}
            aria-pressed={selectedMode === "email"}
          >
            <FaEnvelope className={styles.icon} />
            <span>Email Consultation</span>
          </button>

          <button
            className={`${styles.modeButton} ${
              selectedMode === "whatsapp" ? styles.active : ""
            }`}
            onClick={() => handleSelect("whatsapp")}
            aria-pressed={selectedMode === "whatsapp"}
          >
            <FaWhatsapp className={styles.icon} />
            <span>WhatsApp Chat</span>
          </button>
        </div>

        <div className={styles.ctaContainer}>
          <button
            className={styles.ctaButton}
            onClick={handleStartSession}
            disabled={!selectedMode}
          >
            {selectedMode
              ? `Start ${
                  selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)
                } Session`
              : "Start Consultation"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TalkToExpert;
