import React from "react";
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
    <button className="card__button">{title}</button>
  </div>
);

export default Card;
