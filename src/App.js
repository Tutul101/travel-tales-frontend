import React, { useContext, useEffect, useState } from "react";
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

let logoutTimer;
function App() {
  const { isLoggedin, token, login, logout } = useContext(AuthContext);
  const [tokenExpire, setTokenExpire] = useState(null);
  console.log("JWT token", token);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const currentDate = new Date().getTime();
    const expireDate = storedData && storedData.expiration;
    setTokenExpire(expireDate);
    if (storedData && storedData.token && expireDate > currentDate) {
      login(storedData.userId, storedData.token, expireDate);
    }
  }, []);

  useEffect(() => {
    if (token && tokenExpire) {
      const remainingTime = tokenExpire - new Date().getTime();
      logoutTimer = setTimeout(() => {
        logout();
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token]);
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
