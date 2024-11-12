import express from "express";
const router = express.Router();
import { getProduct } from "../controllers/products.js";

router.get("/product/list", getProduct);

export default router;