import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Home from "./Home";
import AddETFPage from "./Overlap/Overlap";
import Blend from "./Blend/Blend";
import NavBar from "./NavBar";
import TermsOfService from "./Terms";
import LoginPage from "./LoginPage";
import SignUp from "./Register";
import Logout from "./Logout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/blend" element={<Blend />} />
            <Route path="/overlap" element={<AddETFPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
