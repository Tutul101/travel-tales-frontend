import React, { useEffect, useState } from "react";
import { validate } from "../../../../utils/validators";

import "./input.css";

const Input = ({
  validators,
  onInput,
  setData,
  label,
  value = "",
  id,
  type,
  errorText,
  ...props
}) => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    onInput(isValid);
  }, [onInput, enteredValue, isValid]);

  useEffect(() => {
    if (value !== "") {
      setIsValid(value, validators);
      setData(value);
    }
  }, [value]);
  const changeHandler = (e) => {
    setEnteredValue(e.target.value);
    setIsValid(validate(e.target.value, validators));
    setData(e.target.value);
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
