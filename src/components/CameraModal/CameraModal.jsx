import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import Button from "../Common/Button";
import "./CameraModal.scss";
import closeIcon from "../../assets/images/icons-salir-redondeado-64.png";

const CameraModal = ({ show, onClose, onCapture }) => {
  const cameraRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  if (!show) return null;

  const handleCapture = () => {
    if (cameraRef.current && !cameraError) {
      try {
        const imageSrc = cameraRef.current.takePhoto();
        onCapture(imageSrc);
      } catch (error) {
        console.error("Camera error:", error);
        setCameraError(true);
      }
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
          <Button onClick={handleCapture} disabled={cameraError}>
            Capturar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
