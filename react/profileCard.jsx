import React, { useState } from "react";

const ProfileCard = ({ name, bio, avatar }) => {
  const [highlight, setHighlight] = useState(false);

  const cardStyle = {
    boxShadow: highlight
      ? "4px 4px 15px rgba(61, 14, 171, 0.3)"
      : "2px 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: highlight ? "#eef6ff" : "#ffffff",
    transform: highlight ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    padding: "20px",
    borderRadius: "16px",
    textAlign: "center",
    width: "250px",
    margin: "20px auto",
  };

  const imageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: highlight ? "3px solid blue" : "3px solid #ddd",
  };

  return (
    <div style={cardStyle}>
      <img src={avatar} alt={name} style={imageStyle} />

      <h2>{name}</h2>
      <p>{bio}</p>

      <button onClick={() => setHighlight(!highlight)}>
        {highlight ? "Highlighted" : "Highlight"}
      </button>
    </div>
  );
};

export default ProfileCard;