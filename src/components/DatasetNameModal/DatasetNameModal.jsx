import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";
import "./DatasetNameModal.scss";

const accessories = [
  { label: "Gafas transparentes", code: "TRA" },
  { label: "Gafas de sol", code: "SOL" },
  { label: "Sombrero", code: "SOM" },
  { label: "Gorra", code: "GOR" },
  { label: "Mascarilla", code: "MAC_MAB" },
  { label: "Cabello suelto y recogido", code: "REC_SUE" },
  { label: "Cuello de camisa alto y bajo", code: "ALT_BAJ" },
];

const DatasetNameModal = ({ show, onClose, onConfirm }) => {
  const [datasetName, setDatasetName] = useState("");
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  useEffect(() => {
    if (!show) {
      setDatasetName("");
      setSelectedAccessories([]);
    }
  }, [show]);

  const handleConfirm = (event) => {
    event.preventDefault();
    if (datasetName.trim() !== "") {
      onConfirm(datasetName, selectedAccessories);
    }
  };

  const toggleAccessorySelection = (accessoryCode) => {
    setSelectedAccessories((prevSelected) =>
      prevSelected.includes(accessoryCode)
        ? prevSelected.filter((code) => code !== accessoryCode)
        : [...prevSelected, accessoryCode]
    );
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
          <div className="accessory-selection">
            {accessories.map((accessory) => (
              <label key={accessory.code}>
                <input
                  type="checkbox"
                  checked={selectedAccessories.includes(accessory.code)}
                  onChange={() => toggleAccessorySelection(accessory.code)}
                />
                {accessory.label}
              </label>
            ))}
          </div>
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
