import { InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  useRemoveProductFromCartMutation,
  useUpdateCartMutation,
} from "../../services/cart.service";
import { HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";

const CartItem = ({ itemInCart, userId }) => {
  const [item, setItem] = useState(itemInCart);
  const [removeItem] = useRemoveProductFromCartMutation();
  const [updateItem] = useUpdateCartMutation();

  useEffect(() => {
    setItem(itemInCart);
  }, [itemInCart]);

  const handleRemoveItem = async (productId) => {
    await removeItem({ userId, productId })
      .then(() => message.success("Đã xóa sản phẩm khỏi giỏ hàng của bạn"))
      .catch(() => message.error("Đã xảy ra lỗi, hãy thử lại!!"));
  };

  const handleUpdateItem = async (value) => {
    await updateItem({
      userId,
      quantity: value,
      productId: item?.productId?._id,
    })
      .then(() => message.success("Đã cập nhật thành công"))
      .catch(() => message.error("Đã xảy ra lỗi, hãy thử lại!!"));
  };

  return (
    <div className="relative mb-4 flex gap-3 items-center justify-between rounded-md p-2 shadow-md border-[1px] border-gray-200">
      <img
        className="w-[100px] h-[100px] rounded-md"
        src={item?.productId?.image}
        alt=""
      />
      <Link
        to={"/product/" + item?.productId?._id}
        className="product-name w-[200px] overflow-hidden font-bold text-[16px] text-[#6f6f6f] overflow-ellipsis whitespace-nowrap"
      >
        {item.productId?.name}
      </Link>
      <p>
        $
        {
          item?.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        }
      </p>
      <div>
        <InputNumber
          onChange={handleUpdateItem}
          min={0}
          max={item?.productId?.quantity}
          value={item?.quantity}
        ></InputNumber>
        <p className="mx-2">(còn lại {item?.productId?.quantity} sản phẩm)</p>
      </div>
      <p className="absolute bottom-0 right-0 px-2 bg-red-500 text-white rounded-s-md">
        Tổng tiền:{" "}
        <span className="font-bold">
          {(item?.totalPrice || 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </p>
      <div className="delete-cart absolute top-2 right-2">
        <button
          type="button"
          onClick={() => handleRemoveItem(item?.productId?._id)}
          className="text-[20px] opacity-[0.6] text-[#dc3545] hover:opacity-100"
        >
          <HiOutlineTrash></HiOutlineTrash>
        </button>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
