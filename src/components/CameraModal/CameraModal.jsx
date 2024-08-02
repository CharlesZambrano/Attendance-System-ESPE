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
  const [box, setBox] = useState(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (capturedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      contextRef.current = context;
      const img = new Image();
      img.src = capturedImage;
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
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
    if (capturedImage && box) {
      const annotation = {
        bbox: {
          xmin: Math.min(box.x, box.x + box.width),
          ymin: Math.min(box.y, box.y + box.height),
          xmax: Math.max(box.x, box.x + box.width),
          ymax: Math.max(box.y, box.y + box.height),
        },
      };
      onCapture(capturedImage, [annotation]);
      setCapturedImage(null);
      setBox(null);
    }
  };

  const handleMouseDown = (e) => {
    if (!capturedImage) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setDrawing(true);
    setBox({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!drawing || !box) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    setBox((prevBox) => ({
      ...prevBox,
      width: currentX - prevBox.x,
      height: currentY - prevBox.y,
    }));
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
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
      if (box) {
        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.strokeRect(box.x, box.y, box.width, box.height);
      }
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
                  width={1920}
                  height={1080}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  // style={{ maxWidth: "100%", maxHeight: "100%" }}
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
                idealResolution={{ width: 1920, height: 1080 }}
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
