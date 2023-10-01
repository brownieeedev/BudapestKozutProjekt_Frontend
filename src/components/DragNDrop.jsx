import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

//MUI
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

export default function DragNDrop({ coverImgChanges, otherImgChanges }) {
  const [showCoverAlert, setShowCoverAlert] = useState(false);
  const [showOtherImageAlert, setShowOtherImageAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCoverChange = (coverImg) => {
    console.log(`coverImg inside handleCoverChange ${coverImg}`);
    coverImgChanges(coverImg);
    setShowCoverAlert(true);
  };

  const handleOtherImagesChange = (otherImages) => {
    otherImgChanges(otherImages);
    setShowOtherImageAlert(true);
  };

  return (
    <>
      <div className="dragndrop">
        <Typography className="dragndrop-title">
          Upload a <strong>cover image</strong> here
        </Typography>
        <FileUploader
          multiple={false}
          className="fileUploader"
          handleChange={handleCoverChange}
          name="coverImg"
          types={fileTypes}
          label="Upload or drop 1 cover image here"
          maxSize={0.5}
        />
        {showCoverAlert && (
          <Alert severity="success" className="success-icon" />
        )}
      </div>
      <hr />
      <div className="dragndrop">
        <Typography className="dragndrop-title">
          Upload <strong>other images</strong> here
        </Typography>
        <FileUploader
          multiple={true}
          className="fileUploader"
          handleChange={handleOtherImagesChange}
          name="otherImg"
          types={fileTypes}
          label="Upload multiple images here if needed"
          maxSize={0.5}
        />
        {showOtherImageAlert && (
          <Alert severity="success" className="success-icon" />
        )}
      </div>
    </>
  );
}