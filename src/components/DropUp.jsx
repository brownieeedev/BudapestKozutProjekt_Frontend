import * as React from "react";

//MUI
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//MUI Icons
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector } from "react-redux";

export default function DropUp() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {};

  const handleNavigateToPost = () => {
    setAnchorEl(null);
    if (loggedIn) {
      navigate("/createnews");
    } else {
      //alert user to login before creating a news
    }
  };

  //   const handleNavigateToManage = () => {
  //     setAnchorEl(null);
  //     navigate("/managenews");
  //   };

  return (
    <div className="addbtn-container">
      <Button
        className="add-btn"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddIcon className="add-icon" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleNavigateToPost}>Create news</MenuItem>
        <MenuItem>Manage news</MenuItem>
      </Menu>
    </div>
  );
}
