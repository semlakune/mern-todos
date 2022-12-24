import {createBrowserRouter} from "react-router-dom";
import Home from "../views/Home.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import Login from "../views/Login.jsx";
import Register from "../views/Register.jsx";
import NotFound from "../views/NotFound.jsx";

const router = createBrowserRouter([
    {
        element: <PrivateRoute />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ]
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default router;