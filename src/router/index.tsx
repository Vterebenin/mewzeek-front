import { createBrowserRouter } from "react-router-dom";
import App from "@/pages/App";
import ErrorPage from "@/pages/ErrorPage";
import Registration from "@/pages/Registration";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Main from "@/pages/Main";

export const PATHS = {
  BASE: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  HOME: "/home",
};

export const router = createBrowserRouter([
  {
    path: PATHS.BASE,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.BASE,
        element: <Main />,
      },
      {
        path: PATHS.SIGN_IN,
        element: <Login />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <Registration />,
      },
      {
        path: PATHS.HOME,
        element: <Home />,
      },
    ],
  },
]);
