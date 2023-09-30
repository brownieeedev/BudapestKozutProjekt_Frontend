import Form from "react-bootstrap/Form";

//MUI
import { Button, TextField, Typography } from "@mui/material";

//Elements
import DragNDrop from "./DragNDrop";

export default function CreateNewsForm() {
  //cím, kép, létrehozás dátuma, utolsó módosítás dátuma, szöveg , szerző
  return (
    <Form className="createnews-form">
      <Typography
        sx={{
          fontFamily: "Geologica",
          fontWeight: "300",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        Create a new article
      </Typography>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <TextField
          sx={{ width: "100%" }}
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={4}
        />
      </Form.Group>
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <TextField
          sx={{ width: "100%" }}
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          minRows={10}
          maxRows={500}
        />
      </Form.Group>
      <Form.Group
        className="mb-3 mt-3 dragndrop-container"
        controlId="formBasicEmail"
      >
        <DragNDrop />
      </Form.Group>
      <Button className="submit-btn" type="submit">
        Submit
      </Button>
    </Form>
  );
}
