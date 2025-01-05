import React, { useState } from "react";
import { useGetProductByIdQuery } from "../../../services/product.service";
import { Link, useParams } from "react-router-dom";
import { Button, InputNumber, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Item from "antd/es/list/Item";
import { useAddToCartMutation } from "../../../services/cart.service";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ProductDetailView = () => {
  const [addToCart] = useAddToCartMutation();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(productId, {
    refetchOnMountOrArgChange: true, // Dữ liệu sẽ được gọi lại mỗi lần component mount lại hoặc nếu `productId` thay đổi
  });
  const auth = useSelector((state) => state.userReducer);

  const onChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    try {
      if (quantity == 0) {
        message.error("Hãy chọn số lượng muốn đặt");
        return;
      }

      if (!auth.user?._id) {
        message.warning("Vui lòng đăng nhập để mua hàng");
        return;
      }

      const item = data?.product;
      // const itemPriceWithDiscount = item?.discount
      //   ? item?.price - (item?.price * item?.discount) / 100
      //   : item?.price;
      try {
        const data = await addToCart({
          productId: item._id,
          quantity,
        }).unwrap();

        message.success("Đã thêm sản phẩm vào giỏ hàng");
      } catch (error) {
        message.error(error?.data?.message);
      }
      // dispatch(
      //   addToCart({
      //     productId: item._id,
      //     quantity,
      //     price: itemPriceWithDiscount,
      //     totalPrice: item.price * quantity,
      //   })
      // );
    } catch (err) {
      message.error("Thêm sản phẩm vào giỏ hàng thất bại");
    }
  };

  return (
    <div className="my-12 mx-10">
      <Link className="text-black mb-3 block" to={"/"}>
        <Button>
          <ArrowLeftOutlined />
          Quay lại
        </Button>
      </Link>
      {isLoading ? (
        <div className="text-center">
          <Spin></Spin>
        </div>
      ) : (
        <>
          <div className="flex gap-10 mb-11">
            <div className="relative w-[500px] h-[500px] rounded-xl flex-1 border-black border-[1px] overflow-hidden">
              <img
                src={data?.product?.image}
                className="w-full h-full object-contain"
              ></img>
              <div className="absolute right-0 top-4">
                <p className="font-bold text-white bg-red-500 p-1 rounded-s-md">
                  SALE
                </p>
              </div>
              {data?.product?.quantity == 0 && (
                <div className="absolute flex items-center justify-center top-0 right-0 w-full h-full bg-slate-500 opacity-60">
                  <div className="w-[100px] h-[50px] flex items-center justify-center rounded-full bg-white">
                    <p className="text-center text-black font-extrabold">
                      Hết hàng
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-[2]">
              <h1 className="text-2xl w-[70%] text-black font-bold mb-5">
                {data?.product.name}
              </h1>
              {data?.product?.discount ? (
                <p className="mb-5">
                  <del>
                    {(+data?.product?.price || 0).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </del>{" "}
                  <span className="text-xl font-bold text-red-500">
                    {(
                      data.product?.price -
                        (data.product?.price * data.product?.discount) / 100 ||
                      0
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </p>
              ) : (
                <p className="mb-5 text-xl font-bold text-red-500">
                  {(+data?.product?.price || 0).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              )}
              <p>
                Số lượng: (
                <span className="text-[15px]">
                  còn lại {data?.product?.quantity} sản phẩm
                </span>
                )
              </p>
              <InputNumber
                min={0}
                max={data?.product?.quantity}
                defaultValue={quantity}
                onChange={onChange}
                className="mb-12"
              />

              <div className="flex gap-3">
                <Button
                  danger
                  type="primary"
                  size="large"
                  onClick={handleAddToCart}
                  className="font-bold w-1/5"
                >
                  Thêm vào giỏ hàng
                </Button>
                {/* <Button
                  type="primary"
                  size="large"
                  className="!bg-orange-500 w-1/5 font-bold"
                >
                  Mua ngay
                </Button> */}
              </div>
            </div>
          </div>
          <hr />
          <div>
            <h2 className="text-xl font-bold text-black mb-5">
              Mô tả sản phẩm
            </h2>
            <p>{data?.product?.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailView;
