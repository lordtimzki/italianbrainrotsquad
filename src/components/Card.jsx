import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ member }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/member/${member.id}`);
  };

  return (
    <div className="member-card" onClick={handleCardClick}>
      <h3>{member.name}</h3>
      <img
        src={member.animal}
        alt={`${member.name}'s spirit animal`}
        className="member-image"
      />
      <p className="brainrot-level">Brainrot: {member.brainrotted}%</p>
      <div className="card-overlay">
        <span>Click to view</span>
      </div>
    </div>
  );
};

export default Card;
