import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home";
import AddETFPage from "./AddETFPage";
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect,
    Routes
} from "react-router-dom";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Router>
            <Routes>
                <Route exact path = '/' element = {<Home/>}/>
                <Route path = "/addETF" element = {<AddETFPage/>}/>
            </Routes>
        </Router>
        );
    }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App/>);