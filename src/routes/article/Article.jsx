import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Img } from "react-image";

//MUI
import { Typography, Box } from "@mui/material";

//Elements
import { ImgComponent } from "../../components/NewsCard";

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

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const [date, setDate] = useState();

  //setting date to shortDate
  useEffect(() => {
    let date = new Date(Date.now());
    date = date.toDateString();
    setDate(date);
  }, [article]);

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
            setArticle(res.article);
          }
        });
    };
    fetchData();
  }, []);
  return (
    <div className="article-container">
      <Typography sx={{ fontFamily: "Geologica", fontSize: "30px", m: 2 }}>
        {article.title}
      </Typography>
      <hr />
      <Box sx={{ m: 6, mt: 0, mb: 0 }} className="flex-start">
        {date}
      </Box>
      <Box sx={{ m: 6, mt: 1, mb: 0 }} className="img-container">
        <ImgComponent coverImgUrl={article.coverImg} />
      </Box>
      <Box
        sx={{ m: 6, mt: 1, mb: 0, display: "flex" }}
        className="category-container"
      >
        <div className="flex">
          <span
            style={{ backgroundColor: getBackgroundColor(article.category) }}
          ></span>
          <Typography
            sx={{
              fontSize: "13px",
              fontFamily: "Geologica",
              fontWeight: 300,
              marginTop: "5px",
            }}
          >
            {article.category}
          </Typography>
        </div>

        <Typography
          sx={{
            fontSize: "11px",
            fontFamily: "Geologica",
            fontWeight: 300,
            marginTop: "5px",
          }}
        >
          written by: {article.author}
        </Typography>
      </Box>
      <Box
        sx={{ m: 6, mt: 1, textAlign: "justify" }}
        className="article-container"
      >
        {article.articleBody}
      </Box>
    </div>
  );
}
