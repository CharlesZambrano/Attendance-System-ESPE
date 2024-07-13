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
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder || undefined}
    />
  </div>
);

export default Input;
