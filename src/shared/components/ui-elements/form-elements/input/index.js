import React, { useState } from "react";

import "./input.css";

const Input = ({ label, id, type, errorText, ...props }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const changeHandler = (e) => {
    setEnteredValue(enteredValue);
    if (enteredValue !== "") {
      setIsValid(true);
    }
  };
  const element =
    type === "input" ? (
      <input id={id} {...props} onChange={changeHandler} />
    ) : (
      <textarea id={id} {...props} onChange={changeHandler} />
    );
  return (
    <div className={`form-control ${!isValid && `form-control--invalid`}`}>
      <label htmlFor={id}>{label}</label>
      {element}
      {!isValid && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
