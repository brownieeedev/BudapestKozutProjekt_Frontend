import React from "react";

//MUI
import { Container, Typography, Box } from "@mui/material";

//Elements
import CreateNewsForm from "../../components/CreateNewsForm";

export default function CreateNews() {
  return (
    <>
      <Container className="createnews-container" sx={{ textAlign: "left" }}>
        <CreateNewsForm />
      </Container>
    </>
  );
}
