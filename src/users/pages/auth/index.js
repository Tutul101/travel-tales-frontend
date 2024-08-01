import React, { useEffect, useState, useContext } from "react";

import Card from "../../../shared/components/ui-elements/card";
import Input from "../../../shared/components/ui-elements/form-elements/input";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";
import ImageUpload from "../../../shared/components/ui-elements/form-elements/image-upload";

import { AuthContext } from "../../../contexts/auth-context";

import "./auth.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import Button from "../../../shared/components/ui-elements/form-elements/button";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";
import { useHttpClient } from "../../../shared/custom-hooks/http-hook";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isFileValid, setIsFileValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailData, setEmalData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [nameData, setNameData] = useState("");
  const [fileData, setFileData] = useState(null);
  const { login } = useContext(AuthContext);

  const { loading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    if (isLoginMode) {
      if (isEmailValid && isPasswordValid) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else {
      if (isNameValid && isEmailValid && isPasswordValid && isFileValid) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }, [isNameValid, isEmailValid, isPasswordValid, isFileValid, isLoginMode]);

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const response = await sendRequest("login", {
          email: emailData,
          password: passwordData,
        });
        console.log("login response", response);
        const userId = response.user.userId;
        const jwtToken = response.user.token;
        login(userId, jwtToken);
      } catch (err) {
        console.log("Error while login", err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("userName", nameData);
        formData.append("email", emailData);
        formData.append("password", passwordData);
        formData.append("image", fileData);

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        const response = await sendRequest("signup", formData);
        console.log("response", response);
        const userId = response.user.userId;
        const jwtToken = response.user.token;
        login(userId, jwtToken);
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <main>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Card className="authentication">
        {loading && <LoadingSpinner asOverLay={true} />}
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
          {!isLoginMode && (
            <ImageUpload
              center
              onInput={setIsFileValid}
              setData={setFileData}
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
