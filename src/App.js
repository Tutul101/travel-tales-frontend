import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Users from "./users/pages/users";
import UserPlaces from "./users/pages/user-places";
import NewPlace from "./places/pages/new-place";
import UpdatePlace from "./places/pages/update-place";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
