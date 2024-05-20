"use client"
import React, { useEffect } from "react";
import AboutWhatwedoCard from '../../../components/about-page/about-whatwedo/AboutWhatwedoCard';
import { faBookOpen, faUserGraduate, faClock } from "@fortawesome/free-solid-svg-icons";
import Aos from "aos";
import "aos/dist/aos.css"; // make sure to import AOS styles
import "./whatwedo.css";

function AboutWhatwedo() {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initializes and sets duration of AOS animations
  }, []);

  return (
    <div className="info-section" id="services" data-aos="fade-up">
      <div className="info-title-content">
        <h3 className="info-title" data-aos="fade-right">
          <span>What We Do</span>
        </h3>
        <p className="info-description" data-aos="fade-right" data-aos-delay="100">
          Our platform is dedicated to providing students with comprehensive access to past examination questions and answers. We support academic success through resourceful study aids and efficient learning strategies.
        </p>
      </div>

      <div className="info-cards-content">
        <AboutWhatwedoCard
          title="Extensive Archive"
          description="Access a vast collection of past questions from various courses and levels of study. Our extensive archive is continuously updated to ensure you have the resources you need."
          icon={faBookOpen}
          data-aos="fade-up"
          data-aos-delay="200"
        />

        <AboutWhatwedoCard
          title="Student Success"
          description="We are committed to the academic success of every student. Our platform provides insights into examination trends, helping students to focus their revision effectively."
          icon={faUserGraduate}
          data-aos="fade-up"
          data-aos-delay="300"
        />

        <AboutWhatwedoCard
          title="Time Management"
          description="Improve your study sessions with timed quizzes and practice exams. Our tools help you manage your revision time effectively, ensuring you are well-prepared for your actual exams."
          icon={faClock}
          data-aos="fade-up"
          data-aos-delay="400"
        />
      </div>
    </div>
  );
}

export default AboutWhatwedo;
