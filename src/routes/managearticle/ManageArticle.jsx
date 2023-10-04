import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//MUI
import { Button, TextField, Typography, Alert, Box } from "@mui/material";

//MUI animations
import Fade from "@mui/material/Fade";

//Bootstrap
import Form from "react-bootstrap/Form";

//Elements
import DragNDrop from "../../components/DragNDrop";
import Preview from "../../components/Preview";
import SelectCategory from "../../components/Select";
import LinearLoading from "../../components/LinearLoading";

//Utils
import { getItemFromLocalStorage } from "../../utils/localStorage";
//Redux
import { useSelector } from "react-redux";

//Elements
export default function ManageArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [title, setTitle] = useState();
  const [articleBody, setArticleBody] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [createTemplate, setCreateTemplate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPostNews, setLoadingPostNews] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/signin?protected=true");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const reqOps = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`/api/v1/news/get/${id}`, reqOps)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            console.log(res);
            const {
              title,
              category,
              articleBody,
              coverImg,
              author,
              publicationDate,
            } = res.article;
            setTitle(title);
            setCategory(category);
            setArticleBody(articleBody);
            setCoverImgUrl(coverImg);
            setAuthor(author);
            setDate(publicationDate);
          }
        });
    };
    fetchData();
  }, []);
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
      //   previewRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 1100);
  };

  const loadingPostNewsFunction = () => {
    setLoadingPostNews(true);
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

  const coverImgChanges = (coverImg) => {
    setCoverImg(coverImg);
    const imageUrl = URL.createObjectURL(coverImg);
    setCoverImgUrl(imageUrl);
    setShowAlert(false);
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

  const handleSubmit = () => {
    //Empty because now handleUpdate handles the fetch
  };

  const handleUpdate = () => {
    if (title && articleBody && category) {
      const jwt = getItemFromLocalStorage("jwt");
      console.log(title, articleBody, category + " inside handleUpdate");
      const reqOps = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ title, articleBody, category }),
      };

      const fetchUpdate = async () => {
        await fetch(`/api/v1/news/update/${id}`, reqOps)
          .then((res) => res.json())
          .then((res) => {
            setLoadingPostNews(false);
            if (res.status === "success") {
              //successfull news update navigate to news
              navigate("/managenews");
            }
          });
      };

      try {
        fetchUpdate();
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

  return (
    <div className="managearticle-container">
      <div className="createnews-form">
        <Form encType="multipart/form-data">
          <Typography
            sx={{
              fontFamily: "Geologica",
              fontWeight: "400",
              fontSize: "22px",
              textAlign: "center",
              margin: "10px",
            }}
          >
            Update the article
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
              InputLabelProps={{ shrink: true }}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
            <SelectCategory
              handleCategoryChange={handleCategoryChange}
              initialValue={category}
            />
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
          ></Button>
          {loading && <LinearLoading />}
        </Form>
      </div>

      <div className="div-container">
        <Preview
          title={title}
          articleBody={articleBody}
          coverImgUrl={coverImgUrl}
          date={date}
          category={category}
          handleSubmit={handleSubmit}
          loadingPostNewsFunction={loadingPostNewsFunction}
          loadingPostNews={loadingPostNews}
          showBtn={false}
          author={author}
        />
      </div>
      <Button onClick={handleUpdate} className="basic-btn">
        UPDATE NEWS
      </Button>
    </div>
  );
}
