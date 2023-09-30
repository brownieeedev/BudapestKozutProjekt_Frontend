import React from "react";

//MUI
import { Container } from "@mui/material";

//Elements
import CreateNewsForm from "../../components/CreateNewsForm";

export default function CreateNews() {
  return (
    <Container
      className="createnews-container"
      maxWidth="sm"
      sx={{ textAlign: "left" }}
    >
      <CreateNewsForm />
    </Container>
  );
}
