import React from "react";
import Card from "../../components/Card/Card";
import "./RegisterNew.scss";
import addIcon from "../../assets/images/icons-añadir-64.png";
import uploadIcon from "../../assets/images/icons-subir-64.png";

const RegisterNew = () => {
  const handleCreateDataset = () => {
    // Lógica para redirigir a la página de Crear Dataset
  };

  const handleUploadDataset = () => {
    // Lógica para redirigir a la página de Cargar Dataset
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
        />
        <Card
          imageSrc={uploadIcon}
          title="Cargar Dataset"
          onClick={handleUploadDataset}
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
    </div>
  );
};

export default RegisterNew;
