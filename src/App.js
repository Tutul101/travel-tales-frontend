import React, { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from "./Root";
import Users from "./users/pages/users";
import UserPlaces from "./users/pages/user-places";
import NewPlace from "./places/pages/new-place";
import UpdatePlace from "./places/pages/update-place";
import Auth from "./users/pages/auth";
import { AuthContext } from "./contexts/auth-context";
function App() {
  const { isLoggedin } = useContext(AuthContext);

  let routes;

  if (isLoggedin) {
    routes = [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/places/new",
        element: <NewPlace />,
      },
      {
        path: "/places/:placeId",
        element: <UpdatePlace />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ];
  } else {
    routes = [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/:userId/places",
        element: <UserPlaces />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "*",
        element: <Navigate to="/auth" replace />,
      },
    ];
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
