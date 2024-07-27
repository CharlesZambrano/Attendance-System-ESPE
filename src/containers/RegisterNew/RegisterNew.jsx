import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/images/icons-añadir-64.png";
import uploadIcon from "../../assets/images/icons-subir-64.png";
import Card from "../../components/Card/Card";
import DatasetNameModal from "../../components/DatasetNameModal/DatasetNameModal";
import "./RegisterNew.scss";

const RegisterNew = () => {
  const [showModal, setShowModal] = useState(false);
  const [datasetName, setDatasetName] = useState("");
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const navigate = useNavigate();

  const handleCreateDataset = () => {
    setShowModal(true);
  };

  const handleConfirm = (name, accessories) => {
    setDatasetName(name);
    setSelectedAccessories(accessories);
    setShowModal(false);
    navigate("/register-new/create-dataset", {
      state: { datasetName: name, accessories },
    });
  };

  const handleUploadDataset = () => {
    navigate("/register-new/upload-dataset");
  };

  // Datos simulados de ejemplo
  const datasets = [
    { name: "Dataset 1", size: "500 MB", date: "2024-01-01" },
    { name: "Dataset 2", size: "200 MB", date: "2024-02-15" },
  ];

  return (
    <div className="register-new">
      <h2>REGISTRAR NUEVO</h2>
      <div className="register-new__cards">
        <Card
          imageSrc={addIcon}
          title="Crear Dataset"
          onClick={handleCreateDataset}
          listItems={["LOREM IPSUM", "LOREM IPSUM", "LOREM IPSUM"]}
        />
        <Card
          imageSrc={uploadIcon}
          title="Cargar Dataset"
          onClick={handleUploadDataset}
          listItems={["LOREM IPSUM", "LOREM IPSUM", "LOREM IPSUM"]}
        />
      </div>
      <div className="register-new__table">
        <h3>Datasets Cargados</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tamaño</th>
              <th>Fecha de Carga</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset, index) => (
              <tr key={index}>
                <td>{dataset.name}</td>
                <td>{dataset.size}</td>
                <td>{dataset.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DatasetNameModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default RegisterNew;
