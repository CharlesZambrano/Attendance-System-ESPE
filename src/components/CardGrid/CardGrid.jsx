import React from "react";
import icon_eliminar from "../../assets/images/icons-eliminar-64.png";
import "./CardGrid.scss";

const CardGrid = ({ images, onImageClick, onImageDelete }) => {
  return (
    <div className="card-grid">
      {images.map((image, index) => (
        <div className="card" key={index}>
          <img
            src={image.src || "no-image.png"}
            alt={`Imagen ${index}`}
            onClick={() => onImageClick(index)}
          />
          <div className="card-content">
            <div className="card-info">
              <p className="card-title">{image.title}</p>
              <p className="card-date">{image.date}</p>
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
