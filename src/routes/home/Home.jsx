import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

//Elements
import NewsCard from "../../components/NewsCard";

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className="home-box" sx={{ height: "auto" }}>
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </Box>
      </Container>
    </React.Fragment>
  );
}
