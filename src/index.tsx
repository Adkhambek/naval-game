import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "normalize.css";
import "./assets/css/style.css";

const root = ReactDOM.createRoot(
    document.getElementById("game") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
