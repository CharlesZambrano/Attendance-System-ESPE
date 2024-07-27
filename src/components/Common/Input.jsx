import React from "react";
import "./Input.scss";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  readOnly = false,
  required = false,
  placeholder = "",
  uppercase = false,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={(e) => {
        const newValue = uppercase
          ? e.target.value.toUpperCase()
          : e.target.value;
        onChange(newValue);
      }}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder || undefined}
      style={uppercase ? { textTransform: "uppercase" } : {}} // Aplicar estilo
    />
  </div>
);

export default Input;
