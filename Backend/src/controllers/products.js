import { shopify } from "../config/Shopify.js";
import dotenv from "dotenv";
import LazadaAPI from "lazada-open-platform-sdk";

dotenv.config();

const appKey = "131197";
const clientSecret = "XB8HFsF3rFfD1sTcaEnvj20U2fobXOqU";
const redirectUri = "https://devidshop-fashion.onrender.com/api/callback";
const authCode = "0_131197_IdzamvxOD79FRpJ3erXQU1Ex8569";
// let accessToken =
//   "50000200d279oyrwoThDZoVHHydrQCBBbx3KRuj1ac19669gmumYGtXGDBloy7zs";
let accessToken =
  "50000201208pwOczh1Gh11c58d32rBxoE8BDt7ky0FnfLnwmRSGjzHqpAwJD0ISz";

// Generate the signature and add it to params

export const getProduct = async (req, res) => {
  try {
    console.log("run");
    
    // const aLazadaAPIWithToken = new LazadaAPI(
    //   appKey,
    //   clientSecret,
    //   "SINGAPORE",
    //   accessToken
    // );
    // console.log(aLazadaAPIWithToken);
    
    // const dataFromLazada = await aLazadaAPIWithToken.getProducts({
    //   filter: "all",
    // });

    // dataFromLazada.data.products = dataFromLazada.data.products.map(item => {
    //     const data = {
    //         ...item,
    //         ...item.attributes    
    //     }
    //     delete data.attributes
    //     return data
    // })

    // const dataFromLazada = await axios.get(
    //   "https://api.lazada.vn" + apiPath + "?" + queryParams
    // );

    const response = await shopify.product.list();
    // console.log(dataFromLazada?.data[2] || []);

    res.json({
      // lazada: dataFromLazada?.data,
      shopify: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

async function getAccessToken() {
  try {
    let responseAPI = {};
    const aLazadaAPI = new LazadaAPI(appKey, clientSecret, "VIETNAM");

    await aLazadaAPI
      .generateAccessToken({ code: authCode })
      .then((response) => {
        const { access_token } = response; // JSON data from Lazada's API
        console.log("====================================");
        console.log(access_token);
        console.log("====================================");
        responseAPI = { ...response };
      });
    console.log("1====================================");
    console.log(responseAPI);
    console.log("1====================================");
    return responseAPI;
  } catch (error) {
    console.error(
      "Lỗi khi lấy access token:",
      error.response ? error.response.data : error.message
    );
  }
}

export const getToken = async (req, res) => {
  try {
    const data = await getAccessToken();
    console.log(data);

    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};
