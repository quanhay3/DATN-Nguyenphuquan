import express from "express";
const router = express.Router();
import { getProduct, getToken } from "../controllers/products.js";

router.get("/product/list", getProduct);
router.get("/token", getToken);
// const clientId = '6ebeecjfnv44b';
// const redirectUri = 'https://devidshop-fashion.onrender.com/api/callback';
// const scope = 'user_info';
// const state = 'test123456acbvccxvwd';
// router.get('/auth', (req, res) => {
//     const authUrl = "https://auth.tiktok-shops.com/oauth/authorize?app_id=" + clientId + "&redirect_uri=" + redirectUri + "&state=" + state + "&scope=" + scope + "";
//     res.redirect(authUrl);
// });
export default router;