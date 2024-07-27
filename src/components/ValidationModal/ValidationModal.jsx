import React from "react";
import errorIcon from "../../assets/images/icons-error-del-sitio-web-64.png";
import Button from "../Common/Button";
import "./ValidationModal.scss";

const ValidationModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Validación</h2>
        <img src={errorIcon} alt="Error" className="error-icon" />
        <p>{message}</p>
        <div className="modal-buttons">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
