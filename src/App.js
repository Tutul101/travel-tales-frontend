import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./users/pages/users";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
