import express from "express";
import { responseSender } from "../middleware/configResponse.js";
import { getCategories } from "../controllers/category.js";
const router = express.Router();

router.get("/categories", getCategories, responseSender)

export default router;