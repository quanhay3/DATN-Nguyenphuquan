import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "../Layout/DefaultLayout"
import AdminLayout from "../Layout/AdminLayout"
import ProductList from "../pages/Admin/ProductsList/ProuductList"

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "",
                element: <h1>Home</h1>
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "",
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