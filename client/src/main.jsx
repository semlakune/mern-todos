import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import "./index.css";
import {Toaster} from "react-hot-toast";

import router from "./router/index.jsx"
import store from "./store/index.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
        </Provider>
    </React.StrictMode>
);