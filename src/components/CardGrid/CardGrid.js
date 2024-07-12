import React from "react";
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
            <p>Title</p>
            <p>Updated today</p>
          </div>
          <button onClick={() => onImageDelete(index)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
