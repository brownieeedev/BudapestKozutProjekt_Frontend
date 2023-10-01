import React from "react";

//MUI
import { Container, Typography, Box, Button } from "@mui/material";

//Bootstrap
import { OverlayTrigger, Tooltip } from "react-bootstrap";

//Elements
import NewsCard from "./NewsCard";

const tooltip = (
  <Tooltip id="tooltip">
    This preview shows how the news going to look like in the news page! Post
    the article for effects to take place!
  </Tooltip>
);

export default function Preview({
  title,
  articleBody,
  coverImgUrl,
  date,
  category,
  handleSubmit,
}) {
  return (
    <Container className="preview-container">
      <Typography className="preview-title">
        Preview in the news page
        <OverlayTrigger placement="right" overlay={tooltip}>
          <i className="fa-solid fa-circle-info"></i>
        </OverlayTrigger>
      </Typography>
      <Box sx={{ maxWidth: "400px", margin: "auto" }}>
        <NewsCard
          title={title}
          articleBody={articleBody}
          coverImgUrl={coverImgUrl}
          date={date}
          category={category}
        />
      </Box>
      <Box>
        <Button onClick={handleSubmit} className="basic-btn">
          POST NEWS
        </Button>
        {/* <Typography className="preview-title">Preview article</Typography> */}
      </Box>
    </Container>
  );
}
