import React from "react";
import TeamCard from "./TeamCard";
import profile1 from "../../../assets/team.jpg";
import profile2 from "../../../assets/team.jpg";
import profile3 from "../../../assets/team.jpg";
import profile4 from "../../../assets/team.jpg";
import "./team.css";

function AboutTeam() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Project Team</span>
        </h3>

        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className="dt-cards-content">
        <TeamCard
          img={profile1}
          name="Elon Musk"
          title="Project Manager"
        />
        <TeamCard
          img={profile2}
          name="Elon Musk"
          title="Product Designer"
        />
        <TeamCard
          img={profile3}
          name="Elon Musk"
          title="Frontend Developer"
        />
        <TeamCard
          img={profile4}
          name="Elon Musk"
          title="Backend Developer"
        />
      </div>
    </div>
  );
}

export default AboutTeam;
