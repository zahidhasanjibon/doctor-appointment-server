import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../component/layout/AdminLayout";
import Main from "../component/layout/Main";
import AddService from "../pages/AddService";
import AdminAllServices from "../pages/AdminAllServices";
import Allusers from "../pages/Allusers";
import Appointment from "../pages/Appointment";
import Blog from "../pages/Blog";
import ErrorPage from "../pages/ErrorPage";

import Home from "../pages/Home";
import Login from "../pages/Login";
import MyAppointment from "../pages/MyAppointment";
import NotFound from "../pages/NotFound";
import Payment from "../pages/Payment";
import Register from "../pages/Register";
import Reviews from "../pages/Reviews";
import Services from "../pages/Services";
import ServicesDetails from "../pages/ServicesDetails";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },

      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/appointment",
        element: (
          <PrivateRoute>
            <Appointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/services/:id",
        element: <ServicesDetails />,
        errorElement: <NotFound />,
      },
      {
        path: "/reviews",
        element: (
          <PrivateRoute>
            <Reviews />
          </PrivateRoute>
        ),
      },

      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <AdminLayout></AdminLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment />,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <Allusers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addservice",
        element: (
          <AdminRoute>
            <AddService />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allservices",
        element: (
          <AdminRoute>
            <AdminAllServices />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL2}/booking/${params.id}`, {
            headers: {
              authorization: `bearer ${localStorage.getItem("jwttoken")}`,
            },
          }),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
