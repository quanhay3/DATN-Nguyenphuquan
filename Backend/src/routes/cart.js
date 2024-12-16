import express from "express";
import { addToCart, getCart, removeProductFromCart, updateCart } from "../controllers/cart.js";
import { responseSender } from "../middleware/configResponse.js";
import authentication from "../middleware/authentication.js";
const router = express.Router();

router.get("/cart/:userId", authentication, getCart, responseSender)
router.post("/cart/add", authentication, addToCart, responseSender)
router.delete("/cart/:userId/:productId", authentication, removeProductFromCart, responseSender)
router.put("/cart/:userId/update", authentication, updateCart, responseSender); 

export default router;