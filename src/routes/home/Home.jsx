import * as React from "react";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

//MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Grid, Button } from "@mui/material";

//Elements
import NewsCard from "../../components/NewsCard";
import DropUp from "../../components/DropUp";

//Redux
import { useSelector } from "react-redux";

export default function Home() {
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const location = useLocation();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const queryParams = Object.fromEntries(urlSearchParams.entries());

    if (queryParams.newscreated === "true") {
      setShowAlert(true);
      setAlertMessage("Successfully created news!");
    } else {
      setShowAlert(false);
    }
  }, [location.search]);

  useEffect(() => {
    if (showAlert === true) {
      setTimeout(() => {
        setShowAlert(false);
      }, 4500);
    }
  }, [showAlert]);

  useEffect(() => {
    const fetchData = async () => {
      const reqOps = {
        method: "GET",
      };
      await fetch("/api/v1/news/getnews", reqOps)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            setNews(res.news);
          }
        });
    };
    fetchData();
  }, []);

  const handleArticleClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="home-container" maxWidth="lg">
        {showAlert && (
          <Alert sx={{ m: 3 }} severity="success">
            {alertMessage}
          </Alert>
        )}
        <Grid container className="home-grid" spacing={2}>
          {news.map((item) => (
            <Grid
              onClick={() => handleArticleClick(item._id)}
              item
              xs={12}
              sm={6}
              md={4}
              key={item._id}
            >
              <NewsCard
                title={item.title}
                articleBody={item.articleBody}
                coverImgUrl={item.coverImg[0]}
                category={item.category}
                date={item.publicationDate}
                author={item.author}
              />
            </Grid>
          ))}
        </Grid>

        {loggedIn && <DropUp />}
      </Container>
    </React.Fragment>
  );
}
