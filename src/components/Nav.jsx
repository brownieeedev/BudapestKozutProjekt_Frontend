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

//Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const googleUser = useSelector((state) => state.authReducer.googleUser);

  const [imgLoaded, setImgLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         // Authorization: `Bearer ${user.access_token}`,
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     await fetch(googleUser.picture, requestOptions).then((res) =>
  //       console.log(`response from useEffect fetch ${JSON.stringify(res)}`)
  //     );
  //   };
  //   try {
  //     fetchData();
  //   } catch (err) {
  //     setImgLoaded(false);
  //     console.error(err);
  //   }
  // }, [googleUser]);

  // console.log(`googleUser in Nav component ${JSON.stringify(googleUser)}`);
  //Events
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/signin");
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
