import * as React from "react";
import { Img } from "react-image";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//MUI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

//Redux
import { useSelector } from "react-redux";

//Colors for categories
function getBackgroundColor(category) {
  switch (category) {
    case "Science":
      return "rgb(105,105,221)";
    case "Economics":
      return "rgb(29, 70, 31)";
    case "Sports":
      return "rgb(85, 213, 230)";
    case "Fashion":
      return "yellow";
    case "Food":
      return "rgb(184, 28, 74)";
    default:
      return "white";
  }
}

export const ImgComponent = ({ coverImgUrl }) => {
  return (
    <Img
      className="responsive"
      src={coverImgUrl}
      alt="news img"
      loader={
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only"></span>
        </div>
      }
    />
  );
};

export default function NewsCard({
  title,
  date,
  coverImgUrl,
  articleBody,
  category,
  author,
}) {
  const [shortenedBody, setShortenedBody] = useState("");
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const googleUser = useSelector((state) => state.authReducer.googleUser);

  const [pubDate, setPubDate] = useState();

  useEffect(() => {
    if (date) {
      let newDate = new Date(date);
      newDate = newDate.toDateString();
      setPubDate(newDate);
    }
  }, []);

  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    let path = window.location.href.split("/").slice(-1).join("");
    setCurrentUrl(path);
  }, []);

  useEffect(() => {
    if (articleBody && articleBody.length > 0) {
      let stringArr = articleBody.split(" ");
      stringArr = stringArr.slice(0, 20);
      let newBody = stringArr.join(" ");
      newBody = newBody + " ... READ MORE";
      setShortenedBody(newBody);
    }
  }, [articleBody]);

  return (
    <Card
      className="newscard"
      sx={{
        minWidth: "340px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader className="card-header" title={title} subheader={pubDate} />
      <div className="card-media">
        <ImgComponent coverImgUrl={coverImgUrl} />
      </div>

      <div className="author-container flex-space">
        <div className="category-container flex">
          <span
            style={{ backgroundColor: getBackgroundColor(category) }}
          ></span>
          <Typography
            sx={{
              fontSize: "13px",
              fontFamily: "Geologica",
              fontWeight: 300,
              marginTop: "5px",
            }}
          >
            {category}
          </Typography>
        </div>
        {loggedIn && currentUrl === "createnews" ? (
          <Typography
            sx={{
              fontSize: "11px",
              fontFamily: "Geologica",
              fontWeight: 300,
              marginTop: "5px",
            }}
          >
            written by: {googleUser.name}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: "11px",
              fontFamily: "Geologica",
              fontWeight: 300,
              marginTop: "5px",
            }}
          >
            written by: {author}
          </Typography>
        )}
      </div>

      <CardContent className="card-footer">
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ overflow: "auto" }}
        >
          {shortenedBody}
        </Typography>
      </CardContent>
    </Card>
  );
}
