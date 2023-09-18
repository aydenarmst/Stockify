import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import axiosInstance from "../axios";

const PaperStyled = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const FormStyled = styled("form")(({ theme }) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}));

const SubmitStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

// Use the above styled components in your React components as required

export default function SignIn() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        navigate("/");
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        // General error
        console.error("Error during login:", error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          // Check for a 400 status code and provide a friendly error message
          if (error.response.status === 400) {
            setError("Invalid credentials. Please try again.");
          } else if (error.response.status === 401) {
            // Check for a 401 status code and provide a friendly error message
            setError("Invalid Credentials");
          } else {
            // Some other error occurred
            alert("Something went wrong. Please try again.");
            setError("Something went wrong. Please try again.");
          }
        } else if (error.request) {
          // The request was made but no response was received
          alert(
            "Server did not respond. Please check your connection and try again."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Unable to process your request. Please try again later.");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <PaperStyled>
        <AvatarStyled></AvatarStyled>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormStyled noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <SubmitStyled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign In
          </SubmitStyled>
          {error && <p className="error">{error}</p>}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="./Register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </FormStyled>
      </PaperStyled>
    </Container>
  );
}
