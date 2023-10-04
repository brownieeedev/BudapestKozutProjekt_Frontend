import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

//MUI
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

export default function DragNDrop({ coverImgChanges, otherImgChanges }) {
  const [showCoverAlert, setShowCoverAlert] = useState(false);

  const handleCoverChange = (coverImg) => {
    coverImgChanges(coverImg);
    setShowCoverAlert(true);
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
    </>
  );
}
