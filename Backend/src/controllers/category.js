import Category from "../models/category.js";
import { typeRequestMw } from "../middleware/configResponse.js";

const { RESPONSE_MESSAGE, RESPONSE_STATUS, RESPONSE_OBJ } = typeRequestMw;

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Không có danh mục nào trong hệ thống`;
      return next();
    }

    req[RESPONSE_OBJ] = categories;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};
