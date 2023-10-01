import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
//MUI
import { Button, TextField, Typography, Alert, Box } from "@mui/material";

//MUI animations
import Fade from "@mui/material/Fade";

//Elements
import DragNDrop from "./DragNDrop";
import Preview from "./Preview";
import SelectCategory from "./Select";
import LinearLoading from "./LinearLoading";

//Utils
import { basicPostRequest } from "../utils/requestOptions";

//Redux
import { useSelector } from "react-redux";

export default function CreateNewsForm() {
  //cím, kép, létrehozás dátuma, utolsó módosítás dátuma, szöveg , szerző
  const [coverImg, setCoverImg] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [otherImages, setOtherImages] = useState([]);
  const [title, setTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [createTemplate, setCreateTemplate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const previewRef = useRef();

  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  //date only for preview and scroll down functionality
  useEffect(() => {
    if (createTemplate === true) {
      let date = new Date(Date.now());
      date = date.toDateString();
      setDate(date);
    }
  }, [createTemplate]);

  const scrollDown = () => {
    setTimeout(() => {
      previewRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 1100);
  };

  const handleTemplateCreating = (e) => {
    e.preventDefault();
    setCreateTemplate(true);
    scrollDown();
    if (createTemplate === false) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && articleBody && coverImg) {
      if (!loggedIn) {
        setShowModal(true);
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("articleBody", articleBody);
      formData.append("coverImg", coverImg);
      formData.append("otherImages", otherImages);

      let reqOps = {
        method: "POST",
        body: formData,
      };

      const fetchDataWithCoverImg = async () => {
        await fetch("/api/v1/news/create", reqOps)
          .then((res) => res.json())
          .then((res) => console.log(res));
      };

      // const fetchDataWithOtherImg = asnyc()=>{
      //   await fetch('/api/v1/news/otherImg')
      // }

      try {
        fetchDataWithCoverImg();
      } catch (err) {
        console.error(err);
      }
    } else {
      //alert user that these fields are required
      setSeverity("warning");
      setAlertMessage(
        " Missing fields! Title, the body of the article and a cover image is needed to create a new article!"
      );
      setShowAlert(true);
    }
  };

  const coverImgChanges = (coverImg) => {
    setCoverImg(coverImg);
    const imageUrl = URL.createObjectURL(coverImg);
    setCoverImgUrl(imageUrl);
    setShowAlert(false);
  };

  const otherImgChanges = (otherImg) => {
    const newImages = [...otherImages];
    newImages.push(otherImg);
    setOtherImages(newImages);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setShowAlert(false);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleBodyChange = (e) => {
    setArticleBody(e.target.value);
    setShowAlert(false);
  };

  return (
    <div className="form-preview-container">
      <div className="div-container">
        <Form className="createnews-form" encType="multipart/form-data">
          <Typography
            sx={{
              fontFamily: "Geologica",
              fontWeight: "400",
              fontSize: "22px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            Create a new article
          </Typography>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <TextField
              className="textfield"
              onChange={handleTitleChange}
              sx={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Title of article"
              multiline
              maxRows={1}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <SelectCategory handleCategoryChange={handleCategoryChange} />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <TextField
              onChange={handleBodyChange}
              sx={{ width: "100%" }}
              id="outlined-multiline-static"
              label="Article body"
              multiline
              minRows={10}
              maxRows={500}
              value={articleBody}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 mt-3 dragndrop-container"
            controlId="formBasicEmail"
          >
            <DragNDrop
              coverImgChanges={coverImgChanges}
              otherImgChanges={otherImgChanges}
            />
          </Form.Group>
          {showAlert && (
            <Box sx={{ display: "flex" }}>
              <Fade in={showAlert}>
                <Alert severity={severity}>{alertMessage}</Alert>
              </Fade>
            </Box>
          )}

          <Button
            onClick={handleTemplateCreating}
            className="submit-btn"
            type="submit"
          >
            {loading ? "Creating template..." : "Create template"}
          </Button>
          {loading && <LinearLoading />}
        </Form>
      </div>
      {createTemplate && !loading && (
        <div className="div-container">
          <Preview
            title={title}
            articleBody={articleBody}
            coverImgUrl={coverImgUrl}
            date={date}
            category={category}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
      <div ref={previewRef}></div>
    </div>
  );
}
