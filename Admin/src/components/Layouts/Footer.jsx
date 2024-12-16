import React, { useEffect, useRef, useState } from "react";
import images from "../../assets/images";
import { info } from "../../constants/info";
import { FiHeadphones } from "react-icons/fi";
import { FaArrowUp, FaPlus, FaWindowMinimize, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetCartQuery,
  useRemoveProductFromCartMutation,
} from "../../services/cart.service";
import { HiOutlineTrash } from "react-icons/hi2";
import { Button, message } from "antd";

const Footer = () => {
  const [showfetch, setShowFetch] = useState(false);
  const auth = useSelector((state) => state.userReducer);
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch: cartReFetch,
  } = useGetCartQuery(auth.user?._id, { skip: !showfetch });

  const [removeItem] = useRemoveProductFromCartMutation();

  useEffect(() => {
    if (auth.user?._id) {
      setShowFetch(true);
    }
  }, [auth.user?._id]);

  const handleRemoveItem = async (productId) => {
    await removeItem({ userId: auth.user?._id, productId })
      .then(() => message.success("Đã xóa sản phẩm khỏi giỏ hàng của bạn"))
      .catch(() => message.error("Đã xảy ra lỗi, hãy thử lại!!"));
    cartReFetch();
  };

  const showSudMenuFooter = (selecter, afterSelecter, beforeSelecter) => {
    const ft_cate = document.querySelector(selecter);
    ft_cate?.classList.toggle("max-lg:!h-[247px]");
    const afterSelecterElement = document.querySelector(afterSelecter);
    afterSelecterElement?.classList.toggle("hidden");
    const beforeSelecterElement = document.querySelector(beforeSelecter);
    beforeSelecterElement?.classList.toggle("hidden");
  };

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showMiniCart = () => {
    const mini_cart_overlay = document.querySelector(".mini-cart-overlay");
    mini_cart_overlay?.classList.toggle("hidden");
    const wrap_mini_cart = document.querySelector(".wrap-mini-cart");
    wrap_mini_cart?.classList.toggle("!translate-x-[0%]");
  };

  return (
    <>
      <footer className={"primary-bg bg-cover"}>
        <div className=" mx-auto px-[15px]">
          <ul className="footer-list flex justify-between py-[60px] flex-wrap ml-[-30px]">
            <li className="footer-if  w-full lg:w-[calc(35%-30px)] ml-[30px]">
              <div className="logo-ft rounded-full overflow-hidden inline-block">
                <img
                  className="max-w-[120px]"
                  src={images.adminLogoPath}
                  alt="logo"
                />
              </div>
              <div className="footer-if-text leading-7">
                <p>
                  <span>Địa chỉ: {info.address}</span>
                </p>
                <p className="mt-2">
                  <span>
                    Email:{" "}
                    <a
                      href={"mailto:" + info.email}
                      rel="noreferrer"
                      target="_blank"
                      className="hover:underline"
                    >
                      {info.email}
                    </a>
                  </span>
                </p>
                <p className="mt-2">
                  <span>
                    Website:{" "}
                    <a
                      href={info.websiteUrl}
                      rel="noreferrer"
                      target="_blank"
                      className="hover:underline"
                    >
                      {info.websiteName}
                    </a>
                  </span>
                </p>
              </div>
              <div className="call-line mt-[30px] flex items-center">
                <div className="call-icon mr-[15px] text-[50px] text-redTextColor">
                  <FiHeadphones></FiHeadphones>
                </div>
                <div className="call-if">
                  <p className="call-title text-redTextColor text-[20px] font-bold">
                    Số HOTLINE:
                  </p>
                  <a
                    href={"tel:" + info.phoneNumber}
                    className="call-phonenumber text-[16px]"
                  >
                    {info.phoneNumber}
                  </a>
                </div>
              </div>
            </li>
            <li className="footer-if list-link ft-policy ml-[30px] transition-all duration-500  lg:w-[calc(21%-30px)] w-full max-lg:mt-[15px] max-lg:h-[45px]  overflow-hidden max-lg:pb-[10px]">
              <div className="ft-title font-bold text-redTextColor text-[18px] relative">
                Chính sách và dịch vụ
                <button
                  onClick={() =>
                    showSudMenuFooter(
                      ".ft-policy",
                      ".icon-1-ft-policy",
                      ".icon-2-ft-policy"
                    )
                  }
                  className="lg:hidden border-b-[1px]  border-[#e2e2e2] w-full h-full pb-[40px] absolute top-0 left-0  cursor-pointer"
                  type="button"
                >
                  <FaPlus className=" icon-1-ft-policy absolute right-0 top-[8px] text-[12px] "></FaPlus>
                  <FaWindowMinimize className="hidden icon-2-ft-policy absolute right-0 top-[4px] text-[12px]"></FaWindowMinimize>
                </button>
              </div>

              <ul className="ft-sublist">
                <li className="text-[16px] mt-[15px] hover:text-color3rd transition-colors duration-300">
                  <Link to="/policy/privacy-policy">Chính sách bảo mật</Link>
                </li>
                <li className="text-[16px] mt-[15px] hover:text-color3rd transition-colors duration-300">
                  <Link to="/policy/payment-policy">Chính sách thanh toán</Link>
                </li>
                <li className="text-[16px] mt-[15px] hover:text-color3rd transition-colors duration-300">
                  <Link to="/policy/delivery-policy">Chính sách giao hàng</Link>
                </li>
              </ul>
            </li>
            <li className="footer-if list-link-instar ml-[30px] w-full lg:w-[calc(23%-30px)] max-lg:mt-[20px] "></li>
          </ul>
        </div>
        <div>
          <p className="text-center py-4">
            2024 © Copyright NGUYỄN PHỤ QUÂN - DATN. Designed by QUAN
          </p>
        </div>
      </footer>
      <section className="section-mini-cart ">
        <div className="cart-emty">
          <div className="container mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]">
            <div
              onClick={showMiniCart}
              className="mini-cart-overlay hidden overlay-menu-homepage  fixed w-[110%] top-0 bottom-0 left-0 right-0 z-[6] opacity-[0.5] bg-[#333333]  "
            ></div>
          </div>
          <div className="wrap-mini-cart transition-all duration-300 translate-x-[100%] w-[320px] flex h-full fixed z-[99] top-0 right-0 flex-col bg-white text-[#6f6f6f]">
            <div className="mini-cart-header flex border-b-[#e2e2e2] border-[1px]">
              <p className="cart-header-text w-full gap-[10px] py-[10px] px-[15px] flex items-center text-[14px]">
                <span className="cart-count bg-red-500 px-[8px] text-[14px] py-[4px] text-white bg-redTextColor">
                  {cartData?.body?.data?.items?.length || 0}
                </span>
                sản phẩm trong giỏ hàng
              </p>
              <button
                onClick={showMiniCart}
                className="close-mini-cart text-[#333333] text-[20px] mt-[5px] cursor-pointer hover:opacity-100 mr-[15px]  opacity-[0.5]"
                type="button"
              >
                <FaXmark></FaXmark>
              </button>
            </div>
            <div className="mini-cart-content overflow-auto m-h-[100%-269px]">
              <ul className="cart-item relative">
                {!cartData?.body || cartData?.body?.data?.items.length === 0 ? (
                  <li className="cart-product border-[#e2e2e2] items-center text-center mt-[50] border-t-[1px] relative first:border-none ">
                    <p className="cart-title xl:text-[20px] px-1 border-[#e2e2e2] max-xl:text-[20px] text-[red] font-bold pb-[12px]">
                      Chưa có sản phẩm nào trong giỏ hàng
                    </p>
                  </li>
                ) : (
                  cartData?.body?.data?.items?.map((item, index) => (
                    <li
                      key={index}
                      className="cart-product p-[15px] flex border-[#e2e2e2] border-t-[1px] relative first:border-none "
                    >
                      <div className="cart-img w-[65px]">
                        <Link to={"#"}>
                          <img
                            className="m-w-full h-[69px]  border-[#e2e2e2] border-[1px]"
                            src={item?.productId?.image}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="cart-content w-[calc(100%-65px)] pl-[15px] flex flex-col justify-center">
                        <Link
                          to={"/product/" + item?.productId?._id}
                          className="product-name overflow-hidden font-bold text-[16px] text-[#6f6f6f] overflow-ellipsis whitespace-nowrap"
                        >
                          {item.productId?.name}
                        </Link>
                        <div className="product-info mt-[9px] flex">
                          <span className="product-qt text-[16px]">
                            {item?.quantity} ×
                          </span>
                          <span className="product-price text-[#d2401e] text-[16px] ml-[5px]">
                            {item.productId?.discount
                              ? (
                                  item?.productId?.price -
                                  (item?.productId?.price *
                                    item?.productId?.discount) /
                                    100
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              : +item.productId?.price.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                          </span>
                        </div>
                        <div className="delete-cart">
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveItem(item?.productId?._id)
                            }
                            className="absolute right-[15px] bottom-[15px] text-[20px] opacity-[0.6] text-[#dc3545] hover:opacity-100"
                          >
                            <HiOutlineTrash></HiOutlineTrash>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
                <p className="text-right font-bold m-3">
                  Tổng tiền:{" "}
                  <span className="text-red-500">
                    {(cartData?.body?.data?.totalAmount || 0).toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </span>
                </p>
                <div className="start-shopping cart-title  border-[#e2e2e2] gap-2 font-bold flex justify-center items-center text-center pb-[12px]">
                  <Link to={"/cart"} onClick={showMiniCart} className="w-[80%]">
                    <Button
                      danger
                      type="primary"
                      size="large"
                      className="w-full font-bold"
                    >
                      Giỏ hàng thanh toán
                    </Button>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-icon-to-top transition-all duration-300 fixed bottom-[100px] right-[30px] cursor-pointer z-[4] invisible opacity-0">
        <div
          onClick={toTop}
          className="to-top-content  transition-all duration-300 hover:bg-white hover:text-[#d2401e] text-white text-[16px] h-[40px] w-[40px] bg-[#d2401e] rounded-[5px] flex items-center justify-center shadow-[0px_0px_10px_rgba(51,51,51,0.15)]"
        >
          <FaArrowUp></FaArrowUp>
        </div>
      </section>
    </>
  );
};

export default Footer;
