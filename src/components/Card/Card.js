import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Card.scss";

const Card = ({ imageSrc, title, onClick, listItems }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={onClick}>
      <div className="card__content">
        <img src={imageSrc} alt={title} className="card__image" />
        <div className="card__list">
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <Button onClick={() => navigate("/register-new/cargar-dataset")}>
        {title}
      </Button>
    </div>
  );
};

export default Card;
