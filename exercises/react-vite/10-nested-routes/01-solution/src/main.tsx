import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import RestaurantDetails from "./pages/RestaurantDetails"
import RestaurantList from "./pages/RestaurantList"
import App from "./App.tsx"
import "./index.css"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/restaurants",
          children: [
            {
              path: "",
              element: <RestaurantList />,
            },
            {
              path: ":slug",
              element: <RestaurantDetails />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
