import React, { useState, useRef, useEffect } from "react";

import Button from "../button";
import "./image-upload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const filePickerRef = useRef(null);

  useEffect(() => {
    if (file === null) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedFile = (event) => {
    let pickedFiles = null;
    let fileisvalid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFiles = event.target.files[0];
      setFile(pickedFiles);
      console.log("picked files", pickedFiles);
      fileisvalid = true;
      setIsValid(true);
    } else {
      fileisvalid = false;
      setIsValid(false);
    }
    props.onInput(fileisvalid);
    props.setData(pickedFiles);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedFile}
      />
      <div className={`image-upload ${props.center && `center`}`}>
        <div className="image-upload__preview">
          {previewUrl !== "" ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Please pick an image</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
