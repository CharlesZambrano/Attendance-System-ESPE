import React from "react";
import "./Button.scss";

const Button = ({ children, onClick, type = "button" }) => (
  <button className="custom-button" onClick={onClick} type={type}>
    {children}
  </button>
);

export default Button;
