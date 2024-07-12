import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Card.scss";

const Card = ({ imageSrc, title, onClick, listItems }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === "Cargar Dataset") {
      navigate("/register-new/upload-dataset");
    } else {
      onClick();
    }
  };

  return (
    <div className="card" onClick={handleClick}>
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
      <Button>{title}</Button>
    </div>
  );
};

export default Card;
