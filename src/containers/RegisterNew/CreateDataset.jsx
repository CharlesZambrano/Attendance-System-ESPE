import { saveAs } from "file-saver";
import JSZip from "jszip";
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
  const [annotations, setAnnotations] = useState({});
  const { state } = useLocation();
  const { datasetName, accessories: selectedAccessoryCodes } = state || {
    datasetName: "",
    accessories: [],
  };
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

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

  const handleCaptureImage = (imageSrc, imageAnnotations) => {
    const sanitizedDatasetName = datasetName.replace(/ /g, "_");
    const accessoryCode =
      selectedAccessories[Math.floor(currentStep / expressions.length)].code;
    const expressionCode = expressions[currentStep % expressions.length].code;
    const currentDate = new Date().toISOString().split("T")[0];

    const groupId = `${sanitizedDatasetName}_${accessoryCode}_${expressionCode}_${new Date().getTime()}`;

    const newImages = Array.from({ length: 3 }, (_, i) => ({
      src: imageSrc,
      title: `${sanitizedDatasetName}_${accessoryCode}_${expressionCode}_${
        capturedImages.length + i + 1
      }`,
      date: currentDate,
      groupId,
      width: 0,
      height: 0,
    }));

    // Load the image to get its natural width and height
    const img = new Image();
    img.onload = () => {
      newImages.forEach((image) => {
        image.width = img.naturalWidth;
        image.height = img.naturalHeight;
      });
      setCapturedImages([...capturedImages, ...newImages]);
      setAnnotations((prevAnnotations) => ({
        ...prevAnnotations,
        [newImages[0].title]: imageAnnotations,
      }));
      setCurrentStep((prevStep) => prevStep + 1);
      setShowCameraModal(false);
      console.log("Image captured and saved:", newImages);
    };
    img.src = imageSrc;
  };

  const getCurrentInstruction = () => {
    const accessoryIndex = Math.floor(currentStep / expressions.length);
    const expressionIndex = currentStep % expressions.length;
    if (expressions[expressionIndex] && selectedAccessories[accessoryIndex]) {
      return `${selectedAccessories[accessoryIndex].label} ${expressions[expressionIndex].label}`;
    }
    return null;
  };

  const getNextMissingStep = () => {
    for (let i = 0; i < selectedAccessories.length; i++) {
      for (let j = 0; j < expressions.length; j++) {
        const accessoryCode = selectedAccessories[i].code;
        const expressionCode = expressions[j].code;
        const matchingImages = capturedImages.filter((image) =>
          image.title.includes(`_${accessoryCode}_${expressionCode}_`)
        );
        if (matchingImages.length < 3) {
          return i * expressions.length + j;
        }
      }
    }
    return null;
  };

  const handleImageDelete = (index) => {
    const groupIdToDelete = capturedImages[index].groupId;
    const newImages = capturedImages.filter(
      (image) => image.groupId !== groupIdToDelete
    );

    setCapturedImages(newImages);
    const nextMissingStep = getNextMissingStep();
    if (nextMissingStep !== null) {
      setCurrentStep(nextMissingStep);
    }
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

  const handleSaveDataset = async () => {
    const validationError = validateDataset();
    if (validationError) {
      setValidationMessage(validationError);
    } else {
      setValidationMessage("Captura del Dataset completada, guardelo");
      console.log("Dataset guardado exitosamente");

      const zip = new JSZip();
      const imgFolder = zip.folder("JPEGImages");
      const annotationFolder = zip.folder("Annotations");

      capturedImages.forEach((image, index) => {
        const imgData = image.src.replace(
          /^data:image\/(png|jpeg);base64,/,
          ""
        );
        imgFolder.file(`${image.title}.jpeg`, imgData, { base64: true });
        const annotation = annotations[image.title] || [];
        const xmlContent = generatePascalVOCXML(image, annotation);
        annotationFolder.file(`${image.title}.xml`, xmlContent);
      });

      zip.file("labels.txt", datasetName);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${datasetName}.zip`);
    }
  };

  const handleValidationClose = () => {
    setValidationMessage("");
  };

  const handleCaptureButtonClick = () => {
    const nextMissingStep = getNextMissingStep();
    if (nextMissingStep !== null) {
      setCurrentStep(nextMissingStep);
      setShowCameraModal(true);
    } else {
      setValidationMessage("Captura del Dataset completada, guardelo");
    }
  };

  const generatePascalVOCXML = (image, annotations) => {
    const xmlContent = `
    <annotation>
      <folder>JPEGImages</folder>
      <filename>${image.title}.jpeg</filename>
      <path>${image.src}</path>
      <source>
        <database>Unknown</database>
      </source>
      <size>
        <width>${image.width}</width>
        <height>${image.height}</height>
        <depth>3</depth>
      </size>
      <segmented>0</segmented>
      ${annotations
        .filter((annotation) => annotation.bbox)
        .map(
          (annotation) => `
        <object>
          <name>${datasetName}</name>
          <pose>Unspecified</pose>
          <truncated>0</truncated>
          <difficult>0</difficult>
          <bndbox>
            <xmin>${annotation.bbox.xmin}</xmin>
            <ymin>${annotation.bbox.ymin}</ymin>
            <xmax>${annotation.bbox.xmax}</xmax>
            <ymax>${annotation.bbox.ymax}</ymax>
          </bndbox>
        </object>`
        )
        .join("")}
    </annotation>
    `;
    return xmlContent.trim();
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
          onImageClick={(index) => setCurrentImageIndex(index)}
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
        datasetName={datasetName}
      />
      <ValidationModal
        show={validationMessage !== ""}
        message={validationMessage}
        onClose={handleValidationClose}
      />
      {currentImageIndex !== null && (
        <div className="annotation-container">
          <img
            id="capturedImage"
            src={capturedImages[currentImageIndex].src}
            alt="Captured"
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateDataset;
