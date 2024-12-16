import express from "express";
import { responseSender } from "../middleware/configResponse.js";
import { getAllUsers } from "../controllers/user.js";
import authentication from "../middleware/authentication.js";
import authorization from "../middleware/authorization.js";
const router = express.Router();

router.get("/users", authentication, authorization, getAllUsers, responseSender)

export default router;