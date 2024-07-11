import React from "react";
import "./ProgressIndicator.scss";

const ProgressIndicator = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="progress-indicator">
        <div className="loader"></div>
      </div>
    )
  );
};

export default ProgressIndicator;
