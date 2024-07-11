import React from "react";
import "./Button.scss";

const Button = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {children}
  </button>
);

export default Button;
