import React, { useEffect, useState } from "react";

//MUI
import { Typography, Grid, Alert } from "@mui/material";

//Elements
import NewsCard from "../../components/NewsCard";
import { Button } from "react-bootstrap";

export default function ManageNews() {
  const [mynews, setMynews] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  //initial fetch for mynews
  useEffect(() => {
    const fetchMyNewsData = async () => {
      const jwt = localStorage.getItem("jwt");
      const reqOps = {
        method: "GET",
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      };
      await fetch("/api/v1/news/getmynews", reqOps)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            setMynews(res.news);
          }
        });
    };
    fetchMyNewsData();
  }, []);

  //handling alert to only show for a few seconds and scroll to alert
  useEffect(() => {
    if (showAlert === true) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  const handleDeleteNews = async (id) => {
    const fetchData = async () => {
      const jwt = localStorage.getItem("jwt");
      const reqOps = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      };
      await fetch(`/api/v1/news/delete/${id}`, reqOps)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            setMynews((prevNews) => prevNews.filter((item) => item._id !== id));
            setShowAlert(true);
            setAlertMessage("Successfully deleted an item!");
          }
        });
    };
    fetchData();
  };

  return (
    <div className="managenews-container">
      <Typography sx={{ fontFamily: "Geologica", fontSize: "30px", m: 2 }}>
        Manage my news
      </Typography>
      <hr />

      {showAlert && (
        <Alert sx={{ m: 2 }} severity="success">
          {alertMessage}
        </Alert>
      )}

      <Grid container className="card-box" spacing={2}>
        {mynews &&
          mynews.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <div className="news-buttons-container">
                <NewsCard
                  title={item.title}
                  articleBody={item.articleBody}
                  coverImgUrl={item.coverImg}
                  date={item.publicationDate}
                  category={item.category}
                  author={item.author}
                />
                <div className="manage-buttons">
                  <Button className="manage-btn">MANAGE</Button>
                  <Button
                    onClick={() => handleDeleteNews(item._id)}
                    className="delete-btn"
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
