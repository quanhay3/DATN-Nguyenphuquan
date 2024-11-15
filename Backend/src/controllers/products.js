import { shopify } from "../config/Shopify.js";
import axios from "axios";
import crypto from "crypto";
import querystring from "qs";
import dotenv from "dotenv";
dotenv.config();

const appKey = 131197;
const clientSecret = "XB8HFsF3rFfD1sTcaEnvj20U2fobXOqU";
const redirectUri = "https://devidshop-fashion.onrender.com/api/callback";
const authCode = "0_131197_D6Io7RVUHvRGZ3o1rqd6mQsQ7642";
const accessToken =
  "50000201716i0RlqbVwH7kCUdtvt162d8d4dEFIth3dQSAjxHPuDwrawM1YvELHK";

// Generate the signature and add it to params

export const getProduct = async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  try {
    // let params = {
    //   app_key: appKey,
    //   code: authCode,
    //   sign_method: "sha256", // Phương thức tính chữ ký
    //   access_token: accessToken,
    //   timestamp: Date.now().toString(), // Tạo timestamp hiện tại ở định dạng chuỗi
    // };

    // const apiPath = "/rest/products/get";
    // params.sign = createSignature(clientSecret, apiPath, params);
    // const queryParams = new URLSearchParams(params).toString();

    const dataFromLazada = await axios.get(
      "https://api.lazada.vn/rest/products/get?code=0_131197_D6Io7RVUHvRGZ3o1rqd6mQsQ7642&app_key=131197&sign_method=sha256&access_token=50000201716i0RlqbVwH7kCUdtvt162d8d4dEFIth3dQSAjxHPuDwrawM1YvELHK&timestamp=1731647883285&sign=BCFD5152F2E9787C90EEC41D4A4EF3B7B0B77F09F576C66A1E89D3A754EA5B36"
    );
    const response = await shopify.product.list();
    res.json({
      shopify: response,
      lazada: dataFromLazada.data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

async function getAccessToken() {
  // Thông tin ứng dụng của bạn

  // Tạo tham số `params`
  let params = {
    code: authCode,
    app_key: appKey,
    sign_method: "sha256", // Phương thức tính chữ ký
    timestamp: Date.now().toString(), // Tạo timestamp hiện tại ở định dạng chuỗi
  };

  params = sortObject(params);

  var signData = querystring.stringify(params, { encode: false });
  var hmac = crypto.createHmac("sha256", clientSecret);
  var sign = hmac
    .update(new Buffer(signData, "utf-8"))
    .digest("hex")
    .toUpperCase();

  // Thêm sign vào params
  params.sign = sign;

  // Tạo chuỗi truy vấn từ params
  const queryParams = new URLSearchParams(params).toString();

  try {
    console.log("====================================");
    console.log(queryParams);
    console.log("====================================");
    console.log("====================================");
    console.log(
      "https://api.lazada.vn/rest/auth/token/createWithOpenId?" +
        querystring.stringify(params, { encode: false })
    );
    console.log("====================================");
    const response = await axios.get(
      "https://api.lazada.vn/rest/auth/token/createWithOpenId?" +
        querystring.stringify(params, { encode: false })
    );
    console.log("Access Token:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy access token:",
      error.response ? error.response.data : error.message
    );
  }
}

export const getToken = async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

function createSignature(secret, apiPath, parameters) {
  // Sort the parameters alphabetically and concatenate as key-value pairs without separators
  const sortedParams = Object.keys(parameters)
    .sort()
    .map((key) => `${key}${parameters[key]}`)
    .join("");

  // Concatenate the API path with the sorted parameters string
  const parametersStr = `${apiPath}${sortedParams}`;

  // Generate the HMAC-SHA256 signature
  return crypto
    .createHmac("sha256", secret)
    .update(parametersStr)
    .digest("hex")
    .toUpperCase();
}
