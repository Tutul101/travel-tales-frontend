import React, { useState } from "react";
import { validate } from "../../../../utils/validators";

import "./input.css";

const Input = ({ validators, label, id, type, errorText, ...props }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const changeHandler = (e) => {
    setEnteredValue(e.target.value);
    setIsValid(validate(e.target.value, validators));
    console.log("validate result", validate(e.target.value, validators));
  };

  const touchHandler = () => {
    setIsTouched(true);
  };

  const element =
    type === "input" ? (
      <input
        id={id}
        {...props}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={enteredValue}
      />
    ) : (
      <textarea
        id={id}
        {...props}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={enteredValue}
      />
    );
  return (
    <div
      className={`form-control ${
        !isValid && isTouched && `form-control--invalid`
      }`}>
      <label htmlFor={id}>{label}</label>
      {element}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
