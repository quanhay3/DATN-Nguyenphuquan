import { shopify } from "../config/Shopify.js";

export const getProduct = async (req, res) => {
    try {
        const response = await shopify.product.list()
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra' });
    }
}