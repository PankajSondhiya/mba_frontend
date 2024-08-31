import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FirebaseProvider } from "./configs/firebase.config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </FirebaseProvider>
);
