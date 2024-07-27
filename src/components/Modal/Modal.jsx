import React from "react";
import Button from "../Common/Button";
import "./Modal.scss";

const Modal = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
};

export default Modal;
