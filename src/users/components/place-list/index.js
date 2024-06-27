import React from "react";

import PlaceItem from "../place-item";
import Card from "../../../shared/components/ui-elements/card";
import "./place-list.css";

const PlaceList = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {items.map((item) => (
        <PlaceItem
          key={item.id}
          id={item.id}
          image={item.imageUrl}
          title={item.title}
          address={item.address}
          creatorId={item.creator}
          cordinates={item.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
