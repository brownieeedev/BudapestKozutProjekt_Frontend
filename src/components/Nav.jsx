import * as React from "react";
import { useState, useEffect } from "react";

//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

//Mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function Nav() {
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const googleUser = useSelector((state) => state.authReducer.googleUser);

  const [imgLoaded, setImgLoaded] = useState(false);

  //Events
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigateToLogin = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    //logout with state, and remove jwt from localStorage
    dispatch(logout());
    localStorage.removeItem("jwt");
  };

  const handleNavigateToNews = () => {
    navigate("/news");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="nav-container" position="static">
        <Toolbar className="nav">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={handleNavigateToNews}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            News
          </Typography>
          {!loggedIn ? (
            <Button
              onClick={handleNavigateToLogin}
              className="login-btn border"
              color="inherit"
            >
              Login
            </Button>
          ) : (
            <div className="flex">
              <div className="profilepicture-container">
                {imgLoaded ? (
                  <img
                    className="img-rounded"
                    src={googleUser.picture}
                    alt="userimg"
                  />
                ) : (
                  <>
                    <AccountCircleIcon
                      sx={{ fontSize: "30px", cursor: "pointer" }}
                    />
                    <Typography sx={{ fontSize: "10px" }}>
                      {googleUser.given_name}
                    </Typography>
                  </>
                )}
              </div>
              <LogoutIcon onClick={handleLogout} className="logouticon" />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
