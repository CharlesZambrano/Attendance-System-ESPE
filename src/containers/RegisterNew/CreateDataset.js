import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const handleChipClick = (index) => {
    setChips(
      chips.map((chip, i) =>
        i === index ? { ...chip, selected: !chip.selected } : chip
      )
    );
  };

  const handleCaptureImage = (imageSrc) => {
    const sanitizedDatasetName = datasetName.replace(/ /g, "_");
    const currentDate = new Date().toISOString().split("T")[0];
    const newImage = {
      src: imageSrc,
      title: `${sanitizedDatasetName}_${capturedImages.length + 1}`,
      date: currentDate,
    };
    setCapturedImages([...capturedImages, newImage]);
    setShowCameraModal(false);
  };

  const handleImageClick = (index) => {
    console.log("Imagen clickeada:", index);
  };

  const handleImageDelete = (index) => {
    const sanitizedDatasetName = datasetName.replace(/ /g, "_");
    setCapturedImages((prevImages) =>
      prevImages
        .filter((_, i) => i !== index)
        .map((image, i) => ({
          ...image,
          title: `${sanitizedDatasetName}_${i + 1}`,
        }))
    );
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
      <div className="card-grid-container">
        <CardGrid
          images={capturedImages}
          onImageClick={handleImageClick}
          onImageDelete={handleImageDelete}
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
      />
    </div>
  );
};

export default CreateDataset;
