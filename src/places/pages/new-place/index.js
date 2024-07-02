import React from "react";
import Input from "../../../shared/components/ui-elements/form-elements/input";
import { VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import "./new-place.css";

const NewPlace = () => {
  return (
    <main>
      <form className="place-form">
        <Input
          validators={[VALIDATOR_REQUIRE()]}
          element="input"
          type="text"
          label="Title"
          id="title"
          errorText="Please enter a valid title"
        />
      </form>
    </main>
  );
};

export default NewPlace;
