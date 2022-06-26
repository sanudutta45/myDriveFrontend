import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";

//progress bar(circular)
import "react-circular-progressbar/dist/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//css
import "./index.css";

const AppBundle = (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

ReactDOM.render(AppBundle, document.getElementById("root"));
