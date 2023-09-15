import React, { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate, useLocation } from "react-router-dom";

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
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`user/register/`, {
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
      })
      .then(() => {
        navigate("/login");
      })
      .catch(handleRegistrationError);
  };

  const handleRegistrationError = (error) => {
    const GENERIC_ERROR = "Something went wrong. Please try again.";
    const SERVER_UNRESPONSIVE =
      "Server did not respond. Please check your connection and try again.";

    if (error.response) {
      switch (error.response.status) {
        case 400:
          // Assuming 'detail' is a common error key in the response
          if (error.response.data.detail) {
            setError(error.response.data.detail);
          } else {
            // If there are other specific error fields in the response, handle them here
            const errorMsg = Object.values(error.response.data).join(" "); // This will join all error messages into a single string
            setError(errorMsg || INVALID_CREDENTIALS);
          }
          break;
        case 401:
          setError("Invalid Credentials");
          break;
        default:
          alert(GENERIC_ERROR);
          setError(GENERIC_ERROR);
          break;
      }
    } else if (error.request) {
      alert(SERVER_UNRESPONSIVE);
    } else {
      alert(GENERIC_ERROR);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive new updates to Stockify, we wont spam you!"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={() => navigate("/login")} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
