import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { typeRequestMw } from "../middleware/configResponse.js";

const { RESPONSE_MESSAGE, RESPONSE_STATUS, RESPONSE_OBJ } = typeRequestMw;

export const createOrder = async (req, res, next) => {
  try {
    const { paymentMethod, shippingAddress } = req.body;
    const userId = req.user._id; // Lấy ID người dùng từ token

    // Lấy giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = "Giỏ hàng trống hoặc không tồn tại";
      return next();
    }

    // Kiểm tra và tính toán số lượng sản phẩm trong giỏ hàng
    let totalAmount = 0;
    const items = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        req[RESPONSE_STATUS] = 404;
        req[RESPONSE_MESSAGE] = `Sản phẩm không tồn tại`;
        return next();
      }

      // Kiểm tra số lượng sản phẩm trong kho
      if (item.quantity > product.quantity) {
        req[RESPONSE_STATUS] = 400;
        req[
          RESPONSE_MESSAGE
        ] = `Sản phẩm ${product.name} không đủ số lượng trong kho`;
        return next();
      }

      // Tính giá trị tổng cho từng sản phẩm
      const totalPrice =
        (product.price - (product.price * product.discount) / 100) *
        item.quantity;
      items.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price - (product.price * product.discount) / 100,
        totalPrice: totalPrice,
      });

      // Cộng dồn tổng tiền đơn hàng
      totalAmount += totalPrice;

      // Cập nhật số lượng sản phẩm trong kho
      product.quantity -= item.quantity;
      await product.save();
    }

    // Tạo đơn hàng mới từ giỏ hàng
    const newOrder = new Order({
      userId,
      items: items,
      totalAmount: totalAmount,
      paymentMethod,
      shippingAddress,
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    await newOrder.save();

    // Reset giỏ hàng về trạng thái ban đầu (làm trống giỏ hàng)
    cart.items = [];
    cart.totalAmount = 0; // Giả sử giỏ hàng có tổng giá trị (có thể cần nếu bạn có trường totalAmount trong giỏ hàng)
    await cart.save();

    req[RESPONSE_OBJ] = {
      message: "Đơn hàng đã được tạo thành công",
      order: newOrder,
    };
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Kiểm tra trạng thái hợp lệ
    const validStatuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED"];
    if (!validStatuses.includes(status)) {
      req[RESPONSE_STATUS] = 400;
      req[RESPONSE_MESSAGE] = `Trạng thái không hợp lệ`;
      return next();
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!order) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Đơn hàng không tồn tại`;
      return next();
    }

    req[RESPONSE_OBJ] = order;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const getOrdersByUser = async (req, res, next) => {
  try {
    const userId = req.user._id; // Lấy userId từ thông tin token

    // Tìm tất cả đơn hàng của người dùng
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId"); // Lấy thông tin sản phẩm trong đơn hàng

    if (orders.length === 0) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Không có đơn hàng nào cho người dùng này`;
      return next();
    }

    req[RESPONSE_OBJ] = orders;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    // Lấy tất cả đơn hàng
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate(["items.productId", "userId"]); // Lấy thông tin sản phẩm trong đơn hàng

    if (orders.length === 0) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Không có đơn hàng nào trong hệ thống`;
      return next();
    }

    req[RESPONSE_OBJ] = orders;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate([
      "items.productId",
      "userId",
    ]);

    if (!order) {
      req[RESPONSE_STATUS] = 404;
      req[RESPONSE_MESSAGE] = `Đơn hàng không tìm thấy`;
      return next();
    }

    req[RESPONSE_OBJ] = order;
    return next();
  } catch (error) {
    req[RESPONSE_STATUS] = 500;
    req[RESPONSE_MESSAGE] = `${error.message}`;
    return next();
  }
};
