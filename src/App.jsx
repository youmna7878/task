import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Products from "./component/Products"
import ProductDetails from "./component/ProductDetails"
import Layout from "./component/Layout"
import NotFound from "./component/NotFound"

let router = createBrowserRouter(
  [


    {
      path: '', element: <Layout />, children: [
        { index: "true", element: <Products /> },
        { path: "productdetails/:id", element: <ProductDetails /> },
        { path: "*", element: <NotFound /> }
      ]
    }




  ]
)

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>

    </>
  )
}

export default App
