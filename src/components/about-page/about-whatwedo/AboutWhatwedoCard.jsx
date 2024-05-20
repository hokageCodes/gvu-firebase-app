import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AboutWhatwedoCard(props) {
  return (
    <div className="info-cards" data-aos={props['data-aos']} data-aos-delay={props['data-aos-delay']}>
      <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
      </span>
      <p className="info-card-title">{props.title}</p>
      <p className="info-card-description">{props.description}</p>
    </div>
  );
}

export default AboutWhatwedoCard;
