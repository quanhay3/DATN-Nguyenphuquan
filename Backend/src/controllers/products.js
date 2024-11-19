import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getProduct = async (req, res) => {
  try {
    const response = await axios.get(process.env.SERVER_URL + "/api/product/list");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};
