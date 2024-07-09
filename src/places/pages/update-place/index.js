import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../shared/components/ui-elements/form-elements/input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import Button from "../../../shared/components/ui-elements/form-elements/button";

import "./update-place.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: "40.7484445",
      lng: "-73.9882393",
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, USA",
    location: {
      lat: "40.7484445",
      lng: "-73.9882393",
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  const [isTitleValid, setIstitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isAddressValid, setAddressValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [titleData, setTitleData] = useState("");
  const [descriptionData, setDescriptionData] = useState("");
  const [addressData, setAddressData] = useState("");

  useEffect(() => {
    if (isTitleValid && isDescriptionValid && isAddressValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isTitleValid, isDescriptionValid, isAddressValid]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  const placeUpdateHandler = (e) => {
    e.preventDefault();
    console.log("Title data", titleData);
    console.log("description data", descriptionData);
    console.log("Address Data", addressData);
  };

  return (
    <main>
      <form className="place-form" onSubmit={placeUpdateHandler}>
        <Input
          id="title"
          type="text"
          element="input"
          label="Title"
          value={identifiedPlace.title}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={setIstitleValid}
          setData={setTitleData}
          errorText="Please enter a valid title"
        />
        <Input
          id="description"
          type="textarea"
          element="textarea"
          label="Description"
          value={identifiedPlace.description}
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={setIsDescriptionValid}
          setData={setDescriptionData}
          errorText="Please enter a valid description (min 5 character)"
        />
        <Input
          id="address"
          type="text"
          element="input"
          label="Address"
          value={identifiedPlace.address}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={setAddressValid}
          setData={setAddressData}
          errorText="Please enter a valid address"
        />
        <Button type="submit" disabled={!isFormValid}>
          Update Place
        </Button>
      </form>
    </main>
  );
};

export default UpdatePlace;
