import User from "../models/user.js";
import { typeRequestMw } from "../middleware/configResponse.js";

const { RESPONSE_MESSAGE, RESPONSE_STATUS, RESPONSE_OBJ } = typeRequestMw;

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    req[RESPONSE_OBJ] = users;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};
