import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "../Layout/DefaultLayout"
import AdminLayout from "../Layout/AdminLayout"
import ProductsManagerList from "../pages/Admin/ProductsList/ProductsManagerList"
import Login from "../pages/Client/Login/Login"
import SignUp from "../pages/Client/SignUp/SignUp"
import NotFoundPage from "../pages/Client/NotFoundPage/NotFoundPage"
import Home from "../pages/Client/Home/Home"

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <NotFoundPage />
            },
            {
               path: 'login',
               element: <Login />,
               errorElement: <NotFoundPage />
            },
            {
               path: 'signup',
               element: <SignUp />,
               errorElement: <NotFoundPage />
            }
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
                element: <ProductsManagerList/>
            }
        ]
    }
])

export default privateRouter