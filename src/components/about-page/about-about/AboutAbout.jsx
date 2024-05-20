import React, { useEffect } from "react";
import BooksBanner from '../../../assets/Books-Banner.jpg';
import SolutionStep from "./SolutionStep";
import "./about-about.css";
import Aos from "aos";
import "aos/dist/aos.css"; // Ensure you import AOS styles

function About() {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initializes AOS and sets the animation duration
  }, []);

  return (
    <div className="about-section" id="about">
      <div className="about-image-content" data-aos="fade-right">
        <img src={BooksBanner} alt="Study Books" className="about-image1" />
      </div>

      <div className="about-text-content" data-aos="fade-left">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to GVU PastQuestions, your academic success partner. We provide a seamless experience in accessing past examination questions and personalized study aids tailored to your academic needs.
        </p>

        <h4 className="about-text-title">Our Solutions</h4>

        <SolutionStep
          title="Comprehensive Database"
          description="Navigate through an extensive database of past questions across various disciplines and academic levels, curated for your success."
          data-aos="fade-up"
          data-aos-delay="100"
        />

        <SolutionStep
          title="Tailored Study Plans"
          description="Create personalized study schedules with our interactive tools, designed to adapt to your learning pace and style for effective preparation."
          data-aos="fade-up"
          data-aos-delay="200"
        />

        <SolutionStep
          title="Track Your Progress"
          description="Monitor your preparation with our progress tracking features. Gain insights into your strengths and areas that need improvement as you prepare for your exams."
          data-aos="fade-up"
          data-aos-delay="300"
        />
      </div>
    </div>
  );
}

export default About;
