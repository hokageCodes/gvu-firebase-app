import React, { useEffect, useState } from "react";
import BooksBanner from '../../../assets/hero-img.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import './about-hero.css';  // Ensure this CSS file includes animation styles

function AboutHero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => window.removeEventListener("scroll", onPageScroll);
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline" data-aos="fade-right">📘 Unlock Academic Excellence</p>
          <h2 className="text-title" data-aos="fade-right" data-aos-delay="100">
            Access Past Questions for Effective Study
          </h2>
          <p className="text-description" data-aos="fade-right" data-aos-delay="200">
            Enhance your preparation with a vast repository of past questions and insightful answers. Streamline your study sessions with targeted practice.
          </p>
          <div className="text-stats" data-aos="fade-up" data-aos-delay="300">
            <div className="text-stats-container">
              <p>10k+</p>
              <p>Questions Answered</p>
            </div>

            <div className="text-stats-container">
              <p>500+</p>
              <p>Exams Covered</p>
            </div>

            <div className="text-stats-container">
              <p>15+</p>
              <p>Years in Service</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section" data-aos="fade-left">
          <img src={BooksBanner} alt="Library of Past Exam Questions" width={600} height={400} />
        </div>
      </div>

      <div onClick={scrollToTop} className={`scroll-up ${goUp ? "show-scroll" : ""}`} data-aos="zoom-in">
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default AboutHero;
