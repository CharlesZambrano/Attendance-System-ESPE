// src/components/CameraModal/CameraModal.js
import React, { useRef } from "react";
import { Camera } from "react-camera-pro";
import Button from "../Common/Button";
import "./CameraModal.scss";

const CameraModal = ({ show, onClose, onCapture }) => {
  const cameraRef = useRef(null);

  if (!show) return null;

  const handleCapture = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.takePhoto();
      onCapture(imageSrc);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <Camera ref={cameraRef} aspectRatio={1 / 1} className="camera-view" />
        <div className="modal-buttons">
          <Button onClick={handleCapture}>Capturar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
