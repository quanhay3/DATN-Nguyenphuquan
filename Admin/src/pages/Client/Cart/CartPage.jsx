import React, { useEffect, useState } from "react";
import { useGetCartQuery } from "../../../services/cart.service";
import { useSelector } from "react-redux";
import { Button, Input, message, Modal, Spin } from "antd";
import CartItem from "../../../components/CartItem/CartItem";
import { Link, useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import { useCreateOrderMutation } from "../../../services/order.service";

const CartPage = () => {
  const [showfetch, setShowFetch] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useSelector((state) => state.userReducer);
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch: cartReFetch,
  } = useGetCartQuery(auth.user?._id, { skip: !showfetch });
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (auth.user?._id) {
      setShowFetch(true);
    }
  }, [auth.user?._id]);

  const handleCreateOrder = async () => {
    await createOrder({
      paymentMethod: "ONLINE_PAYMENT",
      shippingAddress: address,
    })
      .then(async () => {
        await cartReFetch()
        navigate("/order_complete");
        message.success("Thanh toán thành công, đơn hàng của bạn đã được tạo");
      })
      .catch(() => {
        message.error("Gặp lỗi trong quá trình tạo đơn hàng, hãy thử lại!!");
      });
  };

  const showModal = () => {
    if (address && address !== "") {
      setIsModalOpen(true);
    } else {
      message.error("Hãy nhập thông tin 'địa chỉ giao hàng'");
    }
  };

  const handleOk = async () => {
    await handleCreateOrder()
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-12 mx-10 relative">
      {cartLoading ? (
        <div className="text-center">
          <Spin></Spin>
        </div>
      ) : cartData?.body ? (
        <>
          <div className="flex gap-5">
            <div className="w-[70%]">
              <Link to={"/"} className="mb-4 block underline">
                Tiếp tục mua hàng
              </Link>
              <div className="mb-6">
                {cartData?.body?.data?.items.length == 0 ? 
                (<h1>Chưa có sản phẩm nào trong giỏ hàng</h1>)
                : 
                cartData?.body?.data?.items.map((item, index) => {
                  return (
                    <CartItem
                      key={index}
                      itemInCart={item}
                      userId={auth.user?._id}
                    />
                  );
                })}
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">
                  Thông tin người mua
                </h1>
                <div>
                  <div className="mb-4">
                    <p>Người nhận:</p>
                    <Input disabled value={auth.user?.userName} />
                  </div>
                  <div className="mb-4">
                    <p>email:</p>
                    <Input disabled value={auth.user?.email} />
                  </div>
                  <div className="mb-4">
                    <p>Số điện thoại liên hệ:</p>
                    <Input disabled value={auth.user?.phoneNumber} />
                  </div>
                  <div className="mb-4">
                    <p>Địa chỉ giao hàng:</p>
                    <Input
                      placeholder="Nhập địa chỉ cụ thể"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="sticky top-[120px] bg-white p-4 shadow-lg">
                <h1 className="text-xl font-bold text-black">
                  Thông tin thanh toán
                </h1>
                <hr />
                <div className="py-5">
                  <div className="flex justify-between mb-3">
                    <p className="font-bold">Tổng:</p>
                    <p className="text-right text-red-500 text-large font-bold">
                      {cartData?.body?.data?.totalAmount.toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <p className="font-bold">Tổng phụ:</p>
                    <p className="text-right text-red-500 text-large font-bold">
                      {"0".toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <hr />
                  <div className="flex justify-between my-3">
                    <p className="font-bold">Tổng tiền thanh toán:</p>
                    <p className="text-right text-red-500 text-xl font-bold">
                      {cartData?.body?.data?.totalAmount.toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    danger
                    type="primary"
                    size="large"
                    className="w-full text-white font-bold"
                    onClick={showModal}
                  >
                    Thanh toán
                  </Button>
                </div>
                <Modal
                  title="Mã chuyển khoản"
                  open={isModalOpen}
                  onOk={handleOk}
                  style={{ top: 20 }}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Hủy
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={isLoading}
                      onClick={handleOk}
                    >
                      Thanh toán
                    </Button>,
                  ]}
                >
                  <div className="w-full h-[550px]">
                    <img
                      src={images.BankQR}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartPage;
