import React from "react";

import Card from "../../../shared/components/ui-elements/card";
import Button from "../../../shared/components/ui-elements/form-elements/button";

import "./place-item.css";

const PlaceItem = ({ image, title, address, description, id }) => {
  return (
    <li className="place-item">
      <Card className="place-item__content">
        <div className="place-item__image">
          <img src={image} alt={title} />
        </div>
        <div className="place-item__info">
          <h2>{title}</h2>
          <h3>{address}</h3>
          <p>{description}</p>
        </div>
        <div className="place-item__actions">
          <Button inverse>View On Map</Button>
          <Button to={`/places/${id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
};

export default PlaceItem;
