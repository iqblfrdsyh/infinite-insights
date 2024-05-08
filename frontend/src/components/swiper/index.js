import React from 'react'
import {Navigation, Pagination, Autoplay, Ally} from "swiper/modules";
import {Swiper,SwiperSlide} from "swiper/react"

const SwiperComponent = () => {
  return (
    <Swiper
        modules={[Navigation, Pagination,Autoplay,Ally]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{clickable: true}}
        autoplay={true}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
    >
        <SwiperSlide>slide 1</SwiperSlide>
        <SwiperSlide>slide 2</SwiperSlide>
        <SwiperSlide>slide 3</SwiperSlide>
        <SwiperSlide>slide 4</SwiperSlide>
        <SwiperSlide>slide 5</SwiperSlide>
        <SwiperSlide>slide 6</SwiperSlide>
        <SwiperSlide>slide 7</SwiperSlide>
        <SwiperSlide>slide 8</SwiperSlide>
        <SwiperSlide>slide 9</SwiperSlide>
    </Swiper>
  )
}

export default SwiperComponent