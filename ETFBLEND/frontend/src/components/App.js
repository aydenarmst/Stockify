import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home";
import AddETFPage from "./AddETFPage";
import Blend from "./Blend";
import NavBar from "./NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blend" element={<Blend />} />
          <Route path="/addETF" element={<AddETFPage />} />
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
