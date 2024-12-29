import Product from "../models/product.js";
import Cart from "../models/cart.js";
import { typeRequestMw } from "../middleware/configResponse.js";

const { RESPONSE_MESSAGE, RESPONSE_STATUS, RESPONSE_OBJ } = typeRequestMw;

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Lấy ID người dùng từ token

    // Kiểm tra sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = `Sản phẩm không tồn tại`;
      return next();
    }

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Nếu không có giỏ hàng, tạo mới giỏ hàng trống
      cart = await Cart.create({
        userId,
        items: [],
        totalAmount: 0,
      });
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    let currentCartQuantity = 0;
    if (productIndex >= 0) {
      currentCartQuantity = cart.items[productIndex].quantity;
    }

    // Tổng số lượng (trong giỏ + yêu cầu thêm) không được vượt quá số lượng trong kho
    const totalRequestedQuantity = currentCartQuantity + quantity;
    if (totalRequestedQuantity > product.quantity) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = `Không đủ sản phẩm trong kho. Hiện chỉ còn ${product.quantity - currentCartQuantity} sản phẩm khả dụng.`;
      return next();
    }

    // Tính giá sau khi áp dụng discount (nếu có)
    let priceAfterDiscount = product.price;
    if (product.discount) {
      priceAfterDiscount =
        product.price - (product.price * product.discount) / 100;
    }

    if (productIndex >= 0) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng và giá trị tổng
      cart.items[productIndex].quantity = totalRequestedQuantity;
      cart.items[productIndex].totalPrice =
        totalRequestedQuantity * priceAfterDiscount;
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      cart.items.push({
        productId,
        quantity,
        price: priceAfterDiscount, // Lưu giá sản phẩm sau khi giảm giá
        totalPrice: priceAfterDiscount * quantity,
      });
    }

    // Cập nhật tổng giá trị của giỏ hàng
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Lưu giỏ hàng đã cập nhật
    await cart.save();

    req[RESPONSE_OBJ] = {
      message: "Sản phẩm đã được thêm vào giỏ hàng",
      cart,
    };
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};


export const getCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Giỏ hàng không tồn tại`;
      return next();
    }

    req[RESPONSE_OBJ] = cart;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Giỏ hàng không tồn tại`;
      return next();
    }

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Sản phẩm không có trong giỏ hàng`;
      return next();
    }

    // Xóa sản phẩm khỏi giỏ hàng
    cart.items.splice(productIndex, 1);

    // Cập nhật lại tổng giá trị của giỏ hàng
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Lưu giỏ hàng đã cập nhật
    await cart.save();

    req[RESPONSE_OBJ] = {
      message: "Sản phẩm đã được xóa khỏi giỏ hàng",
      cart,
    };
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    // Kiểm tra xem số lượng có hợp lệ hay không
    if (quantity <= 0) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = "Số lượng phải lớn hơn 0";
      return next();
    }

    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = "Giỏ hàng không tồn tại";
      return next();
    }

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = "Sản phẩm không có trong giỏ hàng";
      return next();
    }

    // Lấy thông tin sản phẩm từ cơ sở dữ liệu
    const product = await Product.findById(productId);
    if (!product) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = "Sản phẩm không tồn tại";
      return next();
    }

    // Tính giá sau khi áp dụng discount (nếu có)
    let priceAfterDiscount = product.price;
    if (product.discount) {
      priceAfterDiscount =
        product.price - (product.price * product.discount) / 100;
    }

    // Cập nhật số lượng và giá trị tổng của sản phẩm trong giỏ hàng
    cart.items[productIndex].quantity = quantity;
    cart.items[productIndex].totalPrice = priceAfterDiscount * quantity;

    // Cập nhật tổng giá trị của giỏ hàng
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Lưu giỏ hàng đã cập nhật
    await cart.save();

    req[RESPONSE_OBJ] = {
      message: "Giỏ hàng đã được cập nhật",
      cart,
    };
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};
