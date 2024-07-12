import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Common/Input";
import Chip from "../../components/Chip/Chip";
import { Camera } from "react-camera-pro";
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
  const cameraRef = useRef(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    if (cameraRef.current) {
      const imageSrc = cameraRef.current.takePhoto();
      setCapturedImages([...capturedImages, imageSrc]);
      setCameraModal(false);
    }
  };

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
      <div className="card-grid">
        {capturedImages.map((src, index) => (
          <div className="card" key={index}>
            <img
              src={src || "no-image.png"}
              alt={`Imagen ${index}`}
              onClick={() => handleImageClick(index)}
            />
            <div className="card-content">
              <p>Title</p>
              <p>Updated today</p>
            </div>
            <button onClick={() => handleImageDelete(index)}>Eliminar</button>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
      />

      {cameraModal && (
        <div className="modal-overlay">
          <div className="modal">
            <Camera ref={cameraRef} />
            <Button onClick={handleCapture}>Capturar</Button>
            <Button onClick={() => setCameraModal(false)}>Cancelar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateDataset;
