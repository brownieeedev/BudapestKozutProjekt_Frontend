import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

//Elements
import NewsCard from "../../components/NewsCard";
import DropUp from "../../components/DropUp";

//Redux
import { useSelector } from "react-redux";

export default function Home() {
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
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
        {loggedIn && <DropUp />}
      </Container>
    </React.Fragment>
  );
}
