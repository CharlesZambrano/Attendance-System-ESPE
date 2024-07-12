import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Common/Input";
import Chip from "../../components/Common/Chip";
import CardGrid from "../../components/CardGrid/CardGrid";
import CameraModal from "../../components/CameraModal/CameraModal";
import "./CreateDataset.scss";

const CreateDataset = () => {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [capturedImages, setCapturedImages] = useState([]);
  const [cameraModal, setCameraModal] = useState(false);
  const [chips, setChips] = useState([
    { label: "Label 1", selected: false },
    { label: "Label 2", selected: false },
    { label: "Label 3", selected: false },
    { label: "Label 4", selected: false },
  ]);
  const navigate = useNavigate();

  const handleUpload = () => {
    if (file) {
      console.log("Archivo subido:", file);
    }
  };

  const handleChipClick = (index) => {
    setChips(
      chips.map((chip, i) =>
        i === index ? { ...chip, selected: !chip.selected } : chip
      )
    );
  };

  const handleImageClick = (index) => {
    console.log("Imagen clickeada:", index);
  };

  const handleImageDelete = (index) => {
    setCapturedImages(capturedImages.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCapture = (imageSrc) => {
    setCapturedImages([...capturedImages, imageSrc]);
    setCameraModal(false);
  };

  return (
    <div className="create-dataset">
      <h2>
        <span onClick={() => navigate("/register-new")}>REGISTRAR NUEVO</span>{" "}
        {" > "}
        CREAR DATASET
      </h2>
      <div className="form-group">
        <Input
          label="Apellidos y Nombres"
          type="text"
          name="names"
          value=""
          onChange={() => {}}
        />
      </div>
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
      <div className="button-group">
        <Button onClick={() => setCameraModal(true)}>Capturar Foto</Button>
        <Button onClick={handleUpload}>Entrenar Modelo</Button>
      </div>
      <CardGrid
        images={capturedImages}
        onImageClick={handleImageClick}
        onImageDelete={handleImageDelete}
      />

      <Modal
        show={showModal}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
      />

      <CameraModal
        show={cameraModal}
        onClose={() => setCameraModal(false)}
        onCapture={handleCapture}
      />
    </div>
  );
};

export default CreateDataset;
