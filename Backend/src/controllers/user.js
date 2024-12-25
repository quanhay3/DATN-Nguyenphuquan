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

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { state } = req.body;

    if (typeof state !== 'boolean') {
      return res.status(400).json({ message: 'Invalid state value' });
    }

    const user = await User.findByIdAndUpdate(id, { state }, { new: true });
    if (!user) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = "User not found";
      return next();
    }
    req[RESPONSE_OBJ] = user;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
}
