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

const GetServerIP = () => {
    const [serverIP, setServerIP] = useState("Loading...");

    useEffect(() => {
        fetch("/api/ip") // Endpoint này cần được cấu hình trong Nginx
            .then(response => response.text())
            .then(ip => setServerIP(ip))
            .catch(error => setServerIP("Không lấy được IP"));
    }, []);

    return <p>Server IP: {serverIP}</p>;
};
const privateRouter = [
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
                element: <h1>Home</h1>
            },
            {
                path: "product/list",
                element: <ProductsManagerList/>
            }
        ]
    }
]

export default privateRouter
