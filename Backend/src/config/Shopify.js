import Shopify from'shopify-api-node'
import dotenv from 'dotenv';

dotenv.config()

export const shopify = new Shopify({
    shopName: process.env.APP_SHOPIFY_URL,
    apiKey: process.env.API_KEY,
    password: process.env.ACCESS_TOKEN_SHOPIFY,
})