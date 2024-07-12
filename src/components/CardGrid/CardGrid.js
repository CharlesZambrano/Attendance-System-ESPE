// src/components/CardGrid/CardGrid.js
import React from "react";
import icon_eliminar from "../../assets/images/icons-eliminar-64.png";
import "./CardGrid.scss";

const CardGrid = ({ images, onImageClick, onImageDelete }) => {
  return (
    <div className="card-grid">
      {images.map((src, index) => (
        <div className="card" key={index}>
          <img
            src={src || "no-image.png"}
            alt={`Imagen ${index}`}
            onClick={() => onImageClick(index)}
          />
          <div className="card-content">
            <div className="card-info">
              <p className="card-title">Title</p>
              <p className="card-date">Updated today</p>
            </div>
            <button
              className="delete-button"
              onClick={() => onImageDelete(index)}
            >
              <img src={icon_eliminar} alt="Eliminar" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
