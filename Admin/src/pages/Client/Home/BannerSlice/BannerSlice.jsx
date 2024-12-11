import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import images from "../../../../assets/images";
const BANNER_URL = [images.banner1, images.banner2, images.banner3];

const BannerSlice = () => {
  return (
    <>
      <div className="cont mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {BANNER_URL.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="banner-item w-full">
                <img
                  className="w-full h-full max-md:object-cover max-md:object-left object-cover"
                  src={url}
                  alt="banner"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BannerSlice;
