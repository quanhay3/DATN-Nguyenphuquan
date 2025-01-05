import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "../Layout/DefaultLayout"
import AdminLayout from "../Layout/AdminLayout"
import ProductsManagerList from "../pages/Admin/ProductsList/ProductsManagerList"
import Login from "../pages/Client/Login/Login"
import SignUp from "../pages/Client/SignUp/SignUp"
import NotFoundPage from "../pages/Client/NotFoundPage/NotFoundPage"
import Home from "../pages/Client/Home/Home"
import ProductDetailView from "../pages/Client/ProductDetailView/ProductDetailView"
import CartPage from "../pages/Client/Cart/CartPage"
import Complete from "../pages/Client/Complete/Complete"
import OrderHistory from "../pages/Client/Order/OrderHistory"
import React, { useState, useEffect } from "react";
import OrderPage from "../pages/Admin/Order/OrderPage"
import UserManagementPage from "../pages/Admin/User/UserManagementPage"
import OrderDetail from "../pages/Client/Order/OrderDetail/OrderDetail"
import IntroducePage from "../pages/Client/Introduce/IntroducePage"
import ContactPage from "../pages/Client/Contact/ContactPage"
import ProductsPage from "../pages/Client/Products/ProductsPage"
import UserInfoPage from "../pages/Client/Info/UserInfoPage"

const GetServerIP = () => {
    const [serverIP, setServerIP] = useState("Loading...");

    useEffect(() => {
        fetch("/apitest/ip") // Endpoint này cần được cấu hình trong Nginx
            .then(response => response.text())
            .then(ip => setServerIP(ip))
            .catch(error => setServerIP("Không lấy được IP"));
    }, []);

    return <p>Server IP: {serverIP}</p>;
};
const privateRouter = [
    {
        path: '*',
        element: <NotFoundPage/>
    },
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
                path: 'product/:productId',
                element: <ProductDetailView/>
            },
            {
                path: 'cart',
                element: <CartPage />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'order_complete',
                element: <Complete />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'orders',
                element: <OrderHistory />,
                errorElement: <NotFoundPage />
            },
            {
                path: 'order/:id',
                element: <OrderDetail/>,
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
            },
            {
               path: 'introduce',
               element: <IntroducePage />,
               errorElement: <NotFoundPage />
            },
            {
               path: 'contact',
               element: <ContactPage />,
               errorElement: <NotFoundPage />
            },
            {
               path: 'products',
               element: <ProductsPage />,
               errorElement: <NotFoundPage />
            },
            {
                path: "userinformation",
                element: <UserInfoPage />,
                errorElement: <NotFoundPage />
            },
        ]
    },
    {
        path: "/test",
        element: (
            <div>
                <h1 className="text-[30px] text-center">Trang này để thực hiện test tải cho frontend</h1>
                <div className="text-center mt-4">
                    <GetServerIP />
                </div>
            </div>
        ),
        errorElement: <NotFoundPage />
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                path: "",
                element: <ProductsManagerList/>,
                errorElement: <NotFoundPage />
            },
            {
                path: "orders",
                element: <OrderPage></OrderPage>,
                errorElement: <NotFoundPage />
            },
            {
                path: "users",
                element: <UserManagementPage></UserManagementPage>,
                errorElement: <NotFoundPage />
            },
        ]
    }
]

export default privateRouter
