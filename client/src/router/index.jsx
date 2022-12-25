import {createBrowserRouter} from "react-router-dom";
import Home from "../views/Home.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import Login from "../views/Login.jsx";
import Register from "../views/Register.jsx";
import NotFound from "../views/NotFound.jsx";
import Verify from "../views/Verify.jsx";
import Check from "../views/Check.jsx";

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
        path: "check",
        element: <Check />,
    },
    {
        path: "verify/:token",
        element: <Verify />,
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default router;