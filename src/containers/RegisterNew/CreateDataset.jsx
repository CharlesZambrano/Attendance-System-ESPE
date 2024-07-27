// src/containers/RegisterNew/CreateDataset.js

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CameraModal from "../../components/CameraModal/CameraModal";
import CardGrid from "../../components/CardGrid/CardGrid";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import "./CreateDataset.scss";

const expressions = [
  { label: "Neutra", code: "NEU" },
  { label: "Sonriendo", code: "SON" },
  { label: "Seria", code: "SER" },
  { label: "Enojada", code: "ENO" },
  { label: "Sorprendida", code: "SOR" },
  { label: "Triste", code: "TRI" },
  { label: "Con ojos cerrados", code: "CER" },
  { label: "Mirando hacia arriba", code: "ARR" },
  { label: "Mirando hacia abajo", code: "ABA" },
  { label: "Mirando hacia la izquierda", code: "IZQ" },
  { label: "Mirando hacia la derecha", code: "DER" },
];

const accessories = [
  { label: "Con gafas transparentes", code: "TRA" },
  { label: "Con gafas de sol", code: "SOL" },
  { label: "Con sombrero normal", code: "SOM" },
  { label: "Con gorra", code: "GOR" },
  { label: "Con mascarilla completamente puesta", code: "MAC" },
  { label: "Con mascarilla debajo de la barbilla", code: "MAB" },
  { label: "Pelo recogido", code: "REC" },
  { label: "Pelo suelto", code: "SUE" },
  { label: "Cuello alto", code: "ALT" },
  { label: "Cuello bajo", code: "BAJ" },
  { label: "Con maquillaje ligero", code: "LIG" },
  { label: "Con maquillaje pesado", code: "PES" },
];

const CreateDataset = () => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const { state } = useLocation();
  const { datasetName } = state || { datasetName: "" };
  const navigate = useNavigate();

  useEffect(() => {
    if (datasetName) {
      const sanitizedDatasetName = datasetName.replace(/ /g, "_");
      setCapturedImages((prevImages) =>
        prevImages.map((image, index) => ({
          ...image,
          title: `${sanitizedDatasetName}_${index + 1}`,
        }))
      );
    }
  }, [datasetName]);

  const handleCaptureImage = (imageSrc) => {
    const sanitizedDatasetName = datasetName.replace(/ /g, "_");
    const expressionCode =
      expressions[Math.floor(currentStep / accessories.length)].code;
    const accessoryCode = accessories[currentStep % accessories.length].code;
    const currentDate = new Date().toISOString().split("T")[0];

    const newImages = Array.from({ length: 3 }, (_, i) => ({
      src: imageSrc,
      title: `${sanitizedDatasetName}_${expressionCode}_${accessoryCode}_${
        capturedImages.length + i + 1
      }`,
      date: currentDate,
    }));

    setCapturedImages([...capturedImages, ...newImages]);

    setCurrentStep((prevStep) => prevStep + 1);
    setShowCameraModal(false);
  };

  const getCurrentInstruction = () => {
    const expressionIndex = Math.floor(currentStep / accessories.length);
    const accessoryIndex = currentStep % accessories.length;
    return `${expressions[expressionIndex].label} ${accessories[accessoryIndex].label}`;
  };

  return (
    <div className="create-dataset">
      <h2>
        <span onClick={() => navigate("/register-new")}>REGISTRAR NUEVO</span>{" "}
        {" > "}
        CREAR DATASET
      </h2>
      <Input
        label="Apellidos y Nombres"
        type="text"
        name="names"
        value={datasetName}
        onChange={() => {}}
        readOnly
      />
      <div className="card-grid-container">
        <CardGrid
          images={capturedImages}
          onImageClick={() => {}}
          onImageDelete={() => {}}
        />
      </div>
      <div className="button-group">
        <Button onClick={() => setShowCameraModal(true)}>Capturar Foto</Button>
        <Button onClick={() => console.log("Entrenar Modelo")}>
          Entrenar Modelo
        </Button>
      </div>
      <CameraModal
        show={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCaptureImage}
        instruction={getCurrentInstruction()}
      />
    </div>
  );
};

export default CreateDataset;
