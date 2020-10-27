import React from 'react';
import './Button.css';

const Button = ({ buttonText, clickHandler, disabled }) => (
  <button
    className="button"
    disabled={disabled}
    onClick={clickHandler}
  >
    {buttonText}
  </button>
);

export default Button;