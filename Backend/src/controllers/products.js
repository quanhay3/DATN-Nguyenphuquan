import { shopify } from "../config/Shopify.js";
import axios from "axios";

export const getProduct = async (req, res) => {
    try {
        const response = await shopify.product.list()
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }
}

// async function getAccessToken(authCode) {
//   const params = {
//     client_id: '131197',
//     client_secret: 'XB8HFsF3rFfD1sTcaEnvj20U2fobXOqU',
//     grant_type: 'authorization_code',
//     code: authCode,
//     redirect_uri: 'https://devid-shop-fashion.vercel.app/',
//   };

//   try {
//     const response = await axios.post('https://auth.lazada.com/rest/auth/token', null, { params });
//     console.log('Access Token:', response.data.access_token);
//     return response.data.access_token;
//   } catch (error) {
//     console.error('Lỗi khi lấy access token:', error.response ? error.response.data : error.message);
//   }
// }

// // Ví dụ sử dụng mã ủy quyền (authCode) từ URL callback của Lazada
// const authCode = 'AUTHORIZATION_CODE_TU_LAZADA';
// getAccessToken(authCode);
