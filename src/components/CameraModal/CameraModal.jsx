// src/components/CameraModal/CameraModal.jsx

import React, { useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import closeIcon from "../../assets/images/icons-salir-redondeado-64.png";
import Button from "../Common/Button";
import "./CameraModal.scss";

const CameraModal = ({
  show,
  onClose,
  onCapture,
  instruction,
  datasetName,
}) => {
  const cameraRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (capturedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      contextRef.current = context;
      const img = new Image();
      img.src = capturedImage;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [capturedImage]);

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
      onCapture(capturedImage, boxes);
      setCapturedImage(null);
      setBoxes([]);
    }
  };

  const handleMouseDown = (e) => {
    const rect = e.target.getBoundingClientRect();
    setDrawing(true);
    setBoxes((prevBoxes) => [
      ...prevBoxes,
      {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        width: 0,
        height: 0,
      },
    ]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const rect = e.target.getBoundingClientRect();
    const newBoxes = [...boxes];
    const currentBox = newBoxes[newBoxes.length - 1];
    currentBox.width = e.clientX - rect.left - currentBox.x;
    currentBox.height = e.clientY - rect.top - currentBox.y;
    setBoxes(newBoxes);
    redrawCanvas();
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = capturedImage;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      boxes.forEach((box) => {
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(box.x, box.y, box.width, box.height);
      });
    };
  };

  if (!show || !instruction) return null;

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
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={500}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                />
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
