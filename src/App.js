import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Users from "./users/pages/users";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
