import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//utils
import { validateEmail, validatePassword } from "../../utils/validations";
//MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
//MUI Icons
import LoginIcon from "@mui/icons-material/Login";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

//Google Login
import { useGoogleLogin } from "@react-oauth/google";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { login, setGoogleUser } from "../../redux/authSlice";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.authReducer.loggedIn);
  const [passType, setPassType] = useState("password");
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (user) {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          "Content-Type": "application/json",
        },
      };
      const fetchData = async () => {
        await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          requestOptions
        )
          .then((res) => res.json())
          .then((res) => {
            dispatch(setGoogleUser({ googleUser: res }));
            if (loggedIn) {
              navigate("/home");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      try {
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  }, [user]);

  // const [showAlert, setShowAlert] = useState(false);
  // const [message, setMessage] = useState("");
  // const [signedUp, setSignedUp] = useState(false);
  // const [sessionExpired, setSessionExpired] = useState(false);
  // const [startRefreshLogic, setStartRefreshLogic] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      dispatch(login());
      setUser(res);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get("email");
    const password = data.get("password");

    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (validEmail && validPassword) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      fetch("/api/v1/users/login", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "success") {
            console.log("successfully logged in");
          } else {
          }
        });
    } else {
      //handle unsuccessfull login alert
    }
  };

  // const handleInputChange = () => {
  //   setShowAlert(false);
  //   setSessionExpired(false);
  //   setSignedUp(false);
  //   setPassType("password");
  // };

  const showPass = () => {
    setPassType("text");

    setTimeout(() => {
      setPassType("password");
    }, 2500);
  };

  const handleNavigate = (navigateTo) => {
    navigate(navigateTo);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className="signin-container " component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* {signedUp && (
            <Alert sx={{ mb: "5px" }} severity="success">
              You have successfully signed up, login to your account!
            </Alert>
          )}
          {sessionExpired && (
            <Alert sx={{ mb: "5px" }} severity="error">
              Your session has expired, log in again to continue!
            </Alert>
          )} */}
          <Avatar sx={{ m: 1, bgcolor: "#343538" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // onChange={handleInputChange}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              // onChange={handleInputChange}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type={passType}
              id="password"
              autoComplete="current-password"
            />
            <div className="flex-end showpass-container" onClick={showPass}>
              <Typography
                sx={{
                  fontFamily: "Geologica",
                  fontSize: "12px",
                  color: "#414040",
                  paddingBottom: "1px",
                  fontWeight: 300,
                  marginRight: "2px",
                }}
              >
                Show password
              </Typography>
              <VisibilityOutlinedIcon
                sx={{ color: "#414040", fontSize: "1.3rem", fontWeight: 300 }}
              />
            </div>

            {/* {showAlert && <Alert severity="error">{message}</Alert>} */}

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              onClick={() => googleLogin()}
              className="google-btn"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 0,
                padding: "10px",
                fontSize: "16px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign in with Google
            </Button>
            <Button
              className="signin-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                padding: "10px",
                fontSize: "16px",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => {
                    handleNavigate("/forgotpassword");
                  }}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  onClick={() => {
                    handleNavigate("/signup");
                  }}
                  variant="body2"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
