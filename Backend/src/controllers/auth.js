import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { typeRequestMw } from "../middleware/configResponse.js";
import { signinSchema, singupSchema } from "../validation/auth.js";
import Cart from "../models/cart.js";

dotenv.config();
const { RESPONSE_MESSAGE, RESPONSE_STATUS, RESPONSE_OBJ } = typeRequestMw;

export const signUp = async (req, res, next) => {
  try {
    const { error } = singupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      req[RESPONSE_STATUS] = 500;
      req[RESPONSE_MESSAGE] = `${error.details[0].message}`;
      return next();
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = `Email này đã được sử dụng`;
      return next();
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });
    if (!user) {
      req[RESPONSE_STATUS] = 401;
      req[RESPONSE_MESSAGE] = `Quá trình đăng ký bị lỗi! Vui lòng thử lại sau`;
      return next();
    }

    // Tạo Giỏ hàng cho người dùng sau khi đăng ký thành công
    const cart = await Cart.create({
      userId: user._id, // Liên kết giỏ hàng với user mới
      items: [], // Khởi tạo giỏ hàng trống
      totalAmount: 0, // Giỏ hàng bắt đầu không có sản phẩm
    });

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.SERECT_REFRESHTOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.SERECT_ACCESSTOKEN_KEY,
      {
        expiresIn: "5m",
      }
    );

    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    user.password = undefined;

    req[RESPONSE_OBJ] = {
      accessToken,
      expires: 10 * 60 * 1000,
      data: user,
    };
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });

    if (error) {
      req[RESPONSE_STATUS] = 500;
      req[RESPONSE_MESSAGE] = `${error.details[0].message}`;
      return next();
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Email này chưa được đăng ký`;
      return next();
    }

    if (!user.state) {
      req[RESPONSE_STATUS] = 403;
      req[RESPONSE_MESSAGE] = `Email này đã bị vô hiệu hóa`;
      return next();
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = `Mật khẩu không trùng khớp`;
      return next();
    }

    if (!user) {
      req[RESPONSE_STATUS] = 401;
      req[
        RESPONSE_MESSAGE
      ] = `Quá trình đăng nhập bị lỗi! vui lòng thử lại sau`;
      return next();
    }

    // Kiểm tra xem user đã có giỏ hàng chưa
    let cart = await Cart.findOne({ userId: user._id });

    // Nếu chưa có giỏ hàng, tạo mới giỏ hàng trống cho user
    if (!cart) {
      cart = new Cart({
        userId: user._id,
        items: [], // Giỏ hàng trống
        totalAmount: 0, // Tổng giá trị ban đầu là 0
      });

      // Lưu giỏ hàng mới vào database
      await cart.save();
    }

    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.SERECT_REFRESHTOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.SERECT_ACCESSTOKEN_KEY,
      {
        expiresIn: "5m",
      }
    );
    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    user.password = undefined;

    req[RESPONSE_OBJ] = {
      accessToken,
      expires: 10 * 60 * 1000,
      data: user,
    };
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      req[RESPONSE_OBJ] = {
        accessToken: "",
        data: {},
      };
      return next();
    }
    jwt.verify(
      refreshToken,
      process.env.SERECT_REFRESHTOKEN_KEY,
      async (err, decode) => {
        if (err) {
          req[RESPONSE_STATUS] = 400;
          req[RESPONSE_MESSAGE] = `${err}`;
          return next();
        } else {
          const user = await User.findById(decode._id);
          if (!user) {
            req[RESPONSE_STATUS] = 400;
            req[RESPONSE_MESSAGE] = `not found account`;
            return next();
          }
          const accessToken = jwt.sign(
            { _id: user._id },
            process.env.SERECT_ACCESSTOKEN_KEY,
            {
              expiresIn: "1m",
            }
          );
          res.cookie("accessToken", accessToken, {
            expires: new Date(Date.now() + 5 * 60 * 1000),
            httpOnly: true,
          });
          req[RESPONSE_OBJ] = {
            accessToken,
            expires: 10 * 60 * 1000,
            data: user,
          };
          return next();
        }
      }
    );
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const clearToken = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    req[RESPONSE_MESSAGE] = `Token has been cleared`;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};
