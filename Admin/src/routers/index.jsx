import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "../Layout/DefaultLayout"
import ProductList from "../pages/ProductsList/ProuductList"

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "home",
                element: <h1>Home</h1>
            },
            {
                path: "product/list",
                element: <ProductList/>
            }
        ]
    }
])

export default privateRouter