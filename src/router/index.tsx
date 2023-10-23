import { createBrowserRouter } from "react-router-dom";
import App from "@/pages/App";
import ErrorPage from "@/pages/ErrorPage";
import Registration from "@/components/Registration";

export const PATHS = {
  BASE: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
};

export const router = createBrowserRouter([
  {
    path: PATHS.BASE,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.SIGN_IN,
        element: <Registration />,
      },
      {
        path: PATHS.SIGN_UP,
        element: <Registration />,
      },
    ],
  },
]);
