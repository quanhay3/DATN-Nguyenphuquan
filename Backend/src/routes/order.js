import express from "express";
import { createOrder, getAllOrders, getOrder, getOrdersByUser, updateOrderStatus } from "../controllers/order.js";
import { responseSender } from "../middleware/configResponse.js";
import authentication from "../middleware/authentication.js";
import authorization from "../middleware/authorization.js";
const router = express.Router();

router.get("/orders/user", authentication, getOrdersByUser, responseSender)
router.get("/orders", authentication, authorization, getAllOrders, responseSender)
router.get("/order/:orderId", authentication, getOrder, responseSender)
router.post("/order/create", authentication, createOrder, responseSender)
router.put("/order/:orderId/status", authentication, updateOrderStatus, responseSender)

export default router;