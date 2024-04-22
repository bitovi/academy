import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProductPage from "./pages/Product"
import Features from "./pages/Product/components/Features"
import Support from "./pages/Product/components/Support"
import WhereToBuy from "./pages/Product/components/WhereToBuy"
import App from "./App.tsx"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "product",
          element: <ProductPage />,
          children: [
            {
              index: "features",
              element: <Features />,
            },
            {
              index: "where-to-buy",
              element: <WhereToBuy />,
            },
            {
              index: "support",
              element: <Support />,
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
