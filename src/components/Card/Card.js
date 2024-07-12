import React from "react";
import Button from "../Button/Button";
import "./Card.scss";

const Card = ({ imageSrc, title, onClick, listItems }) => (
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
    <Button onClick={onClick}>{title}</Button>
  </div>
);

export default Card;
