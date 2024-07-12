import React from "react";
import "./Card.scss";

const Card = ({ imageSrc, title, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={imageSrc} alt={title} className="card__image" />
    <button className="card__button">{title}</button>
  </div>
);

export default Card;
