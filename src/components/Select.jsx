import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Science", "Economics", "Sports", "Fashion", "Food"];

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectCategory({ handleCategoryChange, initialValue }) {
  const theme = useTheme();
  const [category, setcategory] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleCategoryChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          sx={{
            fontFamily: "Geologica",
            fontWeight: 200,
          }}
          id="demo-multiple-name-label"
        >
          Category
        </InputLabel>
        <Select
          sx={{ fontFamily: "Geologica", fontWeight: 300 }}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={initialValue}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
          // value={initialValue}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, category, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
