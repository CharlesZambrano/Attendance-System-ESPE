import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CameraModal from "../../components/CameraModal/CameraModal";
import CardGrid from "../../components/CardGrid/CardGrid";
import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import ValidationModal from "../../components/ValidationModal/ValidationModal";
import "./CreateDataset.scss";

const expressions = [
  { label: "Neutra", code: "NEU" },
  { label: "Sonriendo", code: "SON" },
  { label: "Seria", code: "SER" },
  { label: "Enojada", code: "ENO" },
  { label: "Sorprendida", code: "SOR" },
  { label: "Triste", code: "TRI" },
  { label: "Con ojos cerrados", code: "CER" },
  { label: "Mirando hacia arriba", code: "ARR" },
  { label: "Mirando hacia abajo", code: "ABA" },
  { label: "Mirando hacia la izquierda", code: "IZQ" },
  { label: "Mirando hacia la derecha", code: "DER" },
];

const accessories = [
  { label: "Con gafas transparentes", code: "TRA" },
  { label: "Con gafas de sol", code: "SOL" },
  { label: "Con sombrero", code: "SOM" },
  { label: "Con gorra", code: "GOR" },
  { label: "Con mascarilla completamente puesta", code: "MAC" },
  { label: "Con mascarilla debajo de la barbilla", code: "MAB" },
  { label: "Con el cabello recogido", code: "REC" },
  { label: "Con el cabello suelto", code: "SUE" },
  { label: "Con el cuello de la camisa alto", code: "ALT" },
  { label: "Con el cuello de la camisa bajo", code: "BAJ" },
];

const CreateDataset = () => {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const { state } = useLocation();
  const { datasetName, accessories: selectedAccessoryCodes } = state || {
    datasetName: "",
    accessories: [],
  };
  const navigate = useNavigate();
  const selectedAccessories = accessories.filter((acc) =>
    selectedAccessoryCodes.includes(acc.code)
  );

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

  const handleCaptureImage = (imageSrc) => {
    const sanitizedDatasetName = datasetName.replace(/ /g, "_");
    const expressionCode =
      expressions[Math.floor(currentStep / selectedAccessories.length)].code;
    const accessoryCode =
      selectedAccessories[currentStep % selectedAccessories.length].code;
    const currentDate = new Date().toISOString().split("T")[0];

    const newImages = Array.from({ length: 3 }, (_, i) => ({
      src: imageSrc,
      title: `${sanitizedDatasetName}_${expressionCode}_${accessoryCode}_${
        capturedImages.length + i + 1
      }`,
      date: currentDate,
    }));

    setCapturedImages([...capturedImages, ...newImages]);

    setCurrentStep((prevStep) => prevStep + 1);
    setShowCameraModal(false);
  };

  const getCurrentInstruction = () => {
    const expressionIndex = Math.floor(
      currentStep / selectedAccessories.length
    );
    const accessoryIndex = currentStep % selectedAccessories.length;
    if (expressions[expressionIndex] && selectedAccessories[accessoryIndex]) {
      return `${expressions[expressionIndex].label} ${selectedAccessories[accessoryIndex].label}`;
    }
    return "Captura completa";
  };

  const handleImageDelete = (index) => {
    const deletedTitle = capturedImages[index].title;
    const [dataset, expressionCode, accessoryCode] = deletedTitle
      .split("_")
      .slice(0, 3);

    const newImages = capturedImages.filter(
      (image) =>
        !image.title.startsWith(`${dataset}_${expressionCode}_${accessoryCode}`)
    );

    setCapturedImages(newImages);
  };

  const validateDataset = () => {
    for (const expression of expressions) {
      for (const accessory of selectedAccessories) {
        const matchingImages = capturedImages.filter((image) =>
          image.title.includes(`_${expression.code}_${accessory.code}_`)
        );

        if (matchingImages.length < 3) {
          return `Faltan imágenes para ${expression.label} ${accessory.label}`;
        }
      }
    }
    return null;
  };

  const handleSaveDataset = () => {
    const validationError = validateDataset();
    if (validationError) {
      setValidationMessage(validationError);
    } else {
      setValidationMessage("Captura del Dataset completada, guardelo");
      // Lógica para guardar el dataset
    }
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
      <div className="card-grid-container">
        <CardGrid
          images={capturedImages}
          onImageClick={() => {}}
          onImageDelete={handleImageDelete}
        />
      </div>
      <div className="button-group">
        <Button
          onClick={() => setShowCameraModal(true)}
          disabled={getCurrentInstruction() === "Captura completa"}
        >
          Capturar Foto
        </Button>
        <Button onClick={handleSaveDataset}>Guardar Dataset</Button>
      </div>
      <CameraModal
        show={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCaptureImage}
        instruction={getCurrentInstruction()}
      />
      <ValidationModal
        show={validationMessage !== ""}
        message={validationMessage}
        onClose={() => setValidationMessage("")}
      />
    </div>
  );
};

export default CreateDataset;
