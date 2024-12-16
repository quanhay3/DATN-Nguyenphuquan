/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneOutlined, SearchOutlined } from "@ant-design/icons";
import { AiOutlineUser, AiOutlineMenu, AiOutlineUserAdd } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RiBillLine } from "react-icons/ri";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { MdOutlineLockReset } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Popover, Tooltip } from "antd";
import { PiPackageLight, PiUserListBold } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import images from "../../assets/images";
import { info } from "../../constants/info";
import { deleteTokenAndUser } from "../../slices/authSlice";
import { useClearTokenMutation } from "../../services/auth.service";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useGetCartQuery } from "../../services/cart.service";

const Header = () => {
  const [showfetch, setShowFetch] = useState(false);
  const auth = useSelector((state) => state.userReducer);
  const {
    data: cartData,
    isLoading: cartLoading,
    refetch: cartReFetch,
  } = useGetCartQuery(auth.user?._id, { skip: !showfetch });

  const [clearToken] = useClearTokenMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleLogout = () => {
    dispatch(deleteTokenAndUser());
    clearToken();
    navigate("/");
  };

  useEffect(() => {
    if (auth.user?._id) {
      setShowFetch(true);
    }
  }, [auth.user?._id]);

  useEffect(() => {
    console.log(cartData);
  }, [cartData])
  

  function scrollFunction() {
    const btn_totop = document.querySelector(".section-icon-to-top");
    if (document.documentElement.scrollTop > 400) {
      btn_totop?.classList.add("!visible");
      btn_totop?.classList.add("!opacity-100");
    } else {
      btn_totop?.classList.remove("!visible");
      btn_totop?.classList.remove("!opacity-100");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      scrollFunction();
    };
    window.addEventListener("scroll", () => handleScroll());
    return window.removeEventListener("scroll", () => handleScroll());
  });

  const showMenuReponsive = () => {
    const bodyElement = document.querySelector("body");
    bodyElement?.classList.toggle("max-xl:overflow-hidden");
    const overlay_menu_homepage = document.querySelector(
      ".overlay-menu-homepage"
    );
    overlay_menu_homepage?.classList.toggle("!opacity-[0.15]");
    overlay_menu_homepage?.classList.toggle("!visible");

    const header_menu = document.querySelector(".header-menu");
    header_menu?.classList.toggle("max-xl:translate-x-[0%]");
  };

  const showMiniCart = () => {
    const mini_cart_overlay = document.querySelector(".mini-cart-overlay");
    mini_cart_overlay?.classList.toggle("hidden");
    const wrap_mini_cart = document.querySelector(".wrap-mini-cart");
    wrap_mini_cart?.classList.toggle("!translate-x-[0%]");
  };

  return (
    <>
      <div className="bg-blue-500 h-[60px] text-white text-[px] flex items-center justify-between px-[20px]">
        <p className="flex items-center">
          <CiLocationOn />
          <span className="ml-[10px]"> Địa chỉ: {info.address}</span>
        </p>
        <p>
          <Link to={"/"} className="hover:underline">
            Hướng dẫn thanh toán{" "}
          </Link>
          |
          <Link to={"/"} className="hover:underline">
            {" "}
            Hướng dẫn mua hàng
          </Link>
        </p>
        <p className="flex items-center">
          <PhoneOutlined />
          <span className="ml-[10px]">
            HOTLINE BÁN HÀNG: {info.phoneNumber}
          </span>
        </p>
      </div>
      <header className="header text-white sticky top-0 right-0 left-0 z-[5] transition-all duration-500 border-b-[1px] bg-slate-900 border-[#e2e2e2]  shadow-[0px_0px_10px_rgba(51,51,51,0.15)]">
        <section className="mx-auto px-[30px] w-full relative max-w-[1520px] m-auto">
          <div className="header-content flex items-center max-xl:justify-between ">
            <div className="header-logo xl:w-[13%] max-xl:[w-auto] ">
              <Link to="/">
                <img
                  className="logo-img w-[200px] max-h-[80px] aspect-square"
                  src={images.logoNoBackground}
                  alt=""
                />
              </Link>
            </div>
            <div
              onClick={showMenuReponsive}
              className="overlay-menu-homepage xl:hidden fixed w-[100%] top-0 bottom-0 left-0 right-0 z-[7] opacity-0 bg-[#333333]   invisible"
            ></div>
            <div className="header-menu max-xl:overflow-scroll  xl:w-[60%] max-xl:fixed  max-xl:transition-all max-xl:duration-500 max-xl:translate-x-[-100%]  max-xl:bottom-0 top-0 left-0 w-[320px] max-xl:z-[8] max-xl:bg-white">
              <ul className="main-menu  flex max-xl:flex  max-xl:flex-col">
                <li className="cursor-pointer main-menu-item text-[20px] flex justify-end xl:hidden  xl:py-[40px] xl:px-[15px] font-extrabold group  max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[10px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2]">
                  <span onClick={showMenuReponsive} className="cursor-pointer">
                    <FaXmark className="text-[20px]"></FaXmark>
                  </span>
                </li>
                <li
                  onClick={showMenuReponsive}
                  className=" cursor-pointer main-menu-item group/menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group  max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative"
                >
                  <Link
                    to="/"
                    className='group-hover:text-redTextColor block after:content-[""] after:w-[0] after:h-[2px] after:bg-redTextColor after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px] '
                  >
                    Trang chủ
                  </Link>
                </li>
                <li
                  onClick={showMenuReponsive}
                  className="cursor-pointer  main-menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item"
                >
                  <Link
                    to="/introduct"
                    className='block group-hover:text-redTextColor after:content-[""] after:w-[0] after:h-[2px] after:bg-redTextColor after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li
                  onClick={showMenuReponsive}
                  className="cursor-pointer  main-menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item"
                >
                  <Link
                    to="/products"
                    className='block group-hover:text-redTextColor after:content-[""] after:w-[0] after:h-[2px] after:bg-redTextColor after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li
                  onClick={showMenuReponsive}
                  className="cursor-pointer  main-menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item"
                >
                  <Link
                    to="/contact"
                    className='group-hover:text-redTextColor block after:content-[""] after:w-[0] after:h-[2px] after:bg-redTextColor after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'
                  >
                    Liên hệ
                  </Link>
                </li>
                <li
                  onClick={showMenuReponsive}
                  className="cursor-pointer sm:hidden max-sm:block  main-menu-item text-[17px] xl:py-[40px] xl:px-[15px] font-bold group max-xl:text-[#6f6f6f] max-xl:text-[14px] max-xl:py-[10px] max-xl:px-[15px] max-xl:border-t-[1px]  max-xl:border-[#e2e2e2] relative group/menu-item"
                >
                  <Link
                    to="/wishList"
                    className='group-hover:text-redTextColor block after:content-[""] after:w-[0] after:h-[2px] after:bg-redTetext-redTextColor after:max-xl:hidden after:transition-all after:duration-300 group-hover/menu-item:after:w-[calc(100%-30px)] after:block after:absolute after:bottom-0 after:left-[15px]'
                  >
                    Sản phẩm yêu thích
                  </Link>
                </li>
              </ul>
            </div>
            <div className="header-icon xl:w-[25%]">
              <ul className="list-header-icon flex justify-end items-center">
                <li
                  onClick={showMenuReponsive}
                  className="header-icon-item header-search-icon text-[20px] ml-[30px] hidden max-xl:block transition-colors duration-300 cursor-pointer hover:text-[#d2401e]"
                >
                  <AiOutlineMenu></AiOutlineMenu>
                </li>
                <li
                  // onClick={showModalSearch}
                  className="max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] relative transition-colors duration-300 cursor-pointer hover:text-[#d2401e]"
                >
                  <SearchOutlined />
                </li>
                {!auth?.accessToken && (
                  <li className="ml-[30px]">
                    <Link to="/orders">
                      <Tooltip
                        title={
                          <span className="text-white font-thin">
                            Tra cứu đơn hàng
                          </span>
                        }
                      >
                        {" "}
                        <PiPackageLight className="w-6 h-6 hover:text-[#d2401e] text-[#6f6f6f]" />
                      </Tooltip>
                    </Link>
                  </li>
                )}
                {!auth?.accessToken ? (
                  <li className="max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] transition-colors duration-300 cursor-pointer hover:text-[#d2401e]">
                    <Popover
                      placement="bottom"
                      content={
                        <>
                          <Link
                            to={"/login"}
                            className="flex items-center gap-[5px] py-[5px]"
                          >
                            <FiLogIn></FiLogIn>Đăng nhập
                          </Link>
                          <Link
                            to={"/signup"}
                            className="flex items-center gap-[5px] py-[5px]"
                          >
                            <AiOutlineUserAdd></AiOutlineUserAdd> Đăng ký
                          </Link>

                          <Link
                            to="/forgetPassword"
                            className="flex items-center gap-[5px] py-[5px]"
                          >
                            <MdOutlineLockReset></MdOutlineLockReset> Quên mật
                            khẩu
                          </Link>
                        </>
                      }
                      trigger="hover"
                    >
                      <span>
                        <AiOutlineUser></AiOutlineUser>
                      </span>
                    </Popover>
                  </li>
                ) : (
                  <>
                    <li className="max-sm:hidden header-icon-item header-search-icon text-[20px] ml-[30px] transition-colors duration-300 cursor-pointer hover:text-[#d2401e]">
                      <Popover
                        placement="bottom"
                        content={
                          <>
                            {auth.user?.role === "member" ? (
                              <div>
                                <Link
                                  to="/userInformation"
                                  className="flex items-center gap-[5px] py-[5px]"
                                >
                                  <PiUserListBold></PiUserListBold> Hồ sơ của
                                  bạn
                                </Link>
                              </div>
                            ) : (
                              <>
                                <div>
                                  <Link
                                    to="/admin"
                                    className="flex items-center gap-[5px] py-[5px]"
                                  >
                                    <PiUserListBold></PiUserListBold> Quản lý
                                    cửa hàng
                                  </Link>
                                </div>
                                <div>
                                  <Link
                                    to="/userinformation"
                                    className="flex items-center gap-[5px] py-[5px]"
                                  >
                                    <LuUser2></LuUser2> Hồ sơ của bạn
                                  </Link>
                                </div>
                              </>
                            )}
                            <div>
                              <Link
                                to="/orders"
                                className="flex items-center gap-[5px] py-[5px]"
                              >
                                <RiBillLine></RiBillLine> Lịch sử mua hàng
                              </Link>
                            </div>
                            <div>
                              <button
                                className="flex items-center gap-[5px] py-[5px]"
                                onClick={() => onHandleLogout()}
                              >
                                <FiLogOut></FiLogOut>Đăng xuất
                              </button>
                            </div>
                          </>
                        }
                        trigger="hover"
                      >
                        <img
                          src={auth?.user?.avatar}
                          className="w-7  aspect-square m-0 rounded-full cursor-pointer"
                          alt="Ảnh đại diện"
                        />
                      </Popover>
                    </li>
                    <Badge
                      className="max-sm:hidden"
                      size="small"
                      offset={[2, 2]}
                      count={cartData?.body?.data?.items.length || 0}
                      showZero={true}
                    >
                      <li
                        onClick={showMiniCart}
                        className="max-sm:hidden text-white header-icon-item header-search-icon text-[20px] ml-[30px] relative transition-colors duration-300 cursor-pointer hover:text-[#d2401e]"
                      >
                        <HiOutlineShoppingBag></HiOutlineShoppingBag>
                      </li>
                    </Badge>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
