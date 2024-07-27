// src/components/CameraModal/CameraModal.jsx

import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import closeIcon from "../../assets/images/icons-salir-redondeado-64.png";
import Button from "../Common/Button";
import "./CameraModal.scss";

const CameraModal = ({ show, onClose, onCapture, instruction }) => {
  const cameraRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  if (!show || !instruction) return null;

  const handleCapture = () => {
    if (cameraRef.current && !cameraError) {
      try {
        const imageSrc = cameraRef.current.takePhoto();
        setCapturedImage(imageSrc);
      } catch (error) {
        console.error("Camera error:", error);
        setCameraError(true);
      }
    }
  };

  const handleAddImage = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-top-buttons">
          <img
            src={closeIcon}
            alt="Cerrar"
            className="close-icon"
            onClick={onClose}
          />
        </div>
        {cameraError ? (
          <div className="camera-error">
            No camera device accessible. Please connect your camera or try a
            different browser.
          </div>
        ) : (
          <>
            <div className="modal-instructions">
              <p>{instruction}</p>
            </div>
            {capturedImage ? (
              <div className="captured-image-preview">
                <img src={capturedImage} alt="Captura previa" />
              </div>
            ) : (
              <Camera
                ref={cameraRef}
                aspectRatio={1 / 1}
                className="camera-view"
                errorMessages={{
                  noCameraAccessible:
                    "No camera device accessible. Please connect your camera or try a different browser.",
                }}
                onError={() => setCameraError(true)}
              />
            )}
            <div className="modal-buttons">
              {capturedImage ? (
                <>
                  <Button onClick={() => setCapturedImage(null)}>
                    Volver a Capturar
                  </Button>
                  <Button onClick={handleAddImage}>Añadir</Button>
                </>
              ) : (
                <Button onClick={handleCapture} disabled={cameraError}>
                  Capturar
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraModal;
