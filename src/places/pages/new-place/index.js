import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/auth-context";
import Input from "../../../shared/components/ui-elements/form-elements/input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";

import Button from "../../../shared/components/ui-elements/form-elements/button";
import ImageUpload from "../../../shared/components/ui-elements/form-elements/image-upload";
import "./new-place.css";
import { useHttpClient } from "../../../shared/custom-hooks/http-hook";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";

const NewPlace = () => {
  const { userId } = useContext(AuthContext);
  const [isTitleValid, setIstitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isAddressValid, setAddressValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [titleData, setTitleData] = useState("");
  const [descriptionData, setDescriptionData] = useState("");
  const [addressData, setAddressData] = useState("");
  const [isFileValid, setIsFileValid] = useState(false);
  const [fileData, setFileData] = useState(null);

  const { loading, error, sendRequest, clearError } = useHttpClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (isTitleValid && isDescriptionValid && isAddressValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isTitleValid, isDescriptionValid, isAddressValid, isFileValid]);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Title data", titleData);
    console.log("description data", descriptionData);
    console.log("Address Data", addressData);
    const formData = new FormData();
    formData.append("title", titleData);
    formData.append("description", descriptionData);
    formData.append("address", addressData);
    formData.append("creator", userId);
    formData.append("image", fileData);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    sendRequest("addplace", formData)
      .then((res) => {
        console.log("add place response", res);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error while submiting new place", err);
      });
  };
  return (
    <main>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {loading && <LoadingSpinner asOverlay={true} />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          validators={[VALIDATOR_REQUIRE()]}
          onInput={setIstitleValid}
          setData={setTitleData}
          element="input"
          type="text"
          label="Title"
          id="title"
          errorText="Please enter a valid title"
        />

        <Input
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={setIsDescriptionValid}
          setData={setDescriptionData}
          element="textarea"
          type="textarea"
          label="Description"
          id="description"
          errorText="Please enter a valid description (min 5 character)"
        />
        <ImageUpload center onInput={setIsFileValid} setData={setFileData} />
        <Input
          validators={[VALIDATOR_REQUIRE()]}
          onInput={setAddressValid}
          setData={setAddressData}
          element="input"
          type="input"
          label="Address"
          id="address"
          errorText="Please enter a valid address"
        />

        <Button type="submit" disabled={!isFormValid}>
          ADD Place
        </Button>
      </form>
    </main>
  );
};

export default NewPlace;
