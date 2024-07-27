import React, { useEffect, useState } from "react";
import PlaceList from "../../components/place-list";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/custom-hooks/http-hook";
import LoadingSpinner from "../../../shared/components/ui-elements/loading-spinner";
import ErrorModal from "../../../shared/components/ui-elements/error-modal";
const UserPlaces = () => {
  const userId = useParams().userId;
  const [loadedPlace, setLoadedPlace] = useState([]);
  const { loading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    sendRequest("getplacebyuserid", null, userId)
      .then((res) => {
        console.log("loadedPlace", res);
        setLoadedPlace(res.places);
      })
      .catch((err) => {
        console.log("err while getting places by user", err);
      });
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlace((prev) => {
      return prev.filter((item) => item["_id"] !== deletedPlaceId);
    });
  };

  return (
    <main>
      {error && <ErrorModal onClear={clearError} />}
      {loading ? (
        <LoadingSpinner asOverlay={true} />
      ) : (
        <PlaceList items={loadedPlace} onDeletePlaces={placeDeleteHandler} />
      )}
    </main>
  );
};

export default UserPlaces;
