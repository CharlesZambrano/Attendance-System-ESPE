import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Modal from "../../components/Modal/Modal";
import "./UploadDataset.scss";

const UploadDataset = () => {
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === "application/zip") {
        setFile(selectedFile);
      } else {
        setModalContent({
          title: "Formato Inválido",
          message: "El archivo debe estar en formato .zip",
        });
        setShowModal(true);
      }
    }
  };

  const handleUpload = () => {
    if (file) {
      // Aquí puedes añadir la lógica para manejar el archivo subido
      console.log("Archivo subido:", file);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cargar-dataset">
      <h2>
        <span onClick={() => navigate("/register-new")}>REGISTRAR NUEVO</span>{" "}
        {" > "}
        CARGAR DATASET
      </h2>
      <div className="form-group">
        <label htmlFor="file-upload" className="file-label">
          Seleccione el archivo .ZIP
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className="file-display">
          {file ? file.name : "No se ha seleccionado ningún archivo"}
        </div>
      </div>
      <Input
        label="Apellidos y Nombres"
        type="text"
        name="nombre"
        placeholder="Ingresar los Apellidos y Nombres"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <Button onClick={handleUpload}>Entrenar Modelo</Button>
      <Modal
        show={showModal}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
      />
    </div>
  );
};

export default UploadDataset;
