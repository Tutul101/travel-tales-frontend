import React, { useState, useContext } from "react";

import { AuthContext } from "../../../contexts/auth-context";
import Card from "../../../shared/components/ui-elements/card";
import Button from "../../../shared/components/ui-elements/form-elements/button";
import Modal from "../../../shared/components/ui-elements/modal";

import "./place-item.css";
import { useHttpClient } from "../../../shared/custom-hooks/http-hook";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";

const PlaceItem = ({ image, title, address, description, id, onDelete }) => {
  const { isLoggedin } = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const { loading, error, sendRequest, clearError } = useHttpClient();
  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHHandler = () => {
    setConfirmModal(true);
  };

  const cancelDelteWarningHandler = () => {
    setConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("Deleting.....");
    setConfirmModal(false);
    sendRequest("deleteplace", null, id)
      .then((res) => {
        console.log(res);
        onDelete(id);
      })
      .catch((err) => console.log("Error while deleting places"));
  };

  return (
    <>
      {error && <ErrorModal onClear={clearError} />}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}>
        <div className="map-container">
          <h2>THE MAP</h2>
        </div>
      </Modal>
      <Modal
        show={confirmModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={cancelDelteWarningHandler}>Cancel</Button>
            <Button onClick={confirmDeleteHandler}>Delete</Button>
          </>
        }></Modal>
      <li className="place-item">
        {loading && <LoadingSpinner asOverlay={true} />}
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
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {isLoggedin && (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button danger onClick={showDeleteWarningHHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
