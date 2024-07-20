import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Card from "../../../shared/components/ui-elements/card";
import Input from "../../../shared/components/ui-elements/form-elements/input";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";

import { AuthContext } from "../../../contexts/auth-context";

import "./auth.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import Button from "../../../shared/components/ui-elements/form-elements/button";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailData, setEmalData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [nameData, setNameData] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (isLoginMode) {
      if (isEmailValid && isPasswordValid) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else {
      if (isNameValid && isEmailValid && isPasswordValid) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }, [isEmailValid, isPasswordValid, isLoginMode]);

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Email Data", emailData);
    console.log("Password Data", passwordData);

    if (isLoginMode) {
    } else {
      try {
        setIsloading(true);
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            userName: nameData,
            email: emailData,
            password: passwordData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", response);
        const responseData = await response.data;
        console.log("responseData", responseData);
        setIsloading(false);
        login();
      } catch (err) {
        console.log("error", err);
        setError(err.message || "Someting went wrong here please try again");
        setIsloading(false);
      }
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prev) => !prev);
  };

  const handleError = () => {
    setError(null);
  };
  return (
    <main>
      {error && <ErrorModal error={error} onClear={handleError} />}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverLay={true} />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              label="Name"
              type="text"
              element="input"
              onInput={setIsNameValid}
              setData={setNameData}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            element="input"
            onInput={setIsEmailValid}
            setData={setEmalData}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            element="input"
            onInput={setIsPasswordValid}
            setData={setPasswordData}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password"
          />
          <Button type="submit" disabled={!isFormValid}>
            {isLoginMode ? `Login` : `Sign Up`}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? `Switch to SignUp` : "Switch to Login"}
        </Button>
      </Card>
    </main>
  );
};

export default Auth;
