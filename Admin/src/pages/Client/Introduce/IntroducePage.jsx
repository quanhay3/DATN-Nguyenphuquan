import React from "react";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const IntroducePage = () => {
    return (
        <>
            <div className="main">
                <section className="section-breadcrumb py-[15px] bg-[#f7f7f7] border-b-[1px] border-[#e2e2e2]">
                    <div className="cont mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px] lg:w-[970px] md:w-[750px] flex max-lg:flex-wrap items-start relative">
                        <span>
                            <Link to="/">Trang chủ </Link> / Giới thiệu
                        </span>
                    </div>
                </section>
                <section className="lg:py-[100px] md:py-[80px] max-md:py-[60px]">
                    <div className="mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px] lg:w-[970px] md:w-[750px]">
                        <div className="xl:w-[90%] lg:w-[60%] md:w-[70%] max-md:w-[100%] m-auto">
                            <div className="text-center">
                                <Title level={1}>Về chúng tôi</Title>
                                <h2>
                                    Nền tảng bán hàng đa kênh, nơi tổng hợp các sản phẩm giảm giá tốt nhất từ Shopee, Shopify và nhiều nền tảng khác, giúp bạn dễ dàng mua sắm sản phẩm với giá cả hợp lý và chất lượng cao.
                                </h2>
                            </div>
                            <div className="main-introduce flex justify-center max-sm:flex-col gap-10 mt-10 items-center">
                                <div className="content-introduce w-[90%]">
                                    <img
                                        src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/about-us/t-3.jpg"
                                        alt="About Us"
                                    />
                                </div>
                                <div className="conten-introduce w-[90%]">
                                    <Title className="text-center" level={2}>Hệ thống của chúng tôi</Title>
                                    <h2>
                                        Chúng tôi mang đến cho bạn một nền tảng tập hợp các sản phẩm giảm giá từ nhiều kênh bán hàng uy tín, đảm bảo khách hàng nhận được các ưu đãi tốt nhất mà không phải tìm kiếm trên nhiều nền tảng khác nhau.
                                    </h2>
                                </div>
                            </div>

                            <div className="main-introduce flex justify-center max-sm:flex-col-reverse gap-10 mt-10 items-center">
                                <div className="conten-introduce w-[90%]">
                                    <Title className="text-center" level={2}>Sứ mệnh của chúng tôi</Title>
                                    <h2 className="mb-5">
                                        Chúng tôi cung cấp một trải nghiệm mua sắm tối ưu, nơi mọi sản phẩm đều được chọn lọc kỹ lưỡng và đảm bảo:
                                    </h2>
                                    <p>Sản phẩm chất lượng, đến từ các nhà cung cấp uy tín như Shopee, Shopify.</p>
                                    <p>Thông tin sản phẩm minh bạch, giá cả cạnh tranh nhất thị trường.</p>
                                    <p>
                                        Đáp ứng mọi nhu cầu của khách hàng với đa dạng danh mục, từ thời trang, điện tử, đến đồ gia dụng.
                                    </p>
                                    <p>Hỗ trợ khách hàng nhanh chóng, đảm bảo sự hài lòng ở mức cao nhất.</p>
                                </div>
                                <div className="conten-introduce w-[90%]">
                                    <img
                                        src="https://spacingtech.com/html/tm/freozy/freezy-ltr/image/about-us/t-1.jpg"
                                        alt="Mission"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default IntroducePage;
