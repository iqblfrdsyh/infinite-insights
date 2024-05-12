import React from "react";
import ContentSwiper from "../contentSwiper";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { dataBlog } from "@/data/blog";
import { formatDate } from "@/libs/functions";

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      delay={2000}
      autoplay={true}
      className="rounded-lg"
    >
      {dataBlog.map((data) => (
        <SwiperSlide key={data.id}>
          <ContentSwiper
            thumbnail={data.image}
            time={formatDate(data.time)}
            title={data.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
