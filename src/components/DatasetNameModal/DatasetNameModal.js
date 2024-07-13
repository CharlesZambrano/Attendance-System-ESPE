import React, { useState, useEffect } from "react";
import Button from "../Common/Button";
import Input from "../../components/Common/Input";
import "./DatasetNameModal.scss";

const DatasetNameModal = ({ show, onClose, onConfirm }) => {
  const [datasetName, setDatasetName] = useState("");

  useEffect(() => {
    if (!show) {
      setDatasetName("");
    }
  }, [show]);

  const handleConfirm = (event) => {
    event.preventDefault();
    if (datasetName.trim() !== "") {
      onConfirm(datasetName);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ingrese el nombre del Dataset</h2>
        <form onSubmit={handleConfirm}>
          <Input
            type="text"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            placeholder="Apellidos y Nombres"
            required
          />
          <div className="modal-buttons">
            <Button type="submit">Confirmar</Button>
            <Button onClick={onClose} type="button">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatasetNameModal;
