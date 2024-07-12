import React from "react";
import "./Modal.scss";

const Modal = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="modal__close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
