import { createBrowserRouter } from "react-router-dom";
import Main from "../component/layout/Main";
import AddService from "../pages/AddService";
import Appointment from "../pages/Appointment";
import Blog from "../pages/Blog";

import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Reviews from "../pages/Reviews";
import Services from "../pages/Services";
import ServicesDetails from "../pages/ServicesDetails";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />, 
        },
        {
            path:"/blog",
            element:<Blog />
        },
       
        {
            path:"/services",
            element:<Services />,
        },
        {
            path:"/appointment",
            element:<Appointment />,
        },
        {
            path:"/services/:id",
            element:<ServicesDetails />,
            errorElement:<NotFound />
        },
        {
            path:"/reviews",
            element:<PrivateRoute><Reviews /> </PrivateRoute> 
        },
        {
            path:"/addservice",
            element:<PrivateRoute><AddService /> </PrivateRoute>,
        },
        {
            path:"/register",
            element:<PublicRoute><Register /></PublicRoute>
        },
        {
            path:"/login",
            element:<PublicRoute><Login /></PublicRoute>
        },
        {
            path: '*',
            element: <NotFound />
        }
      ],
    },
    {
      path: '*',
      element: <NotFound />
  }
  ]);