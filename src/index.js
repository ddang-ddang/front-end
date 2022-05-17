import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/configStore";
import App from "./App";
import './index.css';
import axios from 'axios';
import { BASE_URL } from "./shared/Link";

axios.defaults.baseURL = BASE_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
