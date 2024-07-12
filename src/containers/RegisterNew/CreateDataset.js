import React, { useState } from "react";
import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import Modal from "../../components/Modal/Modal";
import Camera from "react-camera-pro";
import "./CreateDataset.scss";

const CreateDataset = () => {
  const [name, setName] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [filterChips, setFilterChips] = useState([
    "Label 1",
    "Label 2",
    "Label 3",
  ]);

  const handleNameChange = (e) => setName(e.target.value);

  const handleCapture = (img) => {
    setCapturedImage(img);
  };

  const handleAddImage = () => {
    setSelectedImages([
      ...selectedImages,
      { src: capturedImage, title: "New Image", date: new Date() },
    ]);
    setShowCamera(false);
  };

  const handleDeleteImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <div className="create-dataset">
      <h2>Registrar nuevo {">"} Crear Dataset</h2>
      <Input
        label="Apellidos y Nombres"
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
      />

      <div className="filter-chip-carousel">
        {filterChips.map((chip, index) => (
          <div key={index} className="chip">
            {chip}
          </div>
        ))}
      </div>

      <div className="card-grid">
        {selectedImages.map((image, index) => (
          <div key={index} className="card">
            <img
              src={image.src || "assets/no-image.png"}
              alt="No preview available"
            />
            <div className="card-content">
              <p>{image.title}</p>
              <p>{image.date.toLocaleDateString()}</p>
            </div>
            <Button onClick={() => handleDeleteImage(index)}>Eliminar</Button>
          </div>
        ))}
      </div>

      <Button onClick={() => setShowCamera(true)}>Capturar Foto</Button>

      <Modal
        show={showCamera}
        onClose={() => setShowCamera(false)}
        title="Capturar Imagen"
      >
        <Camera onTakePhoto={(dataUri) => handleCapture(dataUri)} />
        <Button onClick={handleAddImage}>Añadir Imagen</Button>
        <Button onClick={() => setShowCamera(false)}>Cancelar</Button>
      </Modal>

      <Button onClick={() => console.log("Entrenar Modelo")}>
        Entrenar Modelo
      </Button>
    </div>
  );
};

export default CreateDataset;
