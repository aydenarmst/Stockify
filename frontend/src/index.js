import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import '../src/styles/index.css';
import '../src/styles/Navbar.module.css';

// Use the new createRoot API
const root = ReactDOM.createRoot(document.getElementById("app"));

// Render your component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
