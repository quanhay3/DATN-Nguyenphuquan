// import { shopify } from "../config/Shopify.js";
import dotenv from "dotenv";
import Product from '../models/product.js';
// import LazadaAPI from "lazada-open-platform-sdk";
import { typeRequestMw } from "../middleware/configResponse.js";

const { RESPONSE_MESSAGE, RESPONSE_STATUS, RESPONSE_OBJ } = typeRequestMw;
dotenv.config();

export const getAllProducts = async (req, res, next) => {
  try {
    // Tìm tất cả sản phẩm
    const products = await Product.find();

    if (!products || products.length === 0) {
      res.status(404).json({ message: "Không có sản phẩm nào." });
      return;
    }

    const lazada = products.filter(prd => prd.category == "Lazada")
    const shopify = products.filter(prd => prd.category == "Shopify")

    res.status(200).json({
      message: 'Danh sách sản phẩm',
      lazada,
      shopify
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      message: 'Có lỗi khi lấy danh sách sản phẩm!',
      error: error.message,
    });
  }
};


export const getProduct = async (req, res, next) => {
  try {
    // Lấy id sản phẩm từ params
    const productId = req.params.id;

    // Tìm sản phẩm theo ID
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Sản phẩm không tồn tại!" });
      return;
    }

    res.status(200).json({
      message: 'Thông tin sản phẩm',
      product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      message: 'Có lỗi khi lấy thông tin sản phẩm!',
      error: error.message,
    });
  }
};


// const appKey = "131197";
// const clientSecret = "XB8HFsF3rFfD1sTcaEnvj20U2fobXOqU";
// const redirectUri = "https://devidshop-fashion.onrender.com/api/callback";
// const authCode = "0_131197_IdzamvxOD79FRpJ3erXQU1Ex8569";
// let accessToken =
//   "50000200d279oyrwoThDZoVHHydrQCBBbx3KRuj1ac19669gmumYGtXGDBloy7zs";
// let accessToken =
//   "50000201208pwOczh1Gh11c58d32rBxoE8BDt7ky0FnfLnwmRSGjzHqpAwJD0ISz";

// Generate the signature and add it to params

// export const getProduct = async (req, res) => {
//   try {
//     console.log("run");
    
//     const aLazadaAPIWithToken = new LazadaAPI(
//       appKey,
//       clientSecret,
//       "SINGAPORE",
//       accessToken
//     );
//     console.log(aLazadaAPIWithToken);
    
//     const dataFromLazada = await aLazadaAPIWithToken.getProducts({
//       filter: "all",
//     });

//     dataFromLazada.data.products = dataFromLazada.data.products.map(item => {
//         const data = {
//             ...item,
//             ...item.attributes    
//         }
//         delete data.attributes
//         return data
//     })

//     // const dataFromLazada = await axios.get(
//     //   "https://api.lazada.vn" + apiPath + "?" + queryParams
//     // );

//     const response = await shopify.product.list();
//     console.log(dataFromLazada?.data[2] || []);

//     res.json({
//       lazada: dataFromLazada?.data,
//       shopify: response,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Có lỗi xảy ra" });
//   }
// };

// async function getAccessToken() {
//   try {
//     let responseAPI = {};
//     const aLazadaAPI = new LazadaAPI(appKey, clientSecret, "VIETNAM");

//     await aLazadaAPI
//       .generateAccessToken({ code: authCode })
//       .then((response) => {
//         const { access_token } = response; // JSON data from Lazada's API
//         console.log("====================================");
//         console.log(access_token);
//         console.log("====================================");
//         responseAPI = { ...response };
//       });
//     console.log("1====================================");
//     console.log(responseAPI);
//     console.log("1====================================");
//     return responseAPI;
//   } catch (error) {
//     console.error(
//       "Lỗi khi lấy access token:",
//       error.response ? error.response.data : error.message
//     );
//   }
// }

// export const getToken = async (req, res) => {
//   try {
//     const data = await getAccessToken();
//     console.log(data);

//     res.json({ data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Có lỗi xảy ra" });
//   }
// };
