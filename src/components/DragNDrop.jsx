import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

//MUI
import { Typography } from "@mui/material";

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

export default function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <>
      <Typography className="dragndrop-title">
        Upload a cover image here
      </Typography>
      <div className="dragndrop">
        <FileUploader
          className="fileUploader"
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
    </>
  );
}
