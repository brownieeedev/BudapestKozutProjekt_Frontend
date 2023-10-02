import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import { Container, Typography, Box } from "@mui/material";

//Redux
import { useSelector } from "react-redux";

//Elements
import CreateNewsForm from "../../components/CreateNewsForm";

export default function CreateNews() {
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/signin?protected=true");
    }
  }, []);
  return (
    <>
      <Container className="createnews-container" sx={{ textAlign: "left" }}>
        <CreateNewsForm />
      </Container>
    </>
  );
}
