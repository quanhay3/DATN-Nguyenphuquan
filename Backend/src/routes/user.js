import express from "express";
import { responseSender } from "../middleware/configResponse.js";
import { getAllUsers, updateUser, updateInfo } from "../controllers/user.js";
import authentication from "../middleware/authentication.js";
import authorization from "../middleware/authorization.js";
const router = express.Router();

router.get("/users", authentication, authorization, getAllUsers, responseSender)
router.put("/user/:id/state", authentication, authorization, updateUser, responseSender)
router.patch('/users/:id', authentication, updateInfo, responseSender);

export default router;