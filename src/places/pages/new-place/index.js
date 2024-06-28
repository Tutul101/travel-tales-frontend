import React from "react";

import "./new-place.css";
import Input from "../../../shared/components/ui-elements/form-elements/input";

const NewPlace = () => {
  return (
    <main>
      <form className="place-form">
        <Input element="input" type="text" label="Title" id="title" />
      </form>
    </main>
  );
};

export default NewPlace;
