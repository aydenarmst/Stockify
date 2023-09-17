import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import '../src/styles/index.css';
import '../src/styles/Navbar.module.css';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("app")
);
