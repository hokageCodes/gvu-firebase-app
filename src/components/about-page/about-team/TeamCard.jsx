import React from "react";

function AboutCard(props) {
  return (
    <div className="dt-card">
      <img
        src={props.img}
        alt={props.name}
        className="dt-card-img"
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
      />
      <p className="dt-card-name">{props.name}</p>
      <p className="dt-card-title">{props.title}</p>
    </div>
  );
}

export default AboutCard;
