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
  { label: "Sin Accesorios", code: "NO_ACC" },
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

  const expandedAccessories = selectedAccessoryCodes.flatMap((code) => {
    switch (code) {
      case "MAC_MAB":
        return ["MAC", "MAB"];
      case "REC_SUE":
        return ["REC", "SUE"];
      case "ALT_BAJ":
        return ["ALT", "BAJ"];
      default:
        return [code];
    }
  });

  const selectedAccessories = accessories.filter((acc) =>
    expandedAccessories.includes(acc.code)
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
    const accessoryCode =
      selectedAccessories[Math.floor(currentStep / expressions.length)].code;
    const expressionCode = expressions[currentStep % expressions.length].code;
    const currentDate = new Date().toISOString().split("T")[0];

    const newImages = Array.from({ length: 3 }, (_, i) => ({
      src: imageSrc,
      title: `${sanitizedDatasetName}_${accessoryCode}_${expressionCode}_${
        capturedImages.length + i + 1
      }`,
      date: currentDate,
    }));

    setCapturedImages([...capturedImages, ...newImages]);

    setCurrentStep((prevStep) => prevStep + 1);
    setShowCameraModal(false);
    console.log("Image captured and saved:", newImages);
  };

  const getCurrentInstruction = () => {
    const accessoryIndex = Math.floor(currentStep / expressions.length);
    const expressionIndex = currentStep % expressions.length;
    if (expressions[expressionIndex] && selectedAccessories[accessoryIndex]) {
      return `${selectedAccessories[accessoryIndex].label} ${expressions[expressionIndex].label}`;
    }
    return null; // Retornar null cuando todas las capturas están completas
  };

  const handleImageDelete = (index) => {
    const deletedTitle = capturedImages[index].title;
    const [dataset, accessoryCode, expressionCode] = deletedTitle
      .split("_")
      .slice(0, 3);

    const newImages = capturedImages.filter(
      (image) =>
        !image.title.startsWith(`${dataset}_${accessoryCode}_${expressionCode}`)
    );

    setCapturedImages(newImages);
    setCurrentStep((prevStep) => prevStep - 1);
    console.log("Image deleted:", deletedTitle);
  };

  const validateDataset = () => {
    for (const accessory of selectedAccessories) {
      for (const expression of expressions) {
        const matchingImages = capturedImages.filter((image) =>
          image.title.includes(`_${accessory.code}_${expression.code}_`)
        );

        if (matchingImages.length < 3) {
          return `Faltan imágenes para ${accessory.label} ${expression.label}`;
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
      console.log("Dataset guardado exitosamente");
    }
  };

  const handleValidationClose = () => {
    setValidationMessage("");
  };

  const handleCaptureButtonClick = () => {
    const instruction = getCurrentInstruction();
    if (instruction) {
      setShowCameraModal(true);
    } else {
      setValidationMessage("Captura del Dataset completada, guardelo");
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
        <Button onClick={handleCaptureButtonClick}>Capturar Foto</Button>
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
        onClose={handleValidationClose}
      />
    </div>
  );
};

export default CreateDataset;
