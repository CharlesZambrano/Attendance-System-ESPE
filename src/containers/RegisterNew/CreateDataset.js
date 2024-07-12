// src/containers/RegisterNew/CreateDataset.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Chip from "../../components/Common/Chip";
import CameraModal from "../../components/CameraModal/CameraModal";
import CardGrid from "../../components/CardGrid/CardGrid";
import "./CreateDataset.scss";

const CreateDataset = () => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [chips, setChips] = useState([
    { label: "Label 1", selected: false },
    { label: "Label 2", selected: false },
    { label: "Label 3", selected: false },
    { label: "Label 4", selected: false },
  ]);
  const [capturedImages, setCapturedImages] = useState([]);
  const navigate = useNavigate();

  const handleChipClick = (index) => {
    setChips(
      chips.map((chip, i) =>
        i === index ? { ...chip, selected: !chip.selected } : chip
      )
    );
  };

  const handleCaptureImage = (imageSrc) => {
    setCapturedImages([...capturedImages, imageSrc]);
    setShowCameraModal(false);
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
        value=""
        onChange={() => {}}
      />
      <div className="filter-chip-carousel">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip.label}
            selected={chip.selected}
            onClick={() => handleChipClick(index)}
          />
        ))}
      </div>
      <CardGrid images={capturedImages} />
      <Button onClick={() => setShowCameraModal(true)}>Capturar Foto</Button>
      <Button onClick={() => console.log("Entrenar Modelo")}>
        Entrenar Modelo
      </Button>
      <CameraModal
        show={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCaptureImage}
      />
    </div>
  );
};

export default CreateDataset;
