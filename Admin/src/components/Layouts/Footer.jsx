import React from "react";
import images from "../../assets/images";
import { info } from "../../constants/info";
import { FiHeadphones } from "react-icons/fi";
import { FaPlus, FaWindowMinimize } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const showSudMenuFooter = (selecter, afterSelecter, beforeSelecter) => {
    const ft_cate = document.querySelector(selecter);
    ft_cate?.classList.toggle('max-lg:!h-[247px]');
    const afterSelecterElement = document.querySelector(afterSelecter);
    afterSelecterElement?.classList.toggle('hidden');
    const beforeSelecterElement = document.querySelector(beforeSelecter);
    beforeSelecterElement?.classList.toggle('hidden');
 };

  return (
    <footer className={"primary-bg bg-cover"}>
      <div className=" mx-auto px-[15px]">
        <ul className="footer-list flex justify-between py-[60px] flex-wrap ml-[-30px]">
          <li className="footer-if  w-full lg:w-[calc(35%-30px)] ml-[30px]">
            <div className="logo-ft rounded-full overflow-hidden inline-block">
              <img className="max-w-[120px]" src={images.adminLogoPath} alt="logo" />
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
          <li className="footer-if list-link-instar ml-[30px] w-full lg:w-[calc(23%-30px)] max-lg:mt-[20px] ">
           
          </li>
        </ul>
      </div>
      <div>
        <p className="text-center py-4">
          2024 © Copyright NGUYỄN PHỤ QUÂN - DATN. Designed by QUAN
        </p>
      </div>
    </footer>
  );
};

export default Footer;
